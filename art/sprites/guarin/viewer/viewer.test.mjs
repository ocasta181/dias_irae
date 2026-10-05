import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import * as animation from "./animation.mjs";

const atlas = JSON.parse(readFileSync(new URL("../atlas.json", import.meta.url)));
const wolf = JSON.parse(readFileSync(new URL("../../wolf/atlas.json", import.meta.url)));
const source = readFileSync(new URL("viewer.mjs", import.meta.url), "utf8").replace(/^import .*\n/, "").replace(/^start\(\)\.catch.*$/m, "");

function playground(startup = false) {
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
  const window = Object.assign(node(), { location: { search: "" } });
  const pendingLoads = [], renderRequests = [];
  class Image {
    set src(value) { queueMicrotask(() => this.onload()); }
  }
  const scope = vm.createContext({ ...animation, document, window, inputAtlas: atlas, inputWolf: wolf, URLSearchParams, Image, fetch: url => new Promise(resolve => pendingLoads.push({ url, resolve })), requestAnimationFrame: callback => renderRequests.push(callback), Path2D: class {} });
  vm.runInContext(source + (startup ? "" : "\natlas = inputAtlas; extent = {left: 1, right: 1, above: 1, below: .3}; wireControls();"), scope);
  return {
    key(type, key, options = {}) {
      let prevented = false;
      document.listeners[type]({ key, target: { closest: () => options.editing }, ...options, preventDefault: () => { prevented = true; } });
      return prevented;
    },
    step: time => vm.runInContext(`tick(${time})`, scope, { timeout: 200 }),
    state: () => JSON.parse(vm.runInContext("JSON.stringify({player, position, scheduled, playing})", scope)),
    preset: id => nodes.find(item => item.dataset.sequence === id).listeners.click(),
    inspect: clip => { get("clip").value = clip; get("clip").listeners.change(); },
    tune: (speed, fps) => { get("speed").value = speed; get("fps").value = fps; get("fps").listeners.change(); },
    blur: () => window.listeners.blur(),
    select: id => vm.runInContext(`applyCharacter("${id}", ${id === "wolf" ? "inputWolf" : "inputAtlas"}, new Map())`, scope),
    size: value => { get("size").value = value; },
    value: id => get(id).value,
    begin: () => vm.runInContext("start()", scope),
    change: id => { get("character").value = id; get("character").listeners.change(); },
    respond: (index, data) => pendingLoads[index].resolve({ ok: true, json: async () => data }),
    renders: () => renderRequests.length,
    visible: () => get(".lab").hidden === false,
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

test("selecting wolf during initial loading cannot strand a hidden lab", async () => {
  const lab = playground(true), startup = lab.begin();
  assert.equal(lab.renders(), 1);
  lab.change("wolf"); lab.respond(1, wolf);
  await new Promise(setImmediate);
  assert.equal(lab.visible(), true);
  assert.equal(lab.value("character"), "wolf");
  lab.respond(0, atlas); await startup;
  assert.equal(lab.value("character"), "wolf");
  lab.step(0); assert.equal(lab.state().player.clip, "idle");
});

test("changing character clears defeated state, held keys and queued actions", () => {
  const lab = playground(); lab.preset("tour"); lab.key("keydown", "d"); lab.key("keydown", "k");
  lab.select("wolf"); lab.step(0); lab.step(100);
  const state = lab.state();
  assert.equal(state.player.clip, "idle");
  assert.equal(state.player.terminal, false);
  assert.equal(state.scheduled.length, 0);
  assert.equal(state.position[0], 450);
  assert.equal(lab.value("size"), 96);
  lab.select("guarin");
  assert.equal(lab.value("size"), 160);
});

test("wolf uses bite for space and ignores unsupported human actions", () => {
  const lab = playground(); lab.select("wolf");
  assert.equal(lab.key("keydown", "g"), false);
  assert.equal(lab.key("keydown", "p"), false);
  assert.equal(lab.state().player.clip, "idle");
  lab.key("keydown", " "); assert.equal(lab.state().player.clip, "cut");
  lab.step(0); lab.step(900); assert.equal(lab.state().player.clip, "idle");
});

test("wolf travel follows stride when size and playback rate change", () => {
  function travel(size, speed, fps) {
    const lab = playground(); lab.select("wolf"); lab.size(size); lab.tune(speed, fps); lab.step(0);
    lab.key("keydown", "d"); lab.key("keydown", "s"); lab.step(900);
    return lab.state().position[0] - 450;
  }
  const fps = wolf.clips.walk.fps;
  const normal = travel(96, 1, fps);
  assert.ok(Math.abs(normal - 36 * Math.SQRT1_2) < 1e-8);
  assert.ok(Math.abs(travel(192, 1, fps) - normal * 2) < 1e-8);
  assert.ok(Math.abs(travel(96, 2, fps) - normal * 2) < 1e-8);
  assert.ok(Math.abs(travel(96, 1, fps / 2) - normal / 2) < 1e-8);
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

test("preset actions start at their scheduled time within a display update", () => {
  const lab = playground(); lab.step(0); lab.preset("strike"); lab.step(1000);
  assert.equal(lab.state().player.clip, "cut");
  assert.ok(Math.abs(lab.state().player.elapsedMs - 100) < 1e-8);
});

test("preset travel is identical across frequent and delayed display updates", () => {
  function travel(times) {
    const lab = playground(); lab.step(0); lab.preset("strike");
    for (const time of times) lab.step(time);
    return lab.state().position[0];
  }
  const frequent = Array.from({ length: 100 }, (_, index) => (index + 1) * 10);
  assert.ok(Math.abs(travel([1000]) - travel(frequent)) < 1e-8);
});

test("a preset's final stop retains travel before that stop", () => {
  const lab = playground(); lab.step(0); lab.preset("strike"); lab.step(2500);
  assert.ok(Math.abs(lab.state().position[0] - 716) < 1e-8);
  assert.equal(lab.state().player.clip, "idle");
});

test("ground-plane movement matches the intended 45-degree elevated view", () => {
  function travel(key) {
    const lab = playground(); lab.step(0); lab.key("keydown", key); lab.step(200);
    return lab.state().position;
  }
  const horizontal = travel("ArrowRight")[0] - 450;
  const vertical = 420 - travel("ArrowUp")[1];
  assert.ok(Math.abs(vertical / horizontal - Math.sin(Math.PI / 4)) < 1e-8);
});

test("every supported playback setting can reach its recovery or held pose", () => {
  const outcomes = { idle: "idle", walk: "walk", cut: "idle", guard_in: "guard_hold", guard_hold: "guard_hold", guard_out: "idle", hurt: "idle", death: "death", interact: "idle", kneel: "channel", channel: "channel", rise: "idle" };
  for (const [clip, outcome] of Object.entries(outcomes)) {
    for (let speed = .25; speed <= 2; speed += .25) {
      for (let fps = 1; fps <= 30; fps++) {
        const lab = playground(); lab.step(0); lab.inspect(clip); lab.tune(speed, fps);
        lab.step(137.5); lab.step(65536);
        const { player } = lab.state();
        const pose = animation.sample(atlas.clips[player.clip], player.elapsedMs);
        assert.ok(player.clip === outcome && atlas.directions.SE.frames[pose?.source], `${clip} at ${speed}× and ${fps} FPS must finish or hold with a valid pose`);
      }
    }
  }
});
