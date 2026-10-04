# Alternative image-generation models

Research checked on 2026-10-04. The shortlist is **Microsoft MAI-Image-2.6, Reve 2.1 and Grok Imagine Image 2.0**. **The user subsequently selected Grok**, superseding the initial recommendation to trial MAI first. Grok's installed CLI and existing login passed an image-generation connection test; [setup and limits](grok-image-generation.md) are recorded. None has been tested on Guarin; task-specific recommendations are judgments from documented capabilities, not demonstrated results.

The latest review prefers the texture of S13 and S17, but rejects the camera progress and the drift toward human proportions. Keep an exaggerated oversized head, tiny body and short limbs. Preserve the full-face greathelm, straight sword, muted wine cloth and dark textured cartoon finish. Texture preference is not full concept approval. Further built-in generation remains paused; Grok is selected for the next pilot.

## Current benchmark evidence

The latest visible [Arena text-to-image leaderboard](https://arena.ai/leaderboard/text-to-image), dated **2026-09-24**, provides the following overall human-preference results:

| Public model | Overall rank | Score | Votes |
|---|---:|---:|---:|
| MAI-Image-2.6 | 4 | 1335 ± 6 | 18,625 |
| Reve 2.1 | 6 | 1302 ± 8 | 8,305 |
| Grok Imagine Image 2.0, dated variant 20260801 | 7 | 1301 ± 8 | 7,257 |

MAI is the highest-ranked non-OpenAI model in that snapshot. Grok's separate canvas variant ranks fifth with preliminary results; do not transfer that rank to its standard service. These results measure general preference, not camera calibration or this game's style. Reve and Grok have overlapping uncertainty intervals.

The first provider-documentation shortlist considered Nano Banana Pro, Midjourney V8.2 and FLUX.2 [max]. The benchmark check supersedes that recommendation with the three models above. Older provider launch-day rank claims are not the current ranking.

## Three alternatives

| Model | Why use it for this game | Practical limit | Public access |
|---|---|---|---|
| **Microsoft MAI-Image-2.6** | Strongest general-quality evidence among the alternatives. Microsoft documents reasoning about scale, scene structure and spatial positioning, plus reference inputs. My judgment: the best first trial for keeping the preferred worn materials while changing the visible camera geometry. | Its published strengths include realistic imagery. The pilot must prove cute proportions rather than drift toward adult anatomy. Foundry access is in public preview; square output is up to 1536 × 1536. | [MAI Playground](https://playground.microsoft.ai/) or Microsoft Foundry's application programming interface (API). [Release and availability](https://microsoft.ai/news/pushing-the-quality-cost-frontier-with-mai-image-2-6/), [generation and reference documentation](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-mai-image). |
| **Reve 2.1** | Most directly relevant explicit layout controls. Reve documents spatial planning and native 4K generation. Its API separates layout creation, editing and rendering, allowing regions to be addressed individually. My judgment: a particularly useful alternative if the oversized helm, tiny torso and short limbs need more explicit control. | Full layout control is experimental. A two-dimensional layout still does not guarantee physically correct camera projection. Higher resolution alone does not improve game-scale readability. | [Reve web app](https://app.reve.com/) or the Reve 2.1 API. [Model release](https://blog.reve.com/posts/launching-reve-2.1/), [API and layout controls](https://blog.reve.com/posts/the-reve-api/). |
| **Grok Imagine Image 2.0** | A practical production comparison: the provider demonstrates characters, locations and props generated separately with a shared look, and offers multi-reference input. My judgment: worth testing for consistent character/equipment/environment families and inexpensive repeated trials. | Those are provider examples, not evidence that it can preserve Guarin across our views. It supplies no calibrated camera control. Its canvas benchmark variant must remain separate from the standard API model. | Grok's web app or API model `grok-imagine-image-2.0`. [Release, examples and access](https://x.ai/news/grok-imagine-image-2), [model and pricing](https://docs.x.ai/developers/models/grok-imagine-image-2.0). |

Grok's published API output price is **$0.04–$0.08 per image**, depending on resolution and quality, plus **$0.01 per input image**. Pricing for MAI or Reve access routes has not been verified. No account was created or subscription purchased. After the research, one neutral connection-test image was generated through the user's existing Grok CLI login; its reported orchestration usage and billing limitations are recorded separately.

## Proposed evaluation

Start with the user-selected Grok and a fresh generation using the written character brief. Preserve the texture direction and deliberately large-head/small-body silhouette. Record the provider model when exposed, input mode, exact prompt, references, requested camera and output dimensions. A requested angle must never be reported as a measured output angle.

A new simple three-dimensional (3D) blockout could establish the exaggerated geometry and camera independently of the image model. Render that guide at two elevations separated by 15 degrees, with the same character orientation and framing. This would give a concrete comparison for helmet-crown projection, shoulder visibility and body foreshortening. The model would interpret the guide and supply the illustrated finish; adherence would still need visual review. The guide is proposed, not built or approved.

The first pilot must retain the oversized head, tiny torso and short limbs while visibly changing the view. Review it before adopting its character treatment for production. Camera, equipment and concept approval gates still apply before remaining cast concepts or sprites.

## Connection status

Working image-generation access through the installed Grok Build CLI 1.0.46 is verified using the user's existing cached login; no API key is needed for that route. The connection test returned a valid 1024 × 1024 JPEG. The CLI did not expose its underlying Imagine model ID, and reference editing is untested. Explicitly pinned `grok-imagine-image-2.0` API access is not configured. Prior plugin discovery found an unconnected OpenArt integration, but it is not needed for the chosen CLI route.

Progress and review gates: [art-production-checklist.md](art-production-checklist.md). Existing candidates and decisions: [concept manifest](../art/concepts/manifest.md).
