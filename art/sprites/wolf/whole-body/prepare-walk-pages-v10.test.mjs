import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("walk-v10/", import.meta.url);
const manifest = JSON.parse(readFileSync(new URL("manifest.json", root)));
test("all sixty source poses have independent original-only drawing requests", () => {
  assert.equal(manifest.pages.length, 20);
  const entries = [];
  for (const page of manifest.pages) {
    const request = JSON.parse(readFileSync(new URL(page.request, root)));
    assert.deepEqual(request.referenced_image_paths, [manifest.originalReference, page.control, page.guide]);
    assert.doesNotMatch(request.referenced_image_paths.join(" "), /trials|raw\/|provider-output|anidoc/i);
    assert.equal(createHash("sha256").update(readFileSync(page.control)).digest("hex"), page.controlSha256);
    assert.equal(page.poses.length, 3);
    for (const [index, pose] of page.poses.entries()) {
      assert.ok(request.prompt.includes(`COLUMN ${index+1}: approved ${page.direction} walking pose ${pose}/12`));
      entries.push(page.direction + "-" + pose);
    }
  }
  assert.equal(entries.length, 60); assert.equal(new Set(entries).size, 60);
  assert.equal(createHash("sha256").update(readFileSync(manifest.originalReference)).digest("hex"), manifest.originalSha256);
});
test("complete-sheet timing and opposite-facing phase mappings preserve the approved contract", () => {
  assert.equal(manifest.exportFramesRequired, 96);
  assert.equal(manifest.fps, 12); assert.equal(manifest.cycleMs, 1000);
  assert.deepEqual(manifest.pivot, [96,156]); assert.deepEqual(manifest.crop, [32,56,128,128]);
  assert.deepEqual(manifest.mirrors, {W:{source:"E",phaseOffset:6},NW:{source:"NE",phaseOffset:6},SW:{source:"SE",phaseOffset:6}});
});
