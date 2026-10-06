# Manual wolf animation audit

2026-10-07. **All 96 active painted frames were individually compared with their corresponding approved stick poses. All eight cycles fail whole-body motion review.** No frame or cycle is promoted to production approval.

The user explicitly rejects the entire 96-frame pose transfer: all paintings are off the approved stick figures, not merely E-06 or a few isolated contacts. Preserve this set as failed evidence only. Rebuild starts with one correctly implemented intact sprite; no further sheet or painting is authorized until the root-cause investigation produces a credible strategy.

| Directions | Frame-by-frame review | Coverage |
| --- | --- | --- |
| E, W | [Parent review](review-e-w.md) | 24 individual pairs |
| N, S | [Independent review](review-n-s.md) | 24 individual pairs |
| NE, NW | [Independent review](review-ne-nw.md) | 24 individual pairs |
| SE, SW | [Independent review](review-se-sw.md) | 24 individual pairs |

Each reviewer opened every assigned pair image. The parent read all three independent reports and reproduced representative defects in N-09, S-12, NE-09, NW-04, SE-03 and SW-04. Source hashes and all 96 exact guide/source mappings are retained in `index.json`. The registered three-pane images in `pairs/` show the active painting, matching stick and overlay. No independent recentering or scaling is applied to a wolf during comparison.

## What failed

The animal is an intact bitmap, but that fact alone does not make its motion coherent. Head, back, ruff, tail and main coat contours appear held within groups 01–03, 04–06, 07–09 and 10–12. At the group boundaries they change shape/texture abruptly. The old prompt explicitly told the model to keep head/spine/coat identical and change only limbs. That instruction is withdrawn.

Visible paws also miss planned contacts or support identities. Clear examples include N-09 hind ordering, S-02/03 right-front stance, S-12 left-front swing, NE-09→10 and NW-03→04 forepaw landings, and SE-03→04 / SW-09→10 touchdown jumps. Rear diagonals drift toward a longer torso and smaller head. Many far-side paws are occluded; they remain unverified rather than receiving invented coordinates.

## Repair contract

Keep one complete separately drawn wolf per step. Draw shoulder/haunch loading, chest/abdomen deformation, connected neck/head response, tail response and fur flow as one animal. Coat markings must follow their underlying mass rather than shimmer randomly. Keep the approved paw endpoints/support sequence, huge head/tiny body, fixed camera, twelve distinct drawings over one second and straight runtime ground travel. Add no runtime bob, sway, scaling, rotation or painted-part deformation.

Two V11 pilots test a complete twelve-pose request instead of four independently generated trios. Fresh whole-body controls retain all 48 approved paw endpoints and support labels while recomputing reachable joints around restrained upper-body articulation. The second fixes the first template's contradictory muzzle silhouette. Only the original identity and new controls are generation inputs; no nose fitting removes intended head motion afterward. Parent and independent reviewer inspect all twelve frames in each pilot and reject remaining lane/support, upper-body and loop-height failures. Both stay outside the motion lab. The active V10 source bytes are unchanged.

## Evidence limits

This establishes actual frame-specific visual failures and chronological discontinuities. It does not establish a numerical contact-budget pass, continuous-video perception, normal-speed appeal or final human approval. Existing packing/controller tests establish software behavior only. Painting measurements, actual exported playback and repaired-loop acceptance remain separate gates.
