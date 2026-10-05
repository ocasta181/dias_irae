import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "../source-parts.mjs";
import { project, joint } from "../motion.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const output = resolve(root, "walk-v06");
const count = 12, cycleMs = 1000, stride = 36, stance = 2 / 3;
const limbs = {
  LH: { base: -16, lateral: -8, offset: 0 },
  LF: { base: 16, lateral: -8, offset: .25 },
  RH: { base: -16, lateral: 8, offset: .5 },
  RF: { base: 16, lateral: 8, offset: .75 },
};

function footAt(phase, limb) {
  const relative = phase - limb.offset, step = Math.floor(relative), q = relative - step;
  const reach = stride * stance / 2;
  if (q < stance) return { forward: limb.base + reach - stride * q, lift: 0, planted: true, step, swing: 0 };
  const u = (q - stance) / (1 - stance), u2 = u * u, u3 = u2 * u;
  const tangent = -stride * (1 - stance);
  const forward = (2 * u3 - 3 * u2 + 1) * -reach + (u3 - 2 * u2 + u) * tangent + (-2 * u3 + 3 * u2) * reach + (u3 - u2) * tangent;
  return { forward: limb.base + forward, lift: 5 * Math.sin(Math.PI * u) ** 2, planted: false, step, swing: u };
}

function poseAt(index) {
  const phase = (index + .5) / count, feet = {};
  for (const [id, limb] of Object.entries(limbs)) {
    const foot = footAt(phase, limb), fore = id.endsWith("F");
    const shoulderOrHip = [limb.base, 22];
    const angle = Math.atan2(fore ? 1 : 4, fore ? 5 : 6) + (foot.planted ? 0 : .3 * Math.sin(Math.PI * foot.swing));
    const distalLength = Math.hypot(fore ? 1 : 4, fore ? 5 : 6);
    const carpusOrHock = [foot.forward - distalLength * Math.sin(angle), foot.lift + distalLength * Math.cos(angle)];
    const elbowOrStifle = joint(shoulderOrHip, carpusOrHock, fore ? -1 : 1, fore ? 11 : 12, fore ? 12 : 13);
    const local = [shoulderOrHip, elbowOrStifle, carpusOrHock, [foot.forward, foot.lift]];
    const points = local.map(([forward, height]) => project("E", forward, limb.lateral, height));
    const contact = [limb.base + stride * stance / 2 + stride * (limb.offset + foot.step), Math.SQRT1_2 * limb.lateral];
    if (foot.planted) {
      assert.ok(Math.abs(points[3][0] - 96 + stride * phase - contact[0]) < 1e-8);
      assert.ok(Math.abs(points[3][1] - 156 - contact[1]) < 1e-8);
    }
    feet[id] = { ...foot, local, points, worldContact: foot.planted ? contact : null };
  }
  return { id: `E-walk-v06-${String(index + 1).padStart(2, "0")}`, phase, startMs: index * cycleMs / count, durationMs: cycleMs / count, root: [96, 156], rootForward: stride * phase, head: [122, 127.7157287525381], muzzle: [144, 126], feet };
}

await mkdir(output, { recursive: true });
const poses = Array.from({ length: count }, (_, index) => poseAt(index));
assert.equal(new Set(poses.map(pose => JSON.stringify(Object.values(pose.feet).map(foot => foot.points)))).size, count);
for (const id of Object.keys(limbs)) assert.equal(poses.filter(pose => !pose.feet[id].planted).length, 4);
for (const [id, limb] of Object.entries(limbs)) {
  const a = footAt(0, limb), b = footAt(1, limb);
  assert.ok(Math.abs(a.forward - b.forward) < 1e-8 && Math.abs(a.lift - b.lift) < 1e-8, `${id} must close at the seam`);
}
const sheet = createCanvas(4 * 384, 3 * 384), sheetContext = sheet.getContext("2d");
for (const [index, pose] of poses.entries()) {
  const canvas = createCanvas(1152, 1152), context = canvas.getContext("2d");
  context.scale(6, 6); context.fillStyle = "white"; context.fillRect(0, 0, 192, 192);
  context.strokeStyle = "black"; context.lineWidth = 1.4; context.lineCap = "round"; context.lineJoin = "round";
  const hip = project("E", -16, 0, 22), shoulder = project("E", 16, 0, 22);
  const lines = [[[61, 149.63603896932108], hip], [hip, shoulder], [shoulder, pose.head, pose.muzzle], ...["LH", "LF", "RH", "RF"].map(id => [id.endsWith("H") ? hip : shoulder, pose.feet[id].points[1], pose.feet[id].points[3]])];
  for (const points of lines) { context.beginPath(); context.moveTo(...points[0]); for (const point of points.slice(1)) context.lineTo(...point); context.stroke(); }
  await writeFile(resolve(output, `${pose.id}-guide.png`), canvas.toBuffer("image/png"));
  sheetContext.drawImage(canvas, index % 4 * 384, Math.floor(index / 4) * 384, 384, 384);
}
await writeFile(resolve(output, "guides.png"), sheet.toBuffer("image/png"));
await writeFile(resolve(output, "targets.json"), JSON.stringify({ basis: "planned motion, not measured art", fps: count, cycleMs, stride, walkSpeed: stride * 1000 / cycleMs, stanceFraction: stance, temporalContactErrorPx: stride / (2 * count), anatomy: "LF/RF shoulder-elbow-carpus-paw; LH/RH hip-stifle-hock-paw. Left paws are far-side.", poses }, null, 2) + "\n");
console.log(JSON.stringify({ uniquePlannedPoses: count, fps: count, cycleMs, stride, walkSpeed: stride, swingPosesPerPaw: 4, stanceContactPlan: "pass", seamPlan: "pass", artStatus: "not-generated" }));
