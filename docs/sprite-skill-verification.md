# Sprite skill verification

2026-10-05. The requested reusable skill is complete and installed. This checkpoint creates instructions and a contact checker; it does not create replacement Guarin drawings or approve existing sprites.

Decision at commit `4f9ac5deca5e8a4963af539931e4d6ac0194666b`: keep the canonical skill in `skills/sprite-production` for version control, and install an identical copy at `/Users/ocasta/.codex/skills/sprite-production` for reuse in other Codex tasks. Confidence: 98%, based on the user's skill request and the skill-creator installation guidance. Game-specific values remain an example rather than universal defaults. No game endpoint or persistence contract changes.

## Delivered

- [Main skill](../skills/sprite-production/SKILL.md): ten stages with explicit inputs, actions, outputs and pass conditions.
- Planning reference: contract, action/direction/transition inventory, registration, support landmarks, exact trajectories, frame density and responsive handoffs.
- Authoring reference: exact input images and roles, bounded drawing requests, actual landmark measurement, local repairs and diagnosis after repeated failure.
- Export reference: transparency, pivots/trim offsets, timing, deterministic packing, sampler/memory constraints, engine playback and finish criteria.
- [Contact checker instructions](../skills/sprite-production/references/contact-checks.md), standard-library Python checker and 25 test cases.
- Skill interface metadata with `$sprite-production` invocation. Eight installed files match the versioned source byte-for-byte; cache files are excluded.

## Verified

The official skill validator passes on the source and installed copies. All local Markdown reference links resolve. Ruff formatting and lint checks pass. All 25 checker tests pass, including reversed compensation, idle shuffle, interior root jumps, missing measurements, trim registration, invalid numbers/timing and preservation of input/report files.

The existing [Guarin numerical plan](../art/sprites/guarin/locomotion/foot-targets.json) also passes the checker: eight directions, five clip types, 40 clips, 456 frame records and 1,656 sampled contact observations. Its 256-bit Secure Hash Algorithm (SHA-256) source hash is `436d4d6ba9621007c8099e6d424e3c6ac8f8243c30f26b32034721a387f0a0a3`.

For that check, each planted sole's `worldSole` is projected with the existing vertical ground factor. Repeated anatomical-side/world-placement pairs share a contact ID. Each frame retains its recorded sole, pivot and duration. Root samples come from the existing motion functions at hold start, midpoint and end. The budget is one reference pixel. This is a `target-plan` check, not a measured-art check.

```json
{
  "passed": true,
  "basis": "target-plan",
  "scope": "submitted contact samples only",
  "observation_count": 1656,
  "failures": []
}
```

Behavior review against the recorded failures confirms that the workflow requires: fixed idle contacts; numerical root/stride agreement; direction and gear checks; motion blocking before detailed generation; actual source landmark measurements; source-image lineage; separate visual checks; and exported-package playback. A completed generation call or numerical-plan pass cannot promote the art to production status.

## Repeat the skill checks

From the repository root:

```sh
uv run --no-project --with pyyaml python \
  /Users/ocasta/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
  skills/sprite-production
uv run --no-project --with ruff ruff format --check skills/sprite-production/scripts
uv run --no-project --with ruff ruff check skills/sprite-production/scripts
uv run --no-project --with pytest pytest -q skills/sprite-production/scripts
```

Actual image authoring, full sprite export and engine acceptance were not run for this skill-only task. The existing locomotion drawings still need the measured pilot and visual review already listed in the art production checklist.

## Wolf test and corrected method — 2026-10-05

The subsequent wolf test falsified the painted-component method: deterministic contact and packing checks passed, but the user rejected its disconnected-looking anatomy. The first whole-body drawing was then rejected for realistic proportions. These are retained as failure evidence, never as future generation references.

At commit `7e004ab`, the corrected study uses original S13 as the dominant proportion authority, an intact exaggerated wolf base, anatomy-aware canine skeletons and complete painted animals in every pose. M15 supplies species features only. The active [whole-body contract](../art/sprites/wolf/whole-body/production-contract.md) locks the large head, short torso and stubby legs. The skill now requires this reference hierarchy, proportion checks before animation, whole-body controls for organic characters and a visual veto over numerical passes. Its rig guidance is reconciled; a rejected parts method is not a fallback.

The first whole-body [motion lab](http://127.0.0.1:8765/art/sprites/guarin/viewer/index.html?character=wolf) study loaded 25 drawings: one still pose and a 24-pose E walk. Its package remains archived. Thirty-five controller/guide tests passed at that checkpoint. The actual art failed contact inspection: one measured forepaw in the first six frames drifted up to 9.53 logical pixels against a 2-pixel budget. Other required contacts were missing. Original source frame 4 also touched its cell edge. No production readiness or user approval was claimed.

Deterministic checks can enforce source lineage, alpha, page/cell coverage, registration, reconstruction, timing, root travel, measured contact drift and explicit missing evidence. `whole-body/qa.mjs` demonstrates byte-exact reconstruction and actual painted-edge measurement after human identification of the paw region. Region identity, occlusion, anatomical coherence, exaggerated style and visual appeal still need review. A computed skeleton passing its own targets is not an art test.

## Cadence correction after playback feedback

At commit `40419b8`, the active wolf becomes one standing pose plus eight newly drawn whole-body walk keys. Enlarged four-pose guides preserve the intact base and original style references. The one-second loop runs at eight frames per second; default canvas travel rises from 40 to 54 pixels per second. Thirty-six controller/guide tests now pass, including first-movement cadence selection, exact default travel and loop completion. The browser confirms the new sequence at normal speed.

`whole-body/qa-current.mjs` verifies the current nine-frame package and records actual painted-paw measurements independently from the targets. The partial contact report still fails, with drift up to 12.77 logical pixels and missing support measurements. Reduced cadence is not a contact repair. The skill now requires counting observed limb cycles, checking animation and travel together, and changing the control method after repeated geometry failures. The full eight-direction wolf package remains unfinished.
