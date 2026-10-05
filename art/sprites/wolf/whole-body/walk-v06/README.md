# Twelve distinct wolf walk drawings

The user requires twelve different whole-body drawings across one second of walking, with the original 36 logical px/s travel. The eight-frame speed-up is withdrawn. The live lab retains the rejected old study; no replacement motion is approved.

## Verified planning

`walk-controls-v06.mjs` produces twelve unique targets, 83.333 ms holds, three drawings per quarter-cycle beat and four swing poses per paw. Joint reachability, stance contacts, fixed head/body registration and loop closure pass in the plan. These checks do not measure generated art. Forty viewer/animation tests pass after undoing the timing-only change.

## Drawing experiments

Two built-in single-pose requests received only canonical identity art and the matching new stick guide. The first shifts scale/layout; the second uses matching canvases and preserves scale more closely, but its near hindpaw still misses the target and the far forepaw is not independently readable. Both are held back in `attempts/`; neither is an input to any later call. No twelve-frame sheet has been produced from these experiments.

`canonical-canvas.png` is a fixed whole-image transform of the original v02 wolf, with high-resolution paint retained. It is not a failed walk drawing or a component assembly. `reference-register.json` records its lineage.

## Continuous-motion method and actual blocker

The installed Grok game-asset animation instructions prescribe video-first motion, then frame extraction. The prepared request supplies the canonical wolf on a uniform keyable background as both pinned endpoints, the twelve-stick-pose guide as a motion reference, a complete numeric foot table, a one-second four-beat cycle and explicit flat 2D/proportion/registration invariants.

The native `reference_to_video` tool actually ran once. Its inputs exactly match `video-request.json`, verified from the event stream. `video-record.json` preserves the sanitized call, source hashes, actual failure and disclosed orchestration usage; raw session signatures are excluded. **No video and no extracted frames were produced.**

The service reported:

> Video generation tools are unavailable under zero data retention (ZDR). To enable, either turn off /privacy mode to disable ZDR or supply a user-hosted storage bucket (see https://docs.x.ai/build/settings/zdr-video-storage).

The [installed Imagine instruction](/Users/ocasta/.grok/bundled/skills/imagine/SKILL.md), Video—Availability, says to “relay that error verbatim and stop the workflow,” without generating more source images or retrying. It applies to this actual ZDR storage error. Privacy remains unchanged. This is a service configuration constraint, not an automatic approval-review rejection.

[xAI's current storage documentation](https://docs.x.ai/build/settings/zdr-video-storage) requires an S3-compatible bucket, endpoint, region and upload-signing credentials in `~/.grok/managed_config.toml`. Only signed URLs leave the machine; credentials are not sent to xAI, and video goes directly to user storage. The configuration file is currently absent. No bucket, account, credential or privacy setting was created or changed.

## Next gate

- [x] Undo the speed-up and preserve the original travel/cycle duration.
- [x] Define twelve distinct new pose targets and self-contained generation inputs.
- [x] Hold back failed single-pose artwork; preserve source lineage.
- [x] Attempt the continuous-motion method once and record the exact ZDR failure.
- [ ] Obtain the user's storage choice/approval before changing data handling.
- [ ] Generate one coherent whole-body cycle, extract twelve distinct useful poses, measure actual contacts and inspect all adjacent transitions/seam.
- [ ] Pack and load the verified replacement in the motion lab; retain the current failed study as history.
