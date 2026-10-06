import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
const require = createRequire(import.meta.url), canvasModule = process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas";
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve(canvasModule))] }));
const root = new URL("walk-v11/", import.meta.url), variant = process.argv[2] || "v02";
const plan = JSON.parse(await readFile(new URL("targets.json", root))), samples = [];
for (let i = 0; i < 12; i++) {
  const id = `E-${String(i + 1).padStart(2, "0")}`;
  const { data, info } = await sharp(await readFile(new URL(`frames/${id}-${variant}.png`, root))).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let right = -1, ys = [];
  for (let y = 113; y <= 139; y++) for (let x = 141; x < 161; x++) if (data[(y * info.width + x) * 4 + 3] >= 192) {
    if (x > right) { right = x; ys = []; } if (x === right) ys.push(y);
  }
  if (right < 0) throw new Error("Missing visible muzzle in inspected ROI: " + id);
  const measured = [right, (Math.min(...ys) + Math.max(...ys)) / 2], target = plan.poses[i].guideLines[2][2];
  samples.push({ frame: id, landmark: "visible muzzle rightmost boundary midpoint", roi: [141, 113, 20, 27], measured, target, error: Math.hypot(measured[0] - target[0], measured[1] - target[1]), uncertaintyPx: 1.5 });
}
const report = { method: "Parent selects visible muzzle ROI independently from rendered pixels; alpha>=192 rightmost boundary with vertical midpoint. This measures a silhouette edge, not a planted contact. No fitting applied.", controlNote: variant === "v01" ? "Filled silhouette extended eight pixels beyond numeric nose; conflicting controls, not a clean provider precision test." : "Versioned filled muzzle now ends at numerical nose tip; approved numeric pose targets unchanged.", samples, maxError: Math.max(...samples.map(x => x.error)), status: "registration/muzzle target fails; no contact pass" };
await writeFile(new URL(`nose-measurements-${variant}.json`, root), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(samples.map(x => ({ frame: x.frame, measured: x.measured, error: Number(x.error.toFixed(2)) }))));
