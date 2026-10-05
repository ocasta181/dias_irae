import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";

const script = readFileSync(new URL("./draft.js", import.meta.url), "utf8");
const sourceKey = "dias-irae:mood-board:/art/concepts/index.html";
const destinationKey = "dias-irae:mood-board:/art/concepts/faces/index.html";

function run(values) {
  const localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  runInNewContext(script, { localStorage, document: { body: { dataset: {} } } });
}

test("face-page draft transfer preserves existing comments and excludes equipment", () => {
  const values = new Map([
    [sourceKey, JSON.stringify({ V21: { note: "Keep this face" }, V26: { note: "Mail choice" } })],
    [destinationKey, JSON.stringify({ V21: { note: "Newer face comment" }, F01: { note: "New study" } })],
  ]);
  const sourceBefore = values.get(sourceKey);
  run(values);
  assert.deepEqual(JSON.parse(values.get(destinationKey)), {
    V21: { note: "Newer face comment" }, F01: { note: "New study" },
  });
  assert.equal(values.get(sourceKey), sourceBefore);
});

test("earlier face comments and relative order survive separation", () => {
  const values = new Map([
    [sourceKey, JSON.stringify({ V22: { note: "Second face", baseline: "unchanged" } })],
    [`${sourceKey}:preference-order`, JSON.stringify(["S13", "V25", "V03", "V22", "V21"])],
  ]);
  run(values);
  assert.deepEqual(JSON.parse(values.get(destinationKey)), { V22: { note: "Second face", baseline: "unchanged" } });
  assert.deepEqual(JSON.parse(values.get(`${destinationKey}:preference-order`)), ["V25", "V22", "V21"]);
});

test("repeat page loads cannot replace a newer independent face ranking", () => {
  const values = new Map([
    [`${sourceKey}:preference-order`, JSON.stringify(["V21", "V22"])],
    [`${destinationKey}:preference-order`, JSON.stringify(["F23", "V22", "F01"])],
  ]);
  run(values);
  run(values);
  assert.deepEqual(JSON.parse(values.get(`${destinationKey}:preference-order`)), ["F23", "V22", "F01"]);
});

test("unavailable browser storage reports transfer failure", () => {
  const document = { body: { dataset: {} } };
  runInNewContext(script, { localStorage: { getItem() { throw new Error("Unavailable"); } }, document });
  assert.equal(document.body.dataset.draftTransfer, "unavailable");
});

test("equipment and cast drafts keep their comments and exclude face candidates", () => {
  const values = new Map([
    [sourceKey, JSON.stringify({ V03: { note: "Shield" }, V26: { note: "Armor" }, R10: { note: "Fulk" }, V21: { note: "Face" } })],
    [`${sourceKey}:preference-order`, JSON.stringify(["S13", "R10", "V21", "V26", "V03"])],
  ]);
  run(values);
  const equipmentKey = "dias-irae:mood-board:/art/concepts/expansion/index.html";
  assert.deepEqual(JSON.parse(values.get(equipmentKey)), { V03: { note: "Shield" }, V26: { note: "Armor" }, R10: { note: "Fulk" } });
  assert.deepEqual(JSON.parse(values.get(`${equipmentKey}:preference-order`)), ["R10", "V26", "V03"]);
});

test("reopening styles cannot overwrite newer independent equipment reviews", () => {
  const equipmentKey = "dias-irae:mood-board:/art/concepts/expansion/index.html";
  const values = new Map([
    [sourceKey, JSON.stringify({ V26: { note: "Old armor note" } })],
    [equipmentKey, JSON.stringify({ V26: { note: "New armor note" } })],
    [`${equipmentKey}:preference-order`, JSON.stringify(["R10", "V03", "V26"])],
  ]);
  run(values);
  run(values);
  assert.deepEqual(JSON.parse(values.get(equipmentKey)), { V26: { note: "New armor note" } });
  assert.deepEqual(JSON.parse(values.get(`${equipmentKey}:preference-order`)), ["R10", "V03", "V26"]);
});
