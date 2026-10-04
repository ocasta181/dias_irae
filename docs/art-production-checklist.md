# Dias Irae — art production checklist

This is the source of truth for the mood board → concept art → sprites → first-level workflow. Update it at each significant step. An unchecked approval is a real gate; silence, surviving files, and elapsed time are not approval.

Last updated: 2026-10-04. Current stage: **mood board and equipment board approved; three fresh Grok drawings S38–S40 ready for review. All six new calls use separate text-only sessions. S35–S37 are internal revisions. Camera consistency and mail detail remain unresolved; concept approval is open**.

## Story and visual constraints

Source material: [story spine](../story/story-arch.md), [characters](../story/characters.md), [locations](../story/locations.md), [draft systems](../story/systems.md).

- Late summer 1101; rural homecoming, diseased harvest, household grief, sacramental horror.
- Romanesque buildings: thick walls, small windows, round arches, barrel vaults, limewash, painted apses. No later Gothic architecture by default.
- Mail hauberks, kite shields, arming swords, worn wool and linen. No plate body armor. User-directed exception for Guarin: a full-face greathelm with narrow visor openings (anachronism explicitly allowed) replaces the earlier open nasal-helm constraint.
- Story palette: rye gold, charcoal, limewash, Antonine black and taupe, dried-blood wine, pig-fat yellow, bone white, dull iron.
- Isenheim supplies emotional intensity, diseased flesh, sacred light and monstrous forms. Its later date does not make its architecture or clothing period references.
- Act I begins with recognizable parishioners and wolves. Later locusts and overt demons must not replace that opening escalation.
- First level is provisionally the Act I homecoming through Rivoire and Raimon's undercroft. Confirm the playable extent before implementation.
- Latest rendering clarification: dark, cute and cartoony, with a huge head, tiny squat body and short limbs. Compare Diablo II-led, Hollow Knight-led and blended game rendering, with the costume stated in full in every raw prompt. The user discarded S24–S34 and prohibited prior-image iteration. Earlier style preferences remain written design guidance only; no prior concept image may be uploaded.
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
- [x] Reconcile removals, additions and review notes; agree the palette and rendering direction. All 26 references retained; no supplied additions or removals. Style refinement recorded in [the visual brief](../art/concepts/visual-brief.md).
- [x] **User explicitly approves the mood board.** Approved in chat on 2026-10-04: "all this looks great, approved"; "more cartoony than diablo, less cartoony than hollow knight."

Success: a locally reviewable collection with individual removable images and provenance, followed by explicit approval of the revised board.

### Dress and equipment supplement — separate selection gate

- [x] Curate 23 internet references for greathelms, armor, weapons, shields, clergy, townspeople and nobles.
- [x] Inspect each reference and distinguish actual objects, reconstructions, a historical sculpture and a garment detail.
- [x] Identify period differences and the user-approved greathelm exception; record source pages, credits, licenses, dimensions and hashes.
- [x] Build the separate [equipment review gallery](../art/mood-board/equipment/index.html), overview, manifest and source inventory with individual decisions and commentary.
- [x] Verify the initial 23-reference supplement’s controls, commentary, persistence, export and mobile layout in Chrome.
- [x] Expand to 34 active, genuinely different European options from the 12th, 13th and 14th centuries, including non-greathelms, non-mail torso armor, boots, gloves, leggings, shields, polearms and daggers; retain 11 excluded entries as source history.
- [x] Give every active reference a source-supported year or year range; distinguish object/style date from photograph date and exclude 15th-century material.
- [x] Verify all 34 active images and 45 source/history records, dates, provenance, links, decisions, commentary, export and mobile layout; preserve excluded-row browser drafts.
- [x] Put the dated equipment choices prominently on the main mood board and add source-dated 12th-century ankle shoes and 13th-century slip-on boots; board 03 now has 36 active choices and 47 source/history records.
- [x] Replace the active selection across every category with at least 90% 12th-century sources and at most 10% early 13th (1201–1230). Board 04 has 42 active choices: 40 (95.2%) 12th-century and 2 (4.8%) early-13th allowances. Add 10 new 12th-century helmet/headpiece views, retain 40 excluded records and all prior notes, and label uncertain construction and regional comparisons.
- [x] Verify board 04’s 42 active and 82 total records, date limits, image decoding/dimensions/hashes, enlarged detail views, browser decisions/commentary/export and mobile layout. Confirm that excluded-row notes still export and the original mood board remains approved. Save [the browser preview](../art/mood-board/equipment/board-04-preview.png).
- [x] **User approves the equipment board** in chat on 2026-10-04: "all this looks great", subject to cultural and geographic precision. Retain the approved collection; do not treat every European source as local to the 1101 story. Guarin’s existing costume stays fixed in the next style comparison.

## 2. Concept art — after mood board approval

- [x] Identify the available generation tool and document how references will be used.
- [x] Freeze a concise visual brief from the accepted references and the story.
- [x] Define the initial eight-image concept list in [the concept manifest](../art/concepts/manifest.md), covering the story's characters, spaces and objects.
- [x] Preserve the rejected first Guarin and parish-cast sheets; stop that batch after the user's proportion correction.
- [x] Generate, inspect and save three distinct cute-proportion approaches for Guarin, with exact prompts and generation records.
- [x] Build and verify the comparison gallery with reversible decisions, commentary, browser drafts and manifest export; preserve the ungenerated planned rows during export.
- [x] Record the rejection of S01–S03: eyes too big and styles too similar; preserve the images as rejected history.
- [x] Generate and inspect three contrasting rendering styles S04–S06 with the required full-face helm and narrow visor.
- [x] Preserve S07–S09 and record their initially rejected comparison; S07/S08 remain rejected.
- [x] Produce S10–S12 as separate cutout, woodcut and stitched drawing systems; retain as unselected history.
- [x] **User selects S09 for continued development**, by attaching that image and requesting its isometric camera redraw. This supersedes S09's earlier rejection only.
- [x] Redraw only the attached character as S13 to explore the Diablo II gameplay camera; retain its preferred texture, record the unapproved camera.
- [x] Verify the updated texture checkpoint, manifests and generation records.
- [x] Generate S14 from scratch with no image inputs at a higher camera; record the request to reduce its angle.
- [x] Generate S15 from scratch with the requested midpoint target between S13 and S14; record that the actual output did not resolve the view, preserve earlier studies as revisions.
- [x] Record texture-only preference for S13/S17, camera failures and drift toward human proportions.
- [x] Pause built-in generation and research [three current alternatives](image-model-alternatives.md): MAI-Image-2.6, Reve 2.1 and Grok Imagine Image 2.0; verify public availability, published capabilities, current Arena rankings and available USD pricing. MAI/Reve trial pricing remains to verify for the selected access route.
- [x] **User selects Grok** on 2026-10-04, using their existing account and installed CLI.
- [x] Verify Grok CLI 1.0.46, cached-login refresh and one unattended `image_gen` call; preserve the neutral 1024 × 1024 connection test and [connection instructions](grok-image-generation.md). This initial test did not expose an exact Imagine model ID or test reference editing.
- [x] Generate a fresh Grok Guarin base S18, then rendering-only restyles S22/S23 of the same costume and pose: graphic ink, dry gouache and charcoal hatching. Preserve S19/S20/S21 as internal revision history. Record the S20 capacity error and retry; keep exact prompts, actual tool calls, source outputs and image hashes.
- [x] Verify all 25 concept cards, including the three current styles: preserved earlier decisions, exact prompt/tool calls, source hashes, S18 reference lineage, browser decisions/commentary/export and mobile layout. Equipment approval and the original mood board remain intact.
- [x] Record the request for less comic-like game rendering and a view 15 degrees steeper, targeting about 45 degrees. The subsequent generated-guide and restyle workflow was rejected; its files are now removed.
- [x] Record the discarded S24–S34 attempt, including its generated-guide and prior-output restyles. The user rejected this workflow and requested removal. Git history retains the old evidence; it is prohibited as generation input.
- [x] Previously verify the 36-card attempt and review logic. This checkpoint does not imply approval; the latest eleven-image batch has since been removed.
- [x] Discard S24–S34 and remove their image/prompt/record files, comparison previews and generated guides. Record all eleven as rejected in the manifest; retain earlier decisions and both approved mood boards. No replacement generation was run at that checkpoint.
- [x] Make the raw-prompt and mood-board-only input rule explicit in the visual brief, generator instructions and review page. Prior outputs, concept screenshots, generated guides, derivatives and resumed sessions are prohibited.
- [x] Verify removal of all 42 batch files, eleven rejected manifest rows, no active browser candidates, valid remaining links/images and preserved earlier notes. Both approved boards and the review code remain unchanged. Save [the discard checkpoint](../art/concepts/discarded-batch-preview.png).
- [x] Generate six independent text-only Guarin studies. Preserve S35–S37 as internal camera/proportion revisions; present S38–S40 as Diablo II-led, Hollow Knight-led and blended rendering. The latter calls explicitly set new session IDs and use a dispatcher system prompt. No images, guides, prior history or resumed sessions supplied. Save [the live review preview](../art/concepts/fresh-grok-review-preview.png).
- [x] Verify exact raw prompts, one `image_gen` call per session, six unique session IDs, unchanged source pixels, image hashes/dimensions, review decisions/commentary/export and preserved approved boards.
- [ ] Resolve camera consistency and mail-symbol drift. A/B still appear shallow; C is closer. No exact 15-degree camera increase is claimed.
- [ ] **User approves the camera/proportion and rendering direction before the remaining concept batch.** Equipment collection approved with regional and cultural limits; no new Guarin concept is accepted yet.
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
| Items | Sword, kite shield, greathelm for Guarin, mail, wrapped splinter, rye head, sclerotia, household keys, reserved wheat host | Equipped and held views; icons and pickups where needed; wrapped/exposed splinter; intact/smashed sclerotia; ordinary/blighted grain; host reserved/encountered |
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
| 2026-10-04 | Mood board approved and concept direction refined | User explicitly approved all current references; no saved row exceptions or additions. Latest direction is more cartoony than Diablo II, less cartoony than Hollow Knight; visual brief and initial eight concepts defined | Generate, inspect and present concept candidates |
| 2026-10-04 | Character proportion correction | First C01/C02 sheets rejected as too grounded. User requests a cutesy feel, oversized heads and small bodies. Three new approaches S01–S03 generated, visually inspected and preserved with prompts, records, dimensions and hashes. Concept gallery verified in Chrome for review, reload persistence, export and mobile layout; approved mood-board state synchronized. Remaining batch is on hold | User selects the closest approach, then resume the concept batch in that structure |
| 2026-10-04 | Camera review and generator checkpoint | S09 selected; S13/S17 textures preferred, camera and anatomy rejected. Built-in generation paused; three alternative providers researched. All 68 current references, manifests, hashes, source credits and Chrome review controls verified. Equipment expansion remains in progress | Select generator; review a camera/proportion pilot and expanded dated equipment board |
| 2026-10-04 | Dated equipment selection ready | Expanded to 34 active European 12th–14th-century references with numeric dates, construction differences, gloves, legwear, footwear, shields, daggers, polearms and non-armored dress. Eleven earlier entries excluded with history retained. Source pixels, hashes, links, date evidence, Chrome controls, mobile layout and complete export verified; hidden-row comments survive | User selects equipment and image provider; camera/proportion pilot remains unapproved |
| 2026-10-04 | Current alternative-model comparison | Current Arena snapshot and provider documentation supersede the initial shortlist with MAI-Image-2.6, Reve 2.1 and Grok Imagine Image 2.0. Public access verified; none tested on Guarin. Proposed first trial: MAI with a fresh geometry guide. Preferred texture and exaggerated proportions remain explicit requirements | User chooses provider; configure access and verify trial pricing before the camera/proportion pilot |
| 2026-10-04 | Distinct art-style exploration | S01–S03 rejected for large eyes and nearly identical style. S04–S06 generated in flat ink, coarse pixel and dimensional sculpted media, all with full-face helmets and narrow visors; prior images preserved as rejected | Verify the updated gallery, then user selection of the closest new style |
| 2026-10-04 | Equipment board delivery correction | Equipment board 03 has 36 selectable dated references, with four footwear options across the requested centuries. Main mood board now has a prominent equipment preview and direct review links. Fresh browser confirms 36 cards, dates and comment boxes; Chrome verifies persistence, full export, loaded images and mobile layout | User reviews equipment board 03 and supplies selections/comments |
| 2026-10-04 | Grok selected and connected | Official CLI 1.0.46 refreshed its existing login, retrieved models and successfully executed one restricted headless image-generation call. Exact tool prompt, valid 1024 × 1024 JPEG and sanitized record preserved; no API key supplied. Underlying Imagine model ID and reference editing unverified; no Guarin pilot generated | Review a Grok camera/proportion pilot and the pending equipment selections |
| 2026-10-04 | Steeper game-art comparison ready | S30/S31/S34 compare Diablo II-led, Hollow Knight-led and blended rendering with a shared costume, huge helmet and squat body. The attempted proxy/restyle workflow was later rejected; current view estimated around 40–45 degrees against a 45-degree target. Eleven source outputs and their audit evidence were initially checked; batch files were later removed. Download completion capture remains unverified | Superseded by the discard-and-input-rule correction |
| 2026-10-04 | Batch discarded; input rule corrected | S24–S34 removed from the workspace and gallery. Eleven rejection rows retain the decision history. Every generation now requires a complete independent raw prompt and only approved mood-board base references as optional images. No new generation was run at that checkpoint | Superseded by the independent concepts delivered below |
| 2026-10-04 | Independent concepts delivered | Six raw-text generations completed in six unique sessions; S38–S40 visibly compare dimensional, flat and painted rendering. No images uploaded; tool inputs match saved prompts. Camera inconsistency and mail drift are recorded | User reviews the three drawings and comments before further concepts |

Review artifacts: [gallery](../art/mood-board/index.html), [overview](../art/mood-board/overview.jpg), [review manifest](../art/mood-board/manifest.md), [review instructions](../art/mood-board/README.md).

Three independent Grok drawings S38–S40 are now available in the concept gallery and manifest. All new calls used raw text only and distinct sessions. Rendering choices are ready to review; camera consistency and mail details need revision. No concept is accepted, and no sprite sheets or first-level implementation have been produced. Existing story and Godot edits remain excluded.

Mood board approval: **approved 2026-10-04**. Concept approval: **pending**. Asset lists: **not finalized**. Sprite approval: **pending**. Engine decision: **provisional Godot**.

Future work resumes from the current unchecked step after the relevant human review; it must not generate concepts or sprites across an unapproved gate.
