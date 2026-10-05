import re
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1] / "art/concepts"


def rows(content):
    return {
        match[1]: match[0].split("|")[-3:-1]
        for match in re.finditer(r"^\| ([A-Z]\d+) \|.*$", content, re.MULTILINE)
    }


@pytest.mark.parametrize("board", ["expansion", "faces"])
def test_publishing_keeps_independent_reviews_and_cannot_merge_into_styles(
    tmp_path, board
):
    for relative in [
        "index.html",
        "manifest.md",
        "expansion/index.html",
        "expansion/manifest.md",
        "faces/index.html",
        "faces/manifest.md",
        "expansion/plan.json",
        "faces/plan.json",
        "expansion/publish.py",
        "faces/publish.py",
    ]:
        destination = tmp_path / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / relative, destination)
    for folder in ["expansion/records", "faces/records"]:
        shutil.copytree(ROOT / folder, tmp_path / folder)
    style_before = (tmp_path / "manifest.md").read_bytes()
    style_page_before = (tmp_path / "index.html").read_bytes()
    manifest = tmp_path / board / "manifest.md"
    identifier = "V01" if board == "expansion" else "F01"
    content = manifest.read_text()
    line = re.search(rf"^\| {identifier} \|.*$", content, re.MULTILINE)[0]
    cells = line.split("|")
    cells[-3], cells[-2] = " accepted ", " User comment must survive. "
    content = content.replace(line, "|".join(cells))
    manifest.write_text(content)
    before = rows(content)
    subprocess.run([sys.executable, str(tmp_path / board / "publish.py")], check=True)
    page = manifest.with_name("index.html").read_text()
    assert (
        {identifier: rows(manifest.read_text())[identifier] for identifier in before},
        (tmp_path / "manifest.md").read_bytes(),
        (tmp_path / "index.html").read_bytes(),
        set(re.findall(r'data-reference="([A-Z]\d+)"', page)) >= set(before),
        'id="download-manifest"' in page,
    ) == (before, style_before, style_page_before, True, False)


def test_live_galleries_preserve_all_rows_without_duplicate_candidates():
    sets = [
        set(rows((ROOT / board / "manifest.md").read_text()))
        for board in [".", "expansion", "faces"]
    ]
    original_faces = {f"F{number:02d}" for number in range(1, 31)} | {
        f"V{number}" for number in range(21, 26)
    }
    assert (
        len(sets[0]),
        len(sets[1]),
        original_faces <= sets[2],
        len(set.union(*sets)),
    ) == (63, 40, True, sum(map(len, sets)))


def test_face_labels_identify_the_drawing_and_label_its_source_separately():
    page = (ROOT / "faces/index.html").read_text()
    cards = re.findall(
        r'<article class="card" data-reference="([FV]\d+)".*?</article>', page
    )
    for identifier in cards:
        card = re.search(
            rf'<article class="card" data-reference="{identifier}".*?</article>', page
        )[0]
        title = re.search(r"<h3>(.*?)</h3>", card)[1]
        assert title.startswith(identifier + " · ")
    f37 = re.search(r'<article class="card" data-reference="F37".*?</article>', page)[0]
    assert '<h3>F37 · Eyes: tired tapered slits</h3>' in f37
    assert 'Based on <a href="images/f25-v01.png">F25 (source image)</a>' in f37
