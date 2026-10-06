import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url);
const canvasModule = process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas";
const { createCanvas, ImageData } = require(canvasModule);
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve(canvasModule))] }));
const root = new URL("walk-v10/", import.meta.url);
const plan = JSON.parse(await readFile(new URL("../walk-v07/manifest.json", root)));
const progress = JSON.parse(await readFile(new URL("progress.json", root)));
await mkdir(new URL("audit/pairs/", root), { recursive: true });
const entries = [];
for (const row of progress.rows) for (const pose of row.poses) {
  const target = plan.directions[row.direction].frames[pose.pose - 1];
  const bytes = await readFile(new URL(pose.image, root));
  const { data, info } = await sharp(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const sprite = createCanvas(192, 192);
  sprite.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(data), info.width, info.height), 0, 0);
  const page = createCanvas(1152, 434), a = page.getContext("2d");
  a.fillStyle = "#e7e4df"; a.fillRect(0, 0, 1152, 434);
  a.fillStyle = "#111"; a.font = "18px sans-serif";
  ["Painted source", "Approved stick pose", "Same-coordinate overlay"].forEach((label, i) => a.fillText(pose.id + " · " + label, i * 384 + 10, 22));
  for (let pane = 0; pane < 3; pane++) {
    a.save(); a.translate(pane * 384, 32); a.scale(2, 2);
    if (pane !== 1) a.drawImage(sprite, 0, 0);
    if (pane !== 0) {
      a.lineWidth = pane === 2 ? 1 : 1.3; a.strokeStyle = pane === 2 ? "#f9f6ed" : "#111";
      a.lineJoin = "round"; a.lineCap = "round";
      for (const line of target.guideLines) { a.beginPath(); a.moveTo(...line[0]); for (const point of line.slice(1)) a.lineTo(...point); a.stroke(); }
    }
    a.restore();
  }
  const supports = Object.entries(target.feet).map(([id, foot]) => `${id}:${foot.planted ? "stance" : "swing"}`).join(" · ");
  a.fillStyle = "#111"; a.font = "14px sans-serif"; a.fillText(`${supports} — guide is planned geometry, not measured artwork`, 12, 428);
  const image = `pairs/${pose.id}.png`;
  await writeFile(new URL("audit/" + image, root), page.toBuffer("image/png"));
  entries.push({ id: pose.id, image, source: "../" + pose.image, sourceSha256: createHash("sha256").update(bytes).digest("hex"), target: target.id, plannedFeet: target.feet });
}
await writeFile(new URL("audit/index.json", root), JSON.stringify({ date: "2026-10-07", scope: "All 96 active whole-body paintings versus approved twelve-pose blocking in each of eight directions", entries }, null, 2) + "\n");
console.log(`Prepared ${entries.length} registered three-pane comparisons.`);
