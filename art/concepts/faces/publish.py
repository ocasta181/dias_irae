import html
import json
import re
from os.path import relpath
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONCEPTS = ROOT.parent
PLAN = {item["id"]: item for item in json.loads((ROOT / "plan.json").read_text())}


def publish():
    old_manifest = (
        (ROOT / "manifest.md").read_text() if (ROOT / "manifest.md").exists() else ""
    )
    old_rows = {
        match[1]: match[0]
        for match in re.finditer(r"^\| ([FV]\d+) \|.*$", old_manifest, re.MULTILINE)
    }
    source = (CONCEPTS / "manifest.md").read_text()
    records = {}
    for identifier in PLAN:
        paths = sorted(
            (ROOT / "records").glob(f"{identifier.lower()}-v*.json"), reverse=True
        )
        for path in paths:
            record = json.loads(path.read_text())
            if (
                record["parent_visual_review"] != "pending"
                and record.get("presentation") != "held back"
            ):
                records[identifier] = (record, path.stem)
                break
    identifiers = [
        f"F{number:02d}"
        for pair in zip(range(1, 16), range(16, 31), strict=True)
        for number in pair
    ]
    identifiers += [identifier for identifier in PLAN if identifier not in identifiers]
    identifiers += [f"V{number}" for number in range(21, 26)]
    rows, cards = [], []
    for identifier in identifiers:
        if identifier.startswith("F"):
            if identifier not in records:
                continue
            record, stem = records[identifier]
            image = "images/" + Path(record["file"]).name
            title, provider = record["title"], record["provider"]
            note, status = record["parent_visual_review"], record["review_status"]
            note = note.replace("|", "&#124;").replace("\n", "<br>")
            row = f"| {identifier} | {title} | {provider} | [{identifier}]({image}) | {status} | {note} |"
            links = f'<a href="requests/{stem}.json">Exact request</a> · <a href="records/{stem}.json">Generation record</a>'
            if PLAN[identifier].get("source_id"):
                source_id = PLAN[identifier]["source_id"]
                source_image = relpath(
                    record["request"]["referenced_image_paths"][0], ROOT
                )
                links += f' · <a href="{source_image}">Selected source {source_id}</a>'
        else:
            record = json.loads(
                (
                    CONCEPTS / "expansion/records" / f"{identifier.lower()}-v01.json"
                ).read_text()
            )
            image = "../expansion/images/" + Path(record["file"]).name
            title, provider = record["title"], "Earlier built-in study"
            row = old_rows.get(identifier) or re.search(
                rf"^\| {identifier} \|.*$", source, re.MULTILINE
            )[0].replace("(expansion/images/", "(../expansion/images/")
            cells = row.split("|")
            status, note = (
                cells[-3].strip(),
                html.unescape(cells[-2].strip()).replace("<br>", "\n"),
            )
            links = f'<a href="../expansion/records/{identifier.lower()}-v01.json">Generation record</a>'
        rows.append(old_rows.get(identifier, row))
        escape = html.escape
        cards.append(
            f'<article class="card" data-reference="{identifier}" id="{identifier.lower()}"><a class="picture" href="{image}"><img src="{image}" alt="{escape(identifier + " — " + title)}" loading="lazy"></a><div class="body"><div class="meta">{identifier} · {escape(provider)} · {status}</div><h3>{escape(title)}</h3><p>{escape(note)}</p>{links}</div></article>'
        )
    ranking = re.search(r"\n## Preference ranking\n[\s\S]*?(?=\n## |\Z)", old_manifest)
    manifest = (
        "# Guarin face review\n\nFace studies preserve the S13 outfit and proportions. The first 30 use original S13; the second 30 use the captured preferred faces, mainly F25, with alternate facial marks and noses. Five earlier face candidates remain for comparison. Review statuses are inspection notes, not production approval.\n\n| Identifier | Candidate | Provider | Image | Status | Notes |\n|---|---|---|---|---|---|\n"
        + "\n".join(rows)
        + "\n"
        + (
            ranking[0]
            if ranking
            else "\n## Preference ranking\n\nMove your preferred faces to the beginning of the gallery.\n"
        )
    )
    (ROOT / "manifest.md").write_text(manifest)
    source_page = (CONCEPTS / "index.html").read_text()
    style = re.search(r"<style>([\s\S]*?)</style>", source_page)[1]
    style += ".picture{overflow:hidden}.face-closeups .picture img{transform:scale(2);transform-origin:50% 31%}.review-toolbar button:disabled{opacity:.5;cursor:default}"
    embedded = json.dumps(manifest, ensure_ascii=False).replace("</", "<\\/")
    page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dias Irae — Guarin face exploration</title><style>{style}</style><link rel="stylesheet" href="../../mood-board/review.css?v=17"></head><body data-manifest-path="art/concepts/faces/manifest.md"><main>
<header><div class="eyebrow">Dias Irae · Same S13 outfit and drawing medium</div><h1>Guarin: face exploration</h1><p>{len(records)} face studies inspected, plus five earlier candidates. The new 30 explore your saved top twelve, with 18 focused on F25, your captured #5. Every new study uses its exact selected source and keeps the outfit and drawing medium. Grok trials that changed the medium are held back; current round-two studies use the built-in generator.</p><nav><a href="../index.html#current-styles">Character style board</a><a href="../expansion/index.html">Equipment and story cast</a><a href="images/f25-v01.png">F25: selected #5 for this round</a><a href="../images/s13-guarin-isometric-v02.png">Exact S13 base</a><a href="../gameplay/index.html">Gameplay exploration</a><a href="README.md">Face study list</a><a href="manifest.md">Review manifest</a></nav></header>
<div class="review-toolbar" aria-labelledby="review-heading"><h2 id="review-heading">Compare and rank faces</h2><p id="review-summary" aria-live="polite"></p><button id="face-closeups" type="button" aria-pressed="false">Face close-ups</button> <p id="review-save-status" role="status"></p><p>Order, comments and decisions save automatically to the project on every change.</p></div>
<section class="current"><p>Enter a position and press Enter, use the arrows, or hold anywhere on a card to drag it. Details opens the commentary and decision controls. Face close-ups enlarges the same image for comparison; open an image to inspect the complete original.</p><div class="grid" id="preference-grid">{"".join(cards)}</div></section></main><script id="review-manifest" type="application/json">{embedded}</script><script src="draft.js?v=2"></script><script type="module" src="../../mood-board/review.js?v=20"></script><script>document.getElementById("face-closeups").addEventListener("click",(event)=>{{const active=document.body.classList.toggle("face-closeups");event.currentTarget.setAttribute("aria-pressed",String(active));event.currentTarget.textContent=active?"Full figures":"Face close-ups";}});</script></body></html>"""
    (ROOT / "index.html").write_text(page)
    print(f"Published {len(records)} new and five earlier face cards.")


if __name__ == "__main__":
    publish()
