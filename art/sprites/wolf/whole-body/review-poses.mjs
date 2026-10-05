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
const circle = (p, color, radius = 1.6) => `<circle cx="${p[0]}" cy="${p[1]}" r="${radius}" fill="${color}"/>`;
const label = (p, text, dx = 3, dy = -2) => `<text x="${p[0] + dx}" y="${p[1] + dy}" font-size="3.2" fill="#34312b">${text}</text>`;
function skeleton(frame) {
  let body = `<ellipse cx="${frame.body[0]}" cy="${frame.body[1]}" rx="26" ry="14"/><ellipse cx="${frame.head[0]}" cy="${frame.head[1]}" rx="24" ry="24"/><polyline points="${[fixed.shoulderCenter, fixed.neck, frame.head, fixed.muzzle].map(p => p.join(",")).join(" ")}"/><polyline points="${[fixed.tailBase, fixed.tailBend, fixed.tailTip].map(p => p.join(",")).join(" ")}"/>`;
  body = `<g fill="none" stroke="#959089" stroke-width=".7">${body}</g>`;
  for (const id of ["LH", "LF", "RH", "RF"]) {
    const foot = frame.feet[id], color = legs[id].color;
    body += `<polyline points="${foot.points.map(p => p.join(",")).join(" ")}" fill="none" stroke="${color}" stroke-width="1.3" ${id[0] === "L" ? 'stroke-dasharray="2 1"' : ""}/>`;
    foot.points.forEach((p, i) => { body += circle(p, color) + label(p, `${i}`, id[0] === "L" ? -4 : 2, id[0] === "L" ? -2 : 3); });
    const [x, y] = foot.points[3];
    body += foot.planted ? `<path d="M ${x - 3} ${y + 1} h 6" stroke="${color}" stroke-width="1"/>` : `<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="${color}" stroke-width=".6"/>`;
  }
  body += `<path d="M 92 156 h 8 M 96 152 v 8" stroke="#9a7d24" stroke-width=".7"/>`;
  for (const [id, p] of Object.entries({ H: frame.head, B: frame.body, SC: fixed.shoulderCenter, N: fixed.neck, M: fixed.muzzle, T0: fixed.tailBase, T1: fixed.tailBend, T2: fixed.tailTip })) body += circle(p, "#34312b", .9) + label(p, id, id.startsWith("T") ? -7 : 2, id === "N" ? -5 : -2);
  return body;
}
const svg = content => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="32 80 144 104" width="576" height="416">${content}</svg>`;
const diagram = frame => svg(`<rect x="32" y="80" width="144" height="104" fill="#f1ede3"/>${skeleton(frame)}`);
const art = frame => svg(`<rect x="32" y="80" width="144" height="104" fill="#21231e"/><image href="../wolf-whole-e-v02.png" x="${-frame.drawing.rect[0]}" y="${-frame.drawing.rect[1]}" width="588" height="588"/>`);
const table = frame => `<table><caption>Planned coordinates · logical 192 × 192 canvas; x right, y down. Display rounded to 0.01; JSON retains full precision.</caption><thead><tr><th>Element</th><th>x, y</th></tr></thead><tbody>${Object.entries(frame.elements).map(([id, p]) => `<tr><th>${id}</th><td>${point(p)}</td></tr>`).join("")}</tbody></table>`;
const legLegend = Object.entries(legs).map(([id, leg]) => `<li style="--leg:${leg.color}"><b>${id}: ${leg.name}</b><br>0 ${leg.joints[0]} → 1 ${leg.joints[1]} → 2 ${leg.joints[2]} → 3 ${leg.joints[3]}</li>`).join("");
const cards = frames.map((frame, i) => `<article id="frame-${i + 1}"><h2>Frame ${i + 1} · ${frame.startMs}–${frame.startMs + frame.durationMs} ms</h2><p>${frame.id}; midpoint root travel ${frame.rootForward.toFixed(2)} logical pixels.</p><div class="pair"><figure><figcaption>Planned skeleton · generation pose ${i + 1}</figcaption>${diagram(frame)}</figure><figure><figcaption>Current painting · generation pose ${frame.drawing.atlasSource}</figcaption>${art(frame)}</figure></div><p class="${frame.drawing.matchesPlannedOrder ? "" : "warning"}">${frame.drawing.matchesPlannedOrder ? "Drawing retains requested sequence position." : `Reordered in playback: this painting was requested against ${frame.drawing.requestedGuide}, not ${frame.id}.`}</p><ul class="supports">${Object.entries(frame.feet).map(([id, foot]) => `<li style="--leg:${legs[id].color}">${id}: ${foot.planted ? "PLANTED" : "SWING"} · paw ${point(foot.points[3])}</li>`).join("")}</ul><details><summary>All joint and body coordinates</summary>${table(frame)}</details></article>`).join("\n");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Wolf walk — exact stick figures</title><style>
*{box-sizing:border-box}body{margin:0;padding:24px;background:#1b1c18;color:#e8e4d8;font:16px/1.5 system-ui,sans-serif}main{max-width:1600px;margin:auto}h1{margin:8px 0}a{color:#dec879}p{max-width:100ch}header{margin-bottom:24px}article{border:1px solid #706a51;padding:18px;min-width:0}h2{font-size:21px;margin:0}figure{margin:0;min-width:0}figcaption{font-size:14px;margin:8px 0}svg{display:block;width:100%;height:auto}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,600px),1fr));gap:20px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}.legend,.supports{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}.legend li,.supports li{border-left:4px solid var(--leg);padding:6px 10px;background:#262721}.supports{font-size:14px}.warning{color:#f1b998;background:#392a24;padding:10px}summary{cursor:pointer;color:#dec879}table{border-collapse:collapse;width:100%;font-size:14px;margin-top:12px}caption{text-align:left}th,td{border-bottom:1px solid #514e40;padding:6px;text-align:left}td{font-variant-numeric:tabular-nums}nav{display:flex;flex-wrap:wrap;gap:16px}code{overflow-wrap:anywhere}@media(max-width:480px){body{padding:12px}.pair{grid-template-columns:1fr}article{padding:12px}}
</style></head><body><main><header><p>DIAS IRAE · WOLF WALK AUDIT</p><h1>Exact stick figures for all eight walk frames</h1><p>These diagrams redraw the existing v03 target coordinates. They are not a new motion plan and were not the images sent to generation. The <a href="../guides/e-walk-v03-1-4.png">original guide for poses 1–4</a> and <a href="../guides/e-walk-v03-5-8.png">original guide for poses 5–8</a> were supplied with the <a href="../base-wolf-v02.png">intact wolf base</a>, S13 and G15.</p><p class="warning">The generated walk does not follow this plan. Four drawings were reordered in playback. The planned 36-pixel stride was not established from measured painted steps. The current walk remains rejected; changing speed did not repair the poses.</p><nav><a href="../../../guarin/viewer/index.html?character=wolf">Motion lab</a><a href="positions.json">Complete coordinate data</a><a href="../walk-records-v03.json">Saved generation inputs and hashes</a><a href="../walk-e-v03-1-4-prompt.txt">Prompt: poses 1–4</a><a href="../walk-e-v03-5-8-prompt.txt">Prompt: poses 5–8</a><a href="../contact-report-v03.json">Failed painted-contact check</a></nav><ul class="legend">${legLegend}</ul><p>Solid legs are the near/right side; dashed legs are the far/left side. A line below the paw marks planted contact; a ring marks swing. H: head center; B: body center; SC: centerline shoulder; N: neck bend; M: muzzle; T0/T1/T2: tail base (also hip center)/bend/tip. Gold cross: ground root (96,156). These are controls for one intact wolf, not separate painted components.</p><p>Head envelope: 48 × 48; body envelope: 52 × 28 logical pixels. Root, head and body stay fixed in the in-place drawings. Each painting is shown in its actual exported position at the same coordinate scale. Coordinates for ears, eyes and coat markings were not separately defined; their stability was requested in prose.</p></header><section class="cards" aria-label="All eight planned poses and actual drawings">${cards}</section></main></body></html>\n`;
await mkdir(output, { recursive: true });
await writeFile(resolve(output, "positions.json"), JSON.stringify({ basis: "existing target plan; not measured art", logicalCanvas: [192, 192], originalGuides: sheets, atlasSha256: sha256(atlasBytes), legDefinitions: legs, frames }, null, 2) + "\n");
await writeFile(resolve(output, "index.html"), html);
for (const [i, frame] of frames.entries()) await writeFile(resolve(output, `frame-${i + 1}.svg`), diagram(frame));
for (const first of [0, 4]) {
  const canvas = createCanvas(1408, 896), context = canvas.getContext("2d");
  context.fillStyle = "#f1ede3"; context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 4; i++) {
    const frame = frames[first + i], x = i % 2 * 704, y = Math.floor(i / 2) * 448;
    context.fillStyle = "#34312b"; context.font = "bold 24px sans-serif";
    context.fillText(`Frame ${first + i + 1} · ${frame.startMs}–${frame.startMs + frame.durationMs} ms`, x + 18, y + 34);
    context.drawImage(await readBitmap(resolve(output, `frame-${first + i + 1}.svg`)), x + 8, y + 48, 456, 329);
    context.font = "16px sans-serif";
    Object.entries(legs).forEach(([id, leg], j) => { context.fillStyle = leg.color; context.fillText(`${id}: ${frame.feet[id].planted ? "PLANTED" : "SWING"}`, x + 470, y + 130 + j * 42); });
    context.fillStyle = "#34312b"; context.fillText("Foreleg: 0 shoulder · 1 elbow · 2 carpus · 3 paw", x + 18, y + 402);
    context.fillText("Hindleg: 0 hip · 1 stifle · 2 hock · 3 paw", x + 18, y + 428);
    context.fillText("H head · B body · SC shoulder", x + 470, y + 306);
    context.fillText("N neck · M muzzle", x + 470, y + 334);
    context.fillText("T0 hip/tail base · T1 bend", x + 470, y + 362);
    context.fillText("T2 tail tip · cross = root", x + 470, y + 390);
  }
  await writeFile(resolve(output, `targets-${first + 1}-${first + 4}.png`), canvas.toBuffer("image/png"));
}
assert.equal(sha256(await readFile(resolve(root, "atlas.json"))), sha256(atlasBytes));
console.log(JSON.stringify({ frames: frames.length, plannedElementsPerFrame: Object.keys(frames[0].elements).length, reordered: frames.filter(frame => !frame.drawing.matchesPlannedOrder).map(frame => frame.id), changedArt: false }));
