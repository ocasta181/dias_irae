from __future__ import annotations

import math

DIRECTIONS = {
    "N": (0, -1),
    "NE": (1, -1),
    "E": (1, 0),
    "SE": (1, 1),
    "S": (0, 1),
    "SW": (-1, 1),
    "W": (-1, 0),
    "NW": (-1, -1),
}
ORIGIN = (128, 208)
PROJECTION = math.sqrt(0.5)
STRIDE = 48
CYCLE_MS = 800
STANCE = 0.625
LIFT = 8
HALF_WIDTH = 8
TRANSITION_MS = 300
CLIPS = {
    "walk": (24, CYCLE_MS),
    "idle": (6, 2400),
    "start": (9, TRANSITION_MS),
    "stop_left": (9, TRANSITION_MS),
    "stop_right": (9, TRANSITION_MS),
}


def smoothstep(value: float) -> float:
    return value * value * (3 - 2 * value)


def walk_foot(phase: float) -> tuple[float, float, bool]:
    phase %= 1
    if phase <= STANCE:
        return 15 - STRIDE * phase, 0, True
    swing = (phase - STANCE) / (1 - STANCE)
    return (-15 + 30 * smoothstep(swing), LIFT * math.sin(math.pi * swing) ** 2, False)


def pose(clip: str, phase: float) -> dict:
    if clip == "walk":
        feet = [walk_foot(phase), walk_foot(phase + 0.5)]
        root = STRIDE * phase
        hip = 40 - math.sin(4 * math.pi * phase)
    elif clip == "idle":
        feet, root, hip = [(0, 0, True)] * 2, 0, 40
    elif clip == "start":
        root, hip = 9 * phase**2, 40
        feet = [
            (
                24 * smoothstep(phase) - root,
                LIFT * math.sin(math.pi * phase) ** 2,
                phase in (0, 1),
            ),
            (-root, 0, True),
        ]
    else:
        brake = (phase - 2 / 3) * 3
        root = 18 * phase if phase <= 2 / 3 else 12 + 6 * brake - 3 * brake**2
        hip = 40
        feet = [
            (15 - root, 0, True),
            (
                -9 + 24 * smoothstep(phase) - root,
                LIFT * math.sin(math.pi * phase) ** 2,
                phase in (0, 1),
            ),
        ]
        if clip == "stop_right":
            feet.reverse()
    return {
        "rootForward": root,
        "hipHeight": hip,
        "feet": feet,
        "headOffsetY": 0.5 * math.sin(2 * math.pi * phase) if clip == "idle" else 0,
    }


def ground(direction: str, forward: float, lateral: float) -> tuple[float, float]:
    dx, dy = DIRECTIONS[direction]
    length = math.hypot(dx, dy)
    dx, dy = dx / length, dy / length
    return dx * forward - dy * lateral, dy * forward + dx * lateral


def project(
    direction: str, forward: float, lateral: float, height: float
) -> list[float]:
    x, y = ground(direction, forward, lateral)
    return [ORIGIN[0] + x, ORIGIN[1] + PROJECTION * (y - height)]


def frame(direction: str, clip: str, phase: float) -> dict:
    data = pose(clip, phase)
    result = {
        "rootForward": data["rootForward"],
        "rootCell": list(ORIGIN),
        "headOffsetY": data["headOffsetY"],
        "feet": {},
    }
    for side, lateral, (forward, height, planted) in zip(
        ("left", "right"), (-HALF_WIDTH, HALF_WIDTH), data["feet"], strict=True
    ):
        ankle = height + 5
        delta = ankle - data["hipHeight"]
        reach = math.hypot(forward, delta)
        bend = math.sqrt(21**2 - reach**2 / 4)
        knee = (
            forward / 2 - delta / reach * bend,
            (ankle + data["hipHeight"]) / 2 + forward / reach * bend,
        )
        result["feet"][side] = {
            "forward": forward,
            "lateral": lateral,
            "lift": height,
            "planted": planted,
            "sole": project(direction, forward, lateral, height),
            "heel": project(direction, forward - 4, lateral, height),
            "toe": project(direction, forward + 6, lateral, height),
            "ankle": project(direction, forward, lateral, ankle),
            "knee": project(direction, knee[0], lateral, knee[1]),
            "hip": project(direction, 0, lateral, data["hipHeight"]),
            "leg": {
                "hip": [0, data["hipHeight"]],
                "knee": list(knee),
                "ankle": [forward, ankle],
            },
            "worldSole": list(
                ground(direction, data["rootForward"] + forward, lateral)
            ),
        }
    return result


def frames(direction: str, clip: str) -> list[dict]:
    count, duration = CLIPS[clip]
    return [
        {
            "number": index + 1,
            "startMs": duration * index / count,
            "endMs": duration * (index + 1) / count,
            "samplePhase": (index + 0.5) / count,
            **frame(direction, clip, (index + 0.5) / count),
        }
        for index in range(count)
    ]
