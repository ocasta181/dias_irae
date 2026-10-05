# Separate character styles from equipment and cast

Status: prepared for the explicit contract approval required by the user-provided AGENTS.md section 15. No application contract or current gallery has been changed.

Decision at commit `11da738`, 2026-10-05, confidence 99%: the screenshot boundary identifies the 45 S13 equipment/cast explorations, V01–V35 and R01–R10. Positions 41–45 are R06–R10. The following cards begin the older character style exploration. Keep 45 earlier gallery drawings on the primary page; move the 45 equipment/cast cards to a separate page. Do not regenerate or move image source files.

## Reviewable content split

| Page | Gallery cards | Review destination |
|---|---:|---|
| `/art/concepts/index.html` — Character style exploration | 45 earlier drawings | `art/concepts/manifest.md` |
| `/art/concepts/expansion/index.html` — Equipment and cast exploration | 35 equipment/face choices + 10 named characters | `art/concepts/expansion/manifest.md` |

[Primary review draft](style-manifest.md) retains all 63 original/history/planned rows and the 45 saved style positions. [Equipment/cast review draft](equipment-cast-manifest.md) retains all 45 moved rows. Links in these proposal copies point to the current assets so they can be reviewed here; the actual split will rebase them for each destination. The two drafts have disjoint identifiers and together preserve every original row, decision and comment. Existing saved equipment/cast ranks are empty; its default order remains V01–V35 then R01–R10.

These are proposal copies, not live review files. Browser-only comments/order may be newer than the on-disk manifest; preserve them during the actual split.

Each page will keep the existing minimized cards, per-card Details toggle, number entry, drag ordering, commentary, accept/reject controls and direct Save review button. Each will have its own browser draft, ordering and saved-file baseline. Add navigation between the pages. Update the expansion publisher so future equipment/cast publication affects only the new page.

The review service is already running locally and serving the user's reviews. Confidence: 99%, established by the user's screenshot and prior saved reviews. Preserve browser drafts rather than treating this as an unused application. Copy V/R decisions/comments and their filtered relative order from the current concept-page storage into the new page's storage before the primary page saves its filtered ordering. Keep existing destination drafts and the old source values; do not delete browser storage. Existing main-page drafts keep the same key and retain their filtered original style order.

## Exact application programming interface (API) change

Current approved request:

```text
POST /api/review
Content-Type: application/json
{ board: "concepts" | "gameplay", manifest: string, baseline: string }
```

Proposed request changes only the permitted `board` values:

```text
POST /api/review
Content-Type: application/json
{ board: "concepts" | "gameplay" | "expansion", manifest: string, baseline: string }
```

Add exactly one fixed destination: `expansion` → `art/concepts/expansion/manifest.md`. The server will embed that current review when serving `/art/concepts/expansion/index.html`, as it already does for the other two boards.

The request fields, success/failure shapes, existing status codes, size limit, loopback binding, origin checks, stale-save protection, atomic writes and recoverable review history stay the same. Each board gets independent history and baseline. No database is involved.

After explicit approval, document contract version 2 and implement this board value before writing dependent client code. Extend the existing server tests to cover all three boards and show that independent saves cannot overwrite another board. Then apply the prepared content split, browser-draft transfer and gallery links. Re-read current review files immediately before splitting so new saved reviews are included.

## Acceptance checks

- Exactly 45 earlier drawings on the style page and exactly 45 V/R drawings on the equipment/cast page; no duplicates or omissions.
- All 108 review rows, original decisions/comments and saved relative orders remain present across the two manifests.
- Comments/order from the user's browser remain available after opening either page first; a second load cannot overwrite newer destination drafts.
- Each page ranks from 1 through 45 independently, defaults to minimized, and exposes commentary and decision controls.
- Save review writes directly to the correct independent file; repeated saves work, and saving one board does not invalidate the other board's baseline.
- Current gameplay and mood boards still work. Publishing equipment/cast repairs cannot merge cards back into the style page.
- Browser checks use isolated test drafts and files; do not alter the user's real reviews for demonstration.

Required approval comes from the supplied AGENTS.md section 15: “Stop and present the current schema state … Propose the exact change … Wait for explicit affirmative approval before proceeding.” The new `expansion` board value is an API contract change, so the general page-move request is not treated as that required specific approval.
