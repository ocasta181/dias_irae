# Direct review saving — proposed contract

Status: awaiting explicit approval under the supplied AGENTS.md, section 15. No server or browser code depends on this proposal yet.

## Current server

The board is served by Python's static HTTP server on `127.0.0.1:8765`, rooted at this project. The running command is `python -m http.server 8765 --bind 127.0.0.1`.

- `GET` and `HEAD` serve the existing files.
- `POST` is unsupported and returns `501`.
- Save review currently downloads `manifest.md`; it does not write a project file.
- Comments, decisions and order are saved separately in the reviewing browser. The user's Brave draft has not been retrieved. The app browser's test order is not the user's order.

## Proposed local application programming interface (API)

Add `POST /api/review` with `Content-Type: application/json` and this exact request shape:

```json
{
  "board": "concepts",
  "manifest": "<complete reviewed Markdown>",
  "baseline": "<SHA-256 hash of the manifest loaded by the page>"
}
```

`board` is exactly `concepts` or `gameplay`. These map to fixed project paths:

| Board | Destination |
|---|---|
| `concepts` | `art/concepts/manifest.md` |
| `gameplay` | `art/concepts/gameplay/manifest.md` |

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

Bind only to `127.0.0.1`. Accept writes only from `http://127.0.0.1:8765` or `http://localhost:8765`. Keep the existing static reads. For the concept and gameplay HTML pages, embed the current on-disk manifest when serving the page so reload shows the saved decisions, notes and ordering. Their existing URLs and HTML response type stay the same.

Before replacing a manifest, retain a dated copy in that board's `review-history` folder. Write the replacement atomically. No database is used. No saved browser review is deleted.

## Button behavior

Save review keeps the browser draft, sends the complete review to the fixed local destination and shows success only after the server confirms the write. It updates the baseline for the next save. There is no download, file picker, manual file placement or extra user action on a normal save. A failed save leaves the draft intact and displays the error.

The two approved mood boards retain their current review/export behavior; this change applies to the current concept review and the requested four gameplay-screen examples.

## Verification after approval

- Confirm the saved file contains all decisions, comments, planned rows and the exact gallery order.
- Reload and confirm the saved review loads.
- Confirm repeated saves work without a download or file picker.
- Confirm stale, malformed, excessive and foreign-origin writes cannot replace a manifest.
- Confirm failures preserve the browser draft.
- Retrieve and record the user's actual top four before generating. Do not use the app browser's test ordering as a substitute.
