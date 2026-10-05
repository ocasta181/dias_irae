import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONCEPTS = ROOT.parent
PLAN = json.loads((ROOT / "plan.json").read_text())
HEADING = "S13 equipment and cast exploration"


def publish():
    records = []
    for item in PLAN:
        path = ROOT / "records" / f"{item['id'].lower()}-v01.json"
        if not path.exists():
            continue
        record = json.loads(path.read_text())
        if record["parent_visual_review"] == "pending":
            continue
        records.append((item, record))
    if not records:
        print("No inspected expansion drawings to publish.")
        return
    manifest_path = CONCEPTS / "manifest.md"
    manifest = manifest_path.read_text()
    prior = re.search(rf"\n## {HEADING}\n([\s\S]*?)(?=\n## |\Z)", manifest)
    old_rows = {}
    if prior:
        for row in prior[1].splitlines():
            match = re.match(r"^\| ([VR]\d+) \|", row)
            if match:
                old_rows[match[1]] = row
    section = f"\n\n## {HEADING}\n\n35 equipment/face choices and ten story subjects are defined in [the list](expansion/plan.json). Every drawing uses the exact original S13 as its only image input. Dates and regional limits are explicit. Malta is the requested later heraldic exception. These are concept studies; no new sprite or game implementation is implied.\n\n| Identifier | Candidate | Purpose | Image | Status | Notes |\n|---|---|---|---|---|---|\n"
    cards = []
    for item, record in records:
        identifier = item["id"]
        relative = "expansion/images/" + Path(record["file"]).name
        status = record.get("review_status", "pending")
        notes = f"{item['date']}; {item['region']}. {item['basis']}. Parent inspection: {record['parent_visual_review']}"
        notes = notes.replace("|", "&#124;").replace("\n", "<br>")
        section += old_rows.get(identifier, f"| {identifier} | {item['title']} | {item['category']} | [{identifier}]({relative}) | {status} | {notes} |") + "\n"
        escape = html.escape
        cards.append(f'<article class="card" data-reference="{identifier}" id="{identifier.lower()}"><a class="picture" href="{relative}"><img src="{relative}" alt="{escape(identifier + ' — ' + item["title"])}" loading="lazy"></a><div class="body"><div class="meta">{identifier} · {escape(item["category"])} · {status}</div><h3>{escape(item["title"])}</h3><p>{escape(item["date"] + " · " + item["region"])}</p><p>{escape(item["basis"])}</p><p>{escape(record["parent_visual_review"])}</p><a href="images/s13-guarin-isometric-v02.png">Exact S13 base</a> · <a href="expansion/requests/{identifier.lower()}-v01.json">Exact generation request</a></div></article>')
    if prior:
        manifest = manifest[:prior.start()] + section + manifest[prior.end():]
    else:
        manifest = manifest.rstrip() + section
    manifest_path.write_text(manifest)
    index_path = CONCEPTS / "index.html"
    page = index_path.read_text()
    page = re.sub(r'<article class="card" data-reference="[VR]\d+"[\s\S]*?</article>', "", page)
    marker = '<div class="grid" id="preference-grid">'
    if page.count(marker) != 1:
        raise ValueError("Expected one existing preference grid")
    page = page.replace(marker, marker + "".join(cards), 1)
    if 'id="expansion-intro"' not in page:
        page = page.replace(marker, f'<p id="expansion-intro"><strong>{len(PLAN)} requested S13 equipment and cast drawings.</strong> New unranked drawings begin at the top. <a href="expansion/README.md">Defined choices, dates and source limits</a>.</p>' + marker, 1)
    embedded = json.dumps(manifest, ensure_ascii=False).replace("</", "<\\/")
    page = re.sub(r'(<script id="review-manifest" type="application/json">)[\s\S]*?(</script>)', lambda match: match[1] + embedded + match[2], page, count=1)
    index_path.write_text(page)
    print(f"Published {len(records)} inspected expansion cards; earlier rows and ranking retained.")


if __name__ == "__main__":
    publish()
