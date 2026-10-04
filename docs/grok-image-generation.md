# Grok image-generation connection

Verified on 2026-10-04. The user selected Grok for future concept work. **The existing installation and login already work for unattended image generation; no new installation, plugin or API key is needed for this route.**

## Verified local setup

- Executable: `/Users/ocasta/.grok/bin/grok`.
- Version: `1.0.46 (2765805b9442) [stable]`.
- Authentication: existing cached Grok login, refreshed by the CLI. No credentials were printed, copied into the repository or supplied as command arguments.
- A live `grok models` request returned Grok 4.7 and the other available language models.
- One headless `image_gen` call succeeded with the exact requested prompt and `1:1` aspect ratio. The returned JPEG decoded at 1024 × 1024 and was visually inspected.
- Connection-test evidence: [image](../art/tooling/grok-connection-test/cube.jpg) and [sanitized generation record](../art/tooling/grok-connection-test/record.json). This neutral cube is a tooling check, not a concept candidate.

The CLI needs network access and permission to update its own authentication/session cache under `~/.grok`. The initial restricted call could not acquire its authentication lock; the permitted retry refreshed the login and succeeded. A sandbox failure does not mean the user's account needs another login.

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

Reference editing, transparency, character consistency and the Guarin camera/proportion pilot remain untested. Next, test the chosen provider on the approved brief while preserving oversized heads, tiny bodies and the S13/S17 texture preference. Camera and equipment review gates remain in [the production checklist](art-production-checklist.md).

Sources checked: [official headless calls](https://docs.x.ai/build/cli/headless-scripting), [CLI reference](https://docs.x.ai/build/cli/reference), [Imagine commands and feature gates](https://docs.x.ai/build/modes-and-commands), [direct image generation](https://docs.x.ai/developers/model-capabilities/images/generation), and the installed [Grok Imagine tool documentation](/Users/ocasta/.grok/bundled/skills/imagine/SKILL.md).
