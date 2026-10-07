"""Download the frozen public model set; never transmit project images."""

import json
from pathlib import Path

from huggingface_hub import HfApi, snapshot_download

ROOT = Path(__file__).resolve().parent
CACHE = Path("/private/tmp/wolf-spatial-runtime/hf-cache")
MODELS = {
    "base": ("stabilityai/stable-diffusion-xl-base-1.0", [
        "model_index.json", "**/*.json", "**/*.txt", "**/*.fp16.safetensors",
        "LICENSE.md", "README.md",
    ]),
    "control": ("diffusers/controlnet-canny-sdxl-1.0", [
        "config.json", "diffusion_pytorch_model.fp16.safetensors", "README.md",
    ]),
    "appearance": ("h94/IP-Adapter", [
        "models/image_encoder/config.json", "models/image_encoder/model.safetensors",
        "sdxl_models/ip-adapter-plus_sdxl_vit-h.safetensors", "README.md",
    ]),
    "vae": ("madebyollin/sdxl-vae-fp16-fix", [
        "config.json", "diffusion_pytorch_model.safetensors", "README.md",
    ]),
}


def main() -> None:
    plan_path = ROOT / "model-plan.json"
    if plan_path.exists():
        plan = json.loads(plan_path.read_text())
    else:
        api = HfApi(token=False)
        plan = {
            role: {"repo": repo, "revision": api.model_info(repo).sha, "patterns": patterns}
            for role, (repo, patterns) in MODELS.items()
        }
        plan_path.write_text(json.dumps(plan, indent=2) + "\n")
    locations: dict[str, str] = {}
    for role, model in plan.items():
        print(f"Downloading {role}: {model['repo']} at {model['revision']}", flush=True)
        locations[role] = snapshot_download(
            repo_id=model["repo"], revision=model["revision"],
            allow_patterns=model["patterns"],
            ignore_patterns=["vae/*"] if role == "base" else None,
            cache_dir=CACHE, token=False, max_workers=2,
        )
        (ROOT / "local-models.json").write_text(json.dumps(locations, indent=2) + "\n")
    print("Public models cached locally. No project images uploaded.", flush=True)


if __name__ == "__main__":
    main()
