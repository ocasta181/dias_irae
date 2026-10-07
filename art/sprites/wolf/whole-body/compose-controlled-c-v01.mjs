import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url), canvasModule = process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas";
const sharp = require(require.resolve("sharp", { paths: [dirname(require.resolve(canvasModule))] }));
const root = new URL("single-pose-v12/controlled-c-v01/", import.meta.url), sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Supply the returned ORIGINAL material image path.");
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const masterRecord = JSON.parse(await readFile(new URL("master/record.json", root)));
const masterBytes = await readFile(masterRecord.masterPath), inkBytes = await readFile(masterRecord.inkPath);
if (hash(masterBytes) !== masterRecord.masterSha256 || hash(inkBytes) !== masterRecord.inkSha256) throw new Error("Frozen master/ink changed before composition.");
const original = await readFile(sourcePath), meta = await sharp(original).metadata();
await writeFile(new URL("raw/E-06-material-v01.png", root), original);
if (meta.width !== meta.height) throw new Error("Material square registration fails; bytes retained.");
const [master, ink, material] = await Promise.all([sharp(masterBytes).ensureAlpha().raw().toBuffer(), sharp(inkBytes).ensureAlpha().raw().toBuffer(), sharp(original).removeAlpha().resize(1024, 1024, { kernel: "lanczos3" }).raw().toBuffer()]);
const rgba = Buffer.alloc(1024 * 1024 * 4), alpha = Buffer.alloc(1024 * 1024);
for (let i = 0; i < 1024 * 1024; i++) {
  const k = i * 4, m = i * 3;
  if (ink[k + 3]) { rgba[k] = ink[k]; rgba[k + 1] = ink[k + 1]; rgba[k + 2] = ink[k + 2]; }
  else { rgba[k] = material[m]; rgba[k + 1] = material[m + 1]; rgba[k + 2] = material[m + 2]; }
  rgba[k + 3] = alpha[i] = master[k + 3];
}
if (hash(alpha) !== masterRecord.alphaSha256) throw new Error("Geometry changed during whole-canvas operation.");
const png = await sharp(rgba, { raw: { width: 1024, height: 1024, channels: 4 } }).png().toBuffer();
await writeFile(new URL("final/wolf-E-06-authored-c-v01.png", root), png);
const full = await sharp({ create: { width: 1536, height: 1536, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: png, left: 256, top: 448 }]).png().toBuffer();
await writeFile(new URL("final/wolf-E-06-full-canvas-c-v01.png", root), full);
const preview = await sharp({ create: { width: 192, height: 192, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: await sharp(png).resize(128, 128).png().toBuffer(), left: 32, top: 56 }]).png().toBuffer();
await writeFile(new URL("qa/wolf-E-06-preview-192.png", root), preview);
const decoded = await sharp(png).ensureAlpha().raw().toBuffer();
for (let i = 3; i < decoded.length; i += 4) if (decoded[i] !== master[i]) throw new Error("Export alpha differs from frozen original master.");
const request = JSON.parse(await readFile(new URL("requests/E-06-material.json", root)));
const record = { status: "Authored whole-body geometry with generated material; numerical/visual QA pending, not approved", tool: "built-in image_gen for material; deterministic whole-canvas protected painting/export", actual_input: request, sourcePath, rawSha256: hash(original), dimensions: [meta.width, meta.height], master: masterRecord, materialScale: 1024 / meta.width, final: "final/wolf-E-06-authored-c-v01.png", finalSha256: hash(png), finalAlphaSha256: hash(alpha), alphaExactlyPreserved: true, logicalRegistration: { cropScale: 128 / 1024, offset: [32, 56], fullCanvasPixels: [1536, 1536], fullCanvasLogical: [192, 192], logicalPixelScale: 8, pivot: [768, 1248], sourceStandingHeight: 512 }, operation: "One predetermined whole-canvas RGB material operation beneath protected outer/nose/sole ink with frozen authored alpha. No gray filler, old painting, separate body-part layer, per-limb transform, fitting, texture patch or mask revision.", references: await Promise.all(request.referenced_image_paths.map(async path => ({ path, sha256: hash(await readFile(path)) }))) };
await writeFile(new URL("raw/material-record.json", root), JSON.stringify(record, null, 2) + "\n");
await writeFile(new URL("final/metadata.json", root), JSON.stringify({ ...record.logicalRegistration, image: "wolf-E-06-full-canvas-c-v01.png", pose: "E06", status: "single proof; unapproved; no animation cycle" }, null, 2) + "\n");
console.log(JSON.stringify({ final: fileURLToPath(new URL(record.final, root)), alphaExactlyPreserved: true, source: "fresh material, original references, frozen whole-body authoring master", status: "QA pending" }));
