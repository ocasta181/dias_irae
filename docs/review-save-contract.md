# Automatic review saving — contract 2

Status: explicitly approved by the user on 2026-10-05 under the supplied AGENTS.md, section 15. Approval also covers reading the relevant Brave review, including its comments and decisions.

## Previous server

The board is served by Python's static HTTP server on `127.0.0.1:8765`, rooted at this project. The running command is `python -m http.server 8765 --bind 127.0.0.1`.

- `GET` and `HEAD` serve the existing files.
- `POST` is unsupported and returns `501`.
- Save review currently downloads `manifest.md`; it does not write a project file.
- Comments, decisions and order are saved separately in the reviewing browser. The user's Brave draft has not been retrieved. The app browser's test order is not the user's order.

## Approved local application programming interface (API)

Add `POST /api/review` with `Content-Type: application/json` and this exact request shape:

```json
{
  "board": "concepts",
  "manifest": "<complete reviewed Markdown>",
  "baseline": "<SHA-256 hash of the manifest loaded by the page>"
}
```

`board` is exactly `concepts`, `gameplay`, `expansion` or `faces`. The user authorized automatic project saving on 2026-10-05 after the two added destinations were presented in [contract 2](proposals/concept-board-split/face-save-addition.md). These map to fixed project paths:

| Board | Destination |
|---|---|
| `concepts` | `art/concepts/manifest.md` |
| `gameplay` | `art/concepts/gameplay/manifest.md` |
| `expansion` | `art/concepts/expansion/manifest.md` |
| `faces` | `art/concepts/faces/manifest.md` |

No caller-supplied filesystem path is accepted. SHA-256 means Secure Hash Algorithm with a 256-bit result; it detects another save or edit made since this page loaded.

Success returns `200` and:

```json
{
  "saved": true,
  "path": "art/concepts/manifest.md",
  "baseline": "<SHA-256 hash of the saved manifest>"
}
```

Failures return this shape: `{"saved": false, "error": "<human-readable reason>"}`.

| Status | Meaning |
|---|---|
| `400` | Invalid JSON, fields, board, baseline or manifest |
| `403` | Request origin is outside this local board |
| `409` | The baseline differs from the current project manifest; preserve the draft and report the conflict |
| `413` | Request exceeds 1 MiB, meaning 1,048,576 bytes |
| `500` | The file could not be saved; preserve the browser draft and report the failure |

Bind only to `127.0.0.1`. Accept writes only from `http://127.0.0.1:8765` or `http://localhost:8765`. Keep the existing static reads. For all four review HTML pages, embed the current on-disk manifest when serving the page so reload shows the saved decisions, notes and ordering. Their existing URLs and HTML response type stay the same.

Before replacing a manifest, retain a dated copy in that board's `review-history` folder. Write the replacement atomically. No database is used. No saved browser review is deleted.

## Automatic saving

Every change to ordering, commentary or decisions keeps a browser draft and sends the complete review to the fixed local destination. There is no Save button, download, file picker or manual file placement. Writes are serialized; rapid edits retain the latest complete review and use each confirmed baseline for the next write. Success appears only after the server confirms the latest write. Failed saves preserve the draft and show the error. Transient failures retry automatically; stale-save conflicts require reconciliation and cannot overwrite another review.

The two approved mood boards retain their current review/export behavior; this change applies to the current concept review and the requested four gameplay-screen examples.

## Verification after approval

- Confirm the saved file contains all decisions, comments, planned rows and the exact gallery order.
- Reload and confirm the saved review loads.
- Confirm repeated saves work without a download or file picker.
- Confirm stale, malformed, excessive and foreign-origin writes cannot replace a manifest.
- Confirm failures preserve the browser draft.
- Retrieve and record the user's actual top four before generating. Do not use the app browser's test ordering as a substitute.

## Running and verified implementation

Run `python3 scripts/serve_art.py` from the project. It replaces the former static server on port 8765. Save review was verified in the user’s Brave tab: all 45 ranked IDs and comments reached the project manifest, and a second save succeeded without a download or file picker. The server serves the saved manifest on reload. Sixteen endpoint tests cover both boards, recoverable original files, repeated saves, stale baselines, invalid requests, foreign origins, size limits, write failures and safe HTML embedding. Isolated browser-script checks confirm that ranking, card toggles, comments and both approved mood-board exports remain intact.

2026-10-05 automatic-save verification: 29 endpoint tests, three publisher/review-preservation tests and twelve client queue/draft tests pass. An isolated browser board saved a rank-only change, rapid commentary and an acceptance decision to its actual Markdown file. Reload retained each change. A simulated newer independent saved order survived reload from a stale browser draft. The live face page preserved every comment and decision while removing its Save button; its saved order is the authority for new concept generation.
