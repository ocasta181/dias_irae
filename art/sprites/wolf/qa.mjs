import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createCanvas, pixels, readBitmap } from "./source-parts.mjs";
import { clips, directions, origin } from "./motion.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const project = resolve(root, "../../..");
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const atlas = JSON.parse(await readFile(resolve(root, "atlas.json"), "utf8"));
const failures = [], evidence = [];
function check(condition, reason, subject) { if (!condition) failures.push({ reason, subject }); }

for (const reference of JSON.parse(await readFile(resolve(root, "references.json"), "utf8"))) {
  check(hash(await readFile(resolve(project, reference.path))) === reference.sha256, "reference-bytes-changed", reference.path);
}
for (const name of await readdir(resolve(root, "records"))) {
  const record = JSON.parse(await readFile(resolve(root, "records", name), "utf8"));
  check(hash(await readFile(resolve(root, record.source_path))) === record.sha256, "source-bytes-changed", name);
  await readFile(resolve(root, record.prompt));
}
check(Object.keys(atlas.directions).sort().join() === Object.keys(directions).sort().join(), "incomplete-directions", "atlas");
check(Object.keys(atlas.clips).sort().join() === Object.keys(clips).sort().join(), "incomplete-states", "atlas");
const posesPerFacing = Object.values(clips).reduce((sum, clip) => sum + clip.holds.length, 0);
check(atlas.sourceFrames === posesPerFacing * 8, "wrong-total-pose-count", "atlas");
for (const [name, spec] of Object.entries(clips)) {
  const actual = atlas.clips[name];
  check(actual?.frames.map(frame => frame.durationMs).join() === spec.holds.join(), "changed-frame-holds", name);
  check(actual?.loop === spec.loop, "changed-loop-rule", name);
}
let reconstructed = 0, testedGutters = 0;
for (const [direction, page] of Object.entries(atlas.directions)) {
  const bytes = await readFile(resolve(root, page.image)), bitmap = await readBitmap(resolve(root, page.image));
  check(hash(bytes) === page.sha256, "page-bytes-changed", direction);
  check(bitmap.width === page.dimensions[0] && bitmap.height === page.dimensions[1], "page-dimensions-changed", direction);
  check(bitmap.width <= 2048 && bitmap.height <= 2048, "page-exceeds-pilot-limit", direction);
  check(page.frames.length === posesPerFacing, "wrong-direction-pose-count", direction);
  const rgba = pixels(bitmap);
  page.frames.forEach((frame, index) => {
    const subject = `${direction}-${frame.family}-${frame.pose}`;
    const [x, y, width, height] = frame.rect;
    check(x >= 0 && y >= 0 && x + width <= bitmap.width && y + height <= bitmap.height, "frame-outside-page", subject);
    check(frame.pivot.every((value, axis) => value + frame.trimOffset[axis] === origin[axis]), "trim-moved-ground-root", subject);
    const full = createCanvas(...frame.logicalSize);
    full.getContext("2d").drawImage(bitmap, ...frame.rect, ...frame.trimOffset, width, height);
    check(hash(pixels(full)) === frame.sha256, "packed-frame-pixels-changed", subject);
    reconstructed++;
    let clear = true;
    for (let py = y; py < y + height; py++) for (let px = x; px < x + width; px++) {
      if ((px < x + 2 || px >= x + width - 2 || py < y + 2 || py >= y + height - 2) && rgba[(py * bitmap.width + px) * 4 + 3]) clear = false;
    }
    check(clear, "opaque-sampler-gutter", subject); testedGutters++;
    for (const other of page.frames.slice(index + 1)) {
      const [ox, oy, ow, oh] = other.rect;
      check(x + width <= ox || ox + ow <= x || y + height <= oy || oy + oh <= y, "overlapping-packed-frames", subject);
    }
    check(atlas.clips[frame.family]?.frames[frame.pose - 1]?.source === index, "clip-points-at-wrong-pose", subject);
  });
  evidence.push({ direction, decodedTextureBytes: bitmap.width * bitmap.height * 4, pageBytes: bytes.length });
}
const contact = JSON.parse(execFileSync("python3", [resolve(project, "skills/sprite-production/scripts/check_contacts.py"), resolve(root, "contact-observations.json")], { encoding: "utf8" }));
check(contact.passed && contact.basis === "measured-art", "measured-contacts-failed", "wolf");
const exported = JSON.parse(await readFile(resolve(root, "validation.json"), "utf8"));
check(!exported.failures.length, "drawing-clips-logical-canvas", "wolf");
check(exported.maxRasterPawError <= Math.SQRT1_2, "raster-contact-registration-drift", "wolf");
const report = { passed: !failures.length, reconstructed, testedGutters, contact, evidence, failures, scope: "Byte lineage, coverage, timing, lossless trim reconstruction, alpha gutters, page limits and component-witness contacts. Visual anatomy, mood, visible occlusion and engine import require separate review." };
await writeFile(resolve(root, "qa-report.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ passed: report.passed, reconstructed, testedGutters, contactSamples: contact.observation_count, failures }));
if (failures.length) process.exitCode = 1;
