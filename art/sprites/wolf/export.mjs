import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { createCanvas, pixels, readParts } from "./source-parts.mjs";
import { render } from "./render.mjs";
import { clips, directions, frames, origin, pose, project, referenceHeight, stride, walkDuration } from "./motion.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const requested = process.argv.slice(2);
const names = requested.length ? requested : Object.keys(directions);
const sources = JSON.parse(await readFile(resolve(root, "source-map.json"), "utf8"));
const atlas = { selection: { gameplay_id: "G15", source_character: "M15 / S13 style" }, sourceFrames: 0, reviewStatus: "Painted 2D wolf rig study; numerical and visual checks are recorded separately. User approval pending.", directions: {}, clips: {}, references: [
  { label: "M15 — approved natural wolf anatomy", url: "/art/mood-board/03-people-and-arms/m15-wolf.jpg" },
  { label: "G15 — selected gameplay texture and palette", url: "/art/concepts/gameplay/images/g15-s13-builtin-night-courtyard-v01.png" },
  { label: "S13 — compact proportions and drawing language", url: "/art/concepts/images/s13-guarin-isometric-v02.png" },
], motion: { referenceHeight, walkSpeed: stride / (walkDuration / 1000), stride, walkDuration }, packing: "Deterministically baked articulated painted parts; fixed logical root retained after trim, four-pixel gutters, no packing rotation." };
let sourceIndex = 0;
for (const [clip, spec] of Object.entries(clips)) {
  atlas.clips[clip] = { label: spec.label, fps: spec.fps, loop: spec.loop, events: spec.events ?? [], frames: spec.holds.map(durationMs => ({ source: sourceIndex++, durationMs })) };
}
const observations = { basis: "measured-art", max_drift_px: 2, clips: [] };
const qa = { sourceMethod: "controlled 2D painted rig", measurementMethod: "Rasterized component witness; final occlusion reviewed visually", coverage: [], failures: [], maxRasterPawError: 0, pages: [] };
await mkdir(resolve(root, "pages"), { recursive: true });
await mkdir(resolve(root, "registration"), { recursive: true });
for (const direction of names) {
  const source = sources[direction];
  const parts = await readParts(resolve(root, source.path), resolve(root, `registration/${direction}.json`), source.registration);
  const page = createCanvas(1536, 1536), ctx = page.getContext("2d");
  const pageName = `pages/wolf-${direction.toLowerCase()}-v01.png`;
  const entries = []; let x = 4, y = 4, rowHeight = 0;
  for (const clip of Object.keys(clips)) {
    const clipObservations = { id: `${direction}-${clip}`, world_contacts: {}, frames: [] };
    for (const entry of frames(direction, clip)) {
      const artDirection = source.mirror ? source.facing : direction;
      const artEntry = source.mirror ? pose(artDirection, clip, clip === "walk" ? (entry.phase + .5) % 1 : entry.phase) : entry;
      const drawn = render(parts, artDirection, artEntry);
      if (source.mirror) {
        const mirrored = createCanvas(192, 192), mirrorCtx = mirrored.getContext("2d");
        mirrorCtx.translate(192, 0); mirrorCtx.scale(-1, 1); mirrorCtx.drawImage(drawn.canvas, 0, 0); drawn.canvas = mirrored;
        const originalWitnesses = { ...drawn.witnesses };
        for (const id of Object.keys(entry.feet)) {
          const opposite = (id[0] === "L" ? "R" : "L") + id[1];
          drawn.witnesses[id] = { ...originalWitnesses[opposite], point: [192 - originalWitnesses[opposite].point[0], originalWitnesses[opposite].point[1]] };
        }
      }
      const data = pixels(drawn.canvas); let left = 192, top = 192, right = 0, bottom = 0;
      for (let index = 0; index < 192 * 192; index++) if (data[index * 4 + 3] > 0) { const px = index % 192, py = Math.floor(index / 192); left = Math.min(left, px); top = Math.min(top, py); right = Math.max(right, px + 1); bottom = Math.max(bottom, py + 1); }
      if (left === 0 || top === 0 || right === 192 || bottom === 192) qa.failures.push({ frame: entry.id, reason: "logical-canvas-edge-contact" });
      const width = right - left + 4, height = bottom - top + 4;
      if (x + width + 4 > 1536) { x = 4; y += rowHeight + 4; rowHeight = 0; }
      if (y + height + 4 > 1536) throw new Error("Wolf page exceeded packing limit");
      ctx.drawImage(drawn.canvas, left, top, right - left, bottom - top, x + 2, y + 2, right - left, bottom - top);
      entries.push({ family: clip, pose: entries.filter(frame => frame.family === clip).length + 1, rect: [x, y, width, height], pivot: [origin[0] - left + 2, origin[1] - top + 2], logicalSize: [192, 192], trimOffset: [left - 2, top - 2], occupied: [2, 2, width - 2, height - 2], image: pageName, sourceStandingHeight: referenceHeight, landmarks: drawn.witnesses, sha256: createHash("sha256").update(data).digest("hex") });
      x += width + 4; rowHeight = Math.max(rowHeight, height);
      const required = [], contacts = {};
      for (const [id, foot] of Object.entries(entry.feet)) {
        const measured = drawn.witnesses[id].point;
        qa.maxRasterPawError = Math.max(qa.maxRasterPawError, Math.hypot(measured[0] - foot.sole[0], measured[1] - foot.sole[1]));
        if (!foot.planted) continue;
        const rootAtPose = project(direction, entry.rootForward, 0);
        const target = [rootAtPose[0] + foot.sole[0] - 2 * origin[0], rootAtPose[1] + foot.sole[1] - 2 * origin[1]];
        const contactId = `${id}:${target.map(value => value.toFixed(8)).join(",")}`;
        clipObservations.world_contacts[contactId] = target;
        required.push(contactId); contacts[contactId] = measured;
      }
      const root_samples = [0, entry.durationMs / 2, entry.durationMs].map(offset_ms => {
        const forward = clip === "walk" ? stride * (entry.startMs + offset_ms) / walkDuration : 0;
        const p = project(direction, forward, 0);
        return { offset_ms, position: [p[0] - origin[0], p[1] - origin[1]] };
      });
      clipObservations.frames.push({ id: entry.id, start_ms: entry.startMs, duration_ms: entry.durationMs, pivot: origin, required_contacts: required, contacts, root_samples });
    }
    if (clip !== "death") observations.clips.push(clipObservations);
    qa.coverage.push({ direction, clip, frames: clips[clip].holds.length });
  }
  const height = y + rowHeight + 4, packed = createCanvas(1536, height); packed.getContext("2d").drawImage(page, 0, 0);
  const bytes = packed.toBuffer("image/png"); await writeFile(resolve(root, pageName), bytes);
  atlas.directions[direction] = { image: pageName, dimensions: [1536, height], sha256: createHash("sha256").update(bytes).digest("hex"), frames: entries, assessment: "Fresh painted parts; exact four-paw targets and fixed idle feet. Witness masks measure source-part contact rasterization; final overlap, camera, silhouette and transitions need visual inspection." };
  atlas.sourceFrames += entries.length;
  qa.pages.push({ image: pageName, dimensions: [1536, height], bytes: bytes.length });
}
await writeFile(resolve(root, "atlas.json"), JSON.stringify(atlas, null, 2) + "\n");
await writeFile(resolve(root, "contact-observations.json"), JSON.stringify(observations, null, 2) + "\n");
await writeFile(resolve(root, "validation.json"), JSON.stringify(qa, null, 2) + "\n");
console.log(JSON.stringify({ poses: atlas.sourceFrames, directions: names, maxRasterPawError: qa.maxRasterPawError, failures: qa.failures.slice(0, 8) }));
if (qa.failures.length) process.exitCode = 1;
