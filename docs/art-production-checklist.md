# Dias Irae — art production checklist

This is the source of truth for the mood board → concept art → sprites → first-level workflow. Update it at each significant step. An unchecked approval is a real gate; silence, surviving files, and elapsed time are not approval.

Last updated: 2026-10-04. Current stage: **mood board ready; awaiting the user's review and explicit approval**.

## Story and visual constraints

Source material: [story spine](../story/story-arch.md), [characters](../story/characters.md), [locations](../story/locations.md), [draft systems](../story/systems.md).

- Late summer 1101; rural homecoming, diseased harvest, household grief, sacramental horror.
- Romanesque buildings: thick walls, small windows, round arches, barrel vaults, limewash, painted apses. No later Gothic architecture by default.
- Mail hauberks, nasal helms, kite shields, arming swords, worn wool and linen. No plate armor.
- Story palette: rye gold, charcoal, limewash, Antonine black and taupe, dried-blood wine, pig-fat yellow, bone white, dull iron.
- Isenheim supplies emotional intensity, diseased flesh, sacred light and monstrous forms. Its later date does not make its architecture or clothing period references.
- Act I begins with recognizable parishioners and wolves. Later locusts and overt demons must not replace that opening escalation.
- First level is provisionally the Act I homecoming through Rivoire and Raimon's undercroft. Confirm the playable extent before implementation.
- User-directed rendering target: dark, pixelated/cartoony. Hollow Knight is the primary art-style influence; Castle Crashers is a very light influence. Diablo II supports isometric composition, environmental detail, grounded materials and lighting; Darkwood informs atmosphere. Keep the other game references visible. Historical and sacred references still govern materials and story motifs.
- Exact pixel density, edge treatment, camera angle, animation directions and frame counts remain open for review and the sprite pilot.

## 1. Mood board

- [x] Read the story, character dossiers, opening locations and systems design.
- [x] Inspect the existing Godot combat slice and locate PresidentFighter.
- [x] Record the initial engine and generation-tool assessment in [art-tooling.md](art-tooling.md).
- [x] Gather and download 26 curated internet images into `art/mood-board/`, including four primary Hollow Knight references and one very-light Castle Crashers reference.
- [x] Record source pages, creators, licenses, dates and specific story relevance.
- [x] Build a browsable gallery and an overview image; visually inspect every reference.
- [x] Verify the revised 26-image board: decoding, dimensions, hashes, provenance, influence hierarchy and local links.
- [x] Request the user's review with this checkpoint. The user may delete images and add their own in `art/mood-board/user-references/`.
- [x] Incorporate the user's requested dark pixelated/cartoon direction and weighted game-language references.
- [x] Enable and verify in-gallery decisions and commentary, with browser drafts and a downloadable manifest.
- [x] Keep Diablo II and the other game references visible; retain Diablo II's relevance to composition, environmental detail, materials and lighting.
- [ ] Reconcile removals, additions and review notes; agree the palette and rendering direction.
- [ ] **User explicitly approves the mood board.**

Success: a locally reviewable collection with individual removable images and provenance, followed by explicit approval of the revised board.

## 2. Concept art — after mood board approval

- [x] Identify the available generation tool and document how references will be used.
- [ ] Freeze a concise visual brief from the accepted references and the story.
- [ ] Confirm the concept list in [the concept manifest](../art/concepts/manifest.md).
- [ ] Generate story-aligned concept candidates, using the approved mood board as references.
- [ ] Save every candidate locally, alongside its exact prompt, reference identifiers, tool, version and review status.
- [ ] Inspect period equipment, character identity, story motifs, silhouette and camera consistency.
- [ ] Request review through the manifest; the user marks each candidate `accepted`, `rejected` or `revise`.
- [ ] Resolve revisions; freeze accepted concepts as the sprite references.
- [ ] **User approves the concept art required for the first level.**

Success: accepted concepts cover the characters, props and spaces the first level actually needs. Rejected art is excluded from production references.

## 3. Asset lists and production specification — before each sprite category

Create `art/sprites/asset-list.md` after the concept review; do not treat the candidate scope below as a finalized inventory.

- [x] Record the user's dark, pixelated/cartoon target and the Hollow Knight / Castle Crashers influence hierarchy.
- [ ] Agree exact pixel density, outline/edge treatment and degree of caricature in the chosen direction.
- [ ] Decide engine and camera before committing to final sprite dimensions.
- [ ] Specify world scale, canvas size, foot anchor, shadow treatment, lighting direction, transparency, atlas padding and naming.
- [ ] Define character list and movement/actions per character, direction coverage, frame counts, timing and equipment visibility.
- [ ] Define item list and exact visible states, distinguishing inventory icons, world pickups and held equipment.
- [ ] Define environment list: terrain, transitions, structures, interiors, props, occlusion pieces and animated states.
- [ ] Confirm the list for each category before creating it. Record omissions and deferred assets explicitly.

Candidate first-level scope to refine:

| Category | Story candidates | States/actions to decide |
|---|---|---|
| Characters | Guarin; Almodis; Odo; Giraud; Agnes; blighted parishioners; wolves; Raimon | Guarin idle/walk/sword attacks/block/hurt/death/interact; people idle/talk; enemies movement/tells/attack/hurt/death; Raimon's borrowed gait and boss tells |
| Items | Sword, kite shield, nasal helm, mail, wrapped splinter, rye head, sclerotia, household keys, reserved wheat host | Equipped and held views; icons and pickups where needed; wrapped/exposed splinter; intact/smashed sclerotia; ordinary/blighted grain; host reserved/encountered |
| Environments | Arrival terraces, village, burned mill, church and yard, castrum hall, paddock, undercroft | Paths and limestone; rye; limewash and slab roofs; doors/shutters; mill wheel and debris; altar/crucifix/aumbry; graves; hearth, barrels, mummified apples; wall cutaways |

Do not invent pickups or state machines merely to fill a sheet. The story's altar encounter and inventory presentation may require different art for the same object.

## 4. Sprites — accepted concepts and defined lists required

- [ ] Create and review one small style/animation pilot before producing the full set.
- [ ] Produce character movement and action sheets from the defined character list.
- [ ] Produce item and state sheets from the defined item list.
- [ ] Produce environment tiles/sheets and prop states from the defined environment list.
- [ ] Validate dimensions, alpha, alignment, frame order, silhouettes, loops and atlas boundaries deterministically.
- [ ] Review animations in motion at intended gameplay scale, with provisional test lighting.
- [ ] Record source art, prompts, cleanup, exports and accepted/rejected status in a sprite manifest.
- [ ] **User approves the sprite set needed for first-level implementation.**

Success: reviewed, consistent sprites and explicit animation/atlas metadata cover the agreed asset lists.

## 5. First level — after sprite readiness

- [ ] Confirm the level's start, end, rooms, encounters, evidence and dialogue against Act I.
- [ ] Finalize the engine decision using the accepted art and pilot results; record rationale.
- [ ] Reuse the existing domain boundaries and approved art; adapt the useful PresidentFighter content/verification workflow.
- [ ] Inspect existing callers and models before any code changes.
- [ ] Present and obtain approval for any required persistence or application programming interface (API) schema changes before dependent implementation.
- [ ] Implement the agreed homecoming level: traversal, readable combat, story evidence, household encounters and Raimon if within scope.
- [ ] Integrate inventory, transitions, collision, depth sorting, lighting and occlusion as required by the level.
- [ ] Run appropriate automated checks and a playable visual review; disclose skipped checks and failures.
- [ ] **User reviews the first playable level.**

Success: the agreed first level is playable from entry to exit with accepted art, verified behavior and no unresolved required assets.

## Checkpoints and review decisions

| Date | Checkpoint | Verified | Next |
|---|---|---|---|
| 2026-10-04 | Story and project reconnaissance | Isometric Godot prototype exists; PresidentFighter is at `../Personal/PresidentFighter`, not `../PresidentFighter`; art direction anchored in the story | Assemble and inspect internet references |
| 2026-10-04 | Mood board ready for review | 21 references across seven themes; visual inspection corrected two mismatched search results; missing scan credit recovered from its source page; images, hashes, dimensions, provenance and local links verified | User removes/adds references and approves the reconciled board |
| 2026-10-04 | Review-state and attribution audit | No references added or removed; all decisions still pending. Recovered M15 photographer and original-photo links from Flickr and documented the pre-existing Commons crop | User review and explicit mood board approval |
| 2026-10-04 | User-directed art-style revision | Four official Hollow Knight references added as primary influences; one Castle Crashers reference added as very light; earlier games scoped to atmosphere/camera. Direction recorded in the board, concept manifest and tooling brief. All 26 images, provenance, links and weighted previews verified | User review and explicit mood board approval |
| 2026-10-04 | Interactive HTML review and reference correction | All 26 cards support reversible decisions and written commentary. Chrome verified reload persistence, complete manifest export, preserved credits, mobile layout and export with browser storage disabled. Diablo II and Darkwood are visible; Diablo II's broader supporting influence is restored | User reviews in the gallery, saves the downloaded manifest and explicitly approves the board |

Review artifacts: [gallery](../art/mood-board/index.html), [overview](../art/mood-board/overview.jpg), [review manifest](../art/mood-board/manifest.md), [review instructions](../art/mood-board/README.md).

No concept art, sprite sheets or first-level implementation has been produced in this phase. Game runtime tests were not run for these art-workflow changes; the interactive HTML review was checked in Chrome. Existing story and Godot edits were not included in these art-workflow commits.

Mood board approval: **pending**. Concept approval: **pending**. Asset lists: **not finalized**. Sprite approval: **pending**. Engine decision: **provisional Godot**.

Future work resumes from the current unchecked step after the relevant human review; it must not generate concepts or sprites across an unapproved gate.
