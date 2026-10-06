import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import * as animation from "./animation.mjs";
import { stickWolfAtlas } from "./stick-wolf.mjs";

const atlas = JSON.parse(readFileSync(new URL("../atlas.json", import.meta.url)));
const wolf = JSON.parse(readFileSync(new URL("../../wolf/atlas.json", import.meta.url)));
const wholeWolf = JSON.parse(readFileSync(new URL("../../wolf/whole-body/atlas.json", import.meta.url)));
const human = JSON.parse(readFileSync(new URL("../locomotion/stick-v01/atlas.json", import.meta.url)));
const plan = JSON.parse(readFileSync(new URL("../../wolf/whole-body/walk-v06/targets.json", import.meta.url)));
const sticks = stickWolfAtlas(plan, wholeWolf.references);
const source = readFileSync(new URL("viewer.mjs", import.meta.url), "utf8").replace(/^import .*\n/gm, "").replace(/^start\(\)\.catch.*$/m, "");

function playground(startup = false) {
  const nodes = [];
  const draws = [];
  function node() {
    const value = { dataset: {}, listeners: {}, children: [], value: "", width: 900, height: 560, textContent: "", checked: false };
    function remove(child) { nodes.splice(nodes.indexOf(child), 1); child.children.forEach(remove); }
    let translation, scale;
    const context = new Proxy({}, { get: (_, name) => name === "translate" ? (...values) => { translation = values; } : name === "scale" ? (...values) => { scale = values; } : name === "drawImage" ? (image, ...rect) => {
      assert.ok(image, "a drawable image must be loaded before its rectangle is rendered");
      if (value === get("stage")) draws.push({ image, rect, translation, scale });
    } : () => {} });
    Object.assign(value, { addEventListener: (type, handler) => { value.listeners[type] = handler; }, focus() { value.focused = true; }, setAttribute() {}, append(...children) { value.children.push(...children); }, replaceChildren() { value.children.forEach(remove); value.children = []; }, getContext: () => context, getBoundingClientRect: () => ({ width: 900, height: 560 }) });
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
  const scope = vm.createContext({ ...animation, stickWolfAtlas, document, window, inputAtlas: atlas, inputWolf: wolf, inputSticks: sticks, inputHuman: human, URLSearchParams, Image, fetch: url => new Promise(resolve => pendingLoads.push({ url, resolve })), requestAnimationFrame: callback => renderRequests.push(callback), Path2D: class {} });
  vm.runInContext(source + (startup ? "" : "\natlas = inputAtlas; for (const page of Object.values(atlas.directions)) for (const frame of page.frames) images.set(frame.image, {path: frame.image}); extent = {left: 1, right: 1, above: 1, below: .3}; wireControls();"), scope);
  return {
    key(type, key, options = {}) {
      let prevented = false;
      document.listeners[type]({ key, target: { closest: () => options.editing }, ...options, preventDefault: () => { prevented = true; } });
      return prevented;
    },
    step: time => vm.runInContext(`tick(${time})`, scope, { timeout: 200 }),
    state: () => JSON.parse(vm.runInContext("JSON.stringify({player, position, scheduled, playing, frameByFrame, characterId})", scope)),
    preset: id => nodes.find(item => item.dataset.sequence === id).listeners.click(),
    inspect: clip => { get("clip").value = clip; get("clip").listeners.change(); },
    tune: (speed, fps) => { get("speed").value = speed; get("fps").value = fps; get("fps").listeners.change(); },
    blur: () => window.listeners.blur(),
    select: (id, data) => { scope.inputSelected = data ?? (id === "wolf" ? wolf : atlas); return vm.runInContext(`applyCharacter("${id}", inputSelected, new Map(Object.values(inputSelected.directions).flatMap(page => page.frames).map(frame => [frame.image, {path: frame.image}])))`, scope); },
    stick: () => vm.runInContext("applyCharacter('wolf-stick', inputSticks, new Map())", scope),
    human: () => vm.runInContext("applyCharacter('human', inputHuman, new Map())", scope),
    manual: enabled => { get("frame-by-frame").checked = enabled; get("frame-by-frame").listeners.change(); },
    direction: heading => nodes.find(item => item.dataset.direction === heading).listeners.click(),
    click: id => get(id).listeners.click(),
    text: id => get(id).textContent,
    focused: id => get(id).focused,
    size: value => { get("size").value = value; },
    value: id => get(id).value,
    hidden: id => get(id).hidden,
    begin: () => vm.runInContext("start()", scope),
    change: id => { get("character").value = id; get("character").listeners.change(); },
    respond: (index, data) => pendingLoads[index].resolve({ ok: true, json: async () => data }),
    renders: () => renderRequests.length,
    drawn: data => draws.map(draw => Object.values(data.directions).flatMap(page => page.frames).findIndex(frame => frame.rect.every((number, index) => number === draw.rect[index]))),
    transforms: () => draws.map(({ translation, scale }) => ({ translation, scale })),
    clearDraws: () => { draws.length = 0; },
    preserveFrames: () => { get("preserve-frames").checked = true; },
    visible: () => get(".lab").hidden === false,
  };
}

function distinctPoses(poses) {
  return poses.filter((pose, index) => index === 0 || pose !== poses[index - 1]);
}

test("normal 60 Hz playback draws every wolf pose in the actual declared order", () => {
  const lab = playground(); lab.select("wolf", wholeWolf); lab.step(0);
  lab.key("keydown", "d"); lab.clearDraws(); lab.step(0);
  for (let index = 1; index <= 60; index++) lab.step(index * 1000 / 60);
  assert.deepEqual(distinctPoses(lab.drawn(wholeWolf)), [2, 1, 3, 4, 6, 5, 7, 8, 2]);
});

test("elapsed-time playback skips undrawn wolf poses during 500 ms display gaps", () => {
  const lab = playground(); lab.select("wolf", wholeWolf); lab.step(0);
  lab.key("keydown", "d"); lab.clearDraws();
  for (const time of [0, 500, 1000]) lab.step(time);
  assert.deepEqual(lab.drawn(wholeWolf), [2, 6, 2]);
});

test("frame-preserving preview draws all wolf keys despite repeated 500 ms gaps", () => {
  const lab = playground(); lab.select("wolf", wholeWolf); lab.preserveFrames(); lab.step(0);
  lab.key("keydown", "d"); lab.clearDraws();
  for (let index = 0; index <= 8; index++) lab.step(index * 500);
  assert.deepEqual(lab.drawn(wholeWolf), [2, 1, 3, 4, 6, 5, 7, 8, 2]);
  assert.equal(lab.state().player.elapsedMs, 1000);
  assert.ok(Math.abs(lab.state().position[0] - 504) < 1e-8);
  assert.equal(lab.state().position[1], 420);
});

test("frame-preserving preview retains normal fractional timing and travel", () => {
  const lab = playground(); lab.select("wolf", wholeWolf); lab.preserveFrames(); lab.step(0);
  lab.key("keydown", "d"); lab.step(0); lab.clearDraws();
  for (let index = 1; index <= 60; index++) lab.step(index * 1000 / 60);
  assert.deepEqual(distinctPoses(lab.drawn(wholeWolf)), [2, 1, 3, 4, 6, 5, 7, 8, 2]);
  assert.ok(Math.abs(lab.state().player.elapsedMs - 1000) < 1e-8);
  assert.ok(Math.abs(lab.state().position[0] - 504) < 1e-8);
  for (const [index, draw] of lab.transforms().entries()) {
    assert.deepEqual(draw.scale, [1.5, 1.5]);
    assert.equal(draw.translation[1], 420 - 156 * 1.5);
    assert.ok(Math.abs(draw.translation[0] - (450 + (index + 1) * .9 - 96 * 1.5)) < 1e-8);
  }
});

test("frame-preserving strike shows anticipation, every key and recovery during stalls", () => {
  const lab = playground(); lab.preserveFrames(); lab.step(0); lab.key("keydown", " ");
  const rendered = [];
  for (let index = 1; index <= atlas.clips.cut.frames.length + 1; index++) {
    lab.clearDraws(); lab.step(index * 500);
    const { player } = lab.state();
    assert.equal(lab.drawn(atlas).length, 1);
    rendered.push([player.clip, animation.sample(atlas.clips[player.clip], player.elapsedMs).index]);
  }
  assert.deepEqual(rendered, [...atlas.clips.cut.frames.map((_, index) => ["cut", index]), ["idle", 0]]);
});

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
  lab.change("wolf-stick"); lab.respond(1, wolf);
  await new Promise(setImmediate);
  lab.respond(2, plan);
  await new Promise(setImmediate);
  assert.equal(lab.visible(), true);
  assert.equal(lab.value("character"), "wolf-stick");
  lab.respond(0, atlas); await startup;
  assert.equal(lab.value("character"), "wolf-stick");
  lab.step(0); assert.equal(lab.state().player.clip, "idle");
});

test("Space, Right Arrow and the visible button each step once; repeats never step", () => {
  const lab = playground(); lab.stick(); lab.manual(true); lab.step(0);
  assert.equal(lab.focused("stage"), true);
  assert.equal(lab.text("step-frame"), "1 / 12");
  lab.key("keydown", " "); assert.equal(lab.text("step-frame"), "2 / 12");
  lab.key("keydown", " ", { repeat: true }); assert.equal(lab.text("step-frame"), "2 / 12");
  lab.key("keyup", " "); lab.key("keydown", "ArrowRight");
  assert.equal(lab.text("step-frame"), "3 / 12");
  lab.key("keydown", "ArrowRight", { repeat: true }); assert.equal(lab.text("step-frame"), "3 / 12");
  lab.click("step-next"); assert.equal(lab.text("step-frame"), "4 / 12");
  lab.key("keydown", "ArrowLeft"); assert.equal(lab.text("step-frame"), "3 / 12");
});

test("manual walking view visits all twelve distinct poses and wraps without moving", () => {
  const lab = playground(); lab.stick(); lab.manual(true); lab.step(0);
  const before = lab.state().position;
  const seen = [];
  for (let index = 0; index < 12; index++) {
    lab.step(index * 500); seen.push(lab.text("step-frame"));
    lab.key("keydown", " "); lab.key("keyup", " ");
  }
  assert.deepEqual(seen, Array.from({ length: 12 }, (_, index) => `${index + 1} / 12`));
  assert.equal(lab.text("step-frame"), "1 / 12");
  assert.deepEqual(lab.state().position, before);
  assert.equal(lab.state().playing, false);
});

test("frame view cannot resume through movement, restart or editing a control", () => {
  const lab = playground(); lab.stick(); lab.manual(true); lab.step(0);
  lab.key("keydown", "d"); lab.key("keydown", "ArrowUp"); lab.click("restart");
  lab.key("keydown", "ArrowRight", { editing: true });
  lab.key("keydown", " ", { ctrlKey: true }); lab.step(2000);
  assert.equal(lab.text("step-frame"), "1 / 12");
  assert.equal(lab.state().playing, false);
  assert.equal(lab.state().player.elapsedMs, 0);
  assert.equal(lab.state().position[0], 450);
});

test("stick movement plays twelve poses over a second with a straight ground root", () => {
  const lab = playground(); lab.stick(); lab.preserveFrames(); lab.step(0);
  lab.key("keydown", "d"); lab.step(0);
  const poses = [], roots = [];
  for (let index = 1; index <= 60; index++) {
    lab.step(index * 1000 / 60); poses.push(lab.text("step-frame")); roots.push(lab.state().position);
  }
  assert.equal(new Set(poses).size, 12);
  assert.ok(Math.abs(lab.state().player.elapsedMs - 1000) < 1e-8);
  assert.ok(Math.abs(lab.state().position[0] - 504) < 1e-8);
  assert.ok(roots.every(root => root[1] === 420));
  lab.key("keyup", "d"); assert.equal(lab.state().player.clip, "idle");
});

test("stick controls support eight headings and clear held movement on mode changes", () => {
  const lab = playground(); lab.stick(); lab.step(0);
  lab.key("keydown", "w"); lab.key("keydown", "a"); lab.step(100);
  assert.equal(lab.state().player.direction, "NW");
  assert.ok(lab.state().position[0] < 450 && lab.state().position[1] < 420);
  lab.manual(true); lab.key("keyup", "a"); lab.key("keyup", "w");
  assert.equal(lab.state().player.clip, "walk");
  lab.manual(false); const root = lab.state().position; lab.step(200); lab.step(300);
  assert.deepEqual(lab.state().position, root);
  lab.key("keydown", "d"); lab.blur(); assert.equal(lab.state().player.clip, "idle");
});

test("E stick lines exactly follow the new guides, with fixed torso and twelve unique leg poses", () => {
  const frames = sticks.directions.E.frames;
  assert.equal(frames.length, 12);
  assert.equal(new Set(frames.map(frame => JSON.stringify(frame.lines))).size, 12);
  for (const [index, frame] of frames.entries()) {
    assert.deepEqual(frame.pivot, [96, 156]);
    assert.deepEqual(frame.lines.slice(0, 3), frames[0].lines.slice(0, 3));
    for (const [limbIndex, id] of ["LH", "LF", "RH", "RF"].entries()) {
      assert.deepEqual(frame.lines[limbIndex + 3][1], plan.poses[index].feet[id].points[1]);
      assert.deepEqual(frame.lines[limbIndex + 3][2], plan.poses[index].feet[id].points[3]);
    }
    assert.ok(frame.lines.every(line => line.length <= 3));
    assert.equal(frame.image, undefined);
  }
});

test("human atlas loads without raster images and defaults to controllable stick movement", async () => {
  const lab = playground(true), startup = lab.begin();
  lab.change("human"); lab.respond(1, human);
  await new Promise(setImmediate);
  assert.equal(lab.visible(), true);
  assert.equal(lab.value("character"), "human");
  assert.equal(lab.state().frameByFrame, false);
  assert.equal(lab.state().player.direction, "SE");
  lab.respond(0, atlas); await startup;
  assert.equal(lab.value("character"), "human");
});

test("human frame view steps through twelve poses once per press and holds its ground root", () => {
  const lab = playground(); lab.human(); lab.manual(true); lab.step(0);
  const root = lab.state().position;
  for (let index = 1; index <= 12; index++) {
    lab.key("keydown", index % 2 ? " " : "ArrowRight");
    lab.key("keydown", index % 2 ? " " : "ArrowRight", { repeat: true });
    lab.step(index * 250);
    assert.equal(lab.text("step-frame"), `${index % 12 + 1} / 12`);
    assert.deepEqual(lab.state().position, root);
  }
  lab.click("step-next"); assert.equal(lab.text("step-frame"), "2 / 12");
  assert.equal(lab.state().playing, false);
});

test("human walk draws all twelve phases over a second and travels the authored 48-unit stride", () => {
  const lab = playground(); lab.human(); lab.preserveFrames(); lab.step(0);
  lab.key("keydown", "ArrowRight"); lab.step(0);
  const seen = new Set();
  for (let index = 1; index <= 60; index++) {
    lab.step(index * 1000 / 60); seen.add(lab.text("step-frame"));
    assert.equal(lab.state().position[1], 420);
  }
  assert.equal(seen.size, 12);
  assert.ok(Math.abs(lab.state().position[0] - 498) < 1e-8);
  lab.key("keyup", "ArrowRight"); assert.equal(lab.state().player.clip, "idle");
});

test("top character selection separates painted and stick models while retaining the playback setting", () => {
  const lab = playground(); lab.human();
  assert.equal(lab.key("keydown", " "), false);
  lab.key("keydown", "w"); lab.key("keydown", "a");
  assert.equal(lab.state().player.direction, "NW");
  lab.select("guarin"); lab.key("keydown", " ");
  assert.equal(lab.state().player.clip, "cut");
  assert.equal(lab.state().characterId, "guarin");
  lab.stick(); assert.equal(lab.state().frameByFrame, false);
  assert.equal(lab.state().characterId, "wolf-stick");
  lab.manual(true); lab.select("wolf", wholeWolf);
  assert.equal(lab.state().frameByFrame, true);
  assert.equal(lab.state().characterId, "wolf");
  assert.equal(lab.state().player.direction, "E");
  assert.equal(lab.state().player.clip, "walk");
  lab.step(0); assert.equal(lab.text("step-frame"), "1 / 8");
});

test("every character can step in every available direction without resetting its frame or moving", () => {
  for (const [id, data] of [["guarin", atlas], ["wolf", wholeWolf], ["wolf-stick", sticks], ["human", human]]) {
    const lab = playground(); lab.select(id, data); lab.manual(true); lab.step(0);
    const root = lab.state().position;
    lab.key("keydown", " ");
    for (const direction of Object.keys(data.directions)) {
      const phase = lab.state().player.elapsedMs;
      lab.direction(direction);
      assert.equal(lab.state().player.direction, direction);
      assert.equal(lab.state().player.elapsedMs, phase);
      lab.key("keydown", "ArrowRight"); lab.step(1000);
      assert.equal(lab.state().player.elapsedMs, (phase + data.clips.walk.frames[0].durationMs) % animation.duration(data.clips.walk));
      assert.deepEqual(lab.state().position, root);
      assert.equal(lab.state().playing, false);
    }
  }
});

test("WASD selects all eight manual facings while Space and Right Arrow remain single frame steps", () => {
  for (const select of ["stick", "human"]) {
    const lab = playground(); lab[select](); lab.manual(true); lab.step(0);
    lab.key("keydown", " "); const phase = lab.state().player.elapsedMs, root = lab.state().position;
    for (const [heading, pressed] of [["N", ["w"]], ["NE", ["w", "d"]], ["E", ["d"]], ["SE", ["s", "d"]], ["S", ["s"]], ["SW", ["s", "a"]], ["W", ["a"]], ["NW", ["w", "a"]]]) {
      for (const key of pressed) lab.key("keydown", key);
      assert.equal(lab.state().player.direction, heading);
      assert.equal(lab.state().player.elapsedMs, phase);
      lab.step(5000); assert.deepEqual(lab.state().position, root);
      for (const key of pressed) lab.key("keyup", key);
      assert.equal(lab.state().player.clip, "walk");
    }
    lab.key("keydown", "ArrowRight"); assert.ok(lab.state().player.elapsedMs > phase);
  }
});

test("manual inspection supports other Guarin clips and cannot be resumed by presets or Play", () => {
  const lab = playground(); lab.manual(true); lab.inspect("cut"); lab.direction("NW"); lab.step(0);
  lab.key("keydown", " "); assert.equal(lab.text("step-frame"), "2 / 6");
  const before = lab.state(); lab.click("play"); lab.preset("tour"); lab.step(2000);
  assert.deepEqual(lab.state(), before);
  lab.manual(false); assert.equal(lab.state().player.direction, "NW");
  assert.equal(lab.state().playing, true);
});

test("character variants use the upper selector and playback uses a shared checkbox, without a view dropdown", () => {
  const html = readFileSync(new URL("index.html", import.meta.url), "utf8");
  const options = html.match(/<select id="character">(.*?)<\/select>/s)[1];
  for (const id of ["guarin", "human", "wolf", "wolf-stick"]) assert.ok(options.includes(`value="${id}"`));
  assert.match(html, /id="frame-by-frame" type="checkbox"/);
  assert.doesNotMatch(html, /id="view"|stick-view-controls|view-label/);
  assert.ok(html.indexOf('id="directions"') > html.indexOf('<aside class="controls">'));
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

test("whole-body pilot starts and resets in its actual available heading", () => {
  const lab = playground(); lab.select("wolf", wholeWolf); lab.step(0);
  assert.equal(lab.state().player.direction, "E");
  lab.key("keydown", "r"); lab.step(50);
  assert.equal(lab.state().player.direction, "E");
  assert.equal(lab.key("keydown", " "), false);
  assert.equal(lab.state().player.clip, "idle");
});

test("missing pilot headings cannot move a right-facing wolf sideways", () => {
  const lab = playground(); lab.select("wolf", wholeWolf); lab.step(0);
  lab.key("keydown", "a"); lab.step(100);
  assert.equal(lab.state().position[0], 450);
  assert.equal(lab.state().player.clip, "idle");
  lab.key("keyup", "a"); lab.key("keydown", "d"); lab.step(1000);
  assert.ok(Math.abs(lab.state().position[0] - 498.6) < 1e-8);
  lab.key("keydown", "w"); lab.step(1100);
  assert.ok(Math.abs(lab.state().position[0] - 498.6) < 1e-8);
  assert.equal(lab.state().player.clip, "idle");
});

test("pilot presets offer only drawings that exist", () => {
  const lab = playground(); lab.select("wolf", wholeWolf); lab.step(0);
  lab.preset("directions"); lab.step(1100);
  assert.equal(lab.state().player.clip, "idle");
  assert.equal(lab.state().player.direction, "E");
  lab.preset("tour"); lab.step(4000);
  assert.equal(lab.state().player.clip, "idle");
});

test("wolf cadence revision gives fewer pose changes and meaningful travel", () => {
  assert.equal(wholeWolf.clips.walk.fps, 8);
  assert.equal(wholeWolf.clips.walk.frames.length, 8);
  assert.equal(animation.duration(wholeWolf.clips.walk), 1000);
  const lab = playground(); lab.select("wolf", wholeWolf); lab.step(0);
  lab.key("keydown", "d"); lab.step(1000);
  assert.ok(Math.abs(lab.state().position[0] - 504) < 1e-8);
  assert.equal(animation.sample(wholeWolf.clips.walk, lab.state().player.elapsedMs).index, 0);
});

test("wolf travel follows stride when size and playback rate change", () => {
  function travel(size, speed, fps) {
    const lab = playground(); lab.select("wolf"); lab.size(size); lab.step(0);
    lab.key("keydown", "d"); lab.key("keydown", "s"); lab.tune(speed, fps); lab.step(900);
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
