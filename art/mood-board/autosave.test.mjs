import assert from "node:assert/strict";
import test from "node:test";
import { createAutosave } from "./autosave.mjs";

function deferred() {
  let resolve;
  const promise = new Promise((accept) => { resolve = accept; });
  return { promise, resolve };
}

function setup(send, options = {}) {
  const states = [], saved = [];
  const autosave = createAutosave("original", {
    hash: async () => "original-hash", send,
    onState: (state) => states.push(state), onSaved: (content) => saved.push(content),
    ...options,
  });
  return { autosave, states, saved };
}

test("changing only rank starts saving without a button or a delay", async () => {
  const requests = [];
  const { autosave, states } = setup(async (content, baseline) => {
    requests.push({ content, baseline });
    return { baseline: "rank-hash" };
  });
  const write = autosave.update("same comments, new rank");
  assert.equal(states[0].status, "saving");
  await write;
  assert.deepEqual(requests, [{ content: "same comments, new rank", baseline: "original-hash" }]);
  assert.equal(states.at(-1).status, "saved");
});

test("rapid edits retain the latest review and use the preceding confirmed baseline", async () => {
  const first = deferred(), requests = [];
  const { autosave, saved } = setup(async (content, baseline) => {
    requests.push({ content, baseline });
    return requests.length === 1 ? first.promise : { baseline: "latest-hash" };
  });
  const write = autosave.update("first edit");
  await Promise.resolve();
  autosave.update("intermediate edit");
  autosave.update("last edit with rank and commentary");
  first.resolve({ baseline: "first-hash" });
  await write;
  assert.deepEqual(requests, [
    { content: "first edit", baseline: "original-hash" },
    { content: "last edit with rank and commentary", baseline: "first-hash" },
  ]);
  assert.deepEqual(saved, ["first edit", "last edit with rank and commentary"]);
});

test("reverting during a write is persisted after the first write completes", async () => {
  const first = deferred(), requests = [];
  const { autosave } = setup(async (content, baseline) => {
    requests.push({ content, baseline });
    return requests.length === 1 ? first.promise : { baseline: "original-hash" };
  });
  const write = autosave.update("changed");
  await Promise.resolve();
  autosave.update("original");
  first.resolve({ baseline: "changed-hash" });
  await write;
  assert.deepEqual(requests.map((request) => request.content), ["changed", "original"]);
});

test("a failed connection retries the latest draft without claiming it was saved", async () => {
  const requests = [], timers = [];
  const { autosave, states, saved } = setup(async (content, baseline) => {
    requests.push({ content, baseline });
    if (requests.length === 1) throw new Error("Offline");
    return { baseline: "restored-hash" };
  }, { schedule: (callback) => { timers.push(callback); return 1; }, cancel: () => {} });
  await autosave.update("unsaved draft");
  assert.equal(states.at(-1).status, "error");
  assert.deepEqual(saved, []);
  await timers[0]();
  assert.deepEqual(requests.map((request) => request.baseline), ["original-hash", "original-hash"]);
  assert.deepEqual(saved, ["unsaved draft"]);
});

test("a conflict preserves the draft and never retries over another writer", async () => {
  const requests = [], timers = [];
  const { autosave, saved, states } = setup(async (content) => {
    requests.push(content);
    throw Object.assign(new Error("Another page saved"), { status: 409 });
  }, { schedule: (callback) => timers.push(callback) });
  await autosave.update("my draft");
  await autosave.update("my newer draft");
  await autosave.retry();
  assert.deepEqual(requests, ["my draft"]);
  assert.deepEqual(saved, []);
  assert.deepEqual(timers, []);
  assert.equal(states.at(-1).error.status, 409);
});

test("unchanged content does not create duplicate writes", async () => {
  const requests = [];
  const { autosave } = setup(async (content) => { requests.push(content); return { baseline: "saved-hash" }; });
  await autosave.update("original");
  await autosave.update("changed");
  await autosave.update("changed");
  assert.deepEqual(requests, ["changed"]);
});
