# Independent face and equipment saving — contract 2

Status: approved by the user's 2026-10-05 instruction: “Actually no save button should exist. any change to the front end should automatically be saved instantly.” This directly authorizes project saving on the face page after these exact destinations were presented for approval. Implement contract 2 before its dependent client.

Decision at commit `42cc6f85b51a3129da5715df0850a8c75062b769`, confidence 96%: the user's explicit automatic-save instruction approves the previously presented face/equipment save destinations and replaces the proposed button interaction. Save review content (order, comments and decisions) automatically on the four concept exploration boards. View controls retain their existing display behavior. The already approved reference mood boards retain their separate export behavior.

Decision at commit `866b128`, 2026-10-05, confidence 98%: keep three distinct review galleries: the earlier character style exploration, equipment/cast exploration, and Guarin face exploration. The latest face request places V21–V25 with the 30 new face studies. This updates the earlier two-page split proposal; no source image is moved or regenerated for the split.

## Current and proposed request

Current:

```text
POST /api/review
Content-Type: application/json
{ board: "concepts" | "gameplay", manifest: string, baseline: string }
```

Proposed:

```text
POST /api/review
Content-Type: application/json
{ board: "concepts" | "gameplay" | "expansion" | "faces", manifest: string, baseline: string }
```

Add these two fixed destinations:

| New value | Destination |
|---|---|
| `expansion` | `art/concepts/expansion/manifest.md` |
| `faces` | `art/concepts/faces/manifest.md` |

The existing fields, response shapes, status codes, validation, stale-save guard, local-only access, atomic writes and recoverable review history remain the same. Serve each new page with its current on-disk manifest, as the service already does for concept and gameplay pages. No database exists or is modified.

## Concrete review content

The face gallery is already available at `/art/concepts/faces/index.html`: 30 new inspected images, 15 from each provider, plus V21–V25. Its independent browser drafts, rank controls, commentary and face close-ups work. Project saving is visibly disabled pending this contract approval; it does not trigger a download or file picker.

After approval, the final allocation is:

| Gallery | Visible cards | Manifest rows |
|---|---:|---:|
| Character styles | 45 earlier drawings | 63, including preserved history/planned rows |
| Equipment and story cast | V01–V20, V26–V35, R01–R10: 40 | 40 |
| Guarin faces | V21–V25 and F01–F30: 35 | 35 |

Total: 120 visible drawings and 138 distinct manifest rows. The 108 earlier rows and 30 new rows are all preserved. The existing gameplay review is unchanged. Until approval, the current primary gallery remains mixed; earlier face studies are also shown on the dedicated page for immediate comparison.

Apply the server contract first, then its dependent client mappings and final gallery split. Preserve current project reviews and browser-only drafts, read files again immediately before splitting, keep each page's existing newer destination draft, and retain original source values. Update the equipment publisher so it cannot merge equipment/cast cards back into the character style page. Disable the face page's pending-save flag only after direct project saving is implemented and verified.

Verify independent normal and repeated saves, stale-save rejection, file destinations, embedded saved reviews, preserved comments and ordering, card counts and the existing two boards. The face draft-transfer unit tests already check comment preservation, relative order, repeat-load protection and unavailable storage.

Required approval text in the supplied AGENTS.md section 15: “Wait for explicit affirmative approval before proceeding.” The added `board` values change the API contract, so the general request for a new gallery is not used as that specific affirmative approval.

## Completed implementation

2026-10-05: four independent save destinations are implemented and tested. The gallery split preserves all 138 distinct rows, 120 visible drawings and current destination reviews. Each concept review page saves automatically without a button. Serialized writes, automatic transient retries, preserved local drafts and saved-ranking baselines prevent stale browser order from replacing newer project order. New rankings from another browser take precedence on reload; prior differing browser order remains recoverable in browser storage.
