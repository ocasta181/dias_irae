import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "../source-parts.mjs";
import { wolfPose, drawGuide } from "./pose-guides.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const poses = Array.from({ length: 8 }, (_, i) => ({ id: `E-walk-v03-${i + 1}`, startMs: i * 125, durationMs: 125, ...wolfPose((i + .5) / 8, true, { stride: 36, fore: [11, 12], hind: [12, 13] }) }));
for (const first of [0, 4]) {
  const canvas = createCanvas(896, 704), context = canvas.getContext("2d");
  for (let i = 0; i < 4; i++) {
    context.save(); context.translate(i % 2 * 448, Math.floor(i / 2) * 352); context.scale(4, 4);
    context.beginPath(); context.rect(0, 0, 112, 88); context.clip();
    context.translate(-48, -80); drawGuide(context, poses[first + i], ""); context.translate(48, 80);
    context.fillStyle = "#34312b"; context.font = "6px sans-serif"; context.fillText(poses[first + i].id, 2, 8);
    context.restore();
  }
  const name = `e-walk-v03-${first + 1}-${first + 4}`;
  await writeFile(resolve(root, "guides", name + ".png"), canvas.toBuffer("image/png"));
  await writeFile(resolve(root, "guides", name + ".json"), JSON.stringify({ sourceCell: [112, 88], logicalOffset: [48, 80], poses: poses.slice(first, first + 4) }, null, 2) + "\n");
}
console.log(JSON.stringify({ frames: 8, fps: 8, cycleMs: 1000, stride: 36, referenceTravel: 36, intendedDisplayTravel: 54, guideMethod: "four enlarged chronological whole-body skeletons per request" }));
