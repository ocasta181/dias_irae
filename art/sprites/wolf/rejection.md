# Rejected component study

The user rejected the painted-part wolf on 2026-10-05. Its limbs, torso and head did not form a convincing whole animal. Numerical paw checks and lossless packing passed, but those checks did not establish good anatomy or motion. The agent's visual acceptance was too loose.

Decision at commit `b2ae7800b77b366faf050194613c96c44ffe42ef`, confidence 99%: replace component assembly with whole-body drawings controlled by explicit skeletal pose guides. Never use this rejected assembly or its parts as identity/style inputs for the replacement. Preserve source bytes and the failed study as evidence.

The replacement starts with one intact canonical wolf from approved M15 anatomy and G15/S13 art references. Each animation request receives that exact base image, computed stick-figure guides and the matching numerical pose table. The image model paints complete wolves. Extraction and packing preserve their placements; they must not reposition independent body parts or distort individual frames to make contacts pass.

The short pilot must pass anatomy, scale, contact, texture and animated playback checks before expansion. A contact-check pass cannot override a failed visual review.
