import assert from "node:assert/strict";
import { createCanvas, pixels } from "../source-parts.mjs";

// The rightmost opaque edge in this inspected head region is the nose tip.
// Legs, tail and changing support contacts must not determine registration.
export function noseAnchor(canvas) {
  const data = pixels(canvas);
  for (let x = 156; x >= 126; x--) {
    const rows = [];
    for (let y = 108; y < 146; y++) if (data[(y * canvas.width + x) * 4 + 3] >= 128) rows.push(y);
    if (rows.length) return [x, Math.round((rows[0] + rows.at(-1)) / 2)];
  }
  throw new Error("Inspected nose region contains no opaque nose edge.");
}

export function registerFrame(source, target) {
  const observed = noseAnchor(source), offset = target.map((value, axis) => value - observed[axis]);
  const canvas = createCanvas(source.width, source.height), context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;
  context.drawImage(source, ...offset);
  assert.deepEqual(noseAnchor(canvas), target);
  const original = pixels(source), registered = pixels(canvas);
  let opaque = 0;
  for (let y = 0; y < source.height; y++) for (let x = 0; x < source.width; x++) {
    const from = (y * source.width + x) * 4;
    if (!original[from + 3]) continue;
    opaque++;
    const to = ((y + offset[1]) * source.width + x + offset[0]) * 4;
    assert.ok(x + offset[0] >= 0 && x + offset[0] < source.width && y + offset[1] >= 0 && y + offset[1] < source.height);
    assert.deepEqual(registered.slice(to, to + 4), original.slice(from, from + 4), "whole-frame translation must preserve original pixels");
  }
  assert.equal(registered.filter((_, i) => i % 4 === 3 && registered[i] > 0).length, opaque);
  return { canvas, observed, offset };
}
