# Planning and motion

Read for stages 1–5. The purpose is to resolve motion in coordinates before a drawing model chooses poses.

## Production contract fields

Record these as concrete values or explicit open decisions:

- Exact character and style images, file hashes, reference roles, costume/face rules, approved versus merely preferred status. Include a gameplay reference when environment scale, lighting or texture matters.
- Rendering medium: pixel grid and edge rules, or painted/inked texture rules; permitted shading, outline, palette and transparency. A model-generated pixel-looking image does not establish a consistent pixel grid.
- Camera: projection type, axis convention, elevation/bearing or projection matrix, and which surfaces should be visible. A text prompt or helmet-top ellipse is not a calibrated camera measurement.
- Directions: explicit names and screen/world headings. Distinguish anatomical left from screen left. Record equipment asymmetry and directional occlusion.
- Logical canvas, ground root, neutral height, attachment points and target on-screen sizes. Declare whether subpixel pivots are allowed and when pixel snapping occurs.
- Root-motion policy: controller moves the actor, animation supplies displacement, or an explicit combination. Identify who owns travel during entry, attacks, recoil and recovery.
- Runtime/export: engine version, frame-data format, filter, zoom range, alpha convention, color space, maximum texture size, page/memory budget and packing rotation support.
- Budgets: landmark error, grounded drift, loop continuity, proportion variation, idle amplitude and texture change. Express tolerances at a stated display/reference scale.

Do not select a new engine, add movement mechanics, or treat an unknown as accepted just to complete the contract.

## Inventory worksheet

Use one row per action/direction requirement. Include: stable ID, behavior trigger, source authority, entry/hold/exit tags, looping, duration, support rule, events, interruption/recovery, frame count, variants, status and known gaps.

Test scope before drawing: a character who can move eight ways needs eight authored views unless symmetry and gear rules explicitly permit reuse. Guard raising, held guard and lowering are different playback phases. A held prayer must not repeatedly kneel. Defeat holds its final pose if the game requires that behavior. An intentional held drawing is valid; it does not count as a new distinct pose.

Combat events belong to the game's authoritative timing. Record proposed animation events without silently changing damage, invulnerability, cooldowns or cancel windows. Separate character effects/shadows from body art when the runtime needs to control them.

## Coordinate and contact plan

1. Choose a fixed ground root under the body, independent of either moving foot. Give it one logical-canvas coordinate.
2. Define a local forward axis, lateral axis and height. Specify a deterministic transform into each camera/direction view. For a simple elevated view, horizontal ground and height project separately; for another camera use its actual matrix.
3. Assign stable anatomical limb IDs. Define the planted contact landmark: flat sole, heel, toe, hand or another support. A rolling foot changes which landmark is locked; its sole centre is not necessarily stationary throughout heel-to-toe roll.
4. Place each ground contact in world coordinates and give each placement a contact ID. During support, solve the local landmark as the inverse projection of `contactWorld − rootWorld`. During swing, define the next contact and an explicit height/forward trajectory. Bound lateral motion and foot yaw.
5. Solve knees/elbows from limb lengths and bend direction. Check reachability, silhouette and short/long limb proportions. Position boot heel/toe, weapon tip, hand grip and shield attachment; one foot-centre dot does not establish their shape or continuity.
6. Record each frame's sample time, hold interval, root path, contacts, projected landmarks, depth order and material/gear invariants. Generate diagrams with those IDs and a machine-readable table.
7. Check the full support trajectory and loop wrap. A planted local foot normally moves opposite root travel; judge the world contact, not the sign of its local motion.

For a loop with constant travel, projected stride distance `D` and duration `T` imply projected speed `D/T`. Scale playback time and root travel together. Keep unit conversion between engine coordinates, source pixels and displayed pixels explicit. Resizing a preview must not change the stride-to-body ratio.

## Derive frame counts

Start with the important poses for the action. A human walk has contact, down, passing and up on each side; it need not give those poses equal spacing. A gait with a support overlap needs different contact timing from a run with a flight phase. Describe jumping/running/flying support deliberately rather than apply walking constraints to all actions.

Choose sample density from error and readability, then add anticipation, impact and recovery poses where needed. For a constant-speed, held raster frame sampled at its midpoint, worst ideal contact drift is `speed × holdDuration / 2`. Therefore equal-duration frames over distance `D` need at least `ceil(D / (2 × temporalErrorBudget))` samples during the relevant motion. Use projected travel, the smallest supported display scale and separate drawing/quantization error. For variable timing or curved root paths, evaluate actual within-hold extrema; an average frame rate cannot bound a long hold.

More frames do not fix wrong contacts or material flicker. Too few frames can cause visible stepping even with correct target geometry. Do not crossfade two raster poses to conceal this. State the quality/frame-cost tradeoff before expanding a batch.

## Idle, transitions and turns

- For a quiet planted idle, lock lower-body contacts and geometry. Animate only the requested breathing/nod/sway at a measured amplitude and duration. If weight shifting or a foot shuffle is intended, give it an explicit action and contact path.
- Starting must begin at the current idle contacts and reach a specific gait phase. Stopping must begin at the actual phase and land in a compatible stance. Matching endpoints and root velocity are separate checks.
- Do not wait for the next convenient contact if that violates input responsiveness. Use a phase-aware settle, controlled foot placement or the game's explicit snap policy, then measure the result. A contact-only stopping example does not solve arbitrary-phase release.
- Turning needs stable world support and anatomical equipment. Preserving normalized gait phase alone does not preserve contacts. Calculate planted-foot placement in the new view, next swing destination and occlusion changes. Bound turns by leg reach.
- Test movement→strike→movement, hurt interruptions, guard release and terminal states. Ensure a canceled event cannot fire later and a recovered character does not change root or boot positions unexpectedly.

## Tactical review of motion blocking

Render a cheap 2D skeleton with the planned limb lengths, proportion envelope and labeled support points. Overlay world contact marks and paths. Play moving-root and stationary-root views; a stationary-root view can hide sliding.

Inspect both sides, rear, diagonals, loop wrap and handoffs. Record errors by frame/contact ID. Automate support, timing, finite coordinates, reachability and drift. Use visual judgment for bend direction, gesture clarity and weight. Do not claim colored skeletons are finished sprites.

## Worked calibration: short, squat knight

An example from a flat elevated-view project uses a 256-square logical canvas, root `(128,208)`, neutral screen height 160, 48-unit full stride over 800 milliseconds, 24 midpoint walk drawings, ±8-unit foot lanes and a maximum 8-unit lift. Its projected temporal drift budget is one reference pixel; drawing error has a separate budget. Quiet idle locks feet/hips and allows at most ±0.5 reference pixel of head motion over 2.4 seconds.

These values suit that project's small legs and measured movement experiment. They do not prescribe 24 drawings, eight directions, a 45-degree camera or cute proportions for other games. The knight's exact character and gameplay images remain mandatory identity/style inputs; numerical pose guides do not replace them.

Primary basis: [Animation Mentor's walk tutorial](https://www.animationmentor.com/blog/tutorial-animating-human-walk-cycle/) for pose construction and root translation; [Godot SpriteFrames](https://docs.godotengine.org/en/stable/classes/class_spriteframes.html) for elapsed frame duration. The numerical budgets above are authoring choices and geometric derivations.
