# Camera guide — 30 to 45 degrees

The user requested a view 15 degrees steeper than the previous Grok comparison. That drawing appears to be about 30 degrees above the ground, assuming an upright cylinder with a level circular crown. This is an estimate of a drawing, not a calibrated camera.

`build-guide.py` projects one fixed primitive character at 30 and 45 degrees above the ground. It changes only the camera elevation. The projection is orthographic. The crown's minor/major ellipse ratio changes from 0.500 to 0.707. Exact guide settings are in `projection.json`.

- [Previous-angle guide](camera-30-guide.png)
- [Requested-angle guide](camera-45-guide.png)
- [Same geometry at both angles](camera-comparison.png)

The proxy is a composition reference, not a costume proposal or historical source. Its unfinished shield, block-shaped cloth, hands and weapon are placeholders. The existing Guarin costume remains authoritative. Generated concept art must be inspected independently: a 45-degree prompt or guide does not prove that the output uses that angle.

Rebuild with a Python runtime that has Pillow, then run `build-guide.py`. This script draws new geometry; it does not alter a generated concept image.
