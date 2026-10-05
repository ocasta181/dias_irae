import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, pixels, readBitmap, components } from "../source-parts.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const sources = [
  { file: "base-wolf-v02.png", columns: 1, rows: 1, scale: .08, offset: [50, 72], first: 0 },
  { file: "walk-e-01-12-v01.png", columns: 4, rows: 3, scale: .25, offset: [52, 73], first: 1 },
  { file: "walk-e-13-24-v01.png", columns: 4, rows: 3, scale: .25, offset: [52, 73], first: 13 },
];
const page = createCanvas(980, 980), context = page.getContext("2d"), frames = [], registration = [];
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
for (const source of sources) {
  const bitmap = await readBitmap(resolve(root, source.file));
  const cell = [bitmap.width / source.columns, bitmap.height / source.rows];
  if (!cell.every(Number.isInteger) || cell[0] !== cell[1]) throw new Error("Source must use integral square cells.");
  registration.push({ ...source, sourceSize: [bitmap.width, bitmap.height], sourceCell: cell, sha256: hash(await readFile(resolve(root, source.file))), method: "One fixed scale and offset for the complete source sheet; no pose-level corrections." });
  for (let i = 0; i < source.columns * source.rows; i++) {
    const logical = createCanvas(192, 192), target = logical.getContext("2d");
    const sourceRect = [i % source.columns * cell[0], Math.floor(i / source.columns) * cell[1], ...cell];
    target.drawImage(bitmap, ...sourceRect, ...source.offset, cell[0] * source.scale, cell[1] * source.scale);
    const data = pixels(logical), region = components(data, 192, 192, 100);
    if (region.length !== 1) throw new Error(`Frame ${source.first + i} is not one connected animal.`);
    const [left, top, width, height] = region[0].rect;
    if (left <= 0 || top <= 0 || left + width >= 192 || top + height >= 192) throw new Error("Logical sprite is clipped.");
    const index = source.first + i, x = index % 5 * 196 + 2, y = Math.floor(index / 5) * 196 + 2;
    context.drawImage(logical, x, y);
    frames.push({ family: index ? "walk" : "idle", pose: index || 1, rect: [x, y, 192, 192], pivot: [96, 156], logicalSize: [192, 192], trimOffset: [0, 0], occupied: region[0].rect, image: "wolf-whole-e-v01.png", sourceStandingHeight: 64, sourceFile: source.file, sourceRect, sha256: hash(data) });
  }
}
const bytes = page.toBuffer("image/png");
const atlas = {
  selection: { gameplay_id: "G15", source_character: "S13 proportions / wolf base v02" },
  sourceFrames: frames.length,
  reviewStatus: "Whole-body proportion study: oversized head, squat torso, short legs. Right-facing idle and 24 walk drawings only. Walk fails precise pose/contact checks; not production-ready. Other headings and actions are pending.",
  directions: { E: { image: "wolf-whole-e-v01.png", dimensions: [980, 980], sha256: hash(bytes), frames, assessment: "Intact painted animals. Proportions retained; placement, planted paws, camera and row/half-cycle seams need correction. No planned paw target is presented as a measured landmark." } },
  clips: {
    idle: { label: "Still whole-body pose", fps: 1, loop: true, frames: [{ source: 0, durationMs: 1000 }] },
    walk: { label: "Whole-body walk study", fps: 24 / .9, loop: true, frames: Array.from({ length: 24 }, (_, i) => ({ source: i + 1, durationMs: 37.5 })) },
  },
  references: [
    { label: "S13 — dominant exaggerated proportions and drawing style", url: "/art/concepts/images/s13-guarin-isometric-v02.png" },
    { label: "Intact exaggerated wolf v02 — exact animation identity input", url: "/art/sprites/wolf/whole-body/base-wolf-v02.png" },
    { label: "G15 — gritty game palette", url: "/art/concepts/gameplay/images/g15-s13-builtin-night-courtyard-v01.png" },
  ],
  motion: { referenceHeight: 64, walkSpeed: 24 / .9, stride: 24, walkDuration: 900 },
  packing: "Complete painted source cells, fixed page-level registration, untrimmed logical canvases, two transparent pixels per edge, no rotation or parts assembly.",
};
await writeFile(resolve(root, "wolf-whole-e-v01.png"), bytes);
await writeFile(resolve(root, "atlas.json"), JSON.stringify(atlas, null, 2) + "\n");
await writeFile(resolve(root, "registration.json"), JSON.stringify(registration, null, 2) + "\n");
console.log(JSON.stringify({ sourceFrames: frames.length, directions: ["E"], clips: ["idle", "walk"], visualStatus: "motion-revision-required" }));
