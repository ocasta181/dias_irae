import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { joint, project } from "../motion.mjs";

const require = createRequire(import.meta.url);
const { createCanvas } = require(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
const root = new URL("walk-v11/", import.meta.url);
const approved = JSON.parse(await readFile(new URL("walk-v06/targets.json", import.meta.url)));
const identity = JSON.parse(await readFile(new URL("walk-v07/manifest.json", import.meta.url))).identity;
for (const folder of ["controls", "requests", "raw", "frames", "sheets"]) await mkdir(new URL(folder + "/", root), { recursive: true });

export function wholeBodyPose(pose) {
  const turn = Math.PI * 2 * pose.phase;
  const shift = .5 * Math.sin(turn), tilt = .9 * Math.sin(2 * turn), lateral = .6 * Math.sin(turn);
  const hip = [-16 + shift, 22 - tilt], shoulder = [16 + shift, 22 + tilt];
  const head = [26 + .4 * Math.sin(turn - Math.PI / 6), 40 + .65 * Math.sin(2 * turn - Math.PI / 6)];
  const muzzle = [48 + .4 * Math.sin(turn - Math.PI / 6), 42.42640687119285 + .45 * Math.sin(2 * turn - Math.PI / 3)];
  const tail = [-35, 9 + .6 * Math.sin(2 * turn - Math.PI / 4)];
  const feet = Object.fromEntries(Object.entries(pose.feet).map(([id, foot]) => {
    const fore = id.endsWith("F"), attach = fore ? shoulder : hip;
    const side = id.startsWith("L") ? -8 : 8;
    const bend = joint(attach, foot.local[2], fore ? -1 : 1, fore ? 11 : 12, fore ? 12 : 13);
    const points = [project("E", attach[0], side + lateral, attach[1]), project("E", bend[0], side, bend[1]), foot.points[2], foot.points[3]];
    return [id, { planted: foot.planted, points, local: [attach, bend, foot.local[2], foot.local[3]], lateral: side }];
  }));
  const spine = [project("E", ...[hip[0], lateral, hip[1]]), project("E", ...[shoulder[0], lateral, shoulder[1]])];
  const headPoint = project("E", head[0], lateral, head[1]), muzzlePoint = project("E", muzzle[0], lateral, muzzle[1]);
  const tailPoint = project("E", tail[0], lateral + .8 * Math.sin(turn - Math.PI / 4), tail[1]);
  return { id: pose.id.replace("v06", "v11"), phase: pose.phase, durationMs: pose.durationMs, root: pose.root, hip, shoulder, head, muzzle, tail, lateral, feet,
    guideLines: [[tailPoint, spine[0]], spine, [spine[1], headPoint, muzzlePoint], ...Object.entries(feet).map(([id, foot]) => [id.endsWith("F") ? spine[1] : spine[0], foot.points[1], foot.points[3]])] };
}

const poses = approved.poses.map(wholeBodyPose);
const silhouette = createCanvas(2048, 1536), stick = createCanvas(2048, 1536);
const c = silhouette.getContext("2d"), g = stick.getContext("2d");
c.fillStyle = "#00ff00"; c.fillRect(0, 0, 2048, 1536);
g.fillStyle = "white"; g.fillRect(0, 0, 2048, 1536);
for (const [index, pose] of poses.entries()) {
  const left = index % 4 * 512, top = Math.floor(index / 4) * 512;
  c.save(); c.translate(left, top); c.scale(4, 4); c.translate(-32, -56);
  c.fillStyle = "#756a5b"; c.strokeStyle = "#756a5b"; c.lineCap = "round"; c.lineJoin = "round";
  const ellipse = (x, y, rx, ry, angle = 0) => { c.beginPath(); c.ellipse(x, y, rx, ry, angle, 0, Math.PI * 2); c.fill(); };
  const leg = id => {
    const points = pose.feet[id].points;
    for (let j = 1; j < 4; j++) { c.lineWidth = j === 1 ? 6 : j === 2 ? 4.5 : 3; c.beginPath(); c.moveTo(...points[j - 1]); c.lineTo(...(j === 3 ? [points[3][0], points[3][1] - 2] : points[j])); c.stroke(); }
    ellipse(points[3][0], points[3][1] - 2, 3.5, 2);
  };
  ["LH", "LF"].forEach(leg);
  const [tail, hip] = pose.guideLines[0], shoulder = pose.guideLines[1][1];
  c.lineWidth = 6; c.beginPath(); c.moveTo(...hip); c.lineTo(...tail); c.stroke();
  ellipse((hip[0] + shoulder[0]) / 2, (hip[1] + shoulder[1]) / 2 - 3, 25, 11, Math.atan2(shoulder[1] - hip[1], shoulder[0] - hip[0]));
  const centre = project("E", pose.head[0], pose.lateral, pose.head[1] + 8);
  ellipse(...centre, 22, 23);
  for (const side of [-14, 14]) { const ear = project("E", 20 + pose.head[0] - 26, side + pose.lateral, 74 + pose.head[1] - 40), tip = project("E", 17 + pose.head[0] - 26, side + pose.lateral, 90 + pose.head[1] - 40); c.beginPath(); c.moveTo(ear[0] - 5, ear[1] + 7); c.lineTo(...tip); c.lineTo(ear[0] + 5, ear[1] + 7); c.closePath(); c.fill(); }
  ellipse(...pose.guideLines[2][2], 8, 7);
  ["RH", "RF"].forEach(leg);
  c.restore();
  c.strokeStyle = "black"; c.lineWidth = 4; c.strokeRect(left + 2, top + 2, 508, 508);
  g.save(); g.translate(left, top); g.scale(4, 4); g.translate(-32, -56); g.lineWidth = 1.4; g.strokeStyle = "black"; g.lineJoin = "round"; g.lineCap = "round";
  for (const line of pose.guideLines) { g.beginPath(); g.moveTo(...line[0]); for (const point of line.slice(1)) g.lineTo(...point); g.stroke(); }
  g.restore();
}
const silhouettePath = new URL("controls/E-whole-cycle.png", root), stickPath = new URL("controls/E-stick-cycle.png", root);
await writeFile(silhouettePath, silhouette.toBuffer("image/png")); await writeFile(stickPath, stick.toBuffer("image/png"));
const xy = point => `(${(point[0] - 32).toFixed(2)},${(point[1] - 56).toFixed(2)})`;
const table = poses.map((pose, i) => `FRAME ${i + 1}, row ${Math.floor(i / 4) + 1} column ${i % 4 + 1}; hold 83.333 ms. Hip→shoulder ${pose.guideLines[1].map(xy).join("→")}; shoulder→neck/head→nose ${pose.guideLines[2].map(xy).join("→")}.\n` + Object.entries(pose.feet).map(([id, foot]) => `${id} ${foot.planted ? "STANCE" : "SWING"}: ${foot.points.map(xy).join("→")}`).join("\n")).join("\n\n");
const prompt = `Asset: ONE COMPLETE 12-DRAWING WALK CYCLE, not a concept sheet. Exactly four columns by three rows; 12 square cells in chronological row-major order. All twelve intact wolves face screen RIGHT, from a fixed 45-degree elevated orthographic camera. Flat gritty hand-drawn 2D game paint, no 3D, tiny squat body and short thick legs under a disproportionately huge broad head. Image 1 is the ORIGINAL wolf identity and fur/style basis ONLY. Image 2 is a fresh whole-body pose/volume control; image 3 is its fresh skeleton. Copy geometry/registration from controls, not the standing pose from image1. No failed animation is provided.\nDraw a single organically connected animal in EVERY frame. The body moves as one coordinated animal: shoulder/chest roll and compression with the planted foreleg, haunch rotation and abdomen deformation with the hind step, attached neck/head counter-movement, short tail response, ruff and fur tufts following the bending masses. DO NOT freeze/copy the head, back or torso while changing only the legs. DO NOT create separate body parts or a paper-puppet rig. Preserve the same head/body VOLUMES and stable grey-brown coat patches while their pose changes; dirt/fur pattern must follow the skin, never random flickering redraws. Body/head excursions in the numerical controls are intentionally under 1.3 logical units; keep the walk restrained and grounded, not bouncing/flailing.\nThe 12 poses describe ONE calm four-beat walk over ONE second, not repeated generic walk keys. Every planted paw retreats exactly 3 logical units per sampled frame relative to the fixed body root, matching 36 logical units/second ground travel. Each swing travels backward→raised passing→forward landing in its own anatomical lane. Near RH/RF must not swap with far LH/LF. Canine foreleg shoulder-elbow-carpus-paw; hind hip-stifle-hock-paw. The complete loop must close at frame12→1, including head, chest, haunch, neck and coat. Design all12 together so there are no trio-boundary appearance resets.\nMaintain the exact 4×3 square-cell template, full 2048×1536 canvas with black dividers and pure #00ff00 background, no cast shadow. Each cell is128×128 logical units. Coordinates below are local within each cell; a paw coordinate is its underside-edge midpoint. Cell crop is the same for all12; no individual zoom/recenter, no viewpoint changes, no missing/extra figures. Remove all guide lines from the finished animals, retain cell borders for deterministic extraction. No lettering, no props, no ground, no captions.\n${table}`;
const args = { prompt, referenced_image_paths: [identity.crop, fileURLToPath(silhouettePath), fileURLToPath(stickPath)], transparent_background: false };
await writeFile(new URL("requests/E-whole-cycle.json", root), JSON.stringify(args, null, 2) + "\n");
await writeFile(new URL("targets.json", root), JSON.stringify({ status: "pilot hypothesis; not user-approved or measured artwork", decision: { commit: "47b697d", confidence: .98 }, identity: { path: identity.crop, sha256: createHash("sha256").update(await readFile(identity.crop)).digest("hex") }, fps: 12, cycleMs: 1000, stride: 36, root: [96, 156], logicalSize: [192, 192], bodyMotion: "Coordinated deformation is drawn inside each complete bitmap; runtime root remains straight. Approved paw endpoints and support schedule are unchanged.", poses }, null, 2) + "\n");
console.log("Prepared one complete twelve-frame whole-body E pilot from original-only identity and fresh controls.");
