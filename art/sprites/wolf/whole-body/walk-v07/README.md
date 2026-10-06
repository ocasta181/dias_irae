# Wolf drawings from the approved stick poses

Decision at `a0231492668b576e3e76b07974f445efd18e79cd`, confidence 95%: eight directional sheets, each with twelve intact painted wolf drawings, covering all 96 distinct approved stick poses. Idle uses the same held pose-01 alias as the current stick lab. Other actions have no approved sticks yet and are outside this batch.

The unavailable Grok video workflow remains stopped. The user explicitly requested base-plus-stick pose filling, so this is a separate still-image `image_edit` pilot, with no video retry or privacy change. Two prior built-in stills failed; this pilot changes provider and uses a larger, exactly matching identity/control crop to address layout drift. Test one frame before authorizing a full batch from measured evidence. A successful tool response is not a pose pass.

Inputs are original intact wolf v02, its fixed canonical registration and the exact approved v06 targets as projected by the live lab. Rejected sprites, components, failed trials and prior sessions are excluded. Every request carries the actual canonical crop and its own pose guide, complete numeric canine joints and full style/shape invariants. The fixed logical crop is (32,56,128,128), with six source pixels per unit. Reconstruct output with one whole-image transform back into the 192-square logical frame; never normalize each silhouette independently.

- [x] Prepare and verify all eight sets of twelve exact guides and independent raw requests. Three reproducible checks confirm all 96 match the live approved stick lines and phase order, source hashes and fixed crop bounds.
- [x] Run one fresh Grok still-image pilot without changing privacy; preserve actual inputs/output. Two calls ran with exactly verified inputs and unused sessions: identity-first, then guide-first. Both preserve appearance but ignore the walking paw placements and are held back. Near-paw errors reach 13.74 logical pixels against the three-pixel budget.
- [ ] Measure painted paws, registration, identity/style and anatomy against the approved pose. Hold back failed artwork.
- [ ] Complete remaining frames only after the pilot satisfies measured and visual checks; verify each cycle and seam.
- [ ] Export eight alpha sheets and metadata; install them in the painted wolf lab and verify actual playback.

`manifest.json` tracks each pose, reference hashes and its pending/generated/measured status. Guide sheets are controls, not the requested painted sprite sheets. No finished sheets exist yet.

Diagnosis: swapping the two references does not make the sparse stick drawing control the painted anatomy. Do not expand this reference-only method. The next bounded experiment will use one pose-shaped edit target containing the canonical upper body and provisional silhouette regions at the approved lower-body/foot positions, asking the image tool to paint those regions into a complete animal. This is an authoring scaffold; playback will still render complete sprites, without assembling painted parts.
