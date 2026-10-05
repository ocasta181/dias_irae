# Wolf sprite pilot

**The component study below is rejected.** See [rejection and replacement method](rejection.md). It is retained as a record, not a current production specification. The active experiment uses whole-body drawings and skeletal pose guides in `whole-body/`.

Decision at commit `17828ac6feebf1391122357ea3b107f797a5908a`: build an ordinary Act I wolf from approved M15 anatomy and exact G15/S13 drawing references; use painted 2D parts with controlled joints, then bake real raster frames. Confidence: 94%. This method keeps surface detail stable while paw placement is computed rather than guessed by an image model. The user's request authorizes the wolf pilot, lab integration, inspection and repairs; final game-art approval remains theirs.

## Contract and inventory

The wolf is a familiar animal before an omen: muddy grey/taupe fur, dark back, pale dirty muzzle, tiny tired eyes, large head, compact torso and short paws. No armor, glowing eyes, bipedal monster, polished render or bright mascot. It shares the dark, rough 2D paint/ink language of G15/S13. M15 supplies species/anatomy, not realistic proportions or photo texture.

Eight screen headings: N up, NE, E right, SE, S down, SW, W left, NW. Camera: orthographic, 45 degrees above the ground. Canonical canvas 192 square, root `(96,156)`, reference size 96 pixels. Display the wolf at 96 reference pixels beside the adult's 160. Ground coordinates use a vertical factor of sin(45°); vertical body height uses cos(45°). No baked scenery or shadow. Real alpha, smooth sampling, no mipmaps for the lab.

The coat has no unique asymmetric markings. Author S, SE, E, NE and N views separately; W/SW/NW may use the corresponding reflected E/SE/NE source with anatomical side labels swapped. This limited symmetry is explicit and does not apply to Guarin's shield/sword.

| Clip | Directions | Frames per direction | Timing | Support and behavior |
|---|---|---|---|---|
| Quiet idle | 8 | 8 | 2,400 ms loop | Four locked paws. Only restrained head/body breathing. |
| Four-beat walk | 8 | 24 | 900 ms loop | 36-pixel full stride; 40 reference pixels/second. Three supports, one swinging paw. |
| Bite | 8 | 12 | 720 ms, unequal holds | Anticipation, open jaw, snap, recovery; fixed ground root. Proposed contact marker only. |
| Recoil | 8 | 8 | 420 ms | Small head/body recoil, recovery; no translational knockback mechanic. |
| Collapse | 8 | 12 | 960 ms | Fold limbs, lower body, hold terminal pose. Debug reset only. |

Total: 512 baked pose entries, five clips and eight headings. These are articulated painted frames, not 512 independently generated drawings. Individual part reuse and intentional held entries are recorded. The internal primary-action clip key is `cut` for the existing tester; its wolf label and art are Bite. This does not define a sword attack or alter game combat.

Sprint/gallop, howl, supernatural rearing and its attack/recovery are outside this ordinary-wolf pilot. They remain distinct campaign inventory work. No unsupported human guard, prayer or interaction action is offered for the wolf.

## Exact motion

Anatomical limb IDs: left/right fore and left/right hind. Walk touchdown order is left hind, left fore, right hind, right fore, at phases 0, 1/4, 1/2, 3/4. Each paw supports for 3/4 of the cycle. Its local forward position retreats linearly with root travel during support; swing moves it to the next contact with a smooth path and an 8-pixel maximum lift. Lateral lanes stay fixed at ±10. Fore/hind neutral positions are ±25.

Compute projected paw, ankle, joint and shoulder/hip positions before painting. Keep rest contacts fixed for idle/bite/recoil. Draws sample the midpoint of each hold; end/start root samples bound the linear walk hold error to 0.75 reference pixel. Drawing/raster error has a separate 1.25-pixel budget, giving a combined 2-pixel contact budget. This is an explicit pilot choice, not a universal gait recommendation.

Runtime travel must scale by reference display size and animation playback speed/rate. Inspect both moving and in-place views. Test starts/releases, turns, bite recovery, interruption, terminal holding and character switching. Record any unresolved handoff/contact defect; a planned path is not evidence that final pixels meet it.

## Authoring and verification

1. Preserve exact original reference bytes and hashes. Send M15, G15 and S13 pixels in each fresh drawing request, with roles stated. Failed sheets are excluded as design inputs.
2. Generate a small SE painted-parts pilot, including closed/open/resting head and articulated leg/paw pieces. Inspect actual alpha, camera, short proportions, palette and joins. Keep complete request and raw output.
3. Register part geometry once. Rig and bake one facing. Measure final raster contact evidence, check bounds and play the real exported package before expanding.
4. Repair source art through image generation when needed; repair deterministic coordinates/registration in the rig. Do not repeatedly ask a free-form model to redraw an exact gait it cannot control.
5. Expand only after the pilot is visually coherent. Use original approved references for other facing requests. Export unrotated alpha regions with retained pivots, timings and source lineage. Check actual sampler behavior.
6. Integrate the real pages into the local motion lab, inspect every facing/clip at intended and reduced size, then report numerical evidence separately from visual judgment. User review remains open.

Primary basis: [American Kennel Club glossary](https://www.akc.org/about/glossary/) describes a four-beat, three-support walk. The phase/stride choices here are stylized authoring choices. [Godot cutout animation](https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html) supports painted parts and selective cel art; its older setup instructions are not assumed current engine APIs. [Footskate cleanup research](https://research.cs.wisc.edu/graphics/Gallery/kovar.vol/Cleanup/) explains why support constraints and transition continuity require separate checks.

## Stage record

- [x] Define references, projection, scope, action inventory and contact/timing budgets.
- [ ] Verify mathematical motion plan and blocking.
- [ ] Draw, register and inspect the SE pilot.
- [ ] Measure exported raster contacts and inspect pilot playback.
- [ ] Complete remaining views, clips and reproducible atlas export.
- [ ] Verify character switching and keyboard/preset control in the local lab.
- [ ] Inspect all exported clips/facings, document repairs and assess deterministic quality assurance.
- [ ] User reviews the delivered wolf; no final asset approval is inferred.
