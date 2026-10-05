import test from "node:test";
import assert from "node:assert/strict";
import { readParts } from "./source-parts.mjs";
import { render } from "./render.mjs";
import { frames } from "./motion.mjs";

const parts = await readParts(new URL("./sources/wolf-se-parts-v01.png", import.meta.url));

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
