# England comparison: scope and verification

Requested on 5 October 2026 as an extension of the existing 1101 story research.

Starting checkpoint: `e208bfd6ed1776831248e54416907569103b9b5d`.

## Scope decisions

- Use the same late-summer-to-winter 1101 frame as the existing dossier. Confidence: 100 percent, from the user's phrase “at the time” and the established story date.
- Compare England with the story's Royans, Isère, Drôme, and Rhône setting, not with an imagined uniform medieval France. Confidence: 98 percent, from the prior research request and canon.
- Produce four substantial reports for the user's named examples, plus brief climate/sky and technology/provisions comparisons under `docs/research/1101-england/`. The examples do not form an exclusive list, and these supplements preserve the original research areas. Confidence: 90 percent. Focus on supported differences and identify shared practices where a claimed difference would be false.
- Continue the user's explicit topic-subagent workflow. Use the previously resolved parent model and reasoning settings without overrides. Confidence: 95 percent; no new settings were requested. Keep topic owners where available. Assignments run in waves because only three subagents can run alongside the parent.
- Use the existing Markdown research format, with direct source links, dated claims, fact-versus-rumor labels, and stated evidence limits. Do not edit canon or unrelated working-tree changes. Confidence: 99 percent.
- The later setting-choice question concerns the current plot and game, rather than an abstract ranking of countries. Confidence: 98 percent. The parent read the story outline, character dossiers, locations and game systems before assessing narrative fit. The recommendation does not authorize a canon rewrite.

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
- Politics: read the complete final report. Independently checked the coronation-charter record and primary translation, Cotton Ch II 6, Baxter's account of inherited administration, the Worcester annals, and the keeper's modern chronicle attribution. The charter's issue date is 5 August 1100 despite a copied introduction saying circa 1101; the writ remains dated 1100–1107. The owner recovered the National Archives' Domesday pages through the browser after a text-fetch failure. Cambridge references support only their accessible published summaries; the report does not claim access to the full chapters. Landing dates, compliance with royal commands, private loyalties and the end of Anselm's exile retain their stated limits. The parent reproduced local-link, placeholder, whitespace and final-newline checks.
- Climate and sky: read the complete final report. Independently checked the Met Office's geographical mechanisms, the Royal Observatory's latitude explanation, and NASA's two autumn lunar catalogue entries. Modern measured averages are not used as 1101 weather. The browser calculation of English solar visibility could not be completed after interruption; the report makes no local solar claim and preserves that limitation. Exact weather and eyewitness observations remain unresolved. The parent reproduced local-link, placeholder, whitespace and final-newline checks.
- Technology and provisions: read the complete final report. Independently checked the Oxford study's regional crop and plough evidence, the Hull project's vineyard record, and the Worcestershire framework's salt industry and dating gaps. The broad archaeological phases remain visible. Estate dues do not become household menus, and documented vineyards do not establish universal access to wine. The parent reproduced local-link, placeholder, whitespace and final-newline checks.
- Shared-source allowances were coordinated between owners. The parent reserved brief index summaries rather than duplicating the reports.

All six topic reports have completed subagent handoffs and parent review. The integrated index is complete, and the original dossier links to it. Final checks passed for the expected eight English documents and the revised original index: nonempty content, local link targets, Maps URL syntax, table column counts, placeholders, internal citation identifiers, trailing whitespace and final newlines. These are document checks and source spot-checks, not a claim that every remote page was re-audited. No engine tests are needed for these prose-only additions.

Local source links were checked against the shared workspace. The story files were untracked and unchanged during the initial comparison; their separate repository publication was outside that research task. The incomplete English solar calculation is an explicit evidence limit, not a verified negative result.

## Town setting investigation

Requested on 5 October 2026 after the author clarified Guarin's prayer and central arc. The prayer asks Christ for will, conviction, hope, guidance, and strength. Its fulfillment is meaningful victory, renewed recognition of goodness in fellow men, and the conviction that the world is worth saving and life worth living. The parent reconciled the four story drafts with that direction, preserved the prayer verbatim, and committed and pushed them at `39f3a4e7669df339320ed0a44247bacd6fa633f8`.

The author explicitly requested a subagent using the bounded-subagent skill to examine suitable English towns. `/root/english_town_settings` owns only the new `town-settings.md` report. Dispatch checkpoint: `fcd4bc239742d9b20241ee60118d44a46a4d2223`. Model and reasoning effort are inherited from the parent, with no overrides. Decision confidence: 99 percent. The parent owns evidence review, index integration, commits, and pushes.

The baseline remains late summer to winter 1101. The investigation must date political authority, town scale, religious foundations, buildings, and practical geography, and separate documented evidence from later history and proposed story use. A compact circa-1150 comparison is permitted where useful, with its facts kept separate. This investigation does not relocate the canon or change its year.

The deliverable is a ranked selection of six to eight serious town candidates, with two or three finalists, a preferred candidate, source-supported tradeoffs, and stated limits. The protagonist's spiritual crisis concerns despair and his capacity to fight evil; the report must not restore the superseded complicity, cannibalism, or unblessed-victory premises.

The author rejected the parent's excessive emphasis on construction material. The parent corrected the assignment: ranking must concern community, relationships, visible goodness, human evil, local political pressure, Guarin's ability to act, war context, and coherent quest geography. Timber, stone, and the completeness of surviving buildings carry no ranking weight; brief reconstruction notes remain secondary.

The subagent completed an approximately 4,995-word report after source review on 5–6 October 2026. Its writing checkpoint was `e5ad5fc7744d5206d3b5c25fa98c1c7ebef8399d`. The accepted ranking is Lewes, Castle Acre, Shrewsbury, Rochester, Richmond, Evesham, Ely, and Durham. Lewes offers the strongest wider district; Castle Acre supports a more intimate hometown; Shrewsbury strengthens pressure from armed authority. These are story judgments, not measured historical rankings or a canon relocation.

The parent read the full draft and the final revisions. Independent source checks covered the Lewes survey's 127 burgesses in 1086, the priory's 1078–1082 foundation, the Trust's qualified hospital tradition, both Castle Acre keeper histories, Baker's Shrewsbury archaeological report and distinct 1102/1138 events, Rochester's early hospital record, and the Worcester Chronicle's 1104 death notice for Walter of Evesham. All eight exact modern town-map destinations were opened in the parent browser and their redirected place content reviewed. The subagent's browser-creation limitation was resolved through these parent checks.

The parent also checked the separate later-date context: the Second Crusade chronology, the Royal Household's civil-war account and its geographical qualification, and the Chronicle's retrospective despair-and-charity passage. The circa-1150 comparison remains a separate option; it does not change 1101's people or institutions.

The final report retains uncertain Warenne forfeiture timing, the traditional Lewes hospital date and unread Whittick paper, incomplete Richmond/Ely leadership, and unverified local care and production detail. These limits do not block the ranked narrative recommendation. The subagent checked 29 historical destinations and the local references; the parent reproduced document checks. This is a source review and Markdown verification, not an engine test or a claim that a rendered preview was inspected. No gameplay implementation changed. A selected location would need a narrower household-and-route reconstruction before canon relocation.
