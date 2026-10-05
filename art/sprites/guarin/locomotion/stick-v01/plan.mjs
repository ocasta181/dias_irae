export const headings = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SW: [-1, 1], W: [-1, 0], NW: [-1, -1] };
export const contract = { fps: 12, cycleMs: 1000, stride: 48, stance: .625, lift: 8, legLength: 22, hipHeight: 40, shoulderHeight: 96, standingHeight: 160, root: [128, 208], head: [88, 48, 80, 80] };

export function project(direction, forward, lateral, height) {
  const vector = headings[direction], length = Math.hypot(...vector), [x, y] = vector.map(value => value / length);
  return [128 + x * forward - y * lateral, 208 + Math.SQRT1_2 * (y * forward + x * lateral - height)];
}

export function footAt(phase, offset) {
  const relative = phase + offset, step = Math.floor(relative), q = relative - step;
  const reach = contract.stride * contract.stance / 2;
  if (q <= contract.stance) return { forward: reach - contract.stride * q, lift: 0, planted: true, contactForward: reach + contract.stride * (step - offset) };
  const u = (q - contract.stance) / (1 - contract.stance), u2 = u * u, u3 = u2 * u;
  const tangent = -contract.stride * (1 - contract.stance);
  return {
    forward: (2 * u3 - 3 * u2 + 1) * -reach + (u3 - 2 * u2 + u) * tangent + (-2 * u3 + 3 * u2) * reach + (u3 - u2) * tangent,
    lift: contract.lift * Math.sin(Math.PI * u) ** 2, planted: false, contactForward: null,
  };
}

export function humanPose(direction, phase, idle = false) {
  const feet = {}, arms = {}, rootForward = idle ? 0 : contract.stride * phase;
  const shoulder = project(direction, 0, 0, contract.shoulderHeight), pelvis = project(direction, 0, 0, contract.hipHeight);
  const lines = [
    [[88, 48], [168, 48], [168, 128], [88, 128], [88, 48]],
    [[128, 128], shoulder, pelvis],
    [project(direction, 0, -16, contract.shoulderHeight), project(direction, 0, 16, contract.shoulderHeight)],
    [project(direction, 0, -8, contract.hipHeight), project(direction, 0, 8, contract.hipHeight)],
  ];
  for (const [side, lateral, offset] of [["left", -8, 0], ["right", 8, .5]]) {
    const foot = idle ? { forward: 0, lift: 0, planted: true, contactForward: 0 } : footAt(phase, offset);
    const delta = foot.lift - contract.hipHeight, reach = Math.hypot(foot.forward, delta);
    const bend = Math.sqrt(contract.legLength ** 2 - reach ** 2 / 4);
    const knee = [foot.forward / 2 - delta / reach * bend, (foot.lift + contract.hipHeight) / 2 + foot.forward / reach * bend];
    const local = [[0, contract.hipHeight], knee, [foot.forward, foot.lift]];
    const points = local.map(([forward, height]) => project(direction, forward, lateral, height));
    feet[side] = { ...foot, lateral, local, points };
    const angle = idle ? 0 : -.18 * Math.cos(2 * Math.PI * (phase + offset));
    const elbow = [18 * Math.sin(angle), contract.shoulderHeight - 18 * Math.cos(angle)];
    const hand = [elbow[0] + 16 * Math.sin(angle + .15), elbow[1] - 16 * Math.cos(angle + .15)];
    const armLocal = [[0, contract.shoulderHeight], elbow, hand];
    const armPoints = armLocal.map(([forward, height]) => project(direction, forward, lateral * 2, height));
    arms[side] = { local: armLocal, points: armPoints };
    lines.push(armPoints, points);
  }
  return { phase, rootForward, feet, arms, lines, rect: [0, 0, 256, 256], pivot: contract.root, sourceStandingHeight: contract.standingHeight };
}

export function stickHumanAtlas(references) {
  const directions = {};
  for (const direction of Object.keys(headings)) {
    directions[direction] = {
      assessment: "Human walking block for review: fixed oversized head/torso, two short legs, small opposing arm swings. Start/stop and turning contact transitions remain a separate production gate.",
      frames: [humanPose(direction, 0, true), ...Array.from({ length: 12 }, (_, index) => humanPose(direction, (index + .5) / 12))],
    };
  }
  return {
    selection: { gameplay_id: "Human motion blocking", source_character: "S13 proportions / twelve-pose human v01" },
    sourceFrames: 13, contract,
    reviewStatus: "Human stick figure: twelve distinct walking poses over one second, plus a motionless standing pose. Oversized head and short legs follow Guarin's proportions. Ready for your movement review; no skin or equipment is drawn.",
    directions,
    clips: {
      idle: { label: "Stand", loop: true, fps: 1, frames: [{ source: 0, durationMs: 1000 }] },
      walk: { label: "Human walk", loop: true, fps: 12, frames: Array.from({ length: 12 }, (_, index) => ({ source: index + 1, durationMs: 1000 / 12 })) },
    },
    motion: { referenceHeight: 160, walkSpeed: 48 },
    references,
  };
}
