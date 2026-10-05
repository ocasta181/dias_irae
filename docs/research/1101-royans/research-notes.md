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

The parent integrates the reports, checks their key evidence, records limitations, makes incremental commits on main, and pushes only this task's files. Existing changes to art, `project.godot`, and the untracked story documents belong to other work and are excluded from these commits. No database operations or schema changes are required.

## Research assignments

1. Christian military orders and the early hospital brotherhoods.
2. Noble houses in and around the campaign region.
3. Non-Christian religions, alleged cults, and religious rumors.
4. Climate, weather evidence, astronomy, and period astrology.
5. Technology, food, drink, and supply routes.
6. Music, art, clothing, and architecture.

Only three subagents can run at the same time alongside the parent. The second wave starts as the first wave completes. Each subagent owns one new report and must not commit, push, alter story files, or delegate further.

## Verification status

Research is in progress. The Christian orders report is complete and reviewed. The parent independently opened the departmental museum chronology, national library authority record, Clémentz's hospital history, the Order of Malta emblem history, and the Portuguese presidency's Aviz history. The report preserves conflicting origin summaries, disputed Saint Lazarus evidence, and undated early costumes and mottoes. Its repeated Korean Citation Index link was corrected before acceptance.

The noble-house and religion reports are complete and reviewed. The parent inspected the scanned *Regeste Dauphinois*, printed column 489, acts 2865 and 2867, and the original catalogue text for the Royans notice and Clérieu seal. The scan supports Albon's 1101 title and retains the doubtful date for Guillaume of Sassenage. The catalogue supports the Royans notice around 1040 and a single diagonal band on the Clérieu seal of 1288–1292. The report preserves uncertain succession, false and retrospective genealogical evidence, and Crest's conflicting transfer dates.

For religious history, the parent checked Blumenkranz's Vienne entry, Daftary's accounts of Hasan-i Sabbah and the later Assassin legends, the official regional Mithraic relief record, Vaitkevičius's abstract on the Baltic god-list recorded in 1261, and Walsdorf's discussion of later witch-sabbath imagery. These establish the stated regional and chronological limits; they do not attest a local medieval pagan network or the canon's granary shrine.

The climate and sky, technology and provisions, and music and visual culture subagents are now researching their assigned reports.
