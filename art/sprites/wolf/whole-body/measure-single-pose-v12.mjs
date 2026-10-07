import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { createHash } from "node:crypto";
const require = createRequire(import.meta.url), canvasModule = process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas";
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve(canvasModule))] }));
const root = new URL("single-pose-v12/", import.meta.url), variant = process.argv[2] || "v02";
const annotation = JSON.parse(await readFile(new URL(`observations-${variant}-draft.json`, root)));
const plan = JSON.parse(await readFile(new URL("walk-v06/targets.json", import.meta.url))).poses[5];
const bytes = await readFile(new URL(`raw/E-06-${variant}.png`, root));
const { data, info } = await sharp(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const scale = 128 / info.width, logical = p => [32 + p[0] * scale, 56 + p[1] * scale];
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const observations = {};
for (const [id, box] of Object.entries(annotation.regions)) {
  const [left, top, width, height] = box, seed = annotation.seeds[id], samples = [];
  for (const threshold of [192, 128]) {
    const seen = new Set(), pending = [seed];
    while (pending.length) {
      const [x, y] = pending.pop(), key = y * info.width + x;
      if (x < left || x >= left + width || y < top || y >= top + height || seen.has(key) || data[key * 4 + 3] < threshold) continue;
      seen.add(key); pending.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
    }
    if (!seen.size) throw new Error("Manual sole seed misses the identified paw: " + id);
    const boundary = new Map();
    for (const key of seen) { const x = key % info.width, y = Math.floor(key / info.width); boundary.set(x, Math.max(boundary.get(x) ?? -1, y)); }
    const bottom = Math.max(...boundary.values());
    for (const band of [0, 4, 8, 16]) {
      const xs = [...boundary].filter(([, y]) => y >= bottom - band).map(([x]) => x);
      const x = (Math.min(...xs) + Math.max(...xs)) / 2, y = band === 0 ? bottom : (boundary.get(Math.floor(x)) + boundary.get(Math.ceil(x))) / 2;
      const raw = [x + .5, y + .5]; samples.push({ threshold, bandRawPx: band, raw, logical: logical(raw) });
    }
  }
  const primary = samples[0].logical, uncertainty = 1.5 * scale + Math.max(...samples.map(s => distance(s.logical, primary)));
  const verticalUncertainty = 1.5 * scale + Math.max(...samples.map(s => Math.abs(s.logical[1] - primary[1])));
  const foot = plan.feet[id], error = distance(primary, foot.points[3]);
  const holdError = foot.planted ? Math.max(...[5 / 12, 6 / 12].map(t => distance([36 * t + primary[0] - 96, primary[1] - 156], foot.worldContact))) : null;
  const clearance = foot.planted ? null : 156 + Math.SQRT1_2 * 8 - primary[1];
  observations[id] = { region: box, seed, role: annotation.roles[id], samples, measured: primary, target: foot.points[3], error, uncertainty, verticalUncertainty, uncertaintyMethod: "Maximum alpha/connected-sole-band sensitivity plus half-pixel sampling and one raw-pixel annotation allowance.", holdError, clearance, positionalPass: foot.planted ? holdError + uncertainty <= 3 : error + uncertainty <= 1.5, clearancePass: foot.planted ? null : clearance > verticalUncertainty };
}
const noseError = annotation.nose ? distance(annotation.nose.logical, [144, 126]) : null;
const bounds = annotation.nose?.independentEnvelope;
const noseUncertainty = bounds ? Math.hypot(Math.max(...bounds.x.map(x => Math.abs(x - annotation.nose.raw[0]))), Math.max(...bounds.y.map(y => Math.abs(y - annotation.nose.raw[1])))) * scale + .5 * scale : 1.5 * scale;
const report = { sourceSha256: createHash("sha256").update(bytes).digest("hex"), registration: { scale, offset: [32, 56], fitted: false }, topology: "Independent categorical review required; this code does not identify limbs.", observations, pawsPass: Object.values(observations).every(o => o.positionalPass && o.clearancePass !== false), nose: { ...annotation.nose, target: [144, 126], error: noseError, uncertainty: noseUncertainty, pass: noseError !== null && noseError + noseUncertainty <= 1.5 }, status: "Measurements only; style/topology and visible bend review remain separate. No automatic complete-pose acceptance." };
await writeFile(new URL(`measurements-${variant}.json`, root), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ pawsPass: report.pawsPass, paws: Object.fromEntries(Object.entries(observations).map(([id, o]) => [id, { measured: o.measured, error: o.error, uncertainty: o.uncertainty, holdError: o.holdError, clearance: o.clearance, positionalPass: o.positionalPass, clearancePass: o.clearancePass }])), nose: report.nose }));
