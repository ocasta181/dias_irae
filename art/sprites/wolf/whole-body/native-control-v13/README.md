# Native spatial-control proof

2026-10-07, decision at `4cf5e4e`, confidence 90% in this bounded method choice, not in its eventual artistic result. One local E06 whole-body proof uses SDXL Canny ControlNet for geometry and IP-Adapter Plus for the original wolf's appearance. It follows Astra's corrected spatial-contract investigation. No external service receives project images; public model weights are downloaded locally.

The image above in the user's latest correction is a rejected B debugging drawing. Its changed finish is unacceptable. Original exaggerated wolf v02, S13 and G15 remain authority. No A/B/C painting is an input. The fresh control comes from the locally authored whole-cel diagram, with its internal construction arcs removed. It does not constitute a painted sprite.

## Frozen inputs and gates

- `proof-inputs.json`: exact geometry, hashes, visible shaft sample definitions, prompts and one seed/configuration. Crop mapping stays `(32,56) + raw/8`; no nose fitting or post-result shifting.
- `control-E06.png`: one 1024-square white-on-black exterior edge, generated from authored diagram alpha. No hidden-joint lines, labels or colors enter generation. The observed contour has all four soles, distinct near-leg shapes and a large head. It is smooth provisional geometry; original gritty jagged paint remains a separate required output gate.
- `appearance-wolf.png`: original 768-square wolf on a white RGB background. `appearance-processed.png` is the actual 224-square encoder preprocessing, manually opened and reviewed. Entire wolf, head, paws and tail remain visible. S13/G15 were inspected but are not averaged into the animal encoder, to avoid conditioning human armor or scenery.
- Raw output must contain real painted shafts/bends/paws at the specified positions and original-style fur. An exact authored alpha cannot stand in for missing paint. No alpha clipping operation is planned.
- One still cannot prove walking. E06 must pass geometry, RGB coverage and style first; then adjacent poses, twelve distinct drawings and manually reviewed travelling motion/seam follow. No new artwork is installed yet.

## Runtime status

An isolated Python 3.12 environment under `/private/tmp/wolf-spatial-runtime/` contains the pinned packages. `runtime-packages.txt` records every installed version. Apple GPU availability and a basic tensor operation pass outside the filesystem sandbox. Model downloading and actual pipeline loading remain separate gates; package installation does not prove inference support.

`download_models.py` freezes public repositories to full revisions in `model-plan.json`, and downloads only required safetensors/configuration files into an isolated cache. `local-models.json` records local snapshots as they finish. No account token or artwork upload is used. Selected downloaded weights total roughly 13 GB; peak inference memory has not been measured.

Do not enable global attention slicing after loading IP-Adapter: this Diffusers version can replace its trained attention processor. Keep the native adapter processors and inspect them before generation. VAE tiling is independent. The intended output is raw RGB; the selected native pipeline does not provide learned alpha.

## Reproduction

Install the pinned packages with uv into the isolated environment, run `download_models.py`, then `prepare_inputs.py`. Open the actual control and processed appearance before proceeding. The original targets remain untouched. A separate native pipeline preflight must verify compatible attention dimensions, input tensor shape/polarity/range, intact adapter processors, prompt token limits and fixed 1024 dimensions before the single generation call.

Inspected primary documentation: [native SDXL control API](https://huggingface.co/docs/diffusers/v0.35.1/en/api/pipelines/controlnet_sdxl), [Canny checkpoint](https://huggingface.co/diffusers/controlnet-canny-sdxl-1.0), [IP-Adapter Plus](https://huggingface.co/h94/IP-Adapter), [Apple GPU support](https://huggingface.co/docs/diffusers/optimization/mps). These establish available control channels and supported hardware paths, not an exact-pixel guarantee or approved art.
