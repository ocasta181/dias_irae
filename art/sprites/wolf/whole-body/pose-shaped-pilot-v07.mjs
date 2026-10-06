import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url), { createCanvas, loadImage } = require(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
const root = new URL("walk-v07/", import.meta.url), manifest = JSON.parse(await readFile(new URL("manifest.json", root)));
const grey = process.argv.includes("v03"), corrected = grey || process.argv.includes("v02"), suffix = grey ? "-v03" : corrected ? "-v02" : "";
const index = Number(process.argv.find(value => /^pose=\d+$/.test(value))?.split("=")[1] ?? 1) - 1;
const pose = manifest.directions.E.frames[index], crop = manifest.identity.cropLogicalRect, scale = 6;
const canvas = createCanvas(768, 768), context = canvas.getContext("2d");
context.fillStyle = "#00ff00"; context.fillRect(0, 0, 768, 768);
context.drawImage(await loadImage(await readFile(manifest.identity.canonical)), crop[0] * scale, crop[1] * scale, 768, 768, 0, 0, 768, 768);
context.fillRect(0, 84 * scale, 768, 768 - 84 * scale);
context.save(); context.scale(scale, scale); context.translate(-crop[0], -crop[1]);
context.beginPath(); context.rect(crop[0], crop[1] + 84, 128, 44); context.clip();
context.fillStyle = corrected ? "#756a5b" : "black"; context.strokeStyle = "black"; context.lineCap = "round"; context.lineJoin = "round";
if (corrected) {
  context.beginPath(); for (const [index, point] of [[80,136],[75,135],[68,139],[60,147],[57,151],[61,150],[60,153],[66,149],[72,148],[81,143]].entries()) { if (index) context.lineTo(...point); else context.moveTo(...point); } context.closePath(); context.fill();
} else { context.beginPath(); context.moveTo(...pose.guideLines[0][0]); context.lineTo(...pose.guideLines[0][1]); context.lineWidth = 8; context.stroke(); }
context.beginPath(); context.ellipse(96, pose.guideLines[1][0][1], 24, 12, 0, 0, Math.PI * 2); context.fill();
context.fillStyle = grey ? "#756a5b" : "black";
context.strokeStyle = grey ? "#756a5b" : "black";
for (const [id, foot] of Object.entries(pose.feet)) {
  if (corrected && id.startsWith("L")) continue;
  const points = foot.points;
  for (let index = 1; index < points.length; index++) {
    const end = index === 3 ? [points[3][0], points[3][1] - 2] : points[index];
    context.beginPath(); context.moveTo(...points[index - 1]); context.lineTo(...end); context.lineWidth = index === 1 ? 6 : index === 2 ? 4.5 : 3; context.stroke();
  }
  if (corrected) { context.beginPath(); context.ellipse(points[3][0], points[3][1] - 2, 3.5, 2, 0, 0, Math.PI * 2); context.fill(); }
  else context.fillRect(points[3][0] - 3.5, points[3][1] - 4, 7, 4);
}
context.restore();
if (grey) {
  context.strokeStyle = "#00ffff"; context.lineWidth = 3;
  for (const id of ["RH", "RF"]) { const q = pose.feet[id].points[3], x = (q[0] - crop[0]) * scale, y = (q[1] - crop[1]) * scale; context.beginPath(); context.moveTo(x - 7, y); context.lineTo(x + 7, y); context.moveTo(x, y - 7); context.lineTo(x, y + 7); context.stroke(); }
}
const bytes = canvas.toBuffer("image/png"), target = new URL(`${pose.id}-scaffold${suffix}.png`, root);
await writeFile(target, bytes);
const prompt = "Finish the incomplete wolf in this single pose-shaped edit target: paint the black lower-body/leg/paw silhouette regions with the same rough grey-brown fur and paw/claw detail as its already-painted upper body. Keep the silhouette's exact leg positions and paw underside endpoints, especially the stretched-back near hindpaw; preserve the complete upper-body pixels, huge head, tiny squat torso, tiny tired eyes, ears, muzzle, camera, scale and square-canvas placement. Blend every limb naturally into one complete intact animal, leaving a perfectly uniform #00ff00 background and no shadow, black placeholder, guide, label, extra limb, 3D shading or realistic long legs. This is flat gritty dry-painted 2D game sprite art, not a parts kit; preserve the posed outline while finishing its surfaces.";
const request = { tool: "image_edit", image: [fileURLToPath(target)], prompt, aspect_ratio: "1:1" };
await writeFile(new URL(`requests/${pose.id}-scaffold${suffix}.json`, root), JSON.stringify(request, null, 2) + "\n");
await writeFile(new URL(`requests/${pose.id}-scaffold${suffix}.txt`, root), "Call native image_edit exactly once with these exact arguments. The one input is a newly composed authoring scaffold from the original canonical wolf and approved geometry, not a failed generated wolf. Use no other image, history or video tool; do not change privacy. Return the actual output path and stop.\n" + JSON.stringify(request, null, 2) + "\n");
await writeFile(new URL(`${pose.id}-scaffold${suffix}-record.json`, root), JSON.stringify({ source: manifest.identity.canonical, sourceSha256: manifest.identity.canonicalSha256, pose: pose.id, sourceGuideSha256: pose.guideSha256, outputSha256: createHash("sha256").update(bytes).digest("hex"), role: "one registered pose-shaped edit target; original upper-body pixels plus provisional lower-body ink; not final art", privacyChanged: false, failedOutputInputs: false }, null, 2) + "\n");
