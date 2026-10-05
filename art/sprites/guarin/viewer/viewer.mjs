import { advance, createPlayer, duration, face, inspect, request, sample, visibleDelta } from "./animation.mjs?v=2";
import { stickWolfAtlas } from "./stick-wolf.mjs?v=2";

const element = id => document.getElementById(id);
const stage = element("stage");
const context = stage.getContext("2d");
const images = new Map();
const masks = new WeakMap();
const logs = [];
const keys = new Set();
const movementKeys = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"]);
const directionVectors = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SW: [-1, 1], W: [-1, 0], NW: [-1, -1] };
const groundProjection = Math.sin(Math.PI / 4);
const sequences = {
  strike: { label: "Walk → strike → walk", steps: [{ at: 0, action: "walk", direction: "E" }, { at: 900, action: "cut" }, { at: 2400, action: "idle" }] },
  directions: { label: "Walk in all 8 directions", steps: [...Object.keys(directionVectors).map((direction, index) => ({ at: index * 1000, action: "walk", direction })), { at: 8000, action: "idle" }] },
  guard: { label: "Guard → release → strike", steps: [{ at: 0, action: "guard" }, { at: 1200, action: "guard-off" }, { at: 1700, action: "cut" }, { at: 2800, action: "idle" }] },
  prayer: { label: "Kneel → pray → rise", steps: [{ at: 0, action: "prayer" }, { at: 1800, action: "prayer-off" }, { at: 2500, action: "idle" }] },
  defeat: { label: "Take hit → fall → hold", steps: [{ at: 0, action: "hurt" }, { at: 1000, action: "death" }, { at: 2200, action: "idle" }] },
  tour: { label: "Full state tour", steps: [{ at: 200, action: "walk" }, { at: 1200, action: "cut" }, { at: 2300, action: "idle" }, { at: 2500, action: "guard" }, { at: 3400, action: "guard-off" }, { at: 4000, action: "prayer" }, { at: 5000, action: "hurt" }, { at: 5900, action: "death" }, { at: 7000, action: "idle" }] },
};
let atlas;
let spriteAtlas, stickAtlas;
let viewMode = "sprite";
let player = createPlayer();
let playing = true;
let lastTime;
let clipRate = 6;
let lastClip;
let stripKey;
let position = [450, 420];
let extent;
let scheduled = [];
let scenarioTime = 0;
const characters = { guarin: { root: "../", size: 160 }, wolf: { root: "../../wolf/whole-body/", size: 96 }, human: { root: "../locomotion/stick-v01/", size: 160, review: "README.md", assessment: "README.md" } };
let characterId = "guarin";
let loadVersion = 0;
let loading = false;
let lastDrawn;
let drawnPoses = [], seenPoses = new Set(), limitedUpdates = 0;

function supports(action) {
  const clip = { guard: "guard_in", "guard-off": "guard_out", prayer: "kneel", "prayer-off": "rise" }[action] ?? action;
  return action === "reset" || Boolean(atlas.clips[clip]);
}

function actorSequences() {
  const result = { ...sequences };
  const facings = Object.keys(atlas.directions);
  result.directions = { label: facings.length === 1 ? `Walk → stand (${facings[0]})` : `Walk in all ${facings.length} directions`, steps: [...facings.map((direction, index) => ({ at: index * 1000, action: "walk", direction })), { at: facings.length * 1000, action: "idle" }] };
  if (atlas.clips.cut) result.strike = { ...sequences.strike, label: `Walk → ${atlas.clips.cut.label.toLowerCase()} → walk`, steps: sequences.strike.steps.map(step => step.direction ? { ...step, direction: atlas.directions.E ? "E" : facings[0] } : step) };
  if (characterId === "wolf") result.tour = { label: "Wolf state tour", steps: [{ at: 200, action: "walk" }, { at: 1200, action: "cut" }, { at: 2300, action: "idle" }, { at: 3000, action: "hurt" }, { at: 4100, action: "death" }].filter(step => supports(step.action)) };
  if (characterId === "human") result.tour = { label: "Stand → walk → stand", steps: [{ at: 0, action: "idle" }, { at: 500, action: "walk" }, { at: 2500, action: "idle" }] };
  return Object.fromEntries(Object.entries(result).filter(([, sequence]) => sequence.steps.every(step => supports(step.action))));
}

function applyCharacter(id, nextAtlas, loadedImages, nextStickAtlas) {
  characterId = id;
  spriteAtlas = nextAtlas; stickAtlas = nextStickAtlas;
  atlas = nextAtlas;
  images.clear();
  for (const [path, image] of loadedImages) images.set(path, image);
  keys.clear(); scheduled = []; scenarioTime = 0; logs.length = 0;
  player = createPlayer(); playing = true; lastTime = undefined; lastClip = undefined; stripKey = undefined;
  lastDrawn = undefined;
  player.direction = atlas.directions.SE ? "SE" : Object.keys(atlas.directions)[0];
  position = [450, stage.height * .75];
  const frames = Object.values(atlas.directions).flatMap(page => page.frames);
  extent = {
    left: Math.max(...frames.map(frame => frame.pivot[0] / frame.sourceStandingHeight)),
    right: Math.max(...frames.map(frame => (frame.rect[2] - frame.pivot[0]) / frame.sourceStandingHeight)),
    above: Math.max(...frames.map(frame => frame.pivot[1] / frame.sourceStandingHeight)),
    below: Math.max(...frames.map(frame => (frame.rect[3] - frame.pivot[1]) / frame.sourceStandingHeight)),
  };
  element("character").value = id;
  element("size").value = characters[id].size;
  element("play").textContent = "Pause";
  element("basis").textContent = `${atlas.selection.gameplay_id} / ${atlas.selection.source_character} · ${atlas.sourceFrames} source frames · ${Object.keys(atlas.directions).length} ${Object.keys(atlas.directions).length === 1 ? "direction" : "directions"} · ${Object.keys(atlas.clips).length} clips`;
  element("load-status").textContent = atlas.reviewStatus;
  element("stage-help").textContent = `${Object.keys(atlas.directions).length === 1 ? "D or Right arrow to walk; other headings pending" : "WASD or arrows to move"}${supports("cut") ? " · Space to strike" : " · Attack pending"}`;
  stage.setAttribute("aria-label", `Character playground. ${element("stage-help").textContent}`);
  element("shortcuts").textContent = `${supports("guard") ? "Hold G to guard; P starts/stops prayer; " : ""}${supports("hurt") ? "H hurts; " : ""}${supports("death") ? "K defeats; " : ""}R resets. Inputs keep their normal keyboard behavior.`;
  for (const [name, file] of [["review", "manifest.md"], ["assessment", "assessment.md"], ["metadata", "atlas.json"]]) element(`sprite-${name}`).href = characters[id].root + (characters[id][name] ?? file);
  element("references").replaceChildren();
  for (const reference of atlas.references) {
    const figure = document.createElement("figure"), image = document.createElement("img"), caption = document.createElement("figcaption");
    image.src = reference.url; image.alt = reference.label; caption.textContent = reference.label; figure.append(image, caption); element("references").append(figure);
  }
  populateActorControls(); updateClipControls(); cancelSequence();
  setView(stickAtlas ? "stick-move" : "sprite");
  document.querySelector(".lab").hidden = false; document.querySelector(".frames").hidden = false;
  log(`${id} ready. Art remains under review; action buttons test transitions, clip selector inspects individual tags.`);
}

async function loadCharacter(id) {
  const version = ++loadVersion;
  loading = true;
  element("load-status").textContent = `Loading ${id}…`;
  try {
    const response = await fetch(`${characters[id].root}atlas.json`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Sheet data unavailable (${response.status})`);
    const nextAtlas = await response.json();
    if (!Object.keys(nextAtlas.directions).length || !nextAtlas.clips.idle) throw new Error("Required starting direction or idle clip is missing.");
    let nextStickAtlas;
    if (id === "wolf") {
      const planResponse = await fetch(`${characters.wolf.root}walk-v06/targets.json`, { cache: "no-store" });
      if (!planResponse.ok) throw new Error(`Stick plan unavailable (${planResponse.status})`);
      nextStickAtlas = stickWolfAtlas(await planResponse.json(), nextAtlas.references);
    }
    if (id === "human") nextStickAtlas = nextAtlas;
    const sourcePaths = new Set(Object.values(nextAtlas.directions).flatMap(page => page.frames.map(frame => frame.image)).filter(Boolean));
    const loadedImages = new Map();
    for (const path of sourcePaths) await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => { loadedImages.set(path, image); resolve(); };
      image.onerror = () => reject(new Error(`Source image cannot be loaded: ${path}`));
      image.src = `${characters[id].root}${path}`;
    });
    if (version === loadVersion) applyCharacter(id, nextAtlas, loadedImages, nextStickAtlas);
  } catch (error) {
    if (version === loadVersion) { element("load-status").textContent = `Cannot load ${id}: ${error.message}`; element("character").value = characterId; }
  } finally {
    if (version === loadVersion) { loading = false; lastTime = undefined; }
  }
}

function log(message) {
  logs.unshift(message);
  element("events").textContent = logs.slice(0, 14).join("\n");
}

function cancelSequence() {
  if (scheduled.length) player = request(request(request(player, "idle"), "guard-off"), "prayer-off");
  scheduled = [];
  element("sequence-status").textContent = viewMode === "stick-step" ? "Paused. Every press advances one walking frame." : "Keyboard control ready.";
  for (const button of document.querySelectorAll("[data-sequence]")) button.setAttribute("aria-pressed", "false");
}

function updateClipControls() {
  element("clip").value = player.clip;
  if (lastClip !== player.clip) {
    clipRate = atlas.clips[player.clip].fps;
    element("fps").value = Number(clipRate.toFixed(2));
    lastClip = player.clip;
  }
  element("frame").max = atlas.clips[player.clip].frames.length - 1;
  for (const button of document.querySelectorAll("[data-direction]")) {
    button.setAttribute("aria-pressed", String(button.dataset.direction === player.direction));
  }
}

function act(action, fromSequence = false) {
  if (loading || !supports(action)) return;
  if (viewMode === "stick-step") { if (action === "reset") seek(0); return; }
  if (!fromSequence) cancelSequence();
  const before = player.clip;
  player = request(player, action);
  if (action === "reset") { position = [450, stage.height * .75]; player.direction = atlas.directions.SE ? "SE" : Object.keys(atlas.directions)[0]; }
  playing = true;
  element("play").textContent = "Pause";
  updateClipControls();
  log(`${player.direction} · ${action}: ${before} → ${player.clip}`);
}

function renderPose(target, image, frame, foot, scale, alpha = 1) {
  target.save();
  target.globalAlpha = alpha;
  target.imageSmoothingEnabled = element("sampling").value === "linear";
  const [x, y, width, height] = frame.rect;
  target.translate(foot[0] - frame.pivot[0] * scale, foot[1] - frame.pivot[1] * scale);
  target.scale(scale, scale);
  if (frame.lines) {
    target.strokeStyle = element("background").value === "light" ? "#151515" : "#eeeeee";
    target.lineWidth = 1.4; target.lineCap = "round"; target.lineJoin = "round";
    for (const points of frame.lines) {
      target.beginPath(); target.moveTo(...points[0]);
      for (const point of points.slice(1)) target.lineTo(...point);
      target.stroke();
    }
    target.restore(); return;
  }
  if (frame.maskPath) {
    if (!masks.has(frame)) masks.set(frame, new Path2D(frame.maskPath));
    target.clip(masks.get(frame));
  }
  target.drawImage(image, x, y, width, height, 0, 0, width, height);
  target.restore();
}

function background() {
  const mode = element("background").value;
  context.fillStyle = mode === "light" ? "#bbb39d" : "#181b15";
  context.fillRect(0, 0, stage.width, stage.height);
  if (mode === "checker") {
    for (let y = 0; y < stage.height; y += 24) {
      for (let x = 0; x < stage.width; x += 24) {
        context.fillStyle = (x / 24 + y / 24) % 2 ? "#55574e" : "#77796f";
        context.fillRect(x, y, 24, 24);
      }
    }
  } else {
    context.strokeStyle = mode === "light" ? "#999281" : "#30372a";
    context.lineWidth = 1;
    const run = stage.height / groundProjection;
    for (let x = -run; x < stage.width + run; x += 100) {
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x + run, stage.height); context.stroke();
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x - run, stage.height); context.stroke();
    }
  }
}

function updateStrip(page, clip) {
  const key = `${player.direction}:${player.clip}`;
  if (stripKey === key) return;
  stripKey = key;
  element("frame-strip").replaceChildren();
  const poses = clip.frames.map(entry => page.frames[entry.source]);
  const left = Math.max(...poses.map(frame => frame.pivot[0] / frame.sourceStandingHeight));
  const right = Math.max(...poses.map(frame => (frame.rect[2] - frame.pivot[0]) / frame.sourceStandingHeight));
  const above = Math.max(...poses.map(frame => frame.pivot[1] / frame.sourceStandingHeight));
  const below = Math.max(...poses.map(frame => (frame.rect[3] - frame.pivot[1]) / frame.sourceStandingHeight));
  const height = Math.min(180 / (left + right), 180 / (above + below));
  const foot = [10 + left * height, 10 + above * height];
  clip.frames.forEach((entry, index) => {
    const button = document.createElement("button");
    button.className = "frame-button";
    button.dataset.frameIndex = index;
    button.setAttribute("aria-label", `Frame ${index + 1}`);
    const preview = document.createElement("canvas");
    preview.width = 200; preview.height = 200;
    const frame = page.frames[entry.source];
    renderPose(preview.getContext("2d"), images.get(frame.image), frame, foot, height / frame.sourceStandingHeight);
    const caption = document.createElement("span");
    caption.textContent = `${index + 1} · ${Math.round(entry.durationMs)} ms`;
    button.append(preview, caption);
    button.addEventListener("click", () => seek(index));
    element("frame-strip").append(button);
  });
}

function draw() {
  const display = stage.getBoundingClientRect();
  const canvasHeight = Math.round(stage.width * display.height / display.width);
  if (canvasHeight !== stage.height) {
    position[1] *= canvasHeight / stage.height;
    stage.height = canvasHeight;
  }
  const size = element("size");
  size.max = Math.floor(Math.min(240, (display.width - 24) / (extent.left + extent.right), (display.height - 24) / (extent.above + extent.below)) / 8) * 8;
  size.value = Math.min(Number(size.value), Number(size.max));
  element("size-label").textContent = `${size.value} px`;
  const page = atlas.directions[player.direction];
  const clip = atlas.clips[player.clip];
  const current = sample(clip, player.elapsedMs);
  const frame = page.frames[current.source];
  const previewHeight = Number(size.value) * stage.width / display.width;
  const margin = 12 * stage.width / display.width;
  position[0] = Math.max(extent.left * previewHeight + margin, Math.min(stage.width - extent.right * previewHeight - margin, position[0]));
  position[1] = Math.max(extent.above * previewHeight + margin, Math.min(stage.height - extent.below * previewHeight - margin, position[1]));
  const scale = previewHeight / frame.sourceStandingHeight;
  background();
  if (!frame.lines) {
    context.fillStyle = "#05080445";
    context.beginPath(); context.ellipse(position[0], position[1], 30 * scale, 13 * scale, 0, 0, Math.PI * 2); context.fill();
  }
  if (element("onion").checked) {
    const previous = clip.frames[(current.index + clip.frames.length - 1) % clip.frames.length];
    const previousFrame = page.frames[previous.source];
    renderPose(context, images.get(previousFrame.image), previousFrame, position, previewHeight / previousFrame.sourceStandingHeight, .3);
  }
  renderPose(context, images.get(frame.image), frame, position, scale);
  const drawKey = `${player.clip}:${player.direction}`;
  const freshTrace = lastDrawn?.key !== drawKey || player.elapsedMs < lastDrawn.elapsedMs;
  if (freshTrace) {
    drawnPoses = []; seenPoses = new Set(); limitedUpdates = 0;
  }
  if (freshTrace || lastDrawn.index !== current.index) drawnPoses.push(current.index + 1);
  seenPoses.add(current.index);
  lastDrawn = { key: drawKey, index: current.index, elapsedMs: player.elapsedMs };
  element("playback-proof").textContent = `Drawn poses: ${drawnPoses.slice(-16).join(" → ")} · ${seenPoses.size}/${clip.frames.length} seen · ${limitedUpdates} slow updates limited`;
  if (element("guides").checked && !frame.lines) {
    context.strokeStyle = "#d2b877";
    context.lineWidth = 1;
    context.beginPath(); context.moveTo(position[0] - 9, position[1]); context.lineTo(position[0] + 9, position[1]);
    context.moveTo(position[0], position[1] - 9); context.lineTo(position[0], position[1] + 9); context.stroke();
    context.strokeStyle = "#c8bea555";
    context.strokeRect(position[0] - frame.pivot[0] * scale, position[1] - frame.pivot[1] * scale, frame.rect[2] * scale, frame.rect[3] * scale);
    for (const mark of Object.values(frame.landmarks ?? {})) {
      const [px, py] = mark.point.map((value, index) => position[index] + (value - frame.trimOffset[index] - frame.pivot[index]) * scale);
      context.fillStyle = mark.planted ? "#7cc887" : "#e6a75d";
      context.fillRect(px - 2, py - 2, 4, 4);
    }
  }
  updateStrip(page, clip);
  element("frame").value = current.index;
  element("frame-label").textContent = `${current.index + 1} / ${clip.frames.length}`;
  element("walk-frame").textContent = `${current.index + 1} / ${clip.frames.length}`;
  const text = `${clip.label} · ${player.direction} · pose ${current.index + 1}/${clip.frames.length} · ${viewMode === "stick-step" ? "paused · one frame per press" : `${Number(clipRate.toFixed(2))} FPS · ${current.complete ? "held final pose" : clip.loop ? "loop" : "one shot"}`}`;
  if (element("readout").textContent !== text) element("readout").textContent = text;
  element("quality").textContent = page.assessment;
  for (const button of document.querySelectorAll(".frame-button")) button.setAttribute("aria-pressed", String(Number(button.dataset.frameIndex) === current.index));
}

function seek(index) {
  cancelSequence();
  const clip = atlas.clips[player.clip];
  const bounded = Math.max(0, Math.min(index, clip.frames.length - 1));
  player.elapsedMs = clip.frames.slice(0, bounded).reduce((total, frame) => total + frame.durationMs, 0);
  playing = false;
  element("play").textContent = "Play";
  draw();
}

function stepWalking(offset) {
  const clip = atlas.clips.walk;
  seek((sample(clip, player.elapsedMs).index + offset + clip.frames.length) % clip.frames.length);
}

function setView(mode) {
  if (characterId === "human" && mode === "sprite") mode = "stick-move";
  viewMode = stickAtlas && mode !== "sprite" ? mode : "sprite";
  atlas = viewMode === "sprite" ? spriteAtlas : stickAtlas;
  keys.clear(); scheduled = []; player = createPlayer();
  player.direction = atlas.directions.SE && (viewMode === "sprite" || characterId === "human") ? "SE" : Object.keys(atlas.directions).find(direction => direction === "E") ?? Object.keys(atlas.directions)[0];
  if (viewMode === "stick-step") player = inspect(player, "walk");
  playing = viewMode !== "stick-step";
  lastTime = undefined; lastClip = undefined; stripKey = undefined; lastDrawn = undefined;
  element("view").value = viewMode;
  element("stick-view-controls").hidden = !stickAtlas;
  element("view-label").textContent = characterId === "human" ? "Human view" : "Wolf view";
  element("sprite-view").hidden = characterId === "human";
  element("sprite-view").disabled = characterId === "human";
  element("walk-step-controls").hidden = viewMode !== "stick-step";
  element("play").textContent = playing ? "Pause" : "Play";
  for (const id of ["play", "clip", "speed", "fps"]) element(id).disabled = viewMode === "stick-step";
  element("load-status").textContent = atlas.reviewStatus;
  element("basis").textContent = `${atlas.selection.gameplay_id} / ${atlas.selection.source_character} · ${atlas.sourceFrames} source frames · ${Object.keys(atlas.directions).length} ${Object.keys(atlas.directions).length === 1 ? "direction" : "directions"} · ${Object.keys(atlas.clips).length} clips`;
  if (viewMode !== "sprite") {
    element("stage-help").textContent = viewMode === "stick-step" ? "Space or Right Arrow: next frame · Left Arrow: previous frame · twelve walking poses, paused" : "WASD or arrows: move the stick figure · release: stand still";
    element("shortcuts").textContent = "Stick figure motion plan. No painted skin or attack animation.";
    stage.setAttribute("aria-label", `Stick figure playground. ${element("stage-help").textContent}`);
  } else {
    element("stage-help").textContent = `${Object.keys(atlas.directions).length === 1 ? "D or Right arrow to walk; other headings pending" : "WASD or arrows to move"}${supports("cut") ? " · Space to strike" : " · Attack pending"}`;
    element("shortcuts").textContent = `${supports("guard") ? "Hold G to guard; P starts/stops prayer; " : ""}${supports("hurt") ? "H hurts; " : ""}${supports("death") ? "K defeats; " : ""}R resets. Inputs keep their normal keyboard behavior.`;
    stage.setAttribute("aria-label", `Character playground. ${element("stage-help").textContent}`);
  }
  populateActorControls(); updateClipControls(); cancelSequence();
  for (const button of document.querySelectorAll("[data-action], [data-sequence]")) button.disabled = viewMode === "stick-step" && button.dataset.action !== "reset";
  if (viewMode === "stick-step") element("sequence-status").textContent = "Paused. Every press advances one walking frame.";
}

function movement() {
  const x = Number(keys.has("ArrowRight") || keys.has("d")) - Number(keys.has("ArrowLeft") || keys.has("a"));
  const y = Number(keys.has("ArrowDown") || keys.has("s")) - Number(keys.has("ArrowUp") || keys.has("w"));
  if (x || y) {
    const direction = [["NW", "N", "NE"], ["W", "S", "E"], ["SW", "S", "SE"]][y + 1][x + 1];
    if (!atlas.directions[direction] || !supports("walk")) { player = request(player, "idle"); updateClipControls(); return [0, 0]; }
    player = face(player, direction);
    player = request(player, "walk");
  } else player = request(player, "idle");
  updateClipControls();
  return [x, y];
}

function advancePreview(delta) {
  let remaining = delta;
  while (remaining > 0) {
    if (keys.size && player.clip === "walk") movement();
    const before = player.clip;
    const clip = atlas.clips[before];
    const rate = Number(element("speed").value) * clipRate / clip.fps;
    const step = clip.loop || player.terminal ? remaining : Math.min(remaining, (duration(clip) - player.elapsedMs) / rate);
    const result = advance(player, step * rate, atlas.clips);
    player = result.player;
    for (const event of result.events) log(`${player.direction} · ${event}`);
    if (before !== player.clip) log(`completed: ${before} → ${player.clip}`);
    if ((keys.size || scheduled.length) && before === "walk") {
      const [x, y] = keys.size ? movement() : directionVectors[player.direction];
      const length = Math.hypot(x, y) || 1;
      const pixels = stage.width / stage.getBoundingClientRect().width;
      const travel = atlas.motion ? atlas.motion.walkSpeed / 1000 * Number(element("size").value) / atlas.motion.referenceHeight * rate : .14;
      position[0] += x / length * step * travel * pixels;
      position[1] += y / length * step * travel * groundProjection * pixels;
    }
    remaining -= step;
    updateClipControls();
  }
}

function tick(time) {
  if (loading || !atlas) { lastTime = undefined; requestAnimationFrame(tick); return; }
  let delta = lastTime === undefined ? 0 : Math.max(0, time - lastTime);
  lastTime = time;
  if (playing && !document.hidden) {
    if (element("preserve-frames").checked) {
      const rawDelta = delta, clip = atlas.clips[player.clip];
      const rate = Number(element("speed").value) * clipRate / clip.fps;
      delta = lastDrawn?.key === `${player.clip}:${player.direction}` && player.elapsedMs >= lastDrawn.elapsedMs
        ? visibleDelta(clip, player.elapsedMs, delta * rate) / rate : 0;
      if (scheduled.length) delta = Math.min(delta, Math.max(0, scheduled[0].at - scenarioTime));
      if (delta < rawDelta - .001) limitedUpdates++;
    }
    if (scheduled.length) {
      const end = scenarioTime + delta;
      while (scheduled.length && scheduled[0].at <= end) {
        const step = scheduled[0];
        advancePreview(step.at - scenarioTime);
        scenarioTime = step.at;
        scheduled.shift();
        if (step.direction) player = face(player, step.direction);
        act(step.action, true);
      }
      advancePreview(end - scenarioTime);
      scenarioTime = end;
      if (!scheduled.length) {
        cancelSequence();
        element("sequence-status").textContent = player.terminal ? "Defeated. Reset character to play again." : "Sequence complete. Keyboard control ready.";
      }
    } else advancePreview(delta);
  }
  draw();
  requestAnimationFrame(tick);
}

function populateActorControls() {
  element("clip").replaceChildren(); element("directions").replaceChildren(); document.querySelector(".sequences").replaceChildren();
  for (const [id, clip] of Object.entries(atlas.clips)) {
    const option = document.createElement("option"); option.value = id; option.textContent = clip.label; element("clip").append(option);
  }
  for (const direction of ["NW", "N", "NE", "W", null, "E", "SW", "S", "SE"]) {
    const button = document.createElement(direction ? "button" : "span");
    if (direction) {
      button.textContent = direction; button.dataset.direction = direction; button.disabled = !atlas.directions[direction];
      button.addEventListener("click", () => {
        cancelSequence();
        player.direction = direction;
        updateClipControls();
        log(`Inspect direction: ${direction}`);
      });
    }
    element("directions").append(button);
  }
  for (const button of document.querySelectorAll("[data-action]")) {
    button.hidden = !supports(button.dataset.action);
    if (button.dataset.action === "cut" && atlas.clips.cut) button.textContent = atlas.clips.cut.label;
  }
  for (const [id, sequence] of Object.entries(actorSequences())) {
    const button = document.createElement("button");
    button.dataset.sequence = id; button.textContent = sequence.label; button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      keys.clear(); act("reset"); scenarioTime = 0; scheduled = [...sequence.steps];
      button.setAttribute("aria-pressed", "true");
      element("sequence-status").textContent = `Running: ${sequence.label}. Move or strike to take control.`;
      log(`Sequence: ${sequence.label}`);
    });
    document.querySelector(".sequences").append(button);
  }
}

function wireControls() {
  if (atlas) populateActorControls();
  element("character").addEventListener("change", () => loadCharacter(element("character").value));
  element("view").addEventListener("change", () => { setView(element("view").value); draw(); stage.focus(); });
  element("walk-next").addEventListener("click", () => stepWalking(1));
  element("walk-previous").addEventListener("click", () => stepWalking(-1));
  for (const button of document.querySelectorAll("[data-action]")) button.addEventListener("click", () => act(button.dataset.action));
  element("clip").addEventListener("change", () => { cancelSequence(); player = inspect(player, element("clip").value); updateClipControls(); stripKey = undefined; draw(); });
  element("play").addEventListener("click", () => { playing = !playing; element("play").textContent = playing ? "Pause" : "Play"; });
  element("previous").addEventListener("click", () => viewMode === "stick-step" ? stepWalking(-1) : seek(sample(atlas.clips[player.clip], player.elapsedMs).index - 1));
  element("next").addEventListener("click", () => viewMode === "stick-step" ? stepWalking(1) : seek(sample(atlas.clips[player.clip], player.elapsedMs).index + 1));
  element("restart").addEventListener("click", () => { if (viewMode === "stick-step") { seek(0); return; } cancelSequence(); player.elapsedMs = 0; playing = true; element("play").textContent = "Pause"; });
  element("frame").addEventListener("input", () => seek(Number(element("frame").value)));
  element("speed").addEventListener("input", () => { element("speed-label").textContent = `${element("speed").value}×`; });
  element("size").addEventListener("input", () => { element("size-label").textContent = `${element("size").value} px`; });
  element("fps").addEventListener("change", () => { clipRate = Math.max(1, Math.min(30, Number(element("fps").value) || atlas.clips[player.clip].fps)); element("fps").value = clipRate; });
  element("sampling").addEventListener("change", () => { stripKey = undefined; });
  document.addEventListener("keydown", event => {
    if (loading) return;
    if (event.target.closest("input, select, textarea, [contenteditable=true]") || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (viewMode === "stick-step") {
      if ([" ", "ArrowRight", "ArrowLeft"].includes(key)) {
        event.preventDefault();
        if (!event.repeat) stepWalking(key === "ArrowLeft" ? -1 : 1);
      } else if (movementKeys.has(key)) event.preventDefault();
      return;
    }
    if (movementKeys.has(key)) {
      event.preventDefault();
      cancelSequence();
      keys.add(key);
      movement();
      playing = true;
      element("play").textContent = "Pause";
    }
    if (event.repeat) { if (key === " ") event.preventDefault(); return; }
    const action = { " ": "cut", g: "guard", h: "hurt", k: "death", r: "reset", p: player.praying ? "prayer-off" : "prayer" }[key];
    if (action && supports(action)) { event.preventDefault(); if (key === "g") keys.add(key); act(action); }
  });
  document.addEventListener("keyup", event => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const held = keys.delete(key);
    if (held && key === "g") act("guard-off");
    if (held && movementKeys.has(key)) movement();
  });
  function releaseKeys() {
    if (!keys.size) return;
    keys.clear();
    player = request(player, "idle");
    player = request(player, "guard-off");
  }
  window.addEventListener("blur", releaseKeys);
  document.addEventListener("visibilitychange", () => { lastTime = undefined; releaseKeys(); });
}

async function start() {
  wireControls();
  requestAnimationFrame(tick);
  const requested = new URLSearchParams(window.location.search).get("character");
  await loadCharacter(characters[requested] ? requested : "guarin");
}

start().catch(error => { element("load-status").textContent = `Cannot start: ${error.message}`; });
