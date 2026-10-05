# Wolf whole-body assessment

The proportions are corrected: v02 uses a conspicuously oversized broad head, short round torso and very short thick legs. The intact neck and haunches remove the earlier component assembly's disconnected appearance. S13 is now the dominant proportion reference; M15 supplies species features only. User visual approval remains pending.

The two walk sheets preserve this general silhouette and have twelve complete animals each. They use the exact intact v02 base plus original S13/G15 and fresh skeleton controls. Neither rejected base nor the first generated walk sheet was supplied to the second call. Original pixels, complete prompts and input hashes are preserved in `walk-records.json`.

The walk does not meet the numerical pose contract. The tool enlarged/repositioned drawings relative to the guide, shifted the torso between source rows and did not maintain the required planted-paw trajectory. Its camera also retains some diagonal profile rather than the strict E control. These are authoring failures, not packing defects. The lab labels this as a study and does not offer the missing seven headings or ungenerated attacks.

The exporter uses one fixed scale and translation per original sheet. It never aligns or rescales individual figures, assembles limbs or copies planned target coordinates into measured metadata. Thus the visible placement failures remain exposed for inspection. A stationary whole-body idle uses one unchanged drawing; it cannot tremble from random repainting.

The numerical skeleton has fixed segment lengths, reachable short legs, three supports, stable head/body and contact-consistent root travel. These checks validate the plan only. Whole-body appearance and usable motion are separate gates; the full eight-direction inventory is still pending.

## Reproducible measured failure

The near right forepaw was identified visually in the first six source cells. `qa.mjs` measures its lower painted alpha edge inside the recorded region, applies the fixed source registration and tests the actual root stride. Region identification is human judgment; the pixel measurement and calculation are deterministic. Contact-point uncertainty is approximately ±0.5 logical pixel. Other required paw observations remain explicitly missing; no target is substituted.

[The contact report](contact-report-v01.json) fails: frame 3 drifts 4.16 pixels, frame 4 drifts 4.5 pixels and frame 6 drifts 9.53 pixels against the 2-pixel budget. Frame 5's 2.02-pixel result is within measurement uncertainty of the boundary; it is not the basis for rejection. The larger failures exceed uncertainty. The check covers six frames and one measured paw only, not the complete cycle.

[Package checks](qa-report.json) reconstruct all 25 logical canvases bit-for-bit from the packed atlas and verify unchanged source hashes and one major connected alpha silhouette. They also find original source-cell edge contact in walk frame 4, so clipping remains an art defect. Connectivity cannot certify good anatomy. The raw sheets' body placement jumps and the half-cycle join still require repair.

Repeat `export.mjs` and `qa.mjs` with the existing canvas dependency, then run the skill's `check_contacts.py` on `contact-observations-v01.json`. The contact checker should exit 1 for this failed study. It refuses to overwrite reports; choose a new report filename for another run. Do not describe that expected rejection as passing art quality assurance.
