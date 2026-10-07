"""Native spatial preflight, followed by one explicitly requested whole-cel proof."""

import argparse
import hashlib
import json
import time
from pathlib import Path

import numpy as np
import torch
from diffusers import AutoencoderKL, ControlNetModel, StableDiffusionXLControlNetPipeline
from PIL import Image
from transformers import CLIPVisionModelWithProjection

ROOT = Path(__file__).resolve().parent


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["preflight", "generate"])
    mode = parser.parse_args().mode
    inputs = json.loads((ROOT / "proof-inputs.json").read_text())
    for name, expected in inputs["inputs"].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == expected
    if mode == "generate":
        assert (ROOT / "pipeline-preflight.json").exists(), "Inspect native preflight before generation."
        assert not (ROOT / "generation-start.json").exists(), "The one-call proof budget is spent."
    assert torch.backends.mps.is_available(), "The local GPU must be available; do not silently switch hardware."
    local = json.loads((ROOT / "local-models.json").read_text())
    assert set(local) == {"base", "control", "appearance", "vae"}
    print("Loading frozen local models; no network or painting yet.", flush=True)
    opts = {"torch_dtype": torch.float16, "use_safetensors": True, "local_files_only": True}
    control = ControlNetModel.from_pretrained(local["control"], variant="fp16", **opts)
    encoder = CLIPVisionModelWithProjection.from_pretrained(local["appearance"], subfolder="models/image_encoder", **opts)
    vae = AutoencoderKL.from_pretrained(local["vae"], **opts)
    pipe = StableDiffusionXLControlNetPipeline.from_pretrained(
        local["base"], controlnet=control, image_encoder=encoder, vae=vae,
        variant="fp16", **opts,
    )
    pipe.load_ip_adapter(local["appearance"], subfolder="sdxl_models",
                         weight_name="ip-adapter-plus_sdxl_vit-h.safetensors",
                         image_encoder_folder=None, local_files_only=True)
    cfg = inputs["settings"]
    pipe.set_ip_adapter_scale(cfg["appearanceStrength"])
    pipe.enable_vae_tiling()
    pipe.to("mps")
    processors = [type(p).__name__ for p in pipe.unet.attn_processors.values()]
    assert any(p == "IPAdapterAttnProcessor2_0" for p in processors)
    assert "SlicedAttnProcessor" not in processors
    spatial = Image.open(ROOT / "control-E06.png").convert("RGB")
    appearance = Image.open(ROOT / "appearance-wolf.png").convert("RGB")
    tensor = pipe.control_image_processor.preprocess(spatial, height=1024, width=1024)
    assert tuple(tensor.shape) == (1, 3, 1024, 1024)
    assert float(tensor.min()) == 0 and float(tensor.max()) == 1
    expected = np.asarray(spatial).transpose(2, 0, 1).astype(np.float32) / 255
    assert np.array_equal(tensor[0].numpy(), expected), "No crop/normalization may change the condition."
    encoded = pipe.feature_extractor(images=appearance, return_tensors="pt").pixel_values
    assert tuple(encoded.shape) == (1, 3, 224, 224)
    processor = pipe.feature_extractor
    decoded = encoded[0].numpy().transpose(1, 2, 0) * np.asarray(processor.image_std) + np.asarray(processor.image_mean)
    Image.fromarray(np.clip(decoded * 255, 0, 255).astype(np.uint8)).save(ROOT / "native-appearance-processed.png")
    token_counts = {}
    for label, tokenizer in [("first", pipe.tokenizer), ("second", pipe.tokenizer_2)]:
        token_counts[label] = {key: len(tokenizer(inputs[key]).input_ids) for key in ["prompt", "negative_prompt"]}
        assert max(token_counts[label].values()) <= tokenizer.model_max_length, "Do not truncate the art brief."
    preflight = {
        "status": "native input plumbing passed; no artwork or movement quality claim",
        "torch": torch.__version__, "device": "mps", "dtype": str(control.dtype),
        "spatialShape": list(tensor.shape), "spatialRange": [float(tensor.min()), float(tensor.max())],
        "spatialPixelsExactlyPreserved": True,
        "appearanceShape": list(encoded.shape), "attentionProcessors": dict((p, processors.count(p)) for p in set(processors)),
        "promptTokens": token_counts, "settings": cfg,
        "controlCrossAttentionDim": control.config.cross_attention_dim,
        "unetCrossAttentionDim": pipe.unet.config.cross_attention_dim,
        "gpuAllocatedBytes": torch.mps.current_allocated_memory(),
        "gpuDriverAllocatedBytes": torch.mps.driver_allocated_memory(),
    }
    assert preflight["controlCrossAttentionDim"] == preflight["unetCrossAttentionDim"]
    (ROOT / "pipeline-preflight.json").write_text(json.dumps(preflight, indent=2) + "\n")
    print(json.dumps(preflight), flush=True)
    if mode == "preflight":
        return
    (ROOT / "generation-start.json").write_text(json.dumps({"started": time.time(), "budget": 1, "inputs": inputs}, indent=2) + "\n")
    start = time.monotonic()

    def report_step(_pipe: object, step: int, _timestep: object, values: dict) -> dict:
        print(f"Drawing step {step + 1}/{cfg['steps']} ({time.monotonic() - start:.1f}s)", flush=True)
        assert torch.isfinite(values["latents"]).all().item(), "Nonfinite latent; reject this runtime result."
        return values

    result = pipe(
        prompt=inputs["prompt"], negative_prompt=inputs["negative_prompt"],
        image=spatial, ip_adapter_image=appearance,
        height=1024, width=1024, original_size=(1024, 1024), target_size=(1024, 1024),
        crops_coords_top_left=(0, 0), num_images_per_prompt=1,
        num_inference_steps=cfg["steps"], guidance_scale=cfg["guidance"],
        controlnet_conditioning_scale=cfg["controlStrength"],
        control_guidance_start=cfg["controlStart"], control_guidance_end=cfg["controlEnd"],
        generator=torch.Generator(device="cpu").manual_seed(cfg["seed"]),
        callback_on_step_end=report_step,
    ).images[0]
    assert result.size == (1024, 1024)
    result.save(ROOT / "raw-E06.png")
    (ROOT / "generation-result.json").write_text(json.dumps({
        "status": "raw one-pose candidate; manual painted RGB geometry/style review required",
        "elapsedSeconds": time.monotonic() - start,
        "sha256": hashlib.sha256((ROOT / "raw-E06.png").read_bytes()).hexdigest(),
        "mode": result.mode, "size": list(result.size), "alpha": "not supplied by native pipeline",
    }, indent=2) + "\n")
    print("Saved one raw whole-body candidate. No fitting or lab installation.", flush=True)


if __name__ == "__main__":
    main()
