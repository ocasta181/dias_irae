import test from "node:test";
import assert from "node:assert/strict";
import { components, pixels, readParts } from "./source-parts.mjs";
import { render } from "./render.mjs";
import { frames } from "./motion.mjs";

const parts = await readParts(new URL("./sources/wolf-se-parts-v01.png", import.meta.url), undefined, { lowerCrop: { foreLower: .68, hindLower: .68 } });

test("downsampled painted paw contacts stay inside the registration budget", () => {
  for (const entry of frames("SE", "walk")) {
    const { witnesses } = render(parts, "SE", entry);
    for (const [id, foot] of Object.entries(entry.feet)) {
      assert.ok(Math.hypot(...witnesses[id].point.map((value, index) => value - foot.sole[index])) <= Math.SQRT1_2);
    }
  }
});

test("idle breathing never moves the rasterized paws", () => {
  const observations = frames("SE", "idle").map(entry => render(parts, "SE", entry).witnesses);
  for (const sample of observations.slice(1)) assert.deepEqual(sample, observations[0]);
});

test("rear head stays joined while a visually detached placement is rejected", async () => {
  const rear = await readParts(new URL("./sources/wolf-n-parts-v01.png", import.meta.url));
  const entry = frames("N", "idle")[0];
  const connected = render(rear, "N", entry).canvas;
  assert.equal(components(pixels(connected), 192, 192).length, 1);
  const detached = render(rear, "N", { ...entry, head: [entry.head[0], entry.head[1] - 30 * Math.SQRT1_2] }).canvas;
  assert.ok(components(pixels(detached), 192, 192).length > 1);
});
