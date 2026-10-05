import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname } from "node:path";

const require = createRequire(import.meta.url);
const canvasModule = require.resolve(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
export const { createCanvas, ImageData } = require(canvasModule);
const sharp = require(require.resolve("sharp", { paths: [dirname(canvasModule)] }));
export const partNames = ["body", "head", "open", "tail", "foreUpper", "foreLower", "forePaw", "hindUpper", "hindLower", "hindPaw", "rest", "assembled"];

export function regions(pixels, width, height) {
  const visited = new Uint8Array(width * height), found = [];
  for (let start = 0; start < visited.length; start++) {
    if (visited[start] || pixels[start * 4 + 3] < 32) continue;
    const pending = [start]; visited[start] = 1;
    let area = 0, left = width, top = height, right = 0, bottom = 0;
    while (pending.length) {
      const index = pending.pop(), x = index % width, y = Math.floor(index / width);
      area++; left = Math.min(left, x); right = Math.max(right, x + 1); top = Math.min(top, y); bottom = Math.max(bottom, y + 1);
      for (const next of [x ? index - 1 : -1, x < width - 1 ? index + 1 : -1, y ? index - width : -1, y < height - 1 ? index + width : -1]) {
        if (next >= 0 && !visited[next] && pixels[next * 4 + 3] >= 32) { visited[next] = 1; pending.push(next); }
      }
    }
    if (area >= 500) found.push({ rect: [left, top, right - left, bottom - top], area });
  }
  if (found.length !== 12) throw new Error(`Expected 12 separate painted parts; found ${found.length}`);
  found.sort((a, b) => a.rect[1] - b.rect[1]);
  return [0, 1, 2].flatMap(row => found.slice(row * 4, row * 4 + 4).sort((a, b) => a.rect[0] - b.rect[0]));
}

export function pixels(canvas) {
  return canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
}

export function contactAnchor(canvas) {
  const data = pixels(canvas);
  for (let y = canvas.height - 1; y >= 0; y--) {
    const columns = [];
    for (let x = 0; x < canvas.width; x++) if (data[(y * canvas.width + x) * 4 + 3] >= 128) columns.push(x);
    if (columns.length) return [(columns[0] + columns.at(-1)) / 2 + .5, y + 1];
  }
  throw new Error("Paw source has no opaque contact edge");
}

export async function readParts(path, registrationPath, settings = {}) {
  const decoded = await sharp(await readFile(path)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const image = { width: decoded.info.width, height: decoded.info.height };
  const full = createCanvas(image.width, image.height); full.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(decoded.data), image.width, image.height), 0, 0);
  const data = pixels(full), located = regions(data, image.width, image.height);
  const result = {}, registration = {};
  partNames.forEach((name, index) => {
    const [x, y, width, fullHeight] = located[index].rect;
    const height = Math.floor(fullHeight * (settings.lowerCrop?.[name] ?? 1));
    const canvas = createCanvas(name.endsWith("Paw") ? 11 : width, name.endsWith("Paw") ? 8 : height);
    canvas.getContext("2d").drawImage(full, x, y, width, height, 0, 0, canvas.width, canvas.height);
    const anchor = name.endsWith("Paw") ? contactAnchor(canvas) : null;
    result[name] = { canvas, anchor, name };
    registration[name] = { sourceRect: [x, y, width, height], originalComponentRect: located[index].rect, renderedSize: [canvas.width, canvas.height], contactAnchor: anchor, sourcePixelsSha256: createHash("sha256").update(pixels(canvas)).digest("hex") };
  });
  if (registrationPath) await writeFile(registrationPath, JSON.stringify({ source: path, dimensions: [image.width, image.height], parts: registration }, null, 2) + "\n");
  return result;
}
