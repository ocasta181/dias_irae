import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
const require = createRequire(import.meta.url), canvasModule = process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas";
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve(canvasModule))] }));
const root = new URL("single-pose-v12/", import.meta.url);
const variant = process.argv[2] || "", suffix = variant ? "-" + variant : "";
const target = JSON.parse(await readFile(new URL(`targets${suffix}.json`, root)));
const approved = JSON.parse(await readFile(new URL("walk-v07/manifest.json", import.meta.url))).directions.E.frames[5];
assert.deepEqual(target.feet, approved.feet); assert.deepEqual(target.publicGuide, approved.guideLines);
for (const reference of target.references) assert.equal(createHash("sha256").update(await readFile(reference.path)).digest("hex"), reference.sha256);
const { data, info } = await sharp(await readFile(new URL(`controls/E-06-contour${suffix}.png`, root))).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
assert.equal(info.width, 1024); assert.equal(info.height, 1024);
const observations = {};
for (const [id, foot] of Object.entries(target.feet)) {
  const [px, py] = foot.points[3], centre = [(px - 32) * 8, (py - 56) * 8];
  const rows = [];
  for (let y = Math.floor(centre[1] - 8); y <= Math.ceil(centre[1] + 8); y++) for (let x = Math.ceil(centre[0] - 16); x <= Math.floor(centre[0] + 16); x++) if (data[(y * 1024 + x) * 4] < 230) rows.push([x, y]);
  const bottom = Math.max(...rows.map(p => p[1])), edge = rows.filter(p => p[1] === bottom);
  const measured = [32 + ((Math.min(...edge.map(p => p[0])) + Math.max(...edge.map(p => p[0]))) / 2 + .5) / 8, 56 + (bottom + .5) / 8];
  const error = Math.hypot(measured[0] - px, measured[1] - py);
  observations[id] = { target: [px, py], measured, error, method: "Independent raster bottom-edge midpoint within narrow sole ROI; non-white threshold230; source-pixel centers." };
  assert.ok(error <= .125, `${id} control sole is ${error} logical pixels off target`);
}
let right = -1, ys = [];
for (let y = (122 - 56) * 8; y < (131 - 56) * 8; y++) for (let x = (140 - 32) * 8; x < (146 - 32) * 8; x++) if (data[(y * 1024 + x) * 4] < 230) { if (x > right) { right = x; ys = []; } if (x === right) ys.push(y); }
const nose = [32 + (right + .5) / 8, 56 + ((Math.min(...ys) + Math.max(...ys)) / 2 + .5) / 8], noseError = Math.hypot(nose[0] - 144, nose[1] - 126);
assert.ok(noseError <= .125, "Control nose edge conflicts with numeric tip: " + noseError);
const report = { numericTargetMatch: true, sourceHashesMatch: true, observations, nose: { measured: nose, target: [144, 126], error: noseError }, status: "Raster/lineage preflight passes; independent anatomical/appearance review remains a separate requirement; no painting pass." };
await writeFile(new URL(`control-preflight${suffix}.json`, root), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
