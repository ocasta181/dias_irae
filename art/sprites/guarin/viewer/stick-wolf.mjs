const headings = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SW: [-1, 1], W: [-1, 0], NW: [-1, -1] };

export function stickWolfAtlas(plan, references) {
  if (plan.fps !== 12 || plan.poses?.length !== 12 || Math.abs(plan.poses.reduce((sum, pose) => sum + pose.durationMs, 0) - 1000) > .001) {
    throw new Error("The stick walk requires twelve planned poses across one second.");
  }
  const directions = {};
  for (const [direction, vector] of Object.entries(headings)) {
    const [x, y] = vector.map(value => value / Math.hypot(...vector));
    const project = (forward, lateral, height) => [96 + x * forward - y * lateral, 156 + Math.SQRT1_2 * (y * forward + x * lateral - height)];
    const hip = project(-16, 0, 22), shoulder = project(16, 0, 22);
    directions[direction] = {
      assessment: "Planned skeleton only; projected into eight headings. This does not verify painted animation.",
      frames: plan.poses.map(pose => ({
        rect: [0, 0, 192, 192], pivot: pose.root, sourceStandingHeight: 64,
        lines: [
          [project(-35, 0, 9), hip], [hip, shoulder],
          [shoulder, project(26, 0, 40), project(48, 0, 30 / Math.SQRT1_2)],
          ...["LH", "LF", "RH", "RF"].map(id => {
            const foot = pose.feet[id], lateral = id.startsWith("L") ? -8 : 8;
            return [id.endsWith("H") ? hip : shoulder, ...[1, 3].map(index => project(foot.local[index][0], lateral, foot.local[index][1]))];
          }),
        ],
      })),
    };
  }
  return {
    selection: { gameplay_id: "Wolf motion blocking", source_character: "twelve-pose v06 plan" },
    sourceFrames: 12,
    reviewStatus: "Wolf stick figure approved on 2026-10-06: twelve distinct walking poses over one second. The painted replacement is still unfinished; this approval covers the motion blocking only.",
    directions,
    clips: {
      idle: { label: "Stand", loop: true, fps: 1, frames: [{ source: 0, durationMs: 1000 }] },
      walk: { label: "Planned walk", loop: true, fps: plan.fps, frames: plan.poses.map((pose, source) => ({ source, durationMs: pose.durationMs })) },
    },
    motion: { referenceHeight: 64, walkSpeed: plan.walkSpeed },
    references,
  };
}
