import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "../source-parts.mjs";
import { project, paw, joint, limbs, stride, walkDuration, origin } from "../motion.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const colors = { LF: "#2b7ba0", RF: "#c56227", LH: "#634bac", RH: "#b0375c" };

export function wolfPose(phase, walking = true) {
  const feet = {};
  for (const [id, limb] of Object.entries(limbs)) {
    const step = walking ? paw(phase, limb) : { forward: limb.base, lift: 0, planted: true };
    const fore = id.endsWith("F"), hip = [limb.base, 32];
    const lower = [step.forward - (fore ? 2 : 6), step.lift + (fore ? 7 : 9)];
    const knee = joint(hip, lower, fore ? -1 : 1, fore ? 16 : 17, fore ? 17 : 18);
    const local = [hip, knee, lower, [step.forward, step.lift]];
    feet[id] = { planted: step.planted, local, points: local.map(([forward, height]) => project("E", forward, limb.lateral, height)) };
  }
  return { direction: "E", phase, origin, rootForward: walking ? stride * phase : 0, feet, head: project("E", 35, 0, 52), body: project("E", 0, 0, 32) };
}

function drawGuide(context, pose, label) {
  context.fillStyle = "#f1ede3"; context.fillRect(0, 0, 192, 192);
  context.strokeStyle = "#bdb8ae"; context.lineWidth = .5;
  context.strokeRect(0, 0, 192, 192);
  context.font = "8px sans-serif"; context.fillStyle = "#2c2b28"; context.fillText(label, 5, 11);
  context.fillText("E / 45° / root 96,156", 5, 22);
  context.strokeStyle = "#959089"; context.lineWidth = 1;
  context.beginPath(); context.ellipse(...pose.body, 39, 19, 0, 0, Math.PI * 2); context.stroke();
  context.beginPath(); context.ellipse(...pose.head, 22, 22, 0, 0, Math.PI * 2); context.stroke();
  const shoulder = project("E", 25, 0, 32), neck = project("E", 30, 0, 43), nose = project("E", 60, 0, 47);
  context.beginPath(); context.moveTo(...shoulder); context.lineTo(...neck); context.lineTo(...pose.head); context.lineTo(...nose); context.stroke();
  context.beginPath(); context.moveTo(...project("E", -25, 0, 32)); context.lineTo(...project("E", -43, 0, 24)); context.lineTo(...project("E", -51, 0, 13)); context.stroke();
  context.strokeStyle = "#b69a40";
  context.beginPath(); context.moveTo(92, 156); context.lineTo(100, 156); context.moveTo(96, 152); context.lineTo(96, 160); context.stroke();
  for (const [id, foot] of Object.entries(pose.feet)) {
    context.strokeStyle = colors[id]; context.fillStyle = colors[id]; context.lineWidth = 1.7;
    context.setLineDash(id[0] === "L" ? [2, 1] : []);
    context.beginPath(); context.moveTo(...foot.points[0]); for (const point of foot.points.slice(1)) context.lineTo(...point); context.stroke();
    context.setLineDash([]);
    for (const point of foot.points) { context.beginPath(); context.arc(...point, 1.6, 0, Math.PI * 2); context.fill(); }
    const [x, y] = foot.points.at(-1);
    context.strokeRect(x - 2, y - 1, 4, 2);
    context.fillText(`${id} ${foot.planted ? "plant" : "lift"}`, x - 10, y + (id[0] === "L" ? -5 : 10));
  }
}

async function saveGuide(name, poses, columns, rows) {
  const canvas = createCanvas(columns * 768, rows * 768), context = canvas.getContext("2d");
  for (const [index, pose] of poses.entries()) {
    context.save(); context.translate(index % columns * 768, Math.floor(index / columns) * 768); context.scale(4, 4);
    drawGuide(context, pose, pose.id); context.restore();
  }
  await writeFile(resolve(root, "guides", name + ".png"), canvas.toBuffer("image/png"));
  await writeFile(resolve(root, "guides", name + ".json"), JSON.stringify(poses, null, 2) + "\n");
}

await mkdir(resolve(root, "guides"), { recursive: true });
await saveGuide("e-neutral", [{ id: "E-neutral", ...wolfPose(0, false) }], 1, 1);
const poses = Array.from({ length: 24 }, (_, index) => ({ id: `E-walk-${index + 1}`, startMs: index * 37.5, durationMs: 37.5, ...wolfPose((index + .5) / 24) }));
await saveGuide("e-walk-01-12", poses.slice(0, 12), 4, 3);
await saveGuide("e-walk-13-24", poses.slice(12), 4, 3);
console.log(JSON.stringify({ poses: 24, stride, walkDuration, guideMethod: "whole-body canine skeleton with shoulder/elbow/carpus and hip/stifle/hock, not painted parts" }));
