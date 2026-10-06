import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const root = new URL("walk-v07/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("manifest.json", root)));
const selected = {
  "E-walk-v07-01": "trials/E-walk-v07-01-scaffold-v02-builtin-v01",
  "E-walk-v07-02": "trials/E-walk-v07-02-builtin-v03",
  "E-walk-v07-03": "trials/E-walk-v07-03-builtin-v01",
  "E-walk-v07-06": "trials/E-walk-v07-06-border-v01",
  "E-walk-v07-07": "trials/E-walk-v07-07-builtin-v01",
  "N-walk-v07-01": "trials/N-walk-v07-01-builtin-v04",
};
const trials = [];
for (const folder of ["trials/", "../walk-v08/trials/"]) {
  for (const file of (await readdir(new URL(folder, root))).filter(name => name.endsWith("-record.json"))) {
    const prefix = folder + file.replace(/-record\.json$/, "");
    const record = JSON.parse(await readFile(new URL(folder + file, root)));
    const image = prefix + (record.saved_path?.endsWith(".jpg") ? ".jpg" : ".png");
    const bytes = await readFile(new URL(image, root));
    let qa = null;
    try { qa = JSON.parse(await readFile(new URL(prefix + "-qa.json", root))); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
    trials.push({ image, record: folder + file, sha256: createHash("sha256").update(bytes).digest("hex"), status: qa?.passed === false ? "held back: measured paw failure" : record.status ?? "held back", qa, finalFrame: false });
  }
}
const directions = {};
for (const [direction, page] of Object.entries(manifest.directions)) {
  directions[direction] = page.frames.map((frame, index) => {
    const prefix = selected[frame.id];
    const trial = prefix && trials.find(value => value.image === prefix + ".png");
    if (prefix && !(trial?.qa?.passed || trial?.qa?.nearContactPass)) throw new Error("Selected static candidate lacks a paw-check pass: " + frame.id);
    return { id: frame.id, pose: index + 1, guide: "guides/" + frame.id + ".png", phase: frame.phase, durationMs: frame.durationMs, candidate: trial ? { image: trial.image, qa: prefix + "-qa.json", sha256: trial.sha256 } : null, status: trial ? "static candidate; cycle unverified" : "painting unfinished", final: null };
  });
}
const coverage = {
  updated: "2026-10-06", decisionCommit: "8a49a5f", confidence: 0.95,
  requirement: "Eight walking sheets, twelve distinct whole-body poses each. Idle aliases pose 1. Other actions await their own approved controls.",
  fps: 12, cycleMs: 1000, stride: 36, canvas: [192, 192], pivot: [96, 156],
  counts: { planned: 96, staticCandidates: Object.keys(selected).length, finalFrames: 0, completedSheets: 0, drawingTrials: trials.length },
  stage: "Drawing method limitation: no full painted cycle passes geometry and motion checks.",
  blockers: ["Still-image tools change paw positions despite explicit pose silhouettes, contact coordinates and fixed borders; latest E04 hind-paw error is 8.13 logical pixels, budget 3.", "The separate Grok video workflow is stopped under zero data retention because output storage is unconfigured. Privacy has not been changed."],
  reflection: { scope: "Unarmed wolf only; entire verified frame, no painted-part assembly", mapping: { W: "reflect E with +6 phase offset", SW: "reflect SE with +6 phase offset", NW: "reflect NE with +6 phase offset" }, targetGeometryVerified: true, paintedOutputVerified: false },
  directions, trials,
};
await writeFile(new URL("coverage.json", root), JSON.stringify(coverage, null, 2) + "\n");
console.log(JSON.stringify(coverage.counts));
