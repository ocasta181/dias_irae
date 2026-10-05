import argparse
import hashlib
import io
import json
import os
import re
import shutil
import tempfile
import threading
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
BOARDS = {
    "concepts": "art/concepts/manifest.md",
    "gameplay": "art/concepts/gameplay/manifest.md",
    "expansion": "art/concepts/expansion/manifest.md",
    "faces": "art/concepts/faces/manifest.md",
}
ORIGINS = {"http://127.0.0.1:8765", "http://localhost:8765"}
MAX_REQUEST = 1_048_576


def digest(content):
    return hashlib.sha256(content).hexdigest()


def manifest_rows(manifest):
    rows = {}
    for line in manifest.splitlines():
        match = re.match(r"^\| ([A-Z]\d+) \|", line)
        if not match:
            continue
        cells = line.split("|")
        if len(cells) < 5 or match[1] in rows:
            raise ValueError("Invalid review table.")
        status = cells[-3].strip()
        if status not in {"pending", "accepted", "rejected", "revise", "planned"}:
            raise ValueError("Invalid review decision.")
        rows[match[1]] = status
    if not rows:
        raise ValueError("The manifest must contain review rows.")
    return rows


class ReviewServer(ThreadingHTTPServer):
    def __init__(self, address, root=ROOT):
        self.root = Path(root)
        self.review_lock = threading.Lock()
        super().__init__(address, ReviewHandler)


class ReviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(args[2].root), **kwargs)

    def send_head(self):
        path = urlsplit(self.path).path
        pages = {
            "/" + str(Path(value).with_name("index.html")): value
            for value in BOARDS.values()
        }
        if path not in pages:
            return super().send_head()
        try:
            html = (self.server.root / path.lstrip("/")).read_text()
            manifest = (self.server.root / pages[path]).read_text()
        except OSError:
            self.send_error(404, "Review page not found")
            return None
        embedded = json.dumps(manifest, ensure_ascii=False).replace("</", "<\\/")
        html, count = re.subn(
            r'(<script id="review-manifest" type="application/json">)[\s\S]*?(</script>)',
            lambda match: match[1] + embedded + match[2],
            html,
            count=1,
        )
        if count != 1:
            self.send_error(500, "Review manifest element not found")
            return None
        content = html.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        return io.BytesIO(content)

    def reply(self, status, body):
        content = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(content)

    def fail(self, status, message):
        self.reply(status, {"saved": False, "error": message})

    def do_POST(self):
        if urlsplit(self.path).path != "/api/review":
            self.fail(404, "Review endpoint not found.")
            return
        if self.headers.get("Origin") not in ORIGINS:
            self.fail(403, "Save from the local review page.")
            return
        if self.headers.get_content_type() != "application/json":
            self.fail(400, "The review must use JSON.")
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if length > MAX_REQUEST:
            self.fail(413, "The review exceeds the 1 MiB limit.")
            return
        if length <= 0:
            self.fail(400, "A complete review is required.")
            return
        try:
            request = json.loads(self.rfile.read(length))
            if not isinstance(request, dict) or set(request) != {
                "board",
                "manifest",
                "baseline",
            }:
                raise ValueError("Invalid review fields.")
            if not all(isinstance(value, str) for value in request.values()):
                raise ValueError("Review fields must be text.")
            if request["board"] not in BOARDS:
                raise ValueError("Unknown review board.")
            if not re.fullmatch(r"[0-9a-f]{64}", request["baseline"]):
                raise ValueError("Invalid review baseline.")
            manifest = request["manifest"]
            if not manifest.startswith("# ") or "\x00" in manifest:
                raise ValueError("Invalid Markdown manifest.")
            rows = manifest_rows(manifest)
        except (ValueError, UnicodeDecodeError) as error:
            self.fail(400, str(error))
            return
        relative = BOARDS[request["board"]]
        destination = self.server.root / relative
        temporary = None
        try:
            with self.server.review_lock:
                current = destination.read_bytes()
                if digest(current) != request["baseline"]:
                    self.fail(
                        409,
                        "The project review changed. Your browser draft is kept; reconcile it before saving.",
                    )
                    return
                if set(rows) != set(manifest_rows(current.decode())):
                    self.fail(400, "Preserve all existing review rows.")
                    return
                history = destination.parent / "review-history"
                history.mkdir(exist_ok=True)
                stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S.%fZ")
                shutil.copy2(destination, history / f"{stamp}-manifest.md")
                content = manifest.encode()
                with tempfile.NamedTemporaryFile(
                    dir=destination.parent, prefix=".review-", delete=False
                ) as output:
                    temporary = Path(output.name)
                    output.write(content)
                    output.flush()
                    os.fsync(output.fileno())
                os.replace(temporary, destination)
                temporary = None
            self.reply(
                200, {"saved": True, "path": relative, "baseline": digest(content)}
            )
        except (OSError, ValueError, UnicodeDecodeError):
            self.fail(
                500,
                "The project review could not be saved. Your browser draft is kept.",
            )
        finally:
            if temporary is not None:
                temporary.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(
        description="Serve art boards with direct review saving."
    )
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    with ReviewServer(("127.0.0.1", args.port)) as server:
        print(f"Art review: http://127.0.0.1:{args.port}", flush=True)
        server.serve_forever()


if __name__ == "__main__":
    main()
