import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { stickWolfAtlas } from "../../guarin/viewer/stick-wolf.mjs";

const manifest = JSON.parse(readFileSync(new URL("walk-v07/manifest.json", import.meta.url)));
const plan = JSON.parse(readFileSync(new URL("walk-v06/targets.json", import.meta.url)));
const live = stickWolfAtlas(plan, []);
const all = Object.values(manifest.directions).flatMap(page => page.frames);

test("all 96 requested paintings have an exact approved guide and an independent request", () => {
  assert.equal(Object.keys(manifest.directions).length, 8);
  assert.equal(all.length, 96); assert.equal(new Set(all.map(frame => frame.id)).size, 96);
  for (const [direction, page] of Object.entries(manifest.directions)) {
    assert.equal(page.frames.length, 12);
    for (const [index, frame] of page.frames.entries()) {
      assert.deepEqual(frame.guideLines, live.directions[direction].frames[index].lines);
      assert.equal(frame.phase, plan.poses[index].phase);
      assert.equal(frame.durationMs, 1000 / 12);
      const request = JSON.parse(readFileSync(frame.request));
      assert.equal(request.tool, "image_edit");
      assert.deepEqual(request.image, [manifest.identity.crop, frame.guide]);
      assert.match(request.prompt, new RegExp(`pose ${index + 1}/12`));
      assert.doesNotMatch(request.image.join(" "), /attempts|walk-e-v03|registered-pose/);
    }
  }
});

test("all input files retain their recorded source hashes", () => {
  const hash = path => createHash("sha256").update(readFileSync(path)).digest("hex");
  for (const key of ["source", "canonical", "crop"]) assert.equal(hash(manifest.identity[key]), manifest.identity[key + "Sha256"]);
  for (const frame of all) assert.equal(hash(frame.guide), frame.guideSha256);
});

test("the common whole-image crop contains every control joint without moving or rescaling a pose", () => {
  const [x, y, width, height] = manifest.identity.cropLogicalRect;
  for (const frame of all) {
    for (const point of [...frame.guideLines.flat(), ...Object.values(frame.feet).flatMap(foot => foot.points)]) {
      assert.ok(point[0] > x && point[0] < x + width && point[1] > y && point[1] < y + height);
    }
  }
  assert.deepEqual(manifest.root, [96, 156]);
  assert.equal(manifest.fps, 12); assert.equal(manifest.cycleMs, 1000); assert.equal(manifest.stride, 36);
});
