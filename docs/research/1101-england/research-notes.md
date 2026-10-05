# England comparison: scope and verification

Requested on 5 October 2026 as an extension of the existing 1101 story research.

Starting checkpoint: `e208bfd6ed1776831248e54416907569103b9b5d`.

## Scope decisions

- Use the same late-summer-to-winter 1101 frame as the existing dossier. Confidence: 100 percent, from the user's phrase “at the time” and the established story date.
- Compare England with the story's Royans, Isère, Drôme, and Rhône setting, not with an imagined uniform medieval France. Confidence: 98 percent, from the prior research request and canon.
- Produce four substantial reports for the user's named examples, plus brief climate/sky and technology/provisions comparisons under `docs/research/1101-england/`. The examples do not form an exclusive list, and these supplements preserve the original research areas. Confidence: 90 percent. Focus on supported differences and identify shared practices where a claimed difference would be false.
- Continue the user's explicit topic-subagent workflow. Use the previously resolved parent model and reasoning settings without overrides. Confidence: 95 percent; no new settings were requested. Keep topic owners where available. Assignments run in waves because only three subagents can run alongside the parent.
- Use the existing Markdown research format, with direct source links, dated claims, fact-versus-rumor labels, and stated evidence limits. Do not edit canon or unrelated working-tree changes. Confidence: 99 percent.

## Success criteria

The reports cover politics; principal noble houses, leaders, and dated visual identities; religion, cult claims, and rumors; culture; climate and the sky; and everyday technology and provisions. Each states the relevant English evidence, the actual comparison with the story region, and the limits of that comparison. Later titles, coats of arms, institutions, legends, and artistic forms must retain their later dates. No difference is invented to fill a table.

Subagents may write only their assigned report. The parent reviews evidence, integrates the index, validates the documents, makes incremental commits on main, and pushes the research. No code, database operation, or schema change is required.

## Assignments and review

| Owner | Report |
|---|---|
| `/root/regional_houses` | `noble-houses.md` |
| `/root/religions_and_rumors` | `religions-and-rumors.md` |
| `/root/music_visual_culture` | `culture.md` |
| `/root/england_politics` | `politics.md` |
| `/root/climate_and_sky` | `climate-and-sky.md` |
| `/root/technology_provisions` | `technology-and-provisions.md` |

The first three assignments retained the owners of the corresponding earlier research. The culture owner completed its report and released a slot; the fourth subagent then started politics. After religion completed, the original climate owner started its short England comparison. After noble houses completed, the original provisions owner started its supplement. Each of the six subjects has its own subagent.

The user replaced all previous AGENTS.md instructions during this work. The parent passed the applicable new rules to the running agents. The new rules retain source review, verification, uncertainty, ordinary-chat questions, confidence-based reversible decisions, and explicit database approval boundaries. Earlier general coding and Git prescriptions are superseded. The parent continues the established repository research format and owns integration and Git actions as a task procedure, rather than attributing those procedures to the replacement instructions.

## Parent review

- Culture: read the complete report. Independently checked the London Archives' 1067 Old English charter, Stalley's Durham construction chronology, Parliament's Westminster roof history, and Historic Royal Palaces' Tower dates and labor description. The report distinguishes surviving objects from a reconstructed 1101 performance or wardrobe, and retains later building phases. Local-link, placeholder and final-newline checks passed.
- Religion and rumors: read the complete report. Independently checked Lewes Priory's foundation range, Crispin's pre-1096 account of Jews in London, Anselm's return and exile chronology, the dated *Lacnunga* catalogue entry, and Fraaije's alternative interpretation of Woden. The report marks that interpretation as a proposal and dates later accusations and folklore. The parent reproduced local-link, placeholder, whitespace and final-newline checks. Named 1101 rabbis, resident Muslim or pagan congregations, household practice and some monastic office-holders remain unverified, rather than being filled with invented detail.
- Noble houses: read all eight profiles and independently checked the Morgan Psalter's dated color descriptions, Conisbrough's construction and estate history, Matilda's Abbey biography, and Vincent's Bigod seal analysis. A bounded correction stayed with the owner: Warenne's departure, forfeiture and restoration needed distinct dates. The parent then read the cited thesis passage. The final report retains the unresolved confiscation date and does not imply continuous English possession throughout autumn and winter 1101. Percy succession, undocumented faction choices and contemporary palettes and mottoes remain explicit gaps.
- Preliminary politics evidence: read the coronation-charter record and primary translation, and the British Library's Cotton Ch II 6 catalogue record. The charter's issue date is 5 August 1100 despite a copied introduction saying circa 1101; the writ remains dated 1100–1107. These ranges and distinctions were passed to the politics owner.
- Shared-source allowances were coordinated between owners. The parent reserved brief index summaries rather than duplicating the reports.

The politics handoff, climate and provisions reports, integrated comparison and final document checks are still in progress. No engine tests are needed for these prose-only additions.
