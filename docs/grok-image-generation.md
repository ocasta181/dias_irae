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

For a concept, replace the connection-test prompt file with the agreed concept instructions and capture the event stream. The test's exact instructions are preserved in its generation record. The restricted tool list gives the agent image generation only. It does not receive project editing or shell tools. An isolated temporary working directory avoids loading this project's unrelated development instructions.

Read the structured `tool_call` input and the completed `tool_call_update.rawOutput.path`, rather than trusting the assistant's success sentence or guessing where the output went. The CLI saves the image under its session's `images/` directory. Copy that unchanged source into `art/concepts/`, record the actual tool input, version, dimensions and hash, then add the candidate to the existing review gallery and manifest. Retain the raw event stream locally; publish only the relevant sanitized generation record.

If the CLI later explicitly requests reauthentication, run `/Users/ocasta/.grok/bin/grok login` in your terminal and complete its browser sign-in. Never send the login token or `auth.json` in chat.

## Limits and next check

The CLI's language model orchestrates its built-in Imagine tool. **The image tool result did not expose an exact Imagine model identifier.** Do not label this connection test `grok-imagine-image-2.0`, or use that identifier as the CLI's `--model` value: that flag selects the language model. The official image API exposes `grok-imagine-image-2.0` explicitly if we later need to pin the image model or control resolution/quality; that route requires an API key from [the xAI console](https://console.x.ai/) and is not configured here.

The test reported **$0.01088476** in language-model orchestration usage. It did not expose a separate image charge or subscription deduction, so this is not a verified total image-generation cost. Published direct-API image pricing is separate evidence in [the alternatives comparison](image-model-alternatives.md).

## Discarded Guarin batch

The user discarded S24–S34 on 2026-10-04 because the prior-image workflow anchored the results. The eleven source images, prompts, generation records, generated camera guides and batch previews were removed from the workspace and active gallery. Git commit `b02e92b` retains the prior audit history; it must not supply generation inputs.

The earlier S18/S22/S23 comparison used generated-image restyles. That method is now prohibited by the user's rule above. Older studies remain review history only, including S09 and the texture-preferred S13/S17. Their written design lessons can inform raw prompts; their image files must never be supplied to the generator.

The next concept comparison still needs three independent raw-prompt directions: Diablo II led, Hollow Knight led and a blend. Describe the same costume and cute squat proportions in each. The desired camera is about 45 degrees above the ground; numeric prompts are not measured camera evidence. No replacement generation was run during this discard-and-workflow correction.

Camera, rendering, sprite grids, transparency and animation consistency remain unapproved or untested. The original mood board and equipment board retain their approval and cultural/geographic limits. See [the checklist](art-production-checklist.md) and [visual brief](../art/concepts/visual-brief.md).

Sources checked: [official headless calls](https://docs.x.ai/build/cli/headless-scripting), [CLI reference](https://docs.x.ai/build/cli/reference), [Imagine commands and feature gates](https://docs.x.ai/build/modes-and-commands), [direct image generation](https://docs.x.ai/developers/model-capabilities/images/generation), and the installed [Grok Imagine tool documentation](/Users/ocasta/.grok/bundled/skills/imagine/SKILL.md).
