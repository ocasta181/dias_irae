import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, readBitmap } from "../source-parts.mjs";
import { project } from "../motion.mjs";

const root = dirname(fileURLToPath(import.meta.url)), output = resolve(root, "pose-review");
const readJson = async name => JSON.parse(await readFile(resolve(root, name), "utf8"));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const atlasBytes = await readFile(resolve(root, "atlas.json")), atlas = JSON.parse(atlasBytes);
const sheets = ["e-walk-v03-1-4", "e-walk-v03-5-8"];
const poses = (await Promise.all(sheets.map(name => readJson(`guides/${name}.json`)))).flatMap(sheet => sheet.poses);
const records = await readJson("walk-records-v03.json");
const legs = {
  LF: { name: "Left foreleg · far side", color: "#2b7ba0", joints: ["Shoulder", "Elbow", "Carpus", "Paw"] },
  RF: { name: "Right foreleg · near side", color: "#c56227", joints: ["Shoulder", "Elbow", "Carpus", "Paw"] },
  LH: { name: "Left hindleg · far side", color: "#634bac", joints: ["Hip", "Stifle", "Hock", "Paw"] },
  RH: { name: "Right hindleg · near side", color: "#b0375c", joints: ["Hip", "Stifle", "Hock", "Paw"] },
};
const poseNames = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"];
const fixed = { shoulderCenter: project("E", 16, 0, 22), hipCenter: project("E", -16, 0, 22), neck: project("E", 19, 0, 32), muzzle: project("E", 49, 0, 36), tailBase: project("E", -16, 0, 22), tailBend: project("E", -29, 0, 17), tailTip: project("E", -35, 0, 9) };
assert.equal(poses.length, 8);
assert.equal(atlas.clips.walk.frames.length, 8);
for (const record of records) {
  assert.equal(sha256(await readFile(resolve(root, record.source))), record.sha256);
  for (const reference of record.references) assert.equal(sha256(await readFile(resolve(root, "../../../..", reference.path))), reference.sha256);
}
const frames = poses.map((pose, index) => {
  const runtime = atlas.clips.walk.frames[index], drawing = atlas.directions.E.frames[runtime.source];
  assert.equal(pose.durationMs, runtime.durationMs);
  const elements = { root: pose.origin, headCenter: pose.head, bodyCenter: pose.body, ...fixed };
  for (const [id, foot] of Object.entries(pose.feet)) {
    assert.equal(foot.points.length, 4);
    legs[id].joints.forEach((joint, i) => { elements[`${id}.${joint.toLowerCase()}`] = foot.points[i]; });
  }
  return { ...pose, elements, envelopes: { head: [48, 48], body: [52, 28] }, drawing: { atlasSource: runtime.source, requestedGuide: poses[runtime.source - 1].id, matchesPlannedOrder: runtime.source === index + 1, ...drawing } };
});
const point = values => values.map(value => value.toFixed(2)).join(", ");
function skeleton(frame) {
  const lines = [
    [fixed.tailTip, fixed.hipCenter],
    [fixed.hipCenter, fixed.shoulderCenter],
    [fixed.shoulderCenter, frame.head, fixed.muzzle],
    ...["LH", "LF", "RH", "RF"].map(id => [id.endsWith("H") ? fixed.hipCenter : fixed.shoulderCenter, frame.feet[id].points[1], frame.feet[id].points[3]]),
  ];
  return `<g fill="none" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${lines.map(points => `<polyline points="${points.map(p => p.join(",")).join(" ")}"/>`).join("")}</g>`;
}
const svg = content => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="32 80 144 104" width="576" height="416">${content}</svg>`;
const diagram = frame => svg(`<rect x="32" y="80" width="144" height="104" fill="white"/>${skeleton(frame)}`);
const art = frame => svg(`<rect x="32" y="80" width="144" height="104" fill="#21231e"/><image href="../${frame.drawing.image}" x="${-frame.drawing.rect[0]}" y="${-frame.drawing.rect[1]}" width="588" height="588"/>`);
const table = frame => `<table><caption>Planned coordinates · logical 192 × 192 canvas; x right, y down. Display rounded to 0.01; JSON retains full precision.</caption><thead><tr><th>Element</th><th>x, y</th></tr></thead><tbody>${Object.entries(frame.elements).map(([id, p]) => `<tr><th>${id}</th><td>${point(p)}</td></tr>`).join("")}</tbody></table>`;
const cards = frames.map((frame, i) => `<article id="frame-${i + 1}"><h2>${poseNames[i]} pose</h2><div class="pair"><figure><figcaption>Planned stick figure</figcaption>${diagram(frame)}</figure><figure><figcaption>Current painting</figcaption>${art(frame)}</figure></div><details><summary>Coordinates and source mapping</summary><p>${frame.id}: ${frame.startMs}–${frame.startMs + frame.durationMs} ms. Painting source ${frame.drawing.atlasSource}${frame.drawing.matchesPlannedOrder ? "." : "; reordered from its requested pose."}</p>${table(frame)}</details></article>`).join("\n");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Wolf walk — simple stick figures</title><style>
*{box-sizing:border-box}body{margin:0;padding:24px;background:#1b1c18;color:#e8e4d8;font:16px/1.5 system-ui,sans-serif}main{max-width:1600px;margin:auto}h1{margin:8px 0}a{color:#dec879}p{max-width:100ch}header{margin-bottom:24px}article{border:1px solid #706a51;padding:18px;min-width:0}h2{font-size:21px;margin:0}figure{margin:0;min-width:0}figcaption{font-size:14px;margin:8px 0}svg{display:block;width:100%;height:auto}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,600px),1fr));gap:20px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}.legend,.supports{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}.legend li,.supports li{border-left:4px solid var(--leg);padding:6px 10px;background:#262721}.supports{font-size:14px}.warning{color:#f1b998;background:#392a24;padding:10px}summary{cursor:pointer;color:#dec879}table{border-collapse:collapse;width:100%;font-size:14px;margin-top:12px}caption{text-align:left}th,td{border-bottom:1px solid #514e40;padding:6px;text-align:left}td{font-variant-numeric:tabular-nums}nav{display:flex;flex-wrap:wrap;gap:16px}code{overflow-wrap:anywhere}@media(max-width:480px){body{padding:12px}.pair{grid-template-columns:1fr}article{padding:12px}}
</style></head><body><main><header><h1>Wolf walk — simple stick figures</h1><p>One body line, a tail, a head line and four legs with one bend each. The simplified figures show each planned paw position; detailed joint data remains below. These are review diagrams, not the original generation inputs.</p><p>The painted walk remains rejected.</p><nav><a href="../../../guarin/viewer/index.html?character=wolf">Motion lab</a><a href="targets-1-4.png">First four figures</a><a href="targets-5-8.png">Last four figures</a></nav><details><summary>Original inputs and coordinate data</summary><nav><a href="../guides/e-walk-v03-1-4.png">Original guide: poses 1–4</a><a href="../guides/e-walk-v03-5-8.png">Original guide: poses 5–8</a><a href="../base-wolf-v02.png">Wolf base</a><a href="positions.json">Full coordinates</a><a href="../walk-records-v03.json">Generation inputs</a><a href="../walk-e-v03-1-4-prompt.txt">First prompt</a><a href="../walk-e-v03-5-8-prompt.txt">Second prompt</a></nav></details></header><section class="cards" aria-label="All eight planned poses and actual drawings">${cards}</section></main></body></html>\n`;
await mkdir(output, { recursive: true });
await writeFile(resolve(output, "positions.json"), JSON.stringify({ basis: "existing target plan; not measured art", logicalCanvas: [192, 192], originalGuides: sheets, atlasSha256: sha256(atlasBytes), legDefinitions: legs, frames }, null, 2) + "\n");
await writeFile(resolve(output, "index.html"), html);
for (const [i, frame] of frames.entries()) await writeFile(resolve(output, `frame-${i + 1}.svg`), diagram(frame));
for (const first of [0, 4]) {
  const canvas = createCanvas(1408, 896), context = canvas.getContext("2d");
  context.fillStyle = "white"; context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 4; i++) {
    const frame = frames[first + i], x = i % 2 * 704, y = Math.floor(i / 2) * 448;
    context.drawImage(await readBitmap(resolve(output, `frame-${first + i + 1}.svg`)), x + 42, y, 620, 448);
  }
  await writeFile(resolve(output, `targets-${first + 1}-${first + 4}.png`), canvas.toBuffer("image/png"));
}
assert.equal(sha256(await readFile(resolve(root, "atlas.json"))), sha256(atlasBytes));
console.log(JSON.stringify({ frames: frames.length, plannedElementsPerFrame: Object.keys(frames[0].elements).length, reordered: frames.filter(frame => !frame.drawing.matchesPlannedOrder).map(frame => frame.id), changedArt: false }));
