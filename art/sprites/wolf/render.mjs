import { createCanvas, contactAnchor } from "./source-parts.mjs";
import { directions } from "./motion.mjs";

function paint(context, part, position, width, height, angle = 0, anchor = [.5, .5]) {
  context.save(); context.translate(...position); context.rotate(angle);
  context.drawImage(part.canvas, -width * anchor[0], -height * anchor[1], width, height);
  context.restore();
}

function bone(context, part, from, to, width) {
  const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]) - Math.PI / 2;
  paint(context, part, from, width, length + 6, angle, [.5, 3 / (length + 6)]);
}

function paw(context, part, position) {
  context.drawImage(part.canvas, Math.round(position[0] - part.anchor[0]), Math.round(position[1] - part.anchor[1]));
}

export function render(parts, direction, entry) {
  const canvas = createCanvas(192, 192), context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  const [rawX, rawY] = directions[direction], length = Math.hypot(rawX, rawY), dx = rawX / length, dy = rawY / length;
  const feet = Object.entries(entry.feet).sort((a, b) => (dy * a[1].local.hip[0] + dx * a[1].lateral) - (dy * b[1].local.hip[0] + dx * b[1].lateral));
  const witnesses = {};
  function drawLeg([id, foot]) {
    const kind = id.endsWith("F") ? "fore" : "hind";
    bone(context, parts[`${kind}Upper`], foot.hip, foot.knee, kind === "fore" ? 14 : 17);
    bone(context, parts[`${kind}Lower`], foot.knee, foot.ankle, 8);
    paw(context, parts[`${kind}Paw`], foot.sole);
    const witness = createCanvas(192, 192); paw(witness.getContext("2d"), parts[`${kind}Paw`], foot.sole);
    const observed = contactAnchor(witness);
    witnesses[id] = { point: observed, planted: foot.planted, sourcePart: `${kind}Paw`, method: "opaque bottom-edge midpoint of separately rasterized painted paw", uncertaintyPx: 1 };
  }
  for (const foot of feet.slice(0, 2)) drawLeg(foot);
  if (dy < 0) paint(context, parts[entry.headPart], entry.head, 56, 56, entry.headAngle);
  if (dy >= 0) paint(context, parts.tail, entry.tail, 22 + 22 * Math.abs(dx), 20 + 10 * Math.abs(dy), entry.tailAngle - entry.fall * Math.PI / 3, [.8, .2]);
  paint(context, parts.body, entry.body, 50 + 45 * Math.abs(dx), 45 + 35 * Math.abs(dy), .07 * entry.fall);
  for (const foot of feet.slice(2)) drawLeg(foot);
  if (dy >= 0) paint(context, parts[entry.headPart], entry.head, 56, 56, entry.headAngle);
  if (dy < 0) paint(context, parts.tail, entry.tail, 22 + 22 * Math.abs(dx), 20 + 10 * Math.abs(dy), entry.tailAngle - entry.fall * Math.PI / 3, [.5, .2]);
  return { canvas, witnesses };
}
