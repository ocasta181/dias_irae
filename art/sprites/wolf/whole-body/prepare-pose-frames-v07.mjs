import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { stickWolfAtlas } from "../../guarin/viewer/stick-wolf.mjs";

const require = createRequire(import.meta.url);
const { createCanvas, loadImage } = require(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
const root = dirname(fileURLToPath(import.meta.url)), output = resolve(root, "walk-v07");
const crop = [32, 56, 128, 128], scale = 6;
const vectors = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SW: [-1, 1], W: [-1, 0], NW: [-1, -1] };
const views = { N: "rear view facing straight away toward the top", NE: "rear three-quarter view facing upper right", E: "right-facing profile", SE: "front three-quarter view facing lower right", S: "front view facing toward the viewer at the bottom", SW: "front three-quarter view facing lower left", W: "left-facing profile", NW: "rear three-quarter view facing upper left" };
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const planBytes = await readFile(resolve(root, "walk-v06/targets.json")), plan = JSON.parse(planBytes);
const atlas = stickWolfAtlas(plan, []);
const canonicalPath = resolve(root, "walk-v06/canonical-canvas.png"), originalPath = resolve(root, "base-wolf-v02.png");
await mkdir(resolve(output, "guides"), { recursive: true });
await mkdir(resolve(output, "requests"), { recursive: true });
const identity = createCanvas(768, 768), identityContext = identity.getContext("2d");
identityContext.fillStyle = "white"; identityContext.fillRect(0, 0, 768, 768);
identityContext.drawImage(await loadImage(await readFile(canonicalPath)), crop[0] * scale, crop[1] * scale, crop[2] * scale, crop[3] * scale, 0, 0, 768, 768);
const identityBytes = identity.toBuffer("image/png"), identityPath = resolve(output, "canonical-crop.png");
await writeFile(identityPath, identityBytes);
const manifest = {
  status: "controls prepared; painted frames require generation and measured QA",
  decision: { commit: "a0231492668b576e3e76b07974f445efd18e79cd", confidence: .95, method: "User-requested per-stick-pose whole-body rendering through still image_edit. The blocked video workflow stays stopped; privacy settings stay unchanged." },
  approval: { subject: "wolf stick motion", commit: "24c570a", date: "2026-10-06" },
  planSha256: hash(planBytes), identity: { source: originalPath, sourceSha256: hash(await readFile(originalPath)), canonical: canonicalPath, canonicalSha256: hash(await readFile(canonicalPath)), crop: identityPath, cropSha256: hash(identityBytes), cropLogicalRect: crop, pixelsPerLogicalUnit: scale, transformation: "one fixed whole-image crop and white alpha backing; no body-part manipulation" },
  fps: 12, cycleMs: 1000, stride: 36, root: [96, 156], logicalSize: [192, 192], outputSheets: 8, uniquePaintedFramesRequired: 96, idle: "Held alias of walk pose 01, exactly as in the approved stick lab; no extra distinct idle drawing.", directions: {},
};
for (const [direction, page] of Object.entries(atlas.directions)) {
  const vector = vectors[direction], length = Math.hypot(...vector), [x, y] = vector.map(value => value / length);
  const project = (forward, lateral, height) => [96 + x * forward - y * lateral, 156 + Math.SQRT1_2 * (y * forward + x * lateral - height)];
  const sheet = createCanvas(4 * 384, 3 * 384), sheetContext = sheet.getContext("2d"), records = [];
  for (const [index, frame] of page.frames.entries()) {
    const id = `${direction}-walk-v07-${String(index + 1).padStart(2, "0")}`, source = plan.poses[index];
    const canvas = createCanvas(768, 768), context = canvas.getContext("2d");
    context.fillStyle = "white"; context.fillRect(0, 0, 768, 768); context.scale(scale, scale); context.translate(-crop[0], -crop[1]);
    context.strokeStyle = "black"; context.lineWidth = 1.4; context.lineCap = "round"; context.lineJoin = "round";
    for (const points of frame.lines) { context.beginPath(); context.moveTo(...points[0]); for (const point of points.slice(1)) context.lineTo(...point); context.stroke(); }
    const guidePath = resolve(output, `guides/${id}.png`), guideBytes = canvas.toBuffer("image/png");
    await writeFile(guidePath, guideBytes);
    sheetContext.drawImage(canvas, index % 4 * 384, Math.floor(index / 4) * 384, 384, 384);
    const feet = Object.fromEntries(Object.entries(source.feet).map(([limb, foot]) => [limb, { planted: foot.planted, lift: foot.lift, points: foot.local.map(([forward, height]) => project(forward, limb.startsWith("L") ? -8 : 8, height)) }]));
    const rows = Object.entries(feet).map(([limb, foot]) => `${limb} ${foot.planted ? "planted" : "swing"}: ${foot.points.map(point => `(${(point[0] - crop[0]).toFixed(2)},${(point[1] - crop[1]).toFixed(2)})`).join(" -> ")}`).join("\n");
    const nose = frame.lines[2].at(-1).map((value, axis) => value - crop[axis]);
    const prompt = `Render ONE whole-body wolf matching image 1's exact enormous head, tiny squat torso, short thick legs, tiny weary eyes, grey-brown markings and rough flat dry-painted 2D game style, in ${views[direction]}, at the same elevated 45-degree orthographic game camera. Image 2 is the approved pose: keep the head/torso/tail on its fixed lines and place each paw exactly at its line endpoint, with natural canine shoulder-elbow-carpus-paw and hip-stifle-hock-paw anatomy, one connected animal rather than separate pieces. Maintain this matching square canvas and scale; nose anchor is (${nose.map(value => value.toFixed(2)).join(",")}) and invisible ground root is (64,100) in a 128-square coordinate system; preserve the upper-body registration, coat texture and proportions while changing only the view and limb pose required by the guide. The figure stays fully inside the canvas on uniform solid #00ff00 with no ground shadow, diagram strokes, text, realistic long legs, big cartoon eyes, 3D rendering or glossy volume shading. This is pose ${index + 1}/12, midpoint ${(source.phase).toFixed(6)}, held for 83.333 ms; match the following anatomical joint rows in the crop's logical coordinates (four points per leg, hip/shoulder first and paw last):\n${rows}`;
    const request = { tool: "image_edit", prompt, image: [identityPath, guidePath], aspect_ratio: "1:1" };
    const requestPath = resolve(output, `requests/${id}.json`);
    await writeFile(requestPath, JSON.stringify(request, null, 2) + "\n");
    await writeFile(resolve(output, `requests/${id}.txt`), `Call native image_edit exactly once with the following exact arguments. Do not generate another image, call video, use prior sessions or images, or change privacy. Return the actual image path and stop.\n${JSON.stringify(request, null, 2)}\n`);
    records.push({ id, status: "pending", phase: source.phase, durationMs: source.durationMs, guide: guidePath, guideSha256: hash(guideBytes), request: requestPath, guideLines: frame.lines, feet, intendedOutput: `frames/${id}.png` });
  }
  await writeFile(resolve(output, `guides/${direction}-walk-sheet.png`), sheet.toBuffer("image/png"));
  manifest.directions[direction] = { expectedSheet: `sheets/wolf-${direction.toLowerCase()}-walk.png`, frames: records };
}
await writeFile(resolve(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({ directions: 8, posesPerDirection: 12, frames: 96, guides: 96, paintedFramesGenerated: 0, privacyChanged: false }));
