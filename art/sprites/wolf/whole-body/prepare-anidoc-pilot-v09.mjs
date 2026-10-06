import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { createCanvas, loadImage } = require(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
const input = new URL("walk-v07/", import.meta.url), output = new URL("walk-v09/", import.meta.url);
await mkdir(new URL("controls/", output), { recursive: true });
const order = [12, ...Array.from({ length: 12 }, (_, index) => index + 1), 1];
const sources = [];
for (const [index, pose] of order.entries()) {
  const path = new URL(`E-walk-v07-${String(pose).padStart(2, "0")}-scaffold-v03-plain.png`, input);
  const bytes = await readFile(path), c = createCanvas(768, 768), a = c.getContext("2d");
  a.drawImage(await loadImage(bytes), 0, 0);
  const rgba = a.getImageData(0, 0, 768, 768), mask = new Uint8Array(768 * 768);
  for (let pixel = 0; pixel < mask.length; pixel++) {
    const i = pixel * 4, [r, g, b] = rgba.data.slice(i, i + 3);
    mask[pixel] = Number(!(g > 110 && g > r * 1.7 && g > b * 1.7));
  }
  for (let y = 0; y < 768; y++) for (let x = 0; x < 768; x++) {
    const pixel = y * 768 + x;
    const edge = mask[pixel] && [pixel - 1, pixel + 1, pixel - 768, pixel + 768].some(next => !mask[next]);
    const i = pixel * 4;
    const facialInk = mask[pixel] && x > 540 && x < 684 && y > 330 && y < 466 && rgba.data[i] + rgba.data[i + 1] + rgba.data[i + 2] < 125;
    rgba.data[i] = rgba.data[i + 1] = rgba.data[i + 2] = edge || facialInk ? 0 : 255; rgba.data[i + 3] = 255;
  }
  a.putImageData(rgba, 0, 0);
  const small = createCanvas(512, 512); small.getContext("2d").drawImage(c, 0, 0, 512, 512);
  const filename = `control-${String(index + 1).padStart(2, "0")}.png`;
  await writeFile(new URL("controls/" + filename, output), small.toBuffer("image/png"));
  sources.push({ index, approvedPose: pose, input: fileURLToPath(path), inputSha256: createHash("sha256").update(bytes).digest("hex"), output: "controls/" + filename, role: index === 0 || index === 13 ? "seam guard; exclude from final twelve" : "approved walking pose; whole-body contour control" });
}
const canonical = await readFile(new URL("canonical-crop.png", input));
await writeFile(new URL("reference.png", output), canonical);
await writeFile(new URL("request.json", output), JSON.stringify({ provider: "AniDoc author-endorsed Hugging Face demo", reference: "reference.png", referenceSha256: createHash("sha256").update(canonical).digest("hex"), controlVideo: "E-lineart-14-controls.mp4", frames: sources, outputExtraction: "Retain frames 1..12 (zero-based). Do not interpolate, accelerate or select a repeated pose. Final holds 1000/12 ms.", privacyChanged: false, priorFailedArtInputs: false, finalSheetReady: false }, null, 2) + "\n");
console.log("Prepared fourteen whole-body outline controls: twelve approved poses plus two seam guards.");
