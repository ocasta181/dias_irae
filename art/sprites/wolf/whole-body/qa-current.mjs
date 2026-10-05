import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, pixels, readBitmap, components } from "../source-parts.mjs";

const root = dirname(fileURLToPath(import.meta.url)), hash = bytes => createHash("sha256").update(bytes).digest("hex");
const atlas = JSON.parse(await readFile(resolve(root, "atlas.json"))), registration = JSON.parse(await readFile(resolve(root, "registration.json")));
const page = await readBitmap(resolve(root, atlas.directions.E.image));
assert.equal(hash(await readFile(resolve(root, atlas.directions.E.image))), atlas.directions.E.sha256);
for (const row of registration) assert.equal(hash(await readFile(resolve(root, row.file))), row.sha256);
const rawFrames = [];
for (const frame of atlas.directions.E.frames) {
  const canvas = createCanvas(192, 192), context = canvas.getContext("2d");
  context.drawImage(page, ...frame.rect, 0, 0, 192, 192);
  const data = pixels(canvas);
  assert.equal(hash(data), frame.sha256);
  assert.equal(components(data, 192, 192, 100).length, 1);
  rawFrames.push(data);
}
assert.equal(rawFrames.length, 9);
assert.equal(atlas.clips.walk.frames.length, 8);
assert.equal(atlas.clips.walk.frames.reduce((sum, frame) => sum + frame.durationMs, 0), 1000);
assert.equal(atlas.clips.walk.fps, 8);
assert.ok(atlas.clips.walk.frames.every(frame => frame.durationMs === 125));
assert.equal(atlas.motion.walkSpeed, 36);
assert.equal(atlas.motion.referenceHeight, 64);
const displayTravel = atlas.motion.walkSpeed * 96 / atlas.motion.referenceHeight;
const control = JSON.parse(await readFile(resolve(root, "guides/e-walk-v03-1-4.json"))).poses;
const measured = [], observations = [], targets = {};
for (let i = 0; i < 4; i++) {
  const data = rawFrames[atlas.clips.walk.frames[i].source];
  let xs = [], bottom;
  for (let y = 166; y >= 145; y--) {
    xs = [];
    for (let x = 100; x <= 124; x++) if (data[(y * 192 + x) * 4 + 3] >= 128) xs.push(x);
    if (xs.length) { bottom = y; break; }
  }
  assert.ok(xs.length, "Human-identified near forepaw region needs painted pixels.");
  const point = [(xs[0] + xs.at(-1)) / 2 + .5, bottom + 1];
  const required = Object.keys(control[i].feet).filter(id => control[i].feet[id].planted);
  for (const id of required) targets[id] ??= control[i].feet[id].points.at(-1).map((value, axis) => value - [96, 156][axis] + (axis ? 0 : control[i].rootForward));
  measured.push({ pose: i + 1, source: atlas.clips.walk.frames[i].source, region: [100, 145, 25, 22], point, uncertaintyPx: 1 });
  observations.push({ id: `E-walk-v03-${i + 1}`, start_ms: i * 125, duration_ms: 125, pivot: [96, 156], required_contacts: required, contacts: { RF: point }, root_samples: [0, 62.5, 125].map(offset_ms => ({ offset_ms, position: [36 * (i * 125 + offset_ms) / 1000, 0] })) });
}
targets.RF = [measured[0].point[0] - 96 + 2.25, measured[0].point[1] - 156];
await writeFile(resolve(root, "contact-observations-v03.json"), JSON.stringify({ basis: "measured-art", max_drift_px: 3, method: "First four actual packed poses, human-identified near forepaw region and deterministic alpha>=128 contact edge; other required contacts explicitly missing. Fixed RF world position anchored to first observed midpoint. Uncertainty approximately one logical pixel; proposed budget is new cadence hold error 2.25 plus 0.75 drawing error, not a pass for the former study.", clips: [{ id: "E-walk-v03-first-four", world_contacts: targets, frames: observations }] }, null, 2) + "\n");
await writeFile(resolve(root, "qa-current.json"), JSON.stringify({ packagePassed: true, reconstructedFrames: 9, fps: atlas.clips.walk.fps, cycleMs: 1000, displayTravelPxPerSecond: displayTravel, measured, fullContactCoverage: false, motionAcceptance: "revise", productionReady: false }, null, 2) + "\n");
console.log(JSON.stringify({ packagePassed: true, reconstructedFrames: 9, measuredPawFrames: 4, fps: atlas.clips.walk.fps, displayTravel, productionReady: false }));
