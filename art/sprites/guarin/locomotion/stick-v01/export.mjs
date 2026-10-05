import { readFile, writeFile } from "node:fs/promises";
import { stickHumanAtlas } from "./plan.mjs";

const guarin = JSON.parse(await readFile(new URL("../../atlas.json", import.meta.url), "utf8"));
await writeFile(new URL("atlas.json", import.meta.url), JSON.stringify(stickHumanAtlas(guarin.references), null, 2) + "\n");
