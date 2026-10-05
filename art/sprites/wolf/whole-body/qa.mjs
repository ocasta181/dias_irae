import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, pixels, readBitmap, components } from "../source-parts.mjs";

const root = dirname(fileURLToPath(import.meta.url)), hash = bytes => createHash("sha256").update(bytes).digest("hex");
const atlas = JSON.parse(await readFile(resolve(root, "atlas-v01.json")));
const registrations = JSON.parse(await readFile(resolve(root, "registration-v01.json")));
const page = await readBitmap(resolve(root, atlas.directions.E.image));
assert.equal(hash(await readFile(resolve(root, atlas.directions.E.image))), atlas.directions.E.sha256);
assert.deepEqual(Object.keys(atlas.directions), ["E"]);
assert.deepEqual(Object.keys(atlas.clips), ["idle", "walk"]);
assert.equal(atlas.directions.E.frames.length, 25);
assert.equal(atlas.clips.walk.frames.reduce((sum, frame) => sum + frame.durationMs, 0), 900);
const sourceEdges = [], bitmaps = new Map();
for (const registration of registrations) {
  assert.equal(hash(await readFile(resolve(root, registration.file))), registration.sha256);
  bitmaps.set(registration.file, await readBitmap(resolve(root, registration.file)));
}
for (const [index, frame] of atlas.directions.E.frames.entries()) {
  const source = bitmaps.get(frame.sourceFile), registration = registrations.find(row => row.file === frame.sourceFile);
  const logical = createCanvas(192, 192);
  logical.getContext("2d").drawImage(source, ...frame.sourceRect, ...registration.offset, registration.sourceCell[0] * registration.scale, registration.sourceCell[1] * registration.scale);
  assert.equal(hash(pixels(logical)), frame.sha256);
  const restored = createCanvas(192, 192);
  restored.getContext("2d").drawImage(page, ...frame.rect, 0, 0, 192, 192);
  assert.equal(hash(pixels(restored)), frame.sha256);
  assert.equal(components(pixels(restored), 192, 192, 100).length, 1);
  const raw = createCanvas(...registration.sourceCell);
  raw.getContext("2d").drawImage(source, ...frame.sourceRect, 0, 0, ...registration.sourceCell);
  const found = components(pixels(raw), raw.width, raw.height)[0].rect;
  if (found[0] === 0 || found[1] === 0 || found[0] + found[2] === raw.width || found[1] + found[3] === raw.height) sourceEdges.push({ frame: index, sourceFile: frame.sourceFile, reason: "paint touches original source cell edge" });
}

const original = bitmaps.get("walk-e-01-12-v01.png"), data = pixels(original);
const observations = [], measured = [];
const controls = JSON.parse(await readFile(resolve(root, "guides/e-walk-01-12-v02.json")));
for (let i = 0; i < 6; i++) {
  const cell = [i % 4 * 362, Math.floor(i / 4) * 362];
  let columns = [], bottom;
  for (let y = 361; y >= 300; y--) {
    columns = [];
    for (let x = 165; x < 280; x++) if (data[((cell[1] + y) * original.width + cell[0] + x) * 4 + 3] >= 128) columns.push(x);
    if (columns.length) { bottom = y; break; }
  }
  assert.ok(columns.length, "Annotated near-forepaw region must contain painted pixels.");
  const sourcePoint = [(columns[0] + columns.at(-1)) / 2 + .5, bottom + 1];
  const point = sourcePoint.map((value, axis) => value * .25 + [52, 73][axis]);
  const required = Object.keys(controls[i].feet).filter(id => controls[i].feet[id].planted);
  measured.push({ frame: i + 1, sourceCell: cell, annotatedRegion: [165, 300, 115, 62], sourcePoint, logicalPoint: point, uncertaintyPx: .5 });
  observations.push({ id: `E-walk-${i + 1}`, start_ms: i * 37.5, duration_ms: 37.5, pivot: [96, 156], required_contacts: required, contacts: { RF: point }, root_samples: [0, 18.75, 37.5].map(offset_ms => ({ offset_ms, position: [24 * (i * 37.5 + offset_ms) / 900, 0] })) });
}
const worldContacts = Object.fromEntries(Object.entries(controls[0].feet).filter(([, foot]) => foot.planted).map(([id, foot]) => [id, [foot.points.at(-1)[0] - 96 + .5, foot.points.at(-1)[1] - 156]]));
worldContacts.RF = [measured[0].logicalPoint[0] - 96 + .5, measured[0].logicalPoint[1] - 156];
await writeFile(resolve(root, "contact-observations-v01.json"), JSON.stringify({ basis: "measured-art", max_drift_px: 2, method: "Human-identified near right forepaw region; deterministic alpha>=128 lower contact edge. RF fixed ground placement is anchored to first observed midpoint. Other required support measurements explicitly missing. Six-frame diagnostic, not complete gait evidence.", clips: [{ id: "E-walk-first-six", world_contacts: worldContacts, frames: observations }] }, null, 2) + "\n");
await writeFile(resolve(root, "measured-paws-v01.json"), JSON.stringify({ source: "walk-e-01-12-v01.png", sha256: registrations[1].sha256, basis: "painted pixels", measurements: measured }, null, 2) + "\n");
await writeFile(resolve(root, "qa-report.json"), JSON.stringify({ packingPassed: true, reconstructedFrames: 25, wholeAlphaComponents: 1, sourceEdgeFailures: sourceEdges, completeMotionEvidence: false, visualAcceptance: "revise", productionReady: false }, null, 2) + "\n");
console.log(JSON.stringify({ packingPassed: true, reconstructedFrames: 25, sourceEdgeFailures: sourceEdges, measuredPawFrames: 6, productionReady: false }));
