# Guarin locomotion repair

Decision at commit `1e34ed9`, 2026-10-05: define and verify precise foot targets before requesting new walking or idle drawings. Confidence: 99%, based on the user's explicit instruction. This stage specifies authoring geometry; it does not replace source artwork, change the running motion lab, or modify an endpoint contract.

## Current failures

The user reports these motion defects. The parent inspected all 96 existing idle/walk poses in the diagnostic contact sheets below; static inspection cannot independently prove the direction of motion.

| Facing | Walk feedback | Idle feedback |
|---|---|---|
| N | Cardinal gait also fails. | Stumbles and shifts feet. |
| NE | Skipping, jagged motion. | Needs the same fixed-foot standard. |
| E | Cardinal gait also fails. | Stumbles and shifts feet. |
| SE | Glides without convincing steps. | Needs the same fixed-foot standard. |
| S | Cardinal gait also fails. | Best existing idle; make the nod subtler. |
| SW | Sideways leg motion reads as dancing. | Needs the same fixed-foot standard. |
| W | Cardinal gait also fails. | Trembling; make sway gentle. |
| NW | Feet imply backward travel. | Needs the same fixed-foot standard. |

[Current idle](current-idle.png) and [current walk](current-walk.png) use the existing viewer's approximate pivots and 160-pixel standing scale. A red cross marks the estimated root, not an annotated sole. Original image bytes are unchanged. North idle visibly changes boot positions. Other views change cloth, gear and helmet texture, so foot alignment alone will not remove all flicker.

The original prompts specify six walking poses by prose, combine down/passing poses, and provide no numerical contacts. The importer estimates column anchors from silhouette bounds and row baselines from median figure bottoms. It does not locate anatomical feet. These estimates cannot establish gait correctness.

The motion lab advances at 140 ground pixels per second independently of character size, playback speed and clip rate. The current 750-millisecond walk therefore travels 105 ground pixels per cycle at normal settings. There is no authored stride to compare against that distance. Passing timing and transparency tests does not validate walking.

## Repair status

- [x] Preserve and inspect current source poses; record every reported failure.
- [ ] Define numerical contacts, lift, stride, projection, timing and idle invariants.
- [ ] Verify all directional targets and continuous planted-foot trajectories.
- [ ] Provide diagrams and a complete frame table before generation.
- [ ] Verify start/stop contacts and direction changes before runtime integration.
- [ ] Generate and measure a small pilot against the targets before a full replacement batch.
- [ ] Replace only approved locomotion sources; retain other action families.
