import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, readBitmap } from "./source-parts.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const atlas = JSON.parse(await readFile(resolve(root, "atlas.json"), "utf8"));
const directions = Object.keys(atlas.directions);
const selections = [{ clip: "idle", index: 0 }, { clip: "walk", index: 0 }, { clip: "walk", index: 6 }, { clip: "walk", index: 12 }, { clip: "walk", index: 18 }, { clip: "cut", index: 5 }, { clip: "hurt", index: 4 }, { clip: "death", index: 11 }];
const canvas = createCanvas(directions.length * 192, selections.length * 172 + 40), context = canvas.getContext("2d");
context.fillStyle = "#23231e"; context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = "#d7bd82"; context.font = "18px sans-serif";
context.fillText("Exact packed wolf poses — canonical scale — no separate demonstration art", 12, 26);
for (const [column, direction] of directions.entries()) {
  const page = atlas.directions[direction], image = await readBitmap(resolve(root, page.image));
  for (const [row, selection] of selections.entries()) {
    const frame = page.frames[atlas.clips[selection.clip].frames[selection.index].source];
    const x = column * 192, y = row * 172 + 40;
    context.fillStyle = (row + column) % 2 ? "#292b25" : "#20221d"; context.fillRect(x, y, 192, 172);
    context.fillStyle = "#d7bd82"; context.fillText(`${direction} · ${selection.clip} ${selection.index + 1}`, x + 10, y + 23);
    context.drawImage(image, ...frame.rect, x + 96 - frame.pivot[0], y + 143 - frame.pivot[1], frame.rect[2], frame.rect[3]);
  }
}
await mkdir(resolve(root, "qa"), { recursive: true });
await writeFile(resolve(root, "qa/atlas-overview.png"), canvas.toBuffer("image/png"));
