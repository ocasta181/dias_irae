import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { contract, footAt, headings, humanPose, project, stickHumanAtlas } from "./plan.mjs";

const close = (actual, expected, budget = 1e-8) => assert.ok(Math.abs(actual - expected) <= budget, `${actual} must be within ${budget} of ${expected}`);
const atlas = stickHumanAtlas([]);

test("human walk has twelve different complete poses in every heading across exactly one second", () => {
  for (const page of Object.values(atlas.directions)) {
    assert.equal(page.frames.length, 13);
    assert.equal(new Set(page.frames.slice(1).map(frame => JSON.stringify(frame.lines))).size, 12);
    assert.ok(page.frames.flatMap(frame => frame.lines.flat()).flat().every(Number.isFinite));
  }
  assert.equal(atlas.clips.walk.fps, 12);
  close(atlas.clips.walk.frames.reduce((sum, frame) => sum + frame.durationMs, 0), 1000);
});

test("two human feet retain constant world contacts and at least one support through two cycles", () => {
  for (let index = 0; index <= 2400; index++) {
    const phase = index / 1200;
    const feet = [footAt(phase, 0), footAt(phase, .5)];
    assert.ok(feet.some(foot => foot.planted));
    for (const foot of feet) {
      assert.ok(foot.lift >= 0 && foot.lift <= 8);
      if (foot.planted) close(48 * phase + foot.forward, foot.contactForward);
    }
  }
});

test("planted projected feet cancel travel in all eight directions", () => {
  for (const direction of Object.keys(headings)) {
    for (let index = 0; index < 120; index++) {
      const pose = humanPose(direction, index / 120), root = project(direction, pose.rootForward, 0, 0);
      for (const foot of Object.values(pose.feet).filter(foot => foot.planted)) {
        const contact = project(direction, foot.contactForward, foot.lateral, 0);
        close(foot.points[2][0] + root[0] - 128, contact[0]);
        close(foot.points[2][1] + root[1] - 208, contact[1]);
      }
    }
  }
});

test("every knee and elbow retains bone length and every foot stays in its lane", () => {
  for (let index = 0; index <= 1200; index++) {
    const pose = humanPose("SE", index / 1200);
    for (const [side, foot] of Object.entries(pose.feet)) {
      assert.equal(foot.lateral, side === "left" ? -8 : 8);
      for (let bone = 1; bone <= 2; bone++) close(Math.hypot(...foot.local[bone].map((value, axis) => value - foot.local[bone - 1][axis])), 22);
    }
    for (const arm of Object.values(pose.arms)) {
      for (let bone = 1; bone <= 2; bone++) close(Math.hypot(...arm.local[bone].map((value, axis) => value - arm.local[bone - 1][axis])), bone === 1 ? 18 : 16);
    }
  }
});

test("head, neck, torso, shoulders and hips remain identical throughout each cycle", () => {
  for (const page of Object.values(atlas.directions)) {
    for (const pose of page.frames) {
      assert.deepEqual(pose.lines.slice(0, 4), page.frames[0].lines.slice(0, 4));
      assert.deepEqual(pose.pivot, [128, 208]);
      assert.equal(pose.sourceStandingHeight, 160);
      assert.equal(pose.image, undefined);
    }
  }
  assert.equal(contract.head[2], 80);
  assert.equal(contract.head[3], 80);
});

test("loop endpoints close without duplicate keys or foot-velocity reversal", () => {
  for (const offset of [0, .5]) {
    const a = footAt(0, offset), b = footAt(1, offset);
    close(a.forward, b.forward); close(a.lift, b.lift);
  }
  for (const phase of [.625, 1]) {
    const before = footAt(phase - 1e-6, 0), after = footAt(phase + 1e-6, 0);
    close((after.forward - before.forward) / 2e-6, -48, .002);
  }
});

test("held midpoint contacts remain within the two-pixel temporal budget", () => {
  for (const frame of atlas.directions.E.frames.slice(1)) {
    for (const foot of Object.values(frame.feet).filter(foot => foot.planted)) {
      for (const offset of [-.5 / 12, .5 / 12]) close(foot.forward + (frame.phase + offset) * 48, foot.contactForward, 2 + 1e-8);
    }
  }
});

test("neutral idle remains entirely fixed with both feet planted", () => {
  for (const direction of Object.keys(headings)) {
    const idle = humanPose(direction, 0, true);
    for (const foot of Object.values(idle.feet)) {
      assert.equal(foot.planted, true); assert.equal(foot.lift, 0); assert.equal(foot.forward, 0);
    }
    for (const phase of [.25, .5, .75, 1]) assert.deepEqual(humanPose(direction, phase, true).lines, idle.lines);
  }
});

test("saved human atlas exactly matches the generator and original reference register", () => {
  const saved = JSON.parse(readFileSync(new URL("atlas.json", import.meta.url)));
  const guarin = JSON.parse(readFileSync(new URL("../../atlas.json", import.meta.url)));
  assert.deepEqual(saved, stickHumanAtlas(guarin.references));
});
