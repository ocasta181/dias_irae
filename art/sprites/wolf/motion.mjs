export const directions = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SW: [-1, 1], W: [-1, 0], NW: [-1, -1] };
export const origin = [96, 156];
export const referenceHeight = 96;
export const stride = 36;
export const walkDuration = 900;
export const limbs = { LH: { base: -25, lateral: -10, offset: 0 }, LF: { base: 25, lateral: -10, offset: .25 }, RH: { base: -25, lateral: 10, offset: .5 }, RF: { base: 25, lateral: 10, offset: .75 } };
export const clips = {
  idle: { label: "Quiet idle", fps: 8 / 2.4, loop: true, holds: Array(8).fill(300) },
  walk: { label: "Four-beat walk", fps: 24 / .9, loop: true, holds: Array(24).fill(37.5) },
  cut: { label: "Bite", fps: 12 / .72, loop: false, holds: [80, 80, 80, 35, 35, 35, 40, 45, 60, 75, 75, 80], events: [{ atMs: 275, name: "bite-contact-preview" }] },
  hurt: { label: "Recoil", fps: 8 / .42, loop: false, holds: [60, 45, 45, 50, 50, 50, 60, 60] },
  death: { label: "Collapse", fps: 12 / .96, loop: false, holds: Array(12).fill(80) },
};

export function project(direction, forward, lateral, height = 0) {
  const [rawX, rawY] = directions[direction];
  const length = Math.hypot(rawX, rawY);
  const x = rawX / length, y = rawY / length;
  return [origin[0] + x * forward - y * lateral, origin[1] + Math.SQRT1_2 * (y * forward + x * lateral - height)];
}

function smooth(value) {
  return value * value * (3 - 2 * value);
}

export function paw(phase, limb) {
  const q = ((phase - limb.offset) % 1 + 1) % 1;
  if (q <= .75) return { forward: limb.base + stride * .75 / 2 - stride * q, lift: 0, planted: true };
  const swing = (q - .75) / .25;
  return { forward: limb.base - stride * .75 / 2 + stride * .75 * smooth(swing), lift: 8 * Math.sin(Math.PI * swing) ** 2, planted: false };
}

export function joint(hip, ankle, bend, upper = 23, lower = 21) {
  const dx = ankle[0] - hip[0], dy = ankle[1] - hip[1];
  const distance = Math.hypot(dx, dy);
  if (distance > upper + lower || distance < Math.abs(upper - lower)) throw new Error("Unreachable wolf leg target");
  const along = (upper ** 2 - lower ** 2 + distance ** 2) / (2 * distance);
  const across = Math.sqrt(Math.max(0, upper ** 2 - along ** 2)) * bend;
  return [hip[0] + dx / distance * along - dy / distance * across, hip[1] + dy / distance * along + dx / distance * across];
}

export function pose(direction, clip, phase) {
  const progress = Math.min(1, Math.max(0, phase));
  const breath = clip === "idle" ? .35 * Math.sin(2 * Math.PI * phase) : 0;
  const bite = clip === "cut" ? Math.sin(Math.PI * progress) ** 2 : 0;
  const recoil = clip === "hurt" ? Math.sin(Math.PI * progress) ** 2 : 0;
  const fall = clip === "death" ? smooth(progress) : 0;
  const bob = clip === "walk" ? .6 * Math.sin(4 * Math.PI * phase) : 0;
  const bodyHeight = 36 + bob - 25 * fall;
  const lean = 3 * bite - 2 * recoil;
  const headForward = directions[direction][1] < 0 ? 34 : 44;
  const feet = {};
  for (const [id, limb] of Object.entries(limbs)) {
    const data = clip === "walk" ? paw(phase, limb) : { forward: limb.base * (1 - .2 * fall), lift: 0, planted: fall === 0 };
    const hip = [limb.base + lean, bodyHeight];
    const ankle = [data.forward, data.lift + 3];
    const knee = joint(hip, ankle, id.endsWith("F") ? -1 : 1);
    const lateral = limb.lateral * (1 - .4 * fall);
    feet[id] = { ...data, lateral, local: { hip, knee, ankle }, hip: project(direction, hip[0], lateral, hip[1]), knee: project(direction, knee[0], lateral, knee[1]), ankle: project(direction, ankle[0], lateral, ankle[1]), sole: project(direction, data.forward, lateral, data.lift) };
  }
  return {
    rootForward: clip === "walk" ? stride * phase : 0,
    body: project(direction, lean, 0, bodyHeight + breath),
    head: project(direction, headForward + 5 * bite - 3 * recoil - 12 * fall, 0, 70 + breath - 42 * fall),
    headAngle: (-8 * bite + 5 * recoil + 12 * fall) * Math.PI / 180,
    headPart: fall > .75 ? "rest" : bite > .75 ? "open" : "head",
    tail: project(direction, -34 + 14 * fall, 0, bodyHeight - 3),
    tailAngle: clip === "walk" ? .025 * Math.sin(2 * Math.PI * phase) : 0,
    fall, feet,
  };
}

export function frames(direction, clip) {
  let start = 0;
  const total = clips[clip].holds.reduce((sum, hold) => sum + hold, 0);
  return clips[clip].holds.map((durationMs, index) => {
    const phase = clip === "death" ? index / (clips[clip].holds.length - 1) : (start + durationMs / 2) / total;
    const entry = { id: `${direction}-${clip}-${index + 1}`, startMs: start, durationMs, phase, ...pose(direction, clip, phase) };
    start += durationMs;
    return entry;
  });
}
