export function duration(clip) {
  return clip.frames.reduce((total, frame) => total + frame.durationMs, 0);
}

export function sample(clip, elapsedMs) {
  const total = duration(clip);
  const clock = Math.round(elapsedMs * 1000) / 1000;
  const time = clip.loop ? clock % total : Math.min(clock, total - 0.001);
  let end = 0;
  for (let index = 0; index < clip.frames.length; index += 1) {
    end += clip.frames[index].durationMs;
    if (time < end) {
      return { index, source: clip.frames[index].source, complete: !clip.loop && elapsedMs >= total };
    }
  }
}

export function createPlayer() {
  return { clip: "idle", elapsedMs: 0, direction: "SE", moving: false, guarding: false, praying: false, terminal: false };
}

function enter(player, clip) {
  return { ...player, clip, elapsedMs: 0 };
}

function locomotion(player) {
  return player.moving ? "walk" : "idle";
}

export function request(player, action) {
  if (action === "reset") return createPlayer();
  if (player.terminal) return player;
  if (action === "death") return enter({ ...player, terminal: true, guarding: false, praying: false }, "death");
  if (action === "hurt") return enter({ ...player, guarding: false, praying: false }, "hurt");
  if (action === "walk" || action === "idle") {
    const next = { ...player, moving: action === "walk" };
    return ["idle", "walk"].includes(next.clip) && next.clip !== locomotion(next) ? enter(next, locomotion(next)) : next;
  }
  if (action === "guard-off") {
    const next = { ...player, guarding: false };
    return next.clip === "guard_hold" ? enter(next, "guard_out") : next;
  }
  if (action === "prayer-off") {
    const next = { ...player, praying: false };
    return next.clip === "channel" ? enter(next, "rise") : next;
  }
  if (!["idle", "walk"].includes(player.clip)) return player;
  if (action === "guard") return enter({ ...player, guarding: true }, "guard_in");
  if (action === "prayer") return enter({ ...player, praying: true }, "kneel");
  return enter(player, action);
}

export function face(player, direction) {
  return ["idle", "walk"].includes(player.clip) ? { ...player, direction } : player;
}

function nextClip(player) {
  if (player.clip === "guard_in") return player.guarding ? "guard_hold" : "guard_out";
  if (player.clip === "kneel") return player.praying ? "channel" : "rise";
  return locomotion(player);
}

export function advance(player, deltaMs, clips) {
  let next = { ...player };
  const events = [];
  let remaining = deltaMs;
  while (remaining > 0) {
    const clip = clips[next.clip];
    const total = duration(clip);
    const step = clip.loop ? remaining : Math.min(remaining, Math.max(0, total - next.elapsedMs));
    const before = next.elapsedMs;
    next.elapsedMs += step;
    for (const event of clip.events ?? []) {
      if (!clip.loop && event.atMs > before && event.atMs <= next.elapsedMs) events.push(event.name);
    }
    remaining -= step;
    if (clip.loop) break;
    if (next.elapsedMs >= total) {
      if (next.terminal) break;
      next = enter(next, nextClip(next));
    }
  }
  return { player: next, events };
}

export function inspect(player, clip) {
  return { ...player, clip, elapsedMs: 0, terminal: clip === "death", guarding: clip.startsWith("guard"), praying: ["kneel", "channel", "rise"].includes(clip) };
}
