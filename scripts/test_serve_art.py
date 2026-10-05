import http.client
import json
import threading

import pytest
from serve_art import BOARDS, MAX_REQUEST, ReviewServer, digest

INITIAL = "# Review\n\n| S01 | Drawing | pending | Keep this note. |\n| C03 | Planned | planned | Keep this plan. |\n"
UPDATED = (
    INITIAL.replace(
        "pending | Keep this note.", "revise | Muddy &amp; dark.<br>Keep the shape."
    )
    + "\n## Preference ranking\n\n1. S01\n"
)


@pytest.fixture
def review_server(tmp_path):
    for path in BOARDS.values():
        destination = tmp_path / path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(INITIAL)
        destination.with_name("index.html").write_text(
            '<script id="review-manifest" type="application/json">"old"</script>'
        )
    server = ReviewServer(("127.0.0.1", 0), tmp_path)
    thread = threading.Thread(target=server.serve_forever)
    thread.start()
    yield server
    server.shutdown()
    thread.join()
    server.server_close()


def post(server, request=None, body=None, headers=None):
    connection = http.client.HTTPConnection(*server.server_address)
    content = json.dumps(request).encode() if body is None else body
    connection.request(
        "POST",
        "/api/review",
        body=content,
        headers={
            "Origin": "http://127.0.0.1:8765",
            "Content-Type": "application/json",
            **(headers or {}),
        },
    )
    response = connection.getresponse()
    result = response.status, json.loads(response.read())
    connection.close()
    return result


def request(board="concepts", manifest=UPDATED, baseline=None):
    return {
        "board": board,
        "manifest": manifest,
        "baseline": baseline or digest(INITIAL.encode()),
    }


@pytest.mark.parametrize("board", BOARDS)
def test_save_preserves_the_complete_review_and_recoverable_original(
    review_server, board
):
    status, result = post(review_server, request(board))
    path = review_server.root / BOARDS[board]
    assert (
        status,
        result,
        path.read_text(),
        [file.read_text() for file in path.parent.glob("review-history/*")],
    ) == (
        200,
        {"saved": True, "path": BOARDS[board], "baseline": digest(UPDATED.encode())},
        UPDATED,
        [INITIAL],
    )


@pytest.mark.parametrize("board", BOARDS)
def test_repeated_save_uses_the_confirmed_baseline(review_server, board):
    _, first = post(review_server, request(board))
    second_content = UPDATED.replace("Muddy", "Dreary")
    status, result = post(
        review_server,
        request(board, manifest=second_content, baseline=first["baseline"]),
    )
    assert (status, result["baseline"]) == (200, digest(second_content.encode()))


@pytest.mark.parametrize("board", BOARDS)
def test_order_alone_is_saved_without_changing_comments(review_server, board):
    ordered = INITIAL + "\n## Preference ranking\n\n1. S01\n"
    status, result = post(review_server, request(board, manifest=ordered))
    assert (
        status,
        result["baseline"],
        (review_server.root / BOARDS[board]).read_text(),
    ) == (200, digest(ordered.encode()), ordered)


def test_each_board_keeps_an_independent_review_and_baseline(review_server):
    for board in BOARDS:
        content = UPDATED.replace("Muddy", board)
        status, result = post(review_server, request(board, manifest=content))
        assert (status, result["path"]) == (200, BOARDS[board])
    assert {
        board: (review_server.root / path).read_text() for board, path in BOARDS.items()
    } == {board: UPDATED.replace("Muddy", board) for board in BOARDS}


def test_stale_save_cannot_overwrite_a_newer_review(review_server):
    post(review_server, request())
    status, result = post(review_server, request(manifest=INITIAL))
    assert (
        status,
        result["saved"],
        (review_server.root / BOARDS["concepts"]).read_text(),
    ) == (409, False, UPDATED)


@pytest.mark.parametrize(
    "invalid",
    [
        {
            "board": "../elsewhere",
            "manifest": UPDATED,
            "baseline": digest(INITIAL.encode()),
        },
        {"board": "concepts", "manifest": UPDATED, "baseline": "wrong"},
        {
            "board": "concepts",
            "manifest": UPDATED,
            "baseline": digest(INITIAL.encode()),
            "path": "/tmp/elsewhere",
        },
        {"board": "concepts", "manifest": 2, "baseline": digest(INITIAL.encode())},
        {
            "board": "concepts",
            "manifest": "# No rows",
            "baseline": digest(INITIAL.encode()),
        },
        request(
            manifest=UPDATED.replace(
                "| C03 | Planned | planned | Keep this plan. |\n", ""
            )
        ),
        request(manifest=UPDATED.replace("| revise |", "| unknown |")),
    ],
)
def test_invalid_review_leaves_the_manifest_untouched(review_server, invalid):
    status, result = post(review_server, invalid)
    assert (
        status,
        result["saved"],
        (review_server.root / BOARDS["concepts"]).read_text(),
    ) == (400, False, INITIAL)


@pytest.mark.parametrize(
    "body,headers,expected",
    [
        (b"{broken", {}, 400),
        (b"{}", {"Origin": "https://other.example"}, 403),
        (b"{}", {"Content-Length": str(MAX_REQUEST + 1)}, 413),
    ],
)
def test_rejected_requests_do_not_create_backups_or_replace_files(
    review_server, body, headers, expected
):
    status, result = post(review_server, body=body, headers=headers)
    path = review_server.root / BOARDS["concepts"]
    assert (
        status,
        result["saved"],
        path.read_text(),
        list(path.parent.glob("review-history/*")),
    ) == (expected, False, INITIAL, [])


def test_write_failure_preserves_the_original_review(review_server, monkeypatch):
    def fail_replace(*args):
        raise OSError("Cannot replace file")

    monkeypatch.setattr("serve_art.os.replace", fail_replace)
    status, result = post(review_server, request())
    assert (
        status,
        result["saved"],
        (review_server.root / BOARDS["concepts"]).read_text(),
    ) == (500, False, INITIAL)


@pytest.mark.parametrize("board", BOARDS)
def test_reload_embeds_the_saved_review_without_executable_markup(review_server, board):
    content = UPDATED.replace("Muddy", "</script><script>not executable</script>")
    post(review_server, request(board, manifest=content))
    connection = http.client.HTTPConnection(*review_server.server_address)
    connection.request("GET", "/" + BOARDS[board].replace("manifest.md", "index.html"))
    response = connection.getresponse()
    html = response.read().decode()
    connection.close()
    assert (response.status, html) == (
        200,
        '<script id="review-manifest" type="application/json">'
        + json.dumps(content).replace("</", "<\\/")
        + "</script>",
    )
