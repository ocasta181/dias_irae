import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const guides = await Promise.all(["e-walk-01-12-v02", "e-walk-13-24-v02"].map(async name => JSON.parse(await readFile(new URL(`guides/${name}.json`, import.meta.url), "utf8"))));
const poses = guides.flat();

test("shortened gait preserves fixed canine segments and reachable paws", () => {
  for (const pose of poses) for (const [id, foot] of Object.entries(pose.feet)) {
    const lengths = id.endsWith("F") ? [10, 11] : [11, 12];
    lengths.forEach((length, i) => assert.ok(Math.abs(Math.hypot(...foot.local[i].map((value, axis) => value - foot.local[i + 1][axis])) - length) < 1e-8));
    assert.equal(foot.local.length, 4);
    assert.ok(foot.local.at(-1)[1] >= 0 && foot.local.at(-1)[1] <= 5);
  }
});

test("world contacts stay fixed during every supported frame interval", () => {
  for (let i = 1; i < poses.length; i++) for (const id of Object.keys(poses[i].feet)) {
    const previous = poses[i - 1], current = poses[i];
    if (!previous.feet[id].planted || !current.feet[id].planted) continue;
    const world = pose => pose.rootForward + pose.feet[id].local.at(-1)[0];
    assert.ok(Math.abs(world(previous) - world(current)) < 1e-8);
  }
});

test("pilot holds bound contact drift and keep the exaggerated body stationary", () => {
  assert.equal(poses.length, 24);
  assert.equal(poses.reduce((sum, pose) => sum + pose.durationMs, 0), 900);
  for (const pose of poses) {
    assert.deepEqual(pose.head, poses[0].head);
    assert.deepEqual(pose.body, poses[0].body);
    assert.equal(Object.values(pose.feet).filter(foot => foot.planted).length, 3);
    assert.ok(24 / 900 * pose.durationMs / 2 <= .5);
  }
});
