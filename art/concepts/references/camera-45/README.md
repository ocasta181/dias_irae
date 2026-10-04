# Camera guide — 30 to 45 degrees

The user requested a view 15 degrees steeper than the previous Grok comparison. That drawing appears to be about 30 degrees above the ground, assuming an upright cylinder with a level circular crown. This is an estimate of a drawing, not a calibrated camera.

`build-guide.py` projects one fixed primitive character at 30 and 45 degrees above the ground. It changes only the camera elevation. The projection is orthographic. The crown's minor/major ellipse ratio changes from 0.500 to 0.707. Exact guide settings are in `projection.json`.

- [Previous-angle guide](camera-30-guide.png)
- [Requested-angle guide](camera-45-guide.png)
- [Same geometry at both angles](camera-comparison.png)

The proxy is a composition reference, not a costume proposal or historical source. Its unfinished shield, block-shaped cloth, hands and weapon are placeholders. The existing Guarin costume remains authoritative. Generated concept art must be inspected independently: a 45-degree prompt or guide does not prove that the output uses that angle.

Rebuild with a Python runtime that has Pillow, then run `build-guide.py`. This script draws new geometry; it does not alter a generated concept image.

## Grok projection correction

The first two-reference attempts S24/S25 retained the lower-angle costume image. The geometry-only attempts S26/S27 also flattened the crown. A supplemental [60-degree proxy](camera-60-guide.png), using the same geometry, was then supplied to compensate for this observed flattening. S28 finally produced a visibly steeper crown, appearing around 40–45 degrees rather than 60. Its requested output target remained 45 degrees. This compensation is specific to these attempts; it is not a calibrated model setting.

S30 removes an unwanted crown strap while preserving S28's projection and material finish. The other current styles derive from this corrected view. Each generation record distinguishes the actual uploaded guide from the intended output angle. The final image camera is still an estimate and needs user review; a fixed engine camera will provide exact projection for production assets.
