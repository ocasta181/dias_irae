import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { createCanvas } = require(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
const root = new URL("single-pose-v12/", import.meta.url);
const variant = process.argv[2] || "", suffix = variant ? "-" + variant : "";
const source = JSON.parse(await readFile(new URL("walk-v07/manifest.json", import.meta.url)));
const pose = source.directions.E.frames[5];
const colors = { LH: "#e69f00", LF: "#009e73", RH: "#d81b60", RF: "#1e88e5" };
const roles = { LH: "FAR HIND · stance", LF: "FAR FORE · stance", RH: "NEAR HIND · late swing", RF: "NEAR FORE · early swing" };
for (const dir of ["controls", "requests", "raw", "frames"]) await mkdir(new URL(dir + "/", root), { recursive: true });
const canvas = createCanvas(1024, 1024), c = canvas.getContext("2d");
if (!variant) { c.fillStyle = "white"; c.fillRect(0, 0, 1024, 1024); }
c.save(); c.scale(8, 8); c.translate(-32, -56);
c.lineWidth = .6; c.strokeStyle = "#252525"; c.lineJoin = "round"; c.lineCap = "round";
function farLeg(id) {
  const [a, b, h, p] = pose.feet[id].points, sole = p[1] - .3;
  c.beginPath(); c.moveTo(a[0] - 2.5, a[1]);
  c.bezierCurveTo(a[0] - 3, a[1] + 3, b[0] - 2, b[1] - 2, b[0] - 1.8, b[1]);
  c.lineTo(h[0] - 1.4, h[1] - .3); c.quadraticCurveTo(h[0] - 1.5, h[1] + 1, p[0] - 3.5, sole - 1.5);
  c.quadraticCurveTo(p[0] - 3.5, sole, p[0] - 2.5, sole); c.lineTo(p[0] + 2.5, sole);
  c.quadraticCurveTo(p[0] + 3.5, sole, p[0] + 3.5, sole - 1.5);
  c.quadraticCurveTo(p[0] + 3.2, sole - 3.5, h[0] + 1.7, h[1] - .5);
  c.lineTo(b[0] + 2.4, b[1]); c.quadraticCurveTo(a[0] + 3, a[1] + 3, a[0] + 2.5, a[1]);
  c.closePath(); c.fillStyle = "#c3c3c3"; c.fill(); c.stroke();
}
farLeg("LH"); farLeg("LF");
const rh = pose.feet.RH.points[3], rf = pose.feet.RF.points[3];
const hy = rh[1] - .3, fy = rf[1] - .3;
c.beginPath(); c.moveTo(61, 149.636);
c.bezierCurveTo(62, 141, 66, 138, 71, 134); c.bezierCurveTo(69, 125, 74, 117, 85, 113);
c.quadraticCurveTo(91, 110, 99, 110); c.lineTo(102, 105); c.lineTo(101, 96);
c.quadraticCurveTo(106, 97, 109, 103); c.quadraticCurveTo(115, 101, 119, 98);
c.lineTo(122, 88); c.quadraticCurveTo(127, 96, 127, 105); c.quadraticCurveTo(131, 108, 133, 116);
c.quadraticCurveTo(139, 120, 142, 123); c.quadraticCurveTo(143.1, 125, 143.7, 125.3); c.lineTo(143.7, 126.7);
c.quadraticCurveTo(143.1, 127, 137, 132); c.quadraticCurveTo(131, 137, 127, 139);
c.lineTo(126, 142); c.lineTo(123, 141); c.lineTo(121, 145); c.lineTo(118, 143);
c.quadraticCurveTo(114, 144, 112, 146); c.quadraticCurveTo(109, 148, 105, 152);
c.quadraticCurveTo(102, 155, 102, 158); c.quadraticCurveTo(rf[0] + 3.5, fy - 2.5, rf[0] + 3.5, fy - 1.2);
c.quadraticCurveTo(rf[0] + 3.5, fy, rf[0] + 2.5, fy); c.lineTo(rf[0] - 2.5, fy);
c.quadraticCurveTo(rf[0] - 3.5, fy, rf[0] - 3.5, fy - 1.5);
c.quadraticCurveTo(96.5, 158, 98.5, 155); c.quadraticCurveTo(99, 152, 101, 149);
c.quadraticCurveTo(98, 146, 94, 145); c.quadraticCurveTo(93, 147, 94.5, 149);
c.quadraticCurveTo(91, 153, 89.7, 157); c.quadraticCurveTo(rh[0] + 3.5, hy - 2.5, rh[0] + 3.5, hy - 1.2);
c.quadraticCurveTo(rh[0] + 3.5, hy, rh[0] + 2.5, hy); c.lineTo(rh[0] - 2.5, hy);
c.quadraticCurveTo(rh[0] - 3.5, hy, rh[0] - 3.5, hy - 1.5);
c.quadraticCurveTo(84.5, 157, 85.5, 154); c.quadraticCurveTo(88, 151, 89, 149);
c.quadraticCurveTo(84, 148, 80, 146); c.quadraticCurveTo(74, 144, 72, 140);
c.quadraticCurveTo(68, 145, 61, 149.636); c.closePath(); c.fillStyle = "#d8d8d8"; c.fill(); c.stroke();
function crease(points) { c.beginPath(); c.moveTo(...points[0]); for (const p of points.slice(1)) c.lineTo(...p); c.stroke(); }
c.lineWidth = .65;
c.beginPath(); c.moveTo(77, 133); c.bezierCurveTo(83, 134, 80, 141, 80, 146.100505); c.quadraticCurveTo(87, 146, 91.489808, 148.548393); c.stroke();
c.beginPath(); c.moveTo(113, 136); c.quadraticCurveTo(116, 141, 112, 146.100505); c.quadraticCurveTo(107, 146, 102.206231, 149.641839); c.stroke();
c.beginPath(); c.moveTo(103, 109); c.quadraticCurveTo(99, 121, 109, 136); c.quadraticCurveTo(111, 140, 115, 142); c.stroke();
c.beginPath(); c.moveTo(129, 120); c.lineTo(133, 121); c.stroke();
c.beginPath(); c.moveTo(142.5, 123.5); c.lineTo(143.7, 126); c.lineTo(141, 127.5); c.closePath(); c.fillStyle = "#252525"; c.fill();
c.restore();
const contourPath = new URL(`controls/E-06-contour${suffix}.png`, root), roughPath = new URL(`controls/E-06-rough-alpha${suffix}.png`, root);
if (variant) await writeFile(roughPath, canvas.toBuffer("image/png"));
const diagram = createCanvas(1024, 1024), dc = diagram.getContext("2d"); dc.fillStyle = "white"; dc.fillRect(0, 0, 1024, 1024); dc.drawImage(canvas, 0, 0);
await writeFile(contourPath, diagram.toBuffer("image/png"));
const overlay = createCanvas(1024, 1024), a = overlay.getContext("2d"); a.drawImage(diagram, 0, 0);
a.save(); a.scale(8, 8); a.translate(-32, -56); a.lineWidth = .5; a.lineCap = "round";
for (const id of ["LH", "LF", "RH", "RF"]) {
  const f = pose.feet[id], p = f.points;
  a.strokeStyle = colors[id]; a.setLineDash(id.startsWith("L") ? [1, .7] : []);
  a.beginPath(); a.moveTo(...p[0]); for (const q of p.slice(1, 3)) a.lineTo(...q); a.stroke();
  a.setLineDash([]); a.beginPath(); a.moveTo(...p[2]); a.lineTo(...p[3]); a.stroke();
  a.fillStyle = colors[id]; for (const q of p) { a.beginPath(); a.arc(q[0], q[1], .23, 0, Math.PI * 2); a.fill(); }
  a.setLineDash([]); a.beginPath(); a.moveTo(p[3][0] - 2.5, p[3][1]); a.lineTo(p[3][0] + 2.5, p[3][1]); a.stroke();
}
a.setLineDash([.75, .75]); a.strokeStyle = "#777"; a.lineWidth = .15;
for (const y of [156 - Math.SQRT1_2 * 8, 156 + Math.SQRT1_2 * 8]) { a.beginPath(); a.moveTo(55, y); a.lineTo(131, y); a.stroke(); }
a.setLineDash([]); a.restore();
a.font = "17px sans-serif";
const labelPositions = { LH: [28, 875], LF: [735, 875], RH: [28, 940], RF: [700, 940] };
for (const [id, pos] of Object.entries(labelPositions)) {
  a.fillStyle = colors[id]; a.fillText(id + " " + roles[id], ...pos);
  const p = pose.feet[id].points[3], end = [(p[0] - 32) * 8, (p[1] - 56) * 8];
  a.strokeStyle = colors[id]; a.lineWidth = 1; a.beginPath(); a.moveTo(pos[0] + (id.endsWith("F") ? 0 : 230), pos[1] - 5); a.lineTo(...end); a.stroke();
}
a.fillStyle = "#333"; a.fillText("E06 · complete whole-body contour · right-facing elevated view", 28, 32);
a.fillText("Dashed: hidden far proximal paths. Solid: exposed distal paths and near legs.", 28, 59);
a.fillText("HIP → STIFLE → HOCK → PAW (hind) / SHOULDER → ELBOW → CARPUS → PAW (fore)", 28, 87);
const anatomyPath = new URL(`controls/E-06-anatomy${suffix}.png`, root);
await writeFile(anatomyPath, overlay.toBuffer("image/png"));
const originals = [source.identity.crop, fileURLToPath(new URL("../../../concepts/images/s13-guarin-isometric-v02.png", import.meta.url)), fileURLToPath(new URL("../../../concepts/gameplay/images/g15-s13-builtin-night-courtyard-v01.png", import.meta.url))];
const refs = [fileURLToPath(variant ? roughPath : contourPath), fileURLToPath(anatomyPath), ...originals];
await writeFile(new URL(`targets${suffix}.json`, root), JSON.stringify({ status: "control candidate; not painted or preflight-approved", decision: { model: "gpt-6-astra", reasoning: "max", commit: "159403a", method: variant ? "B: finish one verified transparent whole cel in place" : "A: single anatomical contour to paint", confidence: .95 }, pose: 6, source: "../walk-v07/manifest.json", crop: [32, 56, 128, 128], logicalSize: [192, 192], root: [96, 156], feet: pose.feet, publicGuide: pose.guideLines, privateGuidePolicy: "Full side-specific four-joint paths; approved public guide unchanged. Far upper segments are explanatory dashed paths; final sprite remains opaque.", references: await Promise.all(refs.map(async path => ({ path, sha256: createHash("sha256").update(await readFile(path)).digest("hex") }))) }, null, 2) + "\n");
console.log("Prepared one fresh E06 anatomical contour and ownership guide; no painting request yet.");
