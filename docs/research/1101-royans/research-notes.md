# Research scope and verification record

Research requested on 5 October 2026 for the existing Dias Irae story.

## Decisions at the starting commit

Starting commit: `d33dc2ed0d9e1399819bed59b73d49c69109a400`.

- The story runs from late summer into winter 1101. The authoritative setting is the Royans and the Isère valley, followed by the Drôme and Rhône corridor. Decision confidence: 100 percent, based on `story/story-arch.md` and `story/locations.md`.
- Use the current parent model and reasoning settings for all research subagents. Decision confidence: 95 percent. The user requested parallel subagent research and gave a rule to record and proceed with decisions at or above 80 percent confidence. No different model or effort was requested. This user rule takes precedence over the bounded-subagent skill's default question about missing settings.
- Save the six reports and their index under `docs/research/1101-royans/`. Decision confidence: 95 percent, based on the existing repository documentation and the task's use of the project story. The write-page skill's repository convention takes precedence over its default new Page destination.
- Historical research does not change story canon. Record conflicts, disputed dates, and fictional choices for review. Decision confidence: 99 percent; the request is for research write-ups.

At commit `9740a4c`, interpret the request for "astrological events" as covering both astronomical events and the ways people interpreted them through astrology or religion. Decision confidence: 95 percent. This covers the stated request without requiring the user to choose between two closely related subjects.

## Success criteria

Each of the six requested topics has a separate report. Reports cite sources next to the claims they support, identify what existed in 1101, explain later developments, and label documented facts, disputed evidence, later legend, and proposed story uses. Leadership, colors, arms, and mottoes must carry dates or explicit evidence limits. Do not project later heraldry, institutions, or beliefs back into 1101.

Research uses scholarly work, primary documents, museum collections, official archives, and specialist institutions where available. Search excerpts identify sources; opened passages establish claims. Negative evidence is described as a search limitation, not proof that a thing never existed. Suggested uses in the story are inferences, not historical findings.

The parent integrates the reports, checks their key evidence, records limitations, makes incremental commits containing only this task's files on main, and pushes main. Existing changes to art, `project.godot`, and the untracked story documents belong to other work and are excluded from these commits. No database operations or schema changes are required.

## Research assignments

| Subagent | Owned report |
|---|---|
| `/root/military_orders` | [Christian military orders and hospital brotherhoods](christian-orders.md) |
| `/root/regional_houses` | [Regional noble houses](noble-houses.md) |
| `/root/religions_and_rumors` | [Religions and religious rumors](religions-and-rumors.md) |
| `/root/climate_and_sky` | [Climate and the sky](climate-and-sky.md) |
| `/root/technology_provisions` | [Technology and daily provisions](technology-and-provisions.md) |
| `/root/music_visual_culture` | [Music and visual culture](music-and-visual-culture.md) |

Only three subagents can run at the same time alongside the parent. The second wave starts as the first wave completes. Each subagent owns one new report and must not commit, push, alter story files, or delegate further.

## Verification status

Research is in progress. The Christian orders report is complete and reviewed. The parent independently opened the departmental museum chronology, national library authority record, Clémentz's hospital history, the Order of Malta emblem history, and the Portuguese presidency's Aviz history. The report preserves conflicting origin summaries, disputed Saint Lazarus evidence, and undated early costumes and mottoes. Its repeated Korean Citation Index link was corrected before acceptance.

The noble-house and religion reports are complete and reviewed. The parent inspected the scanned *Regeste Dauphinois*, printed column 489, acts 2865 and 2867, and the original catalogue text for the Royans notice and Clérieu seal. The scan supports Albon's 1101 title and retains the doubtful date for Guillaume of Sassenage. The catalogue supports the Royans notice around 1040 and a single diagonal band on the Clérieu seal of 1288–1292. The report preserves uncertain succession, false and retrospective genealogical evidence, and Crest's conflicting transfer dates.

For religious history, the parent checked Blumenkranz's Vienne entry, Daftary's accounts of Hasan-i Sabbah and the later Assassin legends, the official regional Mithraic relief record, Vaitkevičius's abstract on the Baltic god-list recorded in 1261, and Walsdorf's discussion of later witch-sabbath imagery. These establish the stated regional and chronological limits; they do not attest a local medieval pagan network or the canon's granary shrine.

The climate and sky report is complete and reviewed. The parent inspected Sigebert's scanned printed pages 366 and 367, checked Pfister's winter 1099/1100 passage on printed page 543, and opened the astronomical catalogues, comet list, and modern ergot biology sources. The two climate reconstructions measure different seasons and variables; neither establishes local weather in 1101.

The parent independently reproduced the solar calculations at 45°03′ north, 5°20′ east and 44°45′ north, 5°00′ east, both at 200 meters with a zero time zone. Each 1101–1200 local table begins with 31 May 1109, Julian. The first point's maximum is at 13:21:40 Universal Time; the second is at 13:21:03. Thus neither sample shows a visible 1101 solar eclipse. The subagent also retained lunar output: 14 May 1101 penumbral magnitude 0.603; the event beginning 8 October and peaking 9 October, 0.178; 7 November, 0.173. These agree with the NASA catalogue classifications. Model predictions do not supply an eyewitness or account for clouds and mountain horizons.

The technology report is complete and reviewed. The parent checked the municipal bridge guide's 1033 mention and 1393 gateway, the direct English Heritage kite-shield description, the museum's earlier regional equipment, and the European Food Safety Authority assessment of contaminated grain and processing. Colardelle's excavation notice supports rye predominance, local threshing, and pig export at the earlier comparison site. The Silos manuscript study establishes eleventh-century paper use outside the region; the medical history sources establish active translation and wider sugar use without proving local availability. The subagent corrected the spice citation to Ducène's direct chapter page; the parent then verified its abstract and publication metadata. The report explicitly limits that claim to the abstract.

The music and visual culture subagent is finishing its report. Its connection failed during compaction; the parent resumed the same assignment with the same owner.

Review checkpoint: `0bd7677b6ecbfb98504bcf8a0781ef867ed478b2`. The parent added a bounded comparison for Holy Sepulchre knighthood. The order's own Vatican history marks its First Crusade origin as undocumented and places its first knightly investiture evidence in 1336. Separate modern institutional sources support the later cloak, cross, and motto. The parent also added the Antonines' retrospective black-habit description and aligned the Templar date wording across reports. These clarify familiar visual references without making them 1101 institutions or costumes.
