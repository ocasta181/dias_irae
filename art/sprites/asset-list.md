# Digital asset inventory

Source of truth for asset scope, states, and production status. Updated 2026-10-05. The production checklist is [../../docs/art-production-checklist.md](../../docs/art-production-checklist.md). Sprite rules and research are in [production-spec.md](production-spec.md).

## Scope and status

This inventory covers the five-act campaign in `story/story-arch.md`, all dossiers in `story/characters.md`, all locations in `story/locations.md`, the draft `story/systems.md`, and the current Godot movement, combat, loot, and encounter code. Story files are user-owned drafts; this inventory does not change them.

`Required` means the current story or implemented behavior needs the asset. `Draft` means a proposed mechanic needs it if that mechanic ships. `Conditional` means a branch or presentation choice needs it. A listed asset is not produced or approved unless its checkbox says so. Named finds remain named finds; this is not a random-loot catalog.

Decisions at commit `eb1f01ec8c0748773ded89d55dc74bf9e7606296`:

- 98% confidence: the latest instruction authorizes the inventory, the first full Guarin animation pilot, and its viewer while gameplay art review continues. It replaces the older concept-approval prerequisite for this pilot only. Other characters, items, environments, and level integration still need their category review gates.
- 95% confidence: keep Godot and the existing static local art site for this work. The viewer adds no server endpoint, database, or game mechanic.
- 90% confidence: eight independently drawn directions suit free movement in the existing isometric game. This is a project choice, not an industry rule. Do not mirror sword/shield hands.
- 90% confidence: produce complete coverage for the current character plus guard, interaction, and prayer as an animation pilot. Draft abilities are inventoried but do not silently become implemented mechanics. Full campaign art production must close those draft decisions before it can be called complete.

## Shared actor rules

Each world actor needs: identity reference; palette/material reference; size relative to Guarin; foot pivot; direction policy; animation timing; interaction/collision footprint; shadow/occlusion policy; state-transition rules; sound/event markers; source and exported assets; provenance and approval record. Collision, targeting outlines, and health bars are engine data or shared presentation, not painted into every character frame.

Eight directions mean N, NE, E, SE, S, SW, W, NW on the screen ground plane. Four or one direction is permitted for a stationary specialist if its use is recorded. Children are smaller than adults; adults share the same exaggerated head/body grammar. Boss scale changes must be intentional. Missing limbs change poses and silhouettes, not just colors.

State sets below avoid giving every civilian a combat sheet:

| Set | Required states | Direction coverage and reuse |
|---|---|---|
| Civilian | idle; walk if mobile; talk gesture; interact/work; fear/recoil; crouch/sit if scene uses it; injured/afflicted pose if needed | 8 for mobile actors; actual viewing directions for stationary actors. No attack/death asset unless a scene can use it. |
| Companion | civilian set; follow walk; wait; help/rite; choke/fit; injured; collapse/death if branch permits | 8 movement; authored gestures and condition variants. |
| Human fighter | idle; approach; alert/tell; attack anticipation/contact/recovery; guard where equipped; hurt; stagger; surrender/spared; death; persistent corpse | 8 combat directions; attack pose specific to tool. Corpse can be held final death frame. |
| Quadruped | idle; walk/trot; turn through facings; threat; lunge/bite; recoil; stagger; death; corpse | 8 directions; no human walk reuse. Unnatural rearing is a separate state. |
| Flying creature | rest/hover; travel; tell; attack; recoil; fall/disperse/death | 8 travel; authored silhouettes and altitude offset. Ground pivot and flight offset remain separate. |
| Named boss | introduction/talk where used; idle; travel; each distinct tell/attack/recovery; hurt/stagger; phase change; defeat; aftermath | 8 travel unless immobile. A telegraph must correspond to a distinct readable attack. Design attack roster before producing frames. |

## Guarin — complete first character pilot

The reference is the first-ranked gameplay screen captured after this inventory check, plus its exact original character. Store the selection time, order, status, paths, and hashes in `guarin/selection.json`. Rank is preference, not acceptance. Keep that selected costume and medium. Do not turn a nasal-helmet winner into a greathelm knight. For greathelm winners, preserve the closed helm despite the story draft's earlier nasal-helm description; this is the user's explicit art exception.

The first pilot has eight independently drawn directions, six source frames per state family, and eight families: **384 source frames**. A sprite sheet can have multiple atlas pages; the manifest is the complete logical sheet. Six frames is a starting art budget, not a quality guarantee. Reject malformed rows rather than synthesize motion from one still.

| ID | Family / visible sequence | Playback plan | Completion / transition |
|---|---|---|---|
| P01 | Idle: quiet breathing, weary weight shift, restrained cloth movement | 6 frames, 6 frames per second (FPS), loop | Can enter walk or an action; maintain last facing. |
| P02 | Walk: six distinct contact/passing poses, both legs participate, gear follows body | 6 frames, 8 FPS, loop | Direction changes keep gait phase; movement distance is controlled by game code, not drawn into frames. No separate sprint exists in current code. |
| P03 | Sword cut: ready, anticipation, wind-up, contact, follow-through, recover | 6 frames, nominal 12 FPS with unequal holds | One shot; return to locomotion. Contact event is metadata; do not change current instant-hit combat in the viewer. |
| P04 | Guard: raise 2, stable hold 2, lower 2 | Entry 10 FPS; hold 6 FPS; exit 10 FPS | Three tagged clips. Hold repeats only its stable poses. No whole raise/lower loop. |
| P05 | Hurt: recoil, recoil peak, settle, recover, ready, ready variation | 6 frames, 10 FPS | Interrupts normal actions; returns to locomotion. Critical defeat takes precedence. |
| P06 | Death: hit/collapse, fall, ground contact, settle, still, final corpse | 6 frames, 8 FPS with held final pose | One shot; corpse holds. No spontaneous resurrection. Debug reset is explicit. |
| P07 | Interact: reach, contact, manipulate/collect, withdraw, settle, ready | 6 frames, 8 FPS | One shot; contact event. Object opening/pickup is a separate asset and game rule. |
| P08 | Prayer/confession: lower/kneel 2, still channel 2, rise 2 | Entry 8 FPS; channel 6 FPS; exit 8 FPS | Three tagged clips; channel can be interrupted by damage. No giant magical glow baked into the body. |

These families produce twelve distinct playback clips: idle, walk, cut, guard-in, guard-hold, guard-out, hurt, death, interact, kneel, channel, rise. All have eight directions. The frame limit, actual usable count, and visual defects must be checked on generated pixels.

- [x] Define first-pilot state, direction, timing, and transition coverage.
- [x] Capture #1 after the inventory check: G15 / S13; exact time and hashes are in `guarin/selection.json`.
- [x] Generate and initially inspect all eight directions from G15 / S13. Three wrong-facing pages were excluded; only the improved east cut row is used from its last repair.
- [ ] Validate transparent cells, distinct poses, bounds, pivots, handedness, and loop motion.
- [x] Provide the [motion lab](guarin/viewer/index.html): twelve tags, eight directions, frame stepping, speed/rate/scale controls, overlays and transition tests. All 96 clip/direction selections load in the browser.
- [ ] User reviews the pilot in motion at gameplay size.

## Guarin — campaign expansion and condition assets

These rows retain all abilities from the draft. They are not implemented by merely showing an animation. Draw new physical poses when an action's geometry differs; reuse poses only when body action is genuinely the same. Separate effects from body sprites.

| ID | Status | Action / condition | Body asset and other assets |
|---|---|---|---|
| P09 | Draft | Thrust | Distinct sword anticipation, extension, contact, retraction; 8 directions. Do not relabel cut as thrust. |
| P10 | Draft | Timed block/riposte | Guard-impact recoil; distinct riposte; block timing cue, shield/iron impact sound. |
| P11 | Draft | Shield bash | Separate shield-forward attack/contact/recovery; stagger effect and sound. |
| P12 | Draft | Throw dagger | Draw, release, recovery; dagger projectile, embedded/ground views if recoverable; launch/contact events. |
| P13 | Draft | Sign of the Cross | Readable hand gesture with appropriate sword stow; ward effect; success/false-altar backlash cues. |
| P14 | Draft | Psalm / Confiteor | Channel body can share P08; separate text/voice, interrupted/success cues, Fulk pair alignment. |
| P15 | Draft | Reservation / physic | Host-to-mouth or dose-use body sequence; item use icon/event; judgment/heal/heat effects. Not the same pose as a hand sign. |
| P16 | Story + Draft | Spare / unconsecrated blow | Nonlethal surrender interaction/finisher body; restrained last cut can share P03 only if attack geometry is identical. Separate rule and target aftermath. |
| P17 | Draft | Vow-strike | Heavy anticipation/contact/recovery distinct from P03; detachable fire/heat effect. |
| P18 | Draft | Deus vult / Anathema | Shout or marking gesture; voice, target marker, fear/cleave/blessing effects. No new costume sheet for each spell. |
| P19 | Story + Draft | Heat / fit / vision-stun | Seizure/stagger poses; transition/recovery; heat overlay and vision treatment. Permanent limb loss is not yet specified: do not create amputated player variants. |
| P20 | Conditional | Carry wounded person / burial / pour cask / break relic | Paired carry and walk if gameplay uses it; kneel/dig; pour; break poses as each scene is implemented. Align partner/prop sockets. |
| P21 | Conditional | Travel unarmored / mount mule | Travel-cloth body variant; mount/dismount/seated plus mule if introduction is playable. No mounted combat is specified. |
| P22 | Conditional | Antioch iron wielded / splinter hafted | Two-handed ready/walk/thrust/hurt/death/interaction variants with shield removed; carried/buried/broken relic views. Keep optional branch separate from starting kit. |
| P23 | Required when gear changes are visible | Equipment states | Shared body plus synchronized armor/helm/cloak/weapon/shield layers OR complete fixed-loadout sheets. Evaluate style seams before choosing. No exhaustive cross-product of every item combination. |

No jump, dodge roll, stealth class, climb, swim, ranged bow player, or sprint mechanic is specified in current code or story design. If any is added, its state and transitions must enter this list before art production.

## Named campaign cast

| ID | Actor | First use | Asset set and unique states / costume |
|---|---|---|---|
| C01 | Guarin of Royans | I–V | Player set above; selected exaggerated proportions; corresponding exact kit. Travel and memory variants conditional. |
| C02 | Almodis of Royans | I / return hub / ending | Civilian; covered hair, worn brown-red wool; talk, domestic work, exhausted rest, hub worsening variants. No combat sheet. |
| C03 | Brother Odo | I–IV | Companion; crooked tau, inked hand, tonsure; follow/wait/read/write/chant, choke at rye altar, yellow-eye illness/treatment, collapse/death branch. |
| C04 | Father Giraud | I / restored confession | Civilian/priest; grey alb, burned palms; talk, refuse/hear confession, reserve host, restored Mass. Folded chasuble belongs to prop list. |
| C05 | Agnes | I / III / ending | Child civilian; dusty hair, unequal pupils, rope belt; sit/recite, walk/escort, fit/recover, lucid talk, safe/abandoned variants. Do not give child a generic fighter sheet. |
| C06 | Raimon the Long | I | Boss; keys/belt, horse-hide stumps, borrowed gait; talk during fight, unique tells/attacks, parasite departure, defeat/thanks; burial prop/aftermath. |
| C07 | Prior Isarn | II / IV | Priest civilian; good tau cloth, nurse hands; reception/talk/confession, conceal/admit, dying bedside and dead/charnel branch. |
| C08 | Brother Durand | II | Boss; linen-wrapped skinless forearms, pig-bone spatula; dose/restraint tells, attacks, defeat; patients/cask actions distinct. |
| C09 | Fulk of Livron | III / memories / IV branch | Civilian then boss/rite partner; crumb handling, anxious hands, lucidity/relapse, confession/vomit, held rite, shriven death, hatching, demon travel/tells/attacks/defeat. |
| C10 | Raimbaut of Saillans | III | Knight boss; damaged face/gloves, self-dyed white cloak; audience/guard/attacks/defeat/sparing aftermath. Riding only if scene requires, not assumed mounted combat. |
| C11 | Lambert | III | Priest civilian/conditional combat; borrowed pontifical, mitre/skullcap; audience, ledger work, public unseating, dead outcome. Champion is a separate fighter if used. |
| C12 | Aimar of Royans | I / memory | Grave body with exposed left arm; remembered household pose/portrait and optional judgment apparition. Not a living overworld walker. |
| C13 | Durand, nurse of flies | IV | Transfigured boss; flies/dosing body, new tells/attacks/phase/defeat, branch visibility. Do not reuse human sheet unchanged. |
| C14 | Raimbaut, leper-angel | IV | Transfigured boss; iron rule, flying/grounded policy, new tells/attacks/defeat. |
| C15 | Lambert, mitred locust | IV | Transfigured boss; counting gesture, locust movement/tells/attacks/defeat. |
| C16 | Fulk, the mouth | IV if knot held | Transfigured boss; mouth tells/attacks/defeat; separate branch from saved priest. |
| C17 | Reliquary-heart | IV | Immobile boss; dormant/awakened, pulse, tells/attacks, damage stages, unmaking, clear shaft. Hit/occlusion geometry separate. |
| C18 | Abaddon / Apollyon | V | Boss; human face, woman's hair, scale iron, scorpion end, millstone circlet; seated/awaken, travel if used, each attack/tell/recovery, unseat/fed reset, collapse of office. Design roster before frames. |

- [ ] Produce and review each required named actor set. Each actor has its own manifest row; reuse archetype timing, not identity.

## Household, crowds, and enemy archetypes

| ID | Required or conditional group | States / distinct asset needs |
|---|---|---|
| A01 | Rivoire cook, castrum boy, two old men | Civilian; cook/stir/carry, fetch, sit/watch; age/role silhouettes. |
| A02 | Parish tenants, hungry/blighted men and women | Civilian and human fighter variants; farm flail; rocking/muttering, missing-hand poses, fear/hurt/surrender/death where encounter permits. Healthy and affected share a base only when anatomy allows. |
| A03 | Wolves; one unnatural rearing wolf | Quadruped; upright tell/attack/recovery separate; full directional gait. |
| A04 | Brigands / famine rioters | Human fighter; distinct club, knife, farm-tool attack geometry; alert and spared aftermath. |
| A05 | Flagellant master and band | Human fighter; procession, scourge loop, recite, frenzy, calm/spare; master unique silhouette, Agnes branch composition. |
| A06 | Rye-men | Human-shaped enemy; growth/rest, stalk, cut/grasp tells, hit/stagger, disintegrate; grain remains. |
| A07 | Chaff angels | Flying creature; hover/travel, chaff tell/attack, disperse; no generic demon in Act I. |
| A08 | Holy pigs with human mouths | Quadruped; root, travel, mouth tell, bite/charge, recoil/death; shared style with pig prop/animal variant. |
| A09 | Ordinary pigs, mule, dog, sick horse | Idle/graze/baulk/rest and move when used. Mule carry-capacity/riding is conditional. Sick horse is a scene-specific actor/prop. Chickens/birds only if populated, not required by empty yards. |
| A10 | Antonine brothers, pilgrims, lazaret patients, lepers | Civilian/companion; stretchers, dose, pray, fit, missing limbs and pig-bone prostheses. Separate helper/hostile encounter reads without revealing morality by neon color. |
| A11 | Infirmary patient allies and hostile patients | Patient poses plus help/restrain/attack as needed; bed-bound and mobile variants; corrupted limb anatomy, injured/dead aftermath. |
| A12 | Converted pilgrims / corrupted Antonines | Human fighter; false rite gesture, attacks, fall/disperse; their habits differ from brigands. |
| A13 | Raimbaut's marked brothers and uninfected postulants | Knight fighter; gear variants, talk, guard/cut, surrender; mounted scene variants only if used. |
| A14 | Lambert's watch / optional champion | Human fighter; 12th-century locality-specific gear; guard/polearm or sword attacks; champion set if chosen. |
| A15 | Crest chapter, townspeople, market/canon/clean confessor | Civilian; witness/react, refuse/open access, confession. Crowd reuse with identifiable named speakers. |
| A16 | Revelation locust host / early locusts | Human faces, woman's hair, iron breastplates, scorpion tails; rest/flight/travel, stinger/bite/tells, hit/fall/death; swarm particles separate from individual enemy silhouettes. |
| A17 | Reliquary parasite / flies / insects | Travel/emerge/burrow; tick/swarm and separate effects. Named stage enemy behavior must be decided before animation rows. |

- [ ] Approve silhouettes, gear variants, readable attack roster, and exact spawn counts per encounter before producing each enemy type.

## Memory-only and offstage people

| Person | Required representation |
|---|---|
| Adhemar of Le Puy | Antioch audience / Syrian sickbed / judgment apparition; portrait or staged figure, with tired voice if voiced. |
| Peter Bartholomew | Iron discovery, carrying iron through fire, burned aftermath; crowd interaction. |
| Longinus | Tradition/relief/vision only if shown. No campaign enemy sheet. |
| Urban II | Opening text/name; portrait only if opening presentation calls for one. |
| Raymond of Toulouse | Offstage name, host banners/charter context; no walking actor required. |
| Gaston of Valloire and son | Charter/name and correspondence; no walking actor required. |
| Anthony / false Andrew | Anthony wall paintings and conditional vision; false-saint face in Fulk memory if staged. Do not label the counterfeit authentic. |
| Syrian broker, dying man, crusader crowd, memory civilians | Conditional staged/memory silhouettes and interaction poses; not full combat sheets unless the memory is playable. |

## Item inventory and visible states

For each obtainable item: inventory icon at intended grid footprint, small action/equipment icon if used, tooltip data, world pickup if it can be dropped, selected/hover/focus presentation supplied by shared interface, and equipped views only when visible. A stack count is text; do not draw 99 icons. Hidden authenticity stays hidden; do not create an icon that reveals it.

| ID | Item family / specific instances | Required art states; conditional states |
|---|---|---|
| I01 | Arming sword; current Ashen Edge placeholder | Oiled/worn baseline icon, ground pickup, right-hand directional attack views; damaged/repaired and blessing/defiled states if repair/blessing ships. Ashen Edge must be mapped or retired before story level. |
| I02 | Kite shield | Icon, left-arm synchronized views, ground view if droppable; guard-facing/impact poses. Damage is material change only if mechanic persists. |
| I03 | Helm | Winner's exact helmet icon and eight facing views; nasal helm/coif/greathelm variants only for approved loadouts. Greathelm exception recorded. No 14th-century helmets by default. |
| I04 | Gambeson / Antonine-quilted linen | Icon, body views, equipped silhouettes; clean/used/lard-treated variants if distinct items. |
| I05 | Hauberk / coif / mail mufflers | Icons and equipped body/head/hand views; repair/damage visual tiers only if exposed. No plate gauntlets. |
| I06 | Leather gloves / Durand linen wraps | Icon, hand views; wrapped/used variants, not modern articulated metal fingers. |
| I07 | Riding boots / mail chausses + better boots | Icons and walking/body views; distinct limb coverage. No 15th-century leg armor. |
| I08 | Royans wool cloak / Eastern cloak / travel bliaut | Icons, front/back cloth and gait states; cloak brooch/tear details; travel body variant conditional. |
| I09 | Dagger / cultellus | Icon, sheathed/world views; draw, held, projectile, impact and recovered/embedded if throwing ships. |
| I10 | Wrapped splinter | Wrapped/exposed/shown/hidden, altar placement, broken/buried/destroyed aftermath; hafted weapon conditional. Authenticity never indicated. |
| I11 | Antioch iron | Optional discovered/carry icon, wrapped burden, altar/ground, wielded two-hand views, broken pieces/buried outcome; no starting-kit version. |
| I12 | Eastern reliquary with grain and finger-bone | Closed/open/ticking/warm/scorched, locked presentation, unmade state; grown heart is C17. No fire-destruction success art: fire feeds it here. |
| I13 | Anthony bone relic / pig-bone prosthesis | Relic container/altar/procession views, warmed condition; prosthesis rack/item/attached limb shape; do not confuse holy bone with prosthesis. |
| I14 | Wheat host / rye host / clean wheat crock | Reserved/held/offered/consumed residue, crock shut/open/empty; blighted crumbs move. Body species can look similar until diegetic evidence; no omniscient true/false badge. |
| I15 | Herb wine / changed house wine / clean wine | Cask sealed/open/weeping/pouring/drained; cup full/empty; wine/blood/sclerotia transition; inventory dose icon if usable. |
| I16 | Pork fat/lard, spatula, linen bandages, water | Bucket/jar closed/open/depleted; dose/medical tool views; inventory icons only if usable; wound treatment effects separate. |
| I17 | Rye head / wheat / sclerotia / relic dust | Healthy/blighted crops, picked head, rag stained, intact/smashed sclerotia and rust moisture, dust container/spill. Crop field art and inventory icon are distinct. |
| I18 | Raimon's castrum keys / Aimar belt / household letter / Odo petition | World and inventory views where collected; key on belt vs removed, letter sealed/open/read; dated manuscript textures separate from interface text. |
| I19 | Lambert ledger / Odo register / Raimbaut rule-book / Isarn letter / illumination | Closed/open, legible inspection view with authored text; evidence icon if collected; chapter/vision variants only when story requires. |
| I20 | Purse / belt / pilgrim ampulla / Almodis ring | Starting/empty/held/equipped where visible; ring optional named find. Do not create a broad magical jewelry catalog. |
| I21 | Farm flail, club, scourge, staff, spear/polearm, knife | Enemy held/world/icon views only for actual approved archetypes. Different attack geometry needs separate actor poses. Date/culture each chosen equipment reference. |
| I22 | Bread, grain sacks/baskets, casks, peels, stamps, pots, tools | Prop states below; collectible icon only if gameplay collects it. Not every visible prop is loot. |

- [ ] Approve the named item roster, footprints, and visibility rules before item-sheet production.
- [ ] Check every item that can be held against every supported action; unsupported combinations must be explicitly restricted in game rules.

## Environment inventory — every campaign location

Every kit needs ground/edge/corner/transition pieces; wall/base/corner/cutaway pieces; doors and navigation widths; footprint and sorting data; occluders; prop anchors; light/shadow palette; level collision/navigation shapes; minimap representation if used. Reuse limestone/limewash/wood kits across places, but preserve each place's identifying landmarks. A full background painting cannot substitute for traversable tiles, cutaways, or prop states.

| ID | Place / kit | Distinct assets and state changes |
|---|---|---|
| E01 | Last league into Royans | Limestone gorge/switchback, terraces, box/juniper, roadside soot cross, basket/shoe, swollen rye; mule baulk scene; late-summer wind. |
| E02 | Rivoire village | Limewash/ochre houses, slab roofs, mud/chaff paths, well, oven, lychgate, closed doors/shutters, blackened village cross, tau-marked house, empty animal yards; hub degradation stages. |
| E03 | Saint-Laurent and yard | Thick small Romanesque nave/apse, painted Majesty, sacristy, locked aumbry, dry font, chasuble chest, crucifix normal/extra tau, altar, wheat reserve, two Aimar graves/raised coffin/stones, Agnes seat; restored clean state. |
| E04 | Burned mill | Stream/riverbank, wet charcoal shell, jammed wheel/tick, millstone/sclerotia/smashed clots, brush, door-iron, debris; evidence aftermath. |
| E05 | Rivoire castrum | Modest hall/tower, shutters, hearth/beams, stable/yard, household chapel, table/settings diminishing, belt peg, scratched hearth-stone, upper chamber/letter; neglect variants and ending state. |
| E06 | Undercroft and paddock | Low vaults, flaking lime, barrels, black apples, stall open/barred, stool/wrappings, knee-high scratches, churned paddock; Raimon fight and cleared aftermath. |
| E07 | Bourne road / Pont-en-Royans | Pale gorge, green river, bridge/chapels/parapet taus, approach houses, terraces, pig pen, procession space, dropped scourges; corrupted travel variants. |
| E08 | Pont lazaret | New wattle/lime shed, wine tau, pallets, lard bucket, water delivery/carry routes; occupied/cleared treatment states. |
| E09 | La-Motte abbey-hospital | Low Romanesque shrine/wards/courtyard, black/taupe laundry, stretchers, prosthesis racks, tau gables, Anthony paintings, bells; eased/worsened/1102 state. |
| E10 | Infirmary | Beds/straw/linen, high windows, trestle/weeping cask, spatulas/treatment tools, patient props; spilled/drained/aftermath states. |
| E11 | Bakehouse and rye chapel | Oven mouth/embers/tainted/destroyed, peel/stamps, wheat/rye bins, portable altar, off-true crucifix, moving crumbs, hidden clean-wheat crock. |
| E12 | Scriptorium / remnant chapel | Desks/window, ink/gold-leaf/paintings, blind illuminator station; locked grate, Eastern box, altar millstone cracks, feeding scorch; unmade aftermath. |
| E13 | Maladrerie | Huts, lime ditch, clappers/posts, shed chapel, long host spoon; mobile/stationary patient paths. |
| E14 | Isère/Rhône corridor | River/towpaths, broad fields cut/standing/blighted, ruined granaries/towers, oak woods, processional litter, burning charcoal; seasonal deterioration. |
| E15 | Abandoned castra / charcoal camps | Open roofs, warm hearth, rule-book, beehive charcoal stacks, supplies, clean portable altar; combat/mercy aftermath. |
| E16 | Romans / Saint-Barnard | Larger Romanesque church/cloister, market stalls, chalked/washed taus; crowd, clean confession station. |
| E17 | Commandery above Drôme | Ruined castrum/timber repairs, chapel gilded wounds, white cloaks, gloves on beam, seized grain, gate/council space; surrendered/cleared variants. |
| E18 | Crest | Ochre rock/keep, outer clean town/market, hurried inner wall/gates, sick inner streets, scratched Latin, Lambert chapel/ledger; public unseating/violent outcome. |
| E19 | Pilgrimage hospice | Low pallet room, kitchen, decent crucifix/chapel, Fulk corner/crumbs/eastern rag/dust box; confession success/death or demon-hatching damaged room. |
| E20 | Antonine charnel | Lime shelves, limb boxes/year labels 1095–1101, ticking 1099 box, last letter; traversal and corpse evidence. |
| E21 | Merovingian crypt | Rough vaults, sarcophagi, faded chi-rho, comb/horse-bit/grain-measure offerings, soundings 944/994 inscriptions, failed seal. |
| E22 | Roman granary / mithraeum | Brick/opus reticulatum, amphora necks, benches, smashed bull relief, fused grain dust, millstone-circlet relief; soldier-cult evidence. |
| E23 | Older shaft / agent landings | Circular rye-glass well, black/amber faces and memory inserts, mercy doors / zeal longer stair, four boss landings, reliquary-heart obstruction / cleared drop. |
| E24 | Pit in grain / ending | Black silo ribs, floor/abyss edges, reverse-snow sclerotia, locust host, office seated/unseated, rain stop, shaft restored; return/1102 ordinary-grain variants. |
| E25 | Antioch memory | Cathedral floor/hole, iron discovery, torchlight, crowd, Adhemar/Peter/Fulk/Guarin staging; too much gold, same medium. |
| E26 | Maʿarrat memory | Courtyard/fire/pot, offered meal, blessing/Guarin temptation, ash/fat cues; no unrelated dungeon kit. |
| E27 | Jerusalem memory | Streets/market, labor/slaughter aftermath, Syrian broker/splinter transaction; hot light. |
| E28 | Corridor of fire memory | Two wood piles, flame sequence, Peter with iron, Fulk/crowd, burned exit. |
| E29 | Anthony desert vision | Conditional desert/beasts/saint-temptation backdrop and scene figures; hospital sensory overlap. |

- [ ] Approve first-level boundaries and traversal scale before environment-sheet production.
- [ ] Produce shared terrain/building kits, then landmarks; verify adjacency, corners, depth sorting, and occlusion at actual camera scale.

## Shared prop-state checklist

- [ ] Doors/gates/grates: shut, opening, open, closing; locked is a shared cue unless physically different. Destroyed only if encounter allows destruction.
- [ ] Chests/aumbry/crock/box: shut/open, contents/empty; seals/locks separate where visible.
- [ ] Shutters/roof cutaways/walls: closed/open/hidden visibility pieces; no animated fade baked into pixels.
- [ ] Altar/crucifix: clean/contaminated/restored, ordinary cross/unnatural tau; interactive reserved species; evidence state readable without omniscient labels.
- [ ] Ovens/casks/reliquary: intact/active/tainted/open/unmade or destroyed as story specifies; pouring/embers/ticking separate loops and events.
- [ ] Mill wheel/water: jammed/irregular move/cleared if supported; bank/water edge transitions; stream surface animation separate.
- [ ] Crops/vegetation: healthy/blighted/cut/charred, wind loop or shader if appropriate; harvest ending variant.
- [ ] Graves/coffins/corpses: unburied/buried/raised/held grave; persistent aftermath, not despawn with no story trace.
- [ ] Breakables: intact/cracked/broken/debris only for interactive objects; collision change at a defined event.
- [ ] Furniture/tools/textiles: complete static roster per room; work/cloth loops only when camera scale justifies them.
- [ ] Light sources: unlit/lit/extinguished if interactive; flame/halo/shadow separate; window light is environmental presentation.

## Effects, sound, interface, and overlooked deliverables

| Category | Checklist |
|---|---|
| Combat effects | [ ] Sword/weapon impact, dust/contact, shield block, stagger cue, ordinary/burning wound, death/parasite departure. Effects need start/active/fade, orientation, scale, priority, reduced-flash mode, and events. |
| Spiritual / illness effects | [ ] Heat build/fit/recovery, valid-host judgment, true/false rite responses, healing, confession success/interruption, ward/psalm, zeal mark/fire, relic answer, hatching, heart unmaking, Abaddon fed/unseated. Keep body silhouette readable. |
| Environment effects | [ ] Rain/splash, wind/chaff, wet ash, smoke/embers, flies, grain/sclerotia fall, torch/oil-lamp flame, water, rye-glass memories. Particle sprite sources plus emitter data; no generic particle explosion for every state. |
| Sound effects | [ ] Material-specific footsteps, cloth/mail/gear, sword/shield/farm tool/dagger/polearm, hit/hurt/death, creature gaits/tells, interact/door/lock/pickup, wheel/water/oven/cask, bell/clapper, relic tick, rite/vision/locust cues; variants with gain and loop points. |
| Ambience / music | [ ] Gorge, village, church, mill, hall, ward, road/procession, town, crypt, shaft, silo, memories/ending; seamless loops and stems where needed; combat/mercy transitions. Music and voice are not sprite-sheet frames. |
| Voice / dialogue | [ ] Named character lines, barks, rite/psalm text and audio if voiced, subtitles, speaker portraits if interface uses them, localization text identifiers and readable font coverage. Text remains editable; do not bake dialogue into backgrounds. |
| Heads-up display | [ ] Health, Heat, four axes Arms/Faith/Penance/Zeal, optional Grace, ability slots/cooldowns/selection/unavailable state, target/interaction cues, companion status, burden/relic cues; Sight is a condition, not an invented fifth axis bar. |
| Inventory / equipment | [ ] 10×4 current grid, footprint masks/highlights, drag ghost, valid/invalid drop/focus, equipped slot views, tooltip typography, inspect/evidence view, item use/repair/blessing cues only when mechanics ship. |
| Menus / navigation | [ ] Title/pause/settings, new/continue/save-load if specified, death/restart/run completion, dialogue choices, journal/campaign map/minimap if used, loading scene, credits and license attribution. Selection/hover/pressed/disabled/focus states; cursor/controller/touch glyphs only for supported inputs. |
| Accessibility | [ ] Keyboard focus, legible small text and contrast, subtitles, independent cue shape/icon for color states, reduced flash/shake, volume controls, input remapping labels; do not paint tiny necessary text into sprites. |
| Engine data | [ ] Collision/hurt/attack shapes, foot pivots, shadow size/offset, attachment sockets, per-frame duration, event timing, interrupted/completed rules, navigation and occluders, draw-order layers, resource imports and load budgets. Normal maps are conditional; flat style does not require them. |
| Production files | [ ] Editable native art/layers where available, original generator outputs/prompts/input hashes, atlas pages and manifest, animation tags, per-frame anchors/durations, palette/style guide, revisions/acceptance, license/source records, repeatable validation/export tools, preview app and checks. Generated raster is not falsely labeled a layered drawing source. |
| Release assets | [ ] App icon, splash/loading art, store/key art/screenshots/trailer only when release channel is chosen; supported-resolution/font/input checks. No multiplayer/network art scope has been requested. |

## Completeness check and release gates

- [x] Account for all named dossiers, chorus groups, five historical/offstage memory names, and Abaddon.
- [x] Account for all 28 named location sections plus the conditional Anthony vision.
- [x] Account for current movement/melee/damage/defeat/loot/equipment and every draft combat ability.
- [x] Account for physical item states, evidence props, branches, hub degradation, and ending.
- [x] Account for animation metadata, world occlusion/collision, effects, sound, interface, accessibility, and source/licensing records.
- [ ] Settle draft mechanics before producing their final art: Grace, permanent limb consequences, visible equipment layering, mule gameplay, exact boss attack rosters, save progression, memory playability, and release platform.
- [ ] Each actor passes in-motion visual review: all required directions/states, stable identity/pivot, consistent proportions/handedness, no clipped weapons, usable silhouettes at gameplay scale.
- [ ] Each item passes icon/world/equipped consistency and exact visible-state coverage.
- [ ] Each environment passes transitions, collision/navigation/occlusion, interaction reach, and story-state coverage.
- [ ] No asset is promoted to game production solely because a generation request completed.

Inventory confidence: high for coverage of the current story and code; provisional for quantities dependent on unresolved mechanics and encounter layouts. Actor animation counts use `sum(frames per clip × distinct directions × genuinely different loadouts)`, excluding reused frame tags. Do not multiply by every possible inventory combination. The first pilot budget is 384 original cells; final accepted frame count can only be established after inspection.
