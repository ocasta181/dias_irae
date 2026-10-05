# Contact checks

Use `scripts/check_contacts.py` in stages 4, 6 and 9 to check submitted support-contact observations. It uses Python 3.10 or newer and only the standard library. It does not open images, identify feet or certify production readiness.

## Prepare the evidence

1. Obtain required contact IDs and fixed world targets from the motion contract. A new physical placement needs a new ID; anatomical `left` alone cannot identify different left steps. Use a heel/toe ID when that is the support landmark.
2. For a `target-plan` report, use the computed pose coordinates. For a `measured-art` report, annotate the actual registered source pixels. Preserve source hashes, region/registration, measurement method and uncertainty in the production record. A label in this file does not authenticate those observations.
3. Express root travel, pivot, contacts and world targets in the same projected pixel units, at a declared reference scale. Keep the logical-canvas origin and runtime unit conversion explicit. After trimming, transform both measured points and pivot by the same offset; do not mix canvases.
4. Record the actual held-drawing interval, with a positive duration. Supply the root position at both interval boundaries and relevant interior extrema. For linear travel, endpoints bound the drift; include the midpoint to show the intended sampling. For nonlinear travel, submit its extrema or a justified dense sample set. The checker proves only the submitted samples.
5. List every support contact required in that interval, including occluded ones. An unavailable observation stays missing and fails; it does not become the target coordinate. Lifted limbs are checked separately against their trajectory and silhouette.

If support changes during one held drawing, split the observation interval into adjacent records with unique IDs that still identify the original drawing. Each required contact applies for its entire observation interval. Do not omit contact intervals to make drift pass. Keep inventory coverage and source-frame mapping alongside the report.

## Input and calculation

This is an internal authoring sidecar in JavaScript Object Notation (JSON), not an engine interface or a required new runtime schema. Adapt existing authoring data deterministically when its format differs.

```json
{
  "basis": "measured-art",
  "max_drift_px": 1,
  "clips": [
    {
      "id": "walk-E",
      "world_contacts": {"left-1": [15, 0]},
      "frames": [
        {
          "id": "E-walk-01",
          "start_ms": 0,
          "duration_ms": 20,
          "pivot": [128, 208],
          "required_contacts": ["left-1"],
          "contacts": {"left-1": [142, 208]},
          "root_samples": [
            {"offset_ms": 0, "position": [0, 0]},
            {"offset_ms": 10, "position": [1, 0]},
            {"offset_ms": 20, "position": [2, 0]}
          ]
        }
      ]
    }
  ]
}
```

For every submitted root sample:

`actualWorldContact = rootPosition + measuredContact − pivot`

Compare its Euclidean distance from the named world target with `max_drift_px`. The example drawing is exact at its midpoint and has one-pixel temporal error at both boundaries. That budget and 20-millisecond hold are examples, not recommended defaults. Measured drawing error consumes the same combined budget; maintain its separate error accounting in the production record.

Each clip starts at zero and its frame/interval records are contiguous. IDs are unique within the clip. Root samples are ordered, start at zero offset and end at the interval duration. Coordinates, times and tolerances must be finite numbers. Empty clip lists and invalid timing fail input validation; missing contacts fail the contact check. A flight-only clip has no support evidence and cannot receive a contact pass; record this check as not applicable and validate its flight/landing through the other required checks.

## Run and act on the report

From the skill directory:

```sh
python3 scripts/check_contacts.py contacts.json --output contact-report-v01.json
```

The report preserves `basis`, states `submitted contact samples only`, counts observations and identifies failures by clip, frame/interval and contact. Drift failures show the worst submitted offset, actual/expected world positions and budget. A plan pass must not be described as an art pass. Review missing evidence before movement error.

Exit codes: `0` submitted contacts pass; `1` a contact check fails; `2` invalid input or file error. The input is never changed. The optional output creates a new file and refuses to overwrite any existing file. Use a new versioned report path after repair.

For a failure, first check unit conversion, registration, contact identity and the root path. If those are correct, repair the actual failed pose or timing. Do not copy expected coordinates into the measurements, increase the budget to hide a failure, or move the pivot to compensate for incorrect feet. Recheck adjacent frames and the real playback.

Tests cover reversed compensation, idle shuffle, interior root jumps, trimming, missing evidence, invalid timing/numbers and file preservation. Run them with the project's Python test tool; for a standalone skill checkout:

```sh
uv run --no-project --with pytest pytest -q scripts/test_check_contacts.py
```

These tests verify checker behavior. They do not verify an unseen image's gait, pose meaning, texture, reachability, complete coverage or engine behavior.
