# Grok image-generation connection

Verified on 2026-10-04. The user selected Grok for future concept work. **The existing installation and login already work for unattended image generation; no new installation, plugin or API key is needed for this route.**

## Verified local setup

- Executable: `/Users/ocasta/.grok/bin/grok`.
- Version of the command-line interface (CLI): `1.0.46 (2765805b9442) [stable]`.
- Authentication: existing cached Grok login, refreshed by the CLI. No credentials were printed, copied into the repository or supplied as command arguments.
- A live `grok models` request returned Grok 4.7 and the other available language models.
- One headless `image_gen` call succeeded with the exact requested prompt and `1:1` aspect ratio. The returned JPEG decoded at 1024 × 1024 and was visually inspected.
- Connection-test evidence: [image](../art/tooling/grok-connection-test/cube.jpg) and [sanitized generation record](../art/tooling/grok-connection-test/record.json). This neutral cube is a tooling check, not a concept candidate.

The CLI needs network access and permission to update its own authentication/session cache under `~/.grok`. The initial restricted call could not acquire its authentication lock; the permitted retry refreshed the login and succeeded. A sandbox failure does not mean the user's account needs another login.

## Mandatory rule for every generation

The user requires a **complete raw prompt for every iteration**. Each call must use a new independent session. Never pass a pre-existing generated concept from a prior iteration, including a rejected, failed, selected or previously preferred output. Do not reuse it through uploads, screenshots, generated guides, composites, derivatives or session history.

Image inputs are optional. If used, they must be **approved base images from `art/mood-board/` or its approved equipment supplement**, identified in the source inventory and review manifest. Text-only generation is the default. Keep costume, proportions, camera and feedback in the raw written prompt. Do not use `--resume`, a prior concept conversation, or instructions such as “restyle this candidate.”

Before each call, inspect the exact request and every proposed image path. After the call, verify the actual `tool_call.rawInput`: its prompt must match the saved raw prompt, and any image paths must belong to the approved mood-board inventory. Stop if the tool rewrites the prompt or supplies an unapproved reference. Earlier image-edit experiments are history, not an authorized workflow.

## Calling it from this workspace

Use a prompt file to specify one exact `image_gen` call, its prompt and aspect ratio, then require the returned path and prohibit extra generations. The tested command is:

```sh
/Users/ocasta/.grok/bin/grok \
  --cwd /private/tmp/dias-grok-integration \
  --prompt-file /private/tmp/dias-grok-integration/connection-test.txt \
  --output-format streaming-json \
  --tools image_gen \
  --allow image_gen \
  --permission-mode dontAsk \
  --no-subagents \
  --disable-web-search \
  --verbatim \
  --max-turns 2
```

For each concept, create a new empty working directory, generate an unused UUID and pass it with `--session-id`. Use a dispatcher `--system-prompt-override` as recorded for S38–S40 below. Do not use `--continue`, `--resume` or `--fork-session`. Replace the connection-test prompt file with the complete raw concept prompt and capture the event stream. The test's exact instructions are preserved in its generation record. The restricted tool list gives the agent image generation only. It does not receive project editing or shell tools. An isolated temporary working directory avoids loading this project's unrelated development instructions.

Read the structured `tool_call` input and the completed `tool_call_update.rawOutput.path`, rather than trusting the assistant's success sentence or guessing where the output went. The CLI saves the image under its session's `images/` directory. Copy that unchanged source into `art/concepts/`, record the actual tool input, version, dimensions and hash, then add the candidate to the existing review gallery and manifest. Retain the raw event stream locally; publish only the relevant sanitized generation record.

If the CLI later explicitly requests reauthentication, run `/Users/ocasta/.grok/bin/grok login` in your terminal and complete its browser sign-in. Never send the login token or `auth.json` in chat.

## Limits and next check

The CLI's language model orchestrates its built-in Imagine tool. **The image tool result did not expose an exact Imagine model identifier.** Do not label this connection test `grok-imagine-image-2.0`, or use that identifier as the CLI's `--model` value: that flag selects the language model. The official image API exposes `grok-imagine-image-2.0` explicitly if we later need to pin the image model or control resolution/quality; that route requires an API key from [the xAI console](https://console.x.ai/) and is not configured here.

The test reported **$0.01088476** in language-model orchestration usage. It did not expose a separate image charge or subscription deduction, so this is not a verified total image-generation cost. Published direct-API image pricing is separate evidence in [the alternatives comparison](image-model-alternatives.md).

## Current flat redraw and verified input rules

Latest direction: completely flat drawn fills and graphic dirt marks; no rounded shading, edge glints, bevels or 2.5D appearance. The knight must look dark, muddy, poor, wretched, worn, tired and desperate. A/C need visibly different media; B needs a normal barrel helmet and intact faceplate. Every complete raw prompt states the full costume, proportions, story region/date, camera target and mood-board roles.

S47–S53 each used exactly one native `image_gen` call with no image input in a fresh empty working directory and a unique explicit session ID. Parent inspection held back S47/S48/S49/S50/S53. Current B S51 uses sparse ink and C S52 rough stencil; both are flatter and more exhausted, with costume/view limitations.

For A, S55 used a new session, the standard CLI dispatcher and one native `image_edit` call. The actual `image` array contains **only approved mood-board base M22** (`art/mood-board/07-game-language/m22-hollow-knight-combat.jpg`), hash checked against the approved inventory. The complete prompt requests a wholly new knight and uses M22 only for flat shape language. No generated concept, screenshot, guide, derivative or previous-session history was supplied. The native name `image_edit` does not mean a prior knight was used. Fine pixel output S55 is the current A; its 16:9 provider output is preserved unchanged despite the square request.

The earlier S54 override dispatcher failed: two unsuccessful `search_tool` calls, no image tool call, no image submitted, no generated output. Do not resume that failed session. Standard dispatch in new S55 called native image_edit successfully. Use the standard dispatcher for this approved-base route; tools allow-list `image_edit`, `--permission-mode dontAsk`, `--no-subagents`, `--disable-web-search`, `--verbatim`, `--max-turns 4`. A request must explicitly name the native tool, exact complete prompt and single approved reference path. Text-only calls keep the restricted image_gen dispatcher.

[Current gallery](../art/concepts/index.html?v=9#current-styles), [parent assessment](../art/concepts/assessment-flat.md). Exact successful inputs, source paths, session IDs, output dimensions and hashes are in `art/concepts/records/`. Inspect actual art; never infer flatness, mood or camera compliance from a successful tool status. Current costume and calibrated camera remain unapproved.

## Previous 2D assessment — superseded by user feedback

The user requires only 2D art. Every dispatcher system prompt and complete raw image prompt now explicitly prohibit 3D art. The raw prompt must describe the approved board's mood, shape language, palette, light and reference roles; sending game names and a costume alone is insufficient. Avoid positive directions such as “pre-rendered,” “volumetric” or “toy-like,” which caused the earlier drift.

S41–S46 were generated in six unique explicitly new sessions, each with one `image_gen` call, only `prompt` and `aspect_ratio` inputs, no uploaded images, no resume and no prior session history. All actual prompts match the saved complete text. The parent assistant viewed the approved board and all six actual outputs, held back S42/S43/S44 and recorded why. [Assessment](../art/concepts/assessment-2d.md), [gallery with preserved history](../art/concepts/index.html?v=9#current-styles).

Previous style candidates: S41 (soft drawn paint), S46 (sparse graphic shapes), S45 (gritty painted blend). The original parent screen was too lenient: user feedback identified modeled volume in A/C and malformed B geometry. The current redraw supersedes this assessment. None is a production-approved costume or camera reference. S45 was the strongest mood match in that superseded assessment; the user requested further revision. Records include exact prompts, actual calls, session IDs and specific visual findings. The image provider's internal rendering steps and exact Imagine model ID are not exposed.

## Earlier independent Guarin comparison — 2D rerun requested

S35–S40 were generated from complete raw prompts in six different sessions, with only `image_gen` enabled. The actual tool inputs contain exactly `prompt` and `aspect_ratio`; no image references were supplied. Each prompt matches the saved text. S35–S37 are internal revisions because the camera stayed shallow. S38–S40 are the current style comparison.

For S38–S40, each empty working directory also used an explicit, unused `--session-id` and a dispatcher `--system-prompt-override`. No `--continue`, `--resume` or `--fork-session` was used. Verified IDs:

| Drawing | New session ID | Evidence |
|---|---|---|
| S38 · Diablo II led | `8728ac7e-2a77-4671-89fe-25b5ed43644f` | [Prompt](../art/concepts/prompts/s38-guarin-diablo-game-isolated-v01.txt), [actual call](../art/concepts/records/s38-guarin-diablo-game-isolated-v01.json) |
| S39 · Hollow Knight led | `c097ec00-7a7d-4176-b364-3573861ca63b` | [Prompt](../art/concepts/prompts/s39-guarin-hollow-game-isolated-v01.txt), [actual call](../art/concepts/records/s39-guarin-hollow-game-isolated-v01.json) |
| S40 · Painted blend | `47e228ab-2c0d-4dc8-98da-269924a2d5b4` | [Prompt](../art/concepts/prompts/s40-guarin-blended-game-isolated-v01.txt), [actual call](../art/concepts/records/s40-guarin-blended-game-isolated-v01.json) |

The new styles differ in dimensional shading, flat graphic masses and dry painted patches. Their shared silhouette comes from the repeated costume and proportion text. The records verify what was sent; they do not expose the provider's internal generation implementation. The current drawings still have inconsistent camera angles and mail simplification. A nominal 55-degree prompt was used after 45-degree requests undershot; that is not proof of the output angle. Review and concept approval remain open.

## Discarded Guarin batch

The user discarded S24–S34 on 2026-10-04 because the prior-image workflow anchored the results. The eleven source images, prompts, generation records, generated camera guides and batch previews were removed from the workspace and active gallery. Git commit `b02e92b` retains the prior audit history; it must not supply generation inputs.

The earlier S18/S22/S23 comparison used generated-image restyles. That method is now prohibited by the user's rule above. Older studies remain review history only, including S09 and the texture-preferred S13/S17. Their written design lessons can inform raw prompts; their image files must never be supplied to the generator.

The discard-and-workflow correction itself did not generate replacements. The independent S35–S40 generations documented above followed it. The desired output camera remains about 45 degrees above the ground; numeric prompts are not measured camera evidence.

Camera, rendering, sprite grids, transparency and animation consistency remain unapproved or untested. The original mood board and equipment board retain their approval and cultural/geographic limits. See [the checklist](art-production-checklist.md) and [visual brief](../art/concepts/visual-brief.md).

Sources checked: [official headless calls](https://docs.x.ai/build/cli/headless-scripting), [CLI reference](https://docs.x.ai/build/cli/reference), [Imagine commands and feature gates](https://docs.x.ai/build/modes-and-commands), [direct image generation](https://docs.x.ai/developers/model-capabilities/images/generation), and the installed [Grok Imagine tool documentation](/Users/ocasta/.grok/bundled/skills/imagine/SKILL.md).

## Gameplay-screen checkpoint — 2026-10-05

The actual Brave ranking is captured in `art/concepts/manifest.md`: S49, S13, S15, S01. Four [gameplay examples](../art/concepts/gameplay/index.html) follow that order. Each complete written brief preserves the story and costume; no selected concept or prior gameplay image is sent as input. Ten unchanged 1280 × 720 outputs and one temporary-capacity failure are recorded in `art/concepts/gameplay/records/`. The failed request was retried with identical text in a fresh session. Actual inputs contain only prompt and aspect ratio; the dispatcher omitted a final newline without changing prompt text.

Parent inspection presents four and excludes six internal attempts, including duplicated knights, armor substitutions and weaker rendering matches. [Assessment](../art/concepts/gameplay/assessment.md) explicitly records that G02 is too ink-led for an exact S13 texture match and that player scale, proportions, costume details and calibrated camera remain unapproved. These screens demonstrate possible gameplay composition; they do not implement a game level or create new character-style alternatives. The provider still does not expose an exact image-model identifier or separate image cost.
