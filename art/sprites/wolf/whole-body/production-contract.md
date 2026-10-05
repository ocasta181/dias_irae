# Whole-body wolf replacement

Decision at commit `d33dc2ed0d9e1399819bed59b73d49c69109a400`, confidence 99%: S13 controls the wolf's exaggerated proportions as well as its drawing style. The user's explicit correction rejects natural wolf proportions. M15 supplies species features only. No rejected wolf image is a generation input.

## Proportion lock

The canonical appearance candidate is [base-wolf-v02.png](base-wolf-v02.png), drawn afresh from S13, G15, M15 and a new neutral skeletal guide. It has an oversized broad head, compressed round torso, very short thick legs, compact paws and tiny eyes. It is an intact animal. The realistic v01 base and the earlier component assembly are rejected.

The guide uses a 192-pixel square canvas and ground root `(96,156)`. Its head envelope is 48 pixels wide, shoulder-to-hip distance 32 pixels, body envelope 52 × 28 pixels and shoulder height 22 pixels. Head width is 1.5 times the torso axis length. These are project-specific drawing targets, not universal canine anatomy. The painting must retain this exaggeration in every direction and state.

Landmarks to measure on the actual finished frames: skull/muzzle envelope, shoulder, hip, exposed leg height, contact points and connected neck silhouette. Record uncertainty and occlusion. Ratio compliance in the guide is not a measurement of the artwork. A realistic silhouette fails even when contact coordinates pass.

## Controlled pilot

Start with a right-facing whole-body standing pose and one full four-beat walk. Camera target: orthographic, 45 degrees above horizontal. Forelegs use shoulder/elbow/carpus/paw joints; hindlegs use hip/stifle/hock/paw joints. Root, head and torso remain registered while each paw follows its annotated guide.

Shortened stride: 24 logical pixels per 900 ms. Twenty-four midpoint drawings at 37.5 ms each limit the planned contact hold error to 0.5 pixel. Maximum paw lift is 5 pixels. The resulting reference travel is 26.67 pixels/second. Actual painted contact measurements must establish the separate drawing-error budget.

Each generation receives the intact v02 identity, the actual skeleton guide, S13 and G15 with separate roles, plus the numerical rows. Output is complete painted animals, never isolated components. Preserve all raw outputs and prompts. One page-level scale/translation is allowed for registration; no per-frame silhouette scaling, limb assembly or correction disguised as packing.

## Stage record

- [x] Reject realistic base and component assembly; preserve them as failure evidence.
- [x] Compute shortened, exaggerated neutral and 24 walk controls.
- [x] Generate and inspect intact exaggerated v02 identity.
- [ ] Draw and measure the whole-body walk pilot.
- [ ] Verify real exported pilot in the local motion lab.
- [ ] Pass motion and visual checks before expanding to eight directions and other states.
- [ ] User reviews the identity and pilot; no final asset approval is inferred.
