import math

import pytest

from foot_plan import (
    CLIPS,
    CYCLE_MS,
    DIRECTIONS,
    STRIDE,
    frame,
    frames,
    ground,
    pose,
    walk_foot,
)


@pytest.mark.parametrize("direction", DIRECTIONS)
def test_planted_feet_stay_at_the_same_world_contact_across_cycle_wrap(direction):
    for side, offset in ((0, 0), (1, 0.5)):
        for contact in (1 - offset, 2 - offset):
            expected = ground(direction, STRIDE * contact + 15, (-8, 8)[side])
            for index in range(101):
                phase = contact + 0.625 * index / 100
                forward, lift, _ = walk_foot(phase + offset)
                assert ground(
                    direction, STRIDE * phase + forward, (-8, 8)[side]
                ) == pytest.approx(expected)
                assert lift == pytest.approx(0, abs=1e-12)


def test_walking_has_support_without_sideways_leg_travel_or_below_ground_feet():
    for index in range(2001):
        data = pose("walk", index / 1000)
        assert any(foot[2] for foot in data["feet"])
        assert all(foot[1] >= 0 for foot in data["feet"])
    for direction in DIRECTIONS:
        for data in frames(direction, "walk"):
            assert [foot["lateral"] for foot in data["feet"].values()] == [-8, 8]


def test_idle_keeps_hips_and_both_feet_fixed_while_head_motion_stays_subtle():
    for direction in DIRECTIONS:
        reference = frame(direction, "idle", 0)
        for data in frames(direction, "idle"):
            assert data["feet"] == reference["feet"]
            assert abs(data["headOffsetY"]) <= 0.5


def test_start_and_stops_have_matching_contacts_at_both_handoffs():
    idle = pose("idle", 0)["feet"]
    walk = pose("walk", 0)["feet"]
    assert pose("start", 0)["feet"] == idle
    for actual, expected in zip(pose("start", 1)["feet"], walk, strict=True):
        assert actual == pytest.approx(expected)
    for clip, phase in (("stop_left", 0), ("stop_right", 0.5)):
        for actual, expected in zip(
            pose(clip, 0)["feet"], pose("walk", phase)["feet"], strict=True
        ):
            assert actual == pytest.approx(expected)
        for actual, expected in zip(pose(clip, 1)["feet"], idle, strict=True):
            assert actual == pytest.approx(expected)


def test_transition_support_is_stationary_and_root_never_moves_backwards():
    for clip, support, contact in (
        ("start", 1, 0),
        ("stop_left", 0, 15),
        ("stop_right", 1, 15),
    ):
        previous = -1
        for index in range(1001):
            data = pose(clip, index / 1000)
            forward, lift, planted = data["feet"][support]
            assert data["rootForward"] + forward == pytest.approx(contact)
            assert planted and lift == 0
            assert data["rootForward"] >= previous
            previous = data["rootForward"]


def test_frame_holds_limit_support_drift_instead_of_claiming_perfect_raster_lock():
    for data in frames("E", "walk"):
        for foot in data["feet"].values():
            if foot["planted"]:
                for boundary in (data["startMs"], data["endMs"]):
                    delta = STRIDE * boundary / CYCLE_MS - data["rootForward"]
                    assert abs(delta) <= 1 + 1e-12


def test_all_planned_frames_have_reachable_equal_length_legs_and_valid_canvas_targets():
    for direction in DIRECTIONS:
        for clip in CLIPS:
            for data in frames(direction, clip):
                for foot in data["feet"].values():
                    lengths = [
                        math.dist(foot["leg"][a], foot["leg"][b])
                        for a, b in (("hip", "knee"), ("knee", "ankle"))
                    ]
                    assert lengths == pytest.approx([21, 21])
                    assert all(
                        0 < coordinate < 256
                        for point in ("sole", "toe", "heel", "knee")
                        for coordinate in foot[point]
                    )
