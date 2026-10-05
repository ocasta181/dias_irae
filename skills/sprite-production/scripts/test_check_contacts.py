import copy
import json
import subprocess
import sys
from pathlib import Path

import pytest
from check_contacts import check_contacts


@pytest.fixture
def stance():
    return {
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
                            {"offset_ms": 20, "position": [2, 0]},
                        ],
                    }
                ],
            }
        ],
    }


def test_correct_stance_includes_the_error_during_the_held_drawing(stance):
    report = check_contacts(stance)
    assert report == {
        "passed": True,
        "basis": "measured-art",
        "scope": "submitted contact samples only",
        "observation_count": 3,
        "failures": [],
    }


def test_reversing_the_compensation_exposes_moonwalking(stance):
    frame = stance["clips"][0]["frames"][0]
    next_frame = copy.deepcopy(frame)
    next_frame.update(id="E-walk-02", start_ms=20)
    next_frame["contacts"]["left-1"][0] += 2
    for sample in next_frame["root_samples"]:
        sample["position"][0] += 2
    stance["clips"][0]["frames"].append(next_frame)
    assert check_contacts(stance)["failures"][0]["drift_px"] == 5


def test_idle_shuffle_fails_even_with_no_root_travel(stance):
    frame = stance["clips"][0]["frames"][0]
    for sample in frame["root_samples"]:
        sample["position"] = [0, 0]
    frame["contacts"]["left-1"] = [146, 208]
    assert check_contacts(stance)["failures"][0]["reason"] == "contact-drift"


def test_a_jagged_root_path_cannot_hide_behind_correct_endpoints(stance):
    stance["clips"][0]["frames"][0]["root_samples"][1]["position"] = [1, 8]
    assert check_contacts(stance)["failures"][0]["offset_ms"] == 10


def test_trim_offset_preserves_contacts_when_points_and_pivot_share_a_canvas(stance):
    baseline = check_contacts(stance)
    frame = stance["clips"][0]["frames"][0]
    frame["pivot"] = [28, 58]
    frame["contacts"]["left-1"] = [42, 58]
    assert check_contacts(stance) == baseline


def test_missing_required_measurement_fails_instead_of_becoming_occluded_pass(stance):
    stance["clips"][0]["frames"][0]["contacts"] = {}
    assert check_contacts(stance)["failures"][0]["reason"] == "missing-measurement"


def test_a_clip_without_contact_evidence_cannot_receive_a_contact_pass(stance):
    frame = stance["clips"][0]["frames"][0]
    frame.update(required_contacts=[], contacts={})
    assert check_contacts(stance)["failures"] == [
        {"clip": "walk-E", "reason": "no-contact-evidence"}
    ]


def test_target_coordinates_remain_labeled_as_a_plan(stance):
    stance["basis"] = "target-plan"
    assert check_contacts(stance)["basis"] == "target-plan"


@pytest.mark.parametrize("invalid", [True, float("nan"), float("inf"), "142", None])
def test_invalid_measurements_cannot_enter_geometric_arithmetic(stance, invalid):
    stance["clips"][0]["frames"][0]["contacts"]["left-1"][0] = invalid
    with pytest.raises(ValueError, match="finite number"):
        check_contacts(stance)


@pytest.mark.parametrize("duration", [0, -1])
def test_a_frame_must_occupy_positive_time(stance, duration):
    stance["clips"][0]["frames"][0]["duration_ms"] = duration
    with pytest.raises(ValueError, match="positive duration"):
        check_contacts(stance)


@pytest.mark.parametrize("start", [-1, 1])
def test_timeline_gaps_and_overlaps_are_invalid(stance, start):
    stance["clips"][0]["frames"][0]["start_ms"] = start
    with pytest.raises(ValueError, match="gap or overlap"):
        check_contacts(stance)


def test_contact_identity_must_exist_in_the_ground_plan(stance):
    stance["clips"][0]["frames"][0]["required_contacts"] = ["unknown"]
    with pytest.raises(ValueError, match="unknown contact"):
        check_contacts(stance)


def test_empty_inventory_does_not_pass(stance):
    stance["clips"] = []
    with pytest.raises(ValueError, match="nonempty list"):
        check_contacts(stance)


@pytest.mark.parametrize("edge", [0, -1])
def test_missing_hold_boundaries_cannot_understate_drift(stance, edge):
    samples = stance["clips"][0]["frames"][0]["root_samples"]
    samples.pop(edge)
    with pytest.raises(ValueError, match="hold start to end"):
        check_contacts(stance)


@pytest.mark.parametrize("outcome", ["pass", "drift", "invalid"])
def test_cli_reports_distinct_exit_codes_without_changing_source(
    stance, tmp_path, outcome
):
    if outcome == "drift":
        stance["clips"][0]["frames"][0]["contacts"]["left-1"][0] += 4
    elif outcome == "invalid":
        stance["clips"] = []
    source = tmp_path / "contacts.json"
    contents = json.dumps(stance)
    source.write_text(contents)
    result = subprocess.run(
        [
            sys.executable,
            str(Path(__file__).with_name("check_contacts.py")),
            str(source),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    assert (result.returncode, source.read_text()) == (
        {"pass": 0, "drift": 1, "invalid": 2}[outcome],
        contents,
    )


def test_cli_never_overwrites_an_existing_report(stance, tmp_path):
    source = tmp_path / "contacts.json"
    source.write_text(json.dumps(stance))
    report = tmp_path / "report.json"
    report.write_text("preserve this review")
    result = subprocess.run(
        [
            sys.executable,
            str(Path(__file__).with_name("check_contacts.py")),
            str(source),
            "--output",
            str(report),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    assert (result.returncode, report.read_text()) == (2, "preserve this review")
