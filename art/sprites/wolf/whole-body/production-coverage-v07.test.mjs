import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("walk-v07/", import.meta.url);
const coverage = JSON.parse(readFileSync(new URL("coverage.json", root)));
const manifest = JSON.parse(readFileSync(new URL("manifest.json", root)));

test("production status never turns isolated paw matches into finished sheets", () => {
  const frames = Object.values(coverage.directions).flat();
  assert.equal(frames.length, 96);
  assert.equal(new Set(frames.map(frame => frame.id)).size, 96);
  assert.equal(frames.filter(frame => frame.final !== null).length, coverage.counts.finalFrames);
  assert.equal(coverage.counts.completedSheets, 0);
  assert.equal(frames.filter(frame => frame.candidate).length, 6);
  for (const frame of frames) {
    assert.equal(frame.durationMs, 1000 / 12);
    readFileSync(new URL(frame.guide, root));
    if (!frame.candidate) continue;
    const bytes = readFileSync(new URL(frame.candidate.image, root));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), frame.candidate.sha256);
    const qa = JSON.parse(readFileSync(new URL(frame.candidate.qa, root)));
    for (const observation of Object.values(qa.observations)) assert.ok(observation.errorPx <= 3);
    assert.match(frame.status, /cycle unverified/);
  }
});

test("opposite-facing reflection requires a half-cycle shift and swapped anatomical sides", () => {
  const opposite = { LH: "RH", RH: "LH", LF: "RF", RF: "LF" };
  for (const [source, destination] of [["E", "W"], ["NE", "NW"], ["SE", "SW"]]) {
    for (let index = 0; index < 12; index++) {
      const original = manifest.directions[source].frames[(index + 6) % 12];
      const target = manifest.directions[destination].frames[index];
      for (const [id, mirrored] of Object.entries(opposite)) {
        assert.equal(original.feet[id].planted, target.feet[mirrored].planted);
        for (let joint = 0; joint < 4; joint++) {
          const [x, y] = original.feet[id].points[joint];
          const [tx, ty] = target.feet[mirrored].points[joint];
          assert.ok(Math.hypot(192 - x - tx, y - ty) < 1e-10);
        }
      }
    }
  }
  assert.equal(coverage.reflection.paintedOutputVerified, false);
});

test("the proposed sequence has twelve unique approved poses between two excluded seam guards", () => {
  const pilotRoot = new URL("walk-v09/", import.meta.url);
  const request = JSON.parse(readFileSync(new URL("request.json", pilotRoot)));
  assert.equal(request.frames.length, 14);
  assert.deepEqual(request.frames.slice(1, 13).map(frame => frame.approvedPose), Array.from({ length: 12 }, (_, index) => index + 1));
  const hash = bytes => createHash("sha256").update(bytes).digest("hex");
  const hashes = request.frames.map(frame => {
    assert.equal(hash(readFileSync(frame.input)), frame.inputSha256);
    assert.doesNotMatch(frame.input, /trials|provider-output/);
    return hash(readFileSync(new URL(frame.output, pilotRoot)));
  });
  assert.equal(new Set(hashes.slice(1, 13)).size, 12);
  assert.equal(hashes[0], hashes[12]); assert.equal(hashes[13], hashes[1]);
  assert.equal(hash(readFileSync(new URL(request.reference, pilotRoot))), request.referenceSha256);
  const result = JSON.parse(readFileSync(new URL("service-result.json", pilotRoot)));
  assert.equal(result.uploadOccurred, false); assert.equal(result.generationOccurred, false);
});
