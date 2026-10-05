import test from "node:test";
import assert from "node:assert/strict";
import { clips, directions, frames, joint, limbs, origin, paw, pose, project, stride, walkDuration } from "./motion.mjs";

test("four-beat walking always has three supports and fixed paw lanes", () => {
  for (let index = 0; index < 1000; index++) {
    const phase = index / 1000;
    const feet = Object.values(limbs).map(limb => paw(phase, limb));
    assert.ok(feet.filter(foot => foot.planted).length >= 3);
    assert.ok(feet.every(foot => foot.lift >= 0 && foot.lift <= 8));
  }
});

test("every planted paw cancels root travel across cycle wrap", () => {
  for (const limb of Object.values(limbs)) {
    const expected = stride * limb.offset + limb.base + stride * .75 / 2;
    for (let index = 0; index <= 100; index++) {
      const phase = limb.offset + .75 * index / 100;
      const foot = paw(phase, limb);
      assert.ok(Math.abs(stride * phase + foot.forward - expected) < 1e-8);
    }
  }
});

test("idle locks all four lower limbs while breathing stays small", () => {
  for (const direction of Object.keys(directions)) {
    const entries = frames(direction, "idle");
    assert.ok(entries.every(entry => JSON.stringify(entry.feet) === JSON.stringify(entries[0].feet)));
  }
});

test("all projected targets fit the logical canvas and bones retain their lengths", () => {
  for (const direction of Object.keys(directions)) for (const clip of Object.keys(clips)) {
    for (const entry of frames(direction, clip)) for (const foot of Object.values(entry.feet)) {
      for (const key of ["hip", "knee", "ankle", "sole"]) assert.ok(foot[key].every(value => value > 0 && value < 192));
      const { hip, knee, ankle } = foot.local;
      assert.ok(Math.abs(Math.hypot(hip[0] - knee[0], hip[1] - knee[1]) - 23) < 1e-8);
      assert.ok(Math.abs(Math.hypot(ankle[0] - knee[0], ankle[1] - knee[1]) - 21) < 1e-8);
    }
  }
});

test("raster holds add no more than three quarters of a reference pixel of support drift", () => {
  for (const direction of Object.keys(directions)) for (const entry of frames(direction, "walk")) {
    for (const time of [entry.startMs, entry.startMs + entry.durationMs]) {
      const delta = stride * (time / walkDuration - entry.phase);
      const [x, y] = project(direction, delta, 0);
      assert.ok(Math.hypot(x - origin[0], y - origin[1]) <= .75 + 1e-8);
    }
  }
});

test("terminal collapse finishes on an actual final target and unreachable limbs fail", () => {
  const final = frames("SE", "death").at(-1);
  assert.equal(final.fall, 1);
  assert.equal(final.headPart, "rest");
  assert.throws(() => joint([0, 0], [100, 0], 1), /Unreachable/);
});

test("all five states have positive complete timelines and looping geometry closes", () => {
  for (const clip of Object.keys(clips)) {
    const entries = frames("SE", clip);
    assert.ok(entries.every(entry => entry.durationMs > 0));
    assert.equal(entries.at(-1).startMs + entries.at(-1).durationMs, clips[clip].holds.reduce((sum, hold) => sum + hold, 0));
  }
  const start = pose("SE", "walk", 0), end = pose("SE", "walk", 1);
  assert.deepEqual(start.feet, end.feet);
});
