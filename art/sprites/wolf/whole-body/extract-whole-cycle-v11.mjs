import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url), canvasModule = process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas";
const { createCanvas, ImageData } = require(canvasModule);
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve(canvasModule))] }));
const root = new URL("walk-v11/", import.meta.url), variant = process.argv[2] || "v01";
const recordUrl = new URL(`raw/E-whole-cycle-${variant}-record.json`, root), record = JSON.parse(await readFile(recordUrl));
const bytes = await readFile(new URL(`raw/E-whole-cycle-${variant}.png`, root));
const { data, info } = await sharp(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
if (info.width % 4 || info.height % 3 || info.width / 4 !== info.height / 3) throw new Error("Expected four columns by three square cells.");
const side = info.width / 4, border = Math.ceil(side * 2 / 128);
const target = JSON.parse(await readFile(new URL("targets.json", root)));
const approved = JSON.parse(await readFile(new URL("../walk-v07/manifest.json", root))).directions.E.frames;
await mkdir(new URL(`audit-${variant}/`, root), { recursive: true });
const frames = [];
for (let i = 0; i < 12; i++) {
  const rgba = Buffer.alloc(side * side * 4), col = i % 4, row = Math.floor(i / 4);
  for (let y = border; y < side - border; y++) for (let x = border; x < side - border; x++) {
    const k = ((row * side + y) * info.width + col * side + x) * 4, out = (y * side + x) * 4;
    const r = data[k], g = data[k + 1], b = data[k + 2];
    if (g > Math.max(r, b) + 12 && g > r * 1.25 && g > b * 1.25) continue;
    data.copy(rgba, out, k, k + 4);
  }
  const cell = await sharp(rgba, { raw: { width: side, height: side, channels: 4 } }).resize(128, 128, { kernel: "lanczos3" }).png().toBuffer();
  const png = await sharp({ create: { width: 192, height: 192, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: cell, left: 32, top: 56 }]).png().toBuffer();
  const id = `E-${String(i + 1).padStart(2, "0")}`, filename = `frames/${id}-${variant}.png`;
  await writeFile(new URL(filename, root), png);
  const decoded = await sharp(png).ensureAlpha().raw().toBuffer(), sprite = createCanvas(192, 192);
  sprite.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(decoded), 192, 192), 0, 0);
  const page = createCanvas(1152, 434), a = page.getContext("2d");
  a.fillStyle = "#e7e4df"; a.fillRect(0, 0, 1152, 434); a.fillStyle = "#111"; a.font = "18px sans-serif";
  ["Whole-body pilot", "Approved paw blocking", "New full-body control overlay"].forEach((label, n) => a.fillText(id + " · " + label, n * 384 + 10, 22));
  for (let n = 0; n < 3; n++) {
    a.save(); a.translate(n * 384, 32); a.scale(2, 2);
    if (n !== 1) a.drawImage(sprite, 0, 0);
    if (n !== 0) { a.strokeStyle = n === 2 ? "#f9f6ed" : "#111"; a.lineWidth = n === 2 ? 1 : 1.3; a.lineJoin = "round"; a.lineCap = "round";
      for (const line of (n === 1 ? approved[i] : target.poses[i]).guideLines) { a.beginPath(); a.moveTo(...line[0]); for (const p of line.slice(1)) a.lineTo(...p); a.stroke(); }
    }
    a.restore();
  }
  a.fillStyle = "#111"; a.font = "14px sans-serif"; a.fillText(Object.entries(approved[i].feet).map(([id, f]) => `${id}:${f.planted ? "stance" : "swing"}`).join(" · ") + " — no per-frame fitting", 12, 428);
  await writeFile(new URL(`audit-${variant}/${id}.png`, root), page.toBuffer("image/png"));
  frames.push({ id, filename, rawCell: [col * side, row * side, side, side], sha256: createHash("sha256").update(png).digest("hex"), status: "held pending measurement" });
}
await writeFile(recordUrl, JSON.stringify({ ...record, dimensions: [info.width, info.height], registration: { scale: 128 / side, offset: [32, 56], policy: "One page-level cell scale and fixed placement; no nose fitting, per-pose transforms or painted parts." }, frames }, null, 2) + "\n");
console.log(`Extracted 12 intact candidate sprites and exact-guide comparisons for ${variant}; active V10 untouched.`);
