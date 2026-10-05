import test from "node:test";
import assert from "node:assert/strict";
import { advance, createPlayer, face, request, sample } from "./animation.mjs";

const loop = { loop: true, frames: [{ source: 0, durationMs: 100 }, { source: 1, durationMs: 200 }] };
const shot = { loop: false, frames: [{ source: 2, durationMs: 100 }, { source: 3, durationMs: 100 }], events: [{ name: "contact", atMs: 100 }] };
const clips = Object.fromEntries(["idle", "walk", "guard_hold", "channel"].map(name => [name, loop]));
for (const name of ["cut", "hurt", "death", "interact", "guard_in", "guard_out", "kneel", "rise"]) clips[name] = shot;

test("unequal frame holds survive a loop without adding a duplicate end pose", () => {
  assert.deepEqual([sample(loop, 99).source, sample(loop, 100).source, sample(loop, 299).source, sample(loop, 300).source], [0, 1, 1, 0]);
});

test("elapsed time gives the same pose at different display refresh rates", () => {
  const initial = request(createPlayer(), "walk");
  const run = count => Array.from({ length: count }).reduce(state => advance(state, 1000 / count, clips).player, initial);
  assert.equal(sample(loop, run(60).elapsedMs).source, sample(loop, run(144).elapsedMs).source);
});

test("changing walk facing preserves gait phase", () => {
  const walking = { ...request(createPlayer(), "walk"), elapsedMs: 175 };
  assert.equal(face(walking, "NW").elapsedMs, 175);
});

test("repeated attack input cannot restart anticipation", () => {
  const attacking = advance(request(createPlayer(), "cut"), 70, clips).player;
  assert.deepEqual(request(attacking, "cut"), attacking);
});

test("attack facing stays fixed until recovery", () => {
  const attacking = request(createPlayer(), "cut");
  assert.equal(face(attacking, "N").direction, "SE");
});

test("completed attack returns to current movement intention", () => {
  const attacking = request(request(createPlayer(), "walk"), "cut");
  assert.equal(advance(attacking, 250, clips).player.clip, "walk");
});

test("contact fires once even when one display update crosses it", () => {
  const attacking = request(createPlayer(), "cut");
  const first = advance(attacking, 150, clips);
  assert.deepEqual([...first.events, ...advance(first.player, 40, clips).events], ["contact"]);
});

test("damage cancels an attack without a later phantom contact", () => {
  const attacking = advance(request(createPlayer(), "cut"), 50, clips).player;
  const damaged = request(attacking, "hurt");
  const hurtClips = { ...clips, hurt: { ...shot, events: [] } };
  assert.deepEqual(advance(damaged, 250, hurtClips).events, []);
});

test("holding guard loops the stable pose and release uses its exit", () => {
  const held = advance(request(createPlayer(), "guard"), 300, clips).player;
  assert.deepEqual([held.clip, request(held, "guard-off").clip], ["guard_hold", "guard_out"]);
});

test("an early guard release completes raise then lowers instead of staying stuck", () => {
  const released = request(request(createPlayer(), "guard"), "guard-off");
  assert.equal(advance(released, 220, clips).player.clip, "guard_out");
});

test("prayer has a held channel and a damage interruption", () => {
  const held = advance(request(createPlayer(), "prayer"), 300, clips).player;
  assert.deepEqual([held.clip, request(held, "prayer-off").clip, request(held, "hurt").clip], ["channel", "rise", "hurt"]);
});

test("death holds the corpse and ignores movement until explicit reset", () => {
  const dead = advance(request(createPlayer(), "death"), 1000, clips).player;
  assert.deepEqual([sample(clips.death, dead.elapsedMs).source, request(dead, "walk").clip, request(dead, "reset").clip], [3, "death", "idle"]);
});
