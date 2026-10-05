import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import * as animation from "./animation.mjs";

const atlas = JSON.parse(readFileSync(new URL("../atlas.json", import.meta.url)));
const source = readFileSync(new URL("viewer.mjs", import.meta.url), "utf8").replace(/^import .*\n/, "").replace(/^start\(\)\.catch.*$/m, "");

function playground() {
  const nodes = [];
  const context = new Proxy({}, { get: () => () => {} });
  function node() {
    const value = { dataset: {}, listeners: {}, value: "", width: 900, height: 560, textContent: "", checked: false };
    Object.assign(value, { addEventListener: (type, handler) => { value.listeners[type] = handler; }, setAttribute() {}, append() {}, replaceChildren() {}, getContext: () => context, getBoundingClientRect: () => ({ width: 900, height: 560 }) });
    nodes.push(value);
    return value;
  }
  const elements = new Map();
  const get = id => { if (!elements.has(id)) elements.set(id, node()); return elements.get(id); };
  for (const [id, value] of Object.entries({ size: 160, speed: 1, sampling: "linear", background: "dark" })) get(id).value = value;
  const document = Object.assign(node(), { getElementById: get, createElement: node, querySelector: get, querySelectorAll: selector => nodes.filter(item => selector === "[data-direction]" ? item.dataset.direction : selector === "[data-sequence]" ? item.dataset.sequence : selector === ".frame-button" ? item.className === "frame-button" : false) });
  const window = node();
  const scope = vm.createContext({ ...animation, document, window, inputAtlas: atlas, requestAnimationFrame() {}, Path2D: class {} });
  vm.runInContext(`${source}\natlas = inputAtlas; extent = {left: 1, right: 1, above: 1, below: .3}; wireControls();`, scope);
  return {
    key(type, key, options = {}) {
      let prevented = false;
      document.listeners[type]({ key, target: { closest: () => options.editing }, ...options, preventDefault: () => { prevented = true; } });
      return prevented;
    },
    step: time => vm.runInContext(`tick(${time})`, scope),
    state: () => JSON.parse(vm.runInContext("JSON.stringify({player, position, scheduled, playing})", scope)),
    preset: id => nodes.find(item => item.dataset.sequence === id).listeners.click(),
    blur: () => window.listeners.blur(),
  };
}

test("page keyboard input moves diagonally and release returns to idle", () => {
  const lab = playground(); lab.step(0);
  lab.key("keydown", "w"); lab.key("keydown", "d"); lab.step(200);
  const moved = lab.state();
  assert.ok(moved.position[0] > 450 && moved.position[1] < 420 && moved.player.direction === "NE");
  lab.key("keyup", "d"); assert.equal(lab.state().player.direction, "N");
  lab.key("keyup", "w"); assert.equal(lab.state().player.clip, "idle");
});

test("space repeats do not scroll or restart a strike and held movement resumes", () => {
  const lab = playground(); lab.step(0); lab.key("keydown", "ArrowRight");
  lab.key("keydown", " "); lab.step(100);
  const elapsed = lab.state().player.elapsedMs;
  assert.equal(lab.key("keydown", " ", { repeat: true }), true);
  assert.equal(lab.state().player.elapsedMs, elapsed);
  lab.step(1000); assert.equal(lab.state().player.clip, "walk");
});

test("editing inputs and browser shortcuts do not control the character", () => {
  const lab = playground();
  assert.equal(lab.key("keydown", " ", { editing: true }), false);
  lab.key("keydown", "w", { editing: true }); lab.key("keydown", "d", { ctrlKey: true });
  assert.equal(lab.state().player.clip, "idle");
});

test("window focus loss releases movement instead of leaving a stuck walk", () => {
  const lab = playground(); lab.key("keydown", "ArrowDown"); lab.blur();
  assert.equal(lab.state().player.clip, "idle");
});

test("keyboard takeover cancels all later preset actions", () => {
  const lab = playground(); lab.step(0); lab.preset("tour"); lab.step(300);
  lab.key("keydown", "a"); lab.key("keyup", "a"); lab.step(8000);
  assert.equal(lab.state().player.clip, "idle");
  assert.equal(lab.state().scheduled.length, 0);
});

test("taking control during a preset guard completes its exit", () => {
  const lab = playground(); lab.step(0); lab.preset("guard"); lab.step(500);
  assert.equal(lab.state().player.clip, "guard_hold");
  lab.key("keydown", "w"); lab.step(1000);
  assert.equal(lab.state().player.clip, "walk");
});

test("movement resumes only for time after strike recovery", () => {
  const lab = playground(); lab.step(0);
  lab.key("keydown", "ArrowRight"); lab.key("keydown", " "); lab.step(600);
  assert.ok(Math.abs(lab.state().position[0] - 464) < 1e-8);
});

test("strike recovery displacement does not depend on display refresh", () => {
  function travel(times) {
    const lab = playground(); lab.step(0);
    lab.key("keydown", "ArrowRight"); lab.key("keydown", " ");
    for (const time of times) lab.step(time);
    return lab.state().position[0];
  }
  const frequent = Array.from({ length: 60 }, (_, index) => (index + 1) * 10);
  assert.ok(Math.abs(travel([600]) - travel(frequent)) < 1e-8);
});
