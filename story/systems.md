# Dias Irae — Game Systems

Systems draft for Robert of Rookmere's autumn-**1149** campaign. Governing narrative: [story-arch.md](story-arch.md). People: [characters.md](characters.md). Rooms: [locations.md](locations.md). Period boundaries: [material-culture research](../docs/research/1149-england/place-and-material-culture.md).

This revision aligns the proposals with the new story. Numerical values, progression thresholds, equipment effects, and exact encounter scripting remain design work. A prose proposal is not an implemented feature or a persistence contract.

Robert is a trained secular knight, aged thirty-four. He returns from the Second Crusade with practiced arms and a crisis of hope. Progression restores his ability to act with will and conviction through Christ; the campaign also makes the consequences of protection, truth, and charity visible.

---

## Design pillars

1. **Competent knight, action combat.** Six familiar attributes can support derived defenses and skills; attacks and movement remain action rather than turn-based hit rolls.
2. **Sword and Mantle.** Fighting hostile forces and protecting people serve the same vocation. Illness and disfigurement do not select enemies.
3. **Faith sustains resistance.** Prayer can support courage, discernment, and protection. It does not inherently increase the blight.
4. **Consequences endure.** A protected witness, safe food route, freed captive, or repaired mill remains useful after the encounter.
5. **Holy things remain good.** Counterfeits are investigated; genuine devotion and blessings are not hidden traps.
6. **1149 equipment.** Mail, practical open-faced helmets, shields, and one-handed swords are the default. Later armor and order uniforms retain their dates.

The exact prayer and meaningful victory are narrative requirements. Their fulfillment cannot be reduced to a worthiness score, a reward screen, or payment for divine help.

## Attributes

| Attribute | Combat use | Investigation and protection |
|---|---|---|
| **Strength** | Damage, shove, shield control. | Open a forced door, carry a wounded person, move a cart. |
| **Dexterity** | Timing, attack control, movement. | Catch a falling object, handle tools, avoid a physical hazard. |
| **Constitution** | Health, stagger resistance, endurance. | Escort work, injury, exhaustion, and blight exposure. |
| **Intelligence** | Preparation informed by a learned tell. | Read with help where needed, compare records, follow a particular supply route. |
| **Wisdom** | Discernment and resistance to fear or deceptive visions. | Hear a witness, judge an apparition, recognize a contradiction between a claim and an act. |
| **Charisma** | Rally or steady companions if those abilities are retained. | Household authority, cooperation, a gate opened, a claim heard by useful people. |

**Provisional starting scores**, retained as a competent-knight proposal:

| STR | DEX | CON | INT | WIS | CHA |
|---|---|---|---|---|---|
| 14 | 12 | 13 | 10 | 11 | 10 |

Attribute growth should be small and tied to named experience. No particular increase, unlock, or reward is fixed by the new date.

## Progression

### Arms

Martial practice: cleaner timing, useful attacks, shield work, adaptation to injury, and lessons from experienced soldiers. Robert begins trained; he does not acquire basic knighthood by completing Act I.

Blessed weapons and faith can support martial resistance. There is no final encounter that requires abandoning them.

### Faith

Trust in Christ, prayer, and discernment expressed through story choices and possible abilities. Faith can grow as Robert recognizes goodness and perseveres. It does not mean accepting every relic claim or every order without inquiry.

A low opening value, if the design uses one, represents the crisis. It does not make Christ refuse the sincere prayer or turn worship into a source of corruption. Numbers pace gameplay, not God's availability.

### Will and conviction

The strengths named in the prayer. Show their restoration in Robert continuing to act, protecting people, accepting kindness, resisting the enemy's argument, and recognizing that his struggle matters.

Whether these need a separate track, resource, or only narrative expression remains open. No penance total, concealed-atrocity confession, or unblessed final hit gates victory.

### Sight

A proposed perception condition:

`Sight = f(Wisdom, Faith, Heat)`

Discernment can expose a hostile disguise. High Heat can produce intrusive or misleading perceptions. Records, witnesses, and physical evidence remain necessary to understand the supply route. Sight is not a historical chemical test or a substitute for every inquiry.

## Resources

### Health

A bounded pool and ordinary injuries, consistent with the existing combat prototype's general health model. The campaign need not inflate a veteran's health across many levels.

Ordinary damage, burning exposure, and recovery are distinct presentation concerns. Their numerical effects remain draft. Care from Wulfstan, Agatha, and others can support recovery; no exact medical recipe or toxin-removal procedure is established.

### Armor and shield

| Layer | Period reference | Proposed combat purpose |
|---|---|---|
| Padding | A reference-specific textile layer. | Reduce impact and stagger if modeled. |
| Mail | A repaired hauberk and possible coif. | Protection with limits, rather than universal immunity. |
| Helmet | Practical nasal helmet as Robert's default. | Head protection with the face visible. |
| Shield | Kite shield, repaired and worn. | Active guard, timed block, and bash. |

Reduction, deflection, stamina cost, and armor degradation are proposals, not verified implemented rules. Select dated construction references before final art; do not infer a complete equipment package from one old image.

### Heat

Exposure to the fictional blight through compromised provisions, hostile attacks, and proximity to its foothold. Ergot supplies a material reference, but this is not a clinical simulator.

- Builds through specific hostile causes, not through sincere prayer or righteous combat.
- High exposure can produce fits, impaired control, dangerous visions, and telegraphed bodily harm.
- Appropriate care, separate safe provisions, rest, and spiritual support can matter as the design settles.
- Stopping a harmful distribution prevents future exposure and changes the local world.
- A visible fungal piece is a clue, not a guarantee that every apparently clean lot is safe.

Heat is not a divine-favor meter or a reason to attack an ill person. Edith and Hugh need protection regardless of their exposure.

### Prayer use

Cooldowns, concentration, or a modest encounter resource may pace active abilities. The choice remains open. No empty meter implies that Christ has abandoned Robert, and no prayer action inherently feeds Abaddon.

Ordinary worship and counsel can remain available outside the active-ability system.

## Skills

Checks support investigation, cooperation, and physical action. A failed check changes assistance or difficulty, not the possibility of learning the only necessary truth.

| Skill | Main attributes | Use in this campaign |
|---|---|---|
| **Vigil** | Wisdom / Dexterity | Watch a convoy, notice a sack or active threat, protect a witness. |
| **Letters** | Intelligence | Compare house records, a copied claim, and Walter's misused seal with help from a clerk. |
| **Scripture** | Intelligence / Wisdom / Faith | Recognize Revelation imagery and understand a devotional claim. |
| **Physic** | Intelligence / Wisdom | Practical care and attention to a supply pattern, without modern diagnostic certainty. |
| **Authority** | Charisma | Household obligations, a guard's refusal, Gilbert's courtesy, a claim heard before witnesses. |
| **Insight** | Wisdom | Hugh's fear, Hamon's excuses, and a recruit's willingness to reject predation. |
| **Market** | Intelligence / Charisma | Find separate provisions, identify a supplier, and assess an item's stated provenance. |
| **Endure** | Constitution | Escort, illness, difficult travel, guard work, and holding an approach under attack. |

Oswin, Alice, Agatha, Godric, Thomas, and a neighboring clerk provide different routes to useful information. Their survival changes particular scenes; optional deaths do not erase every route to the final foothold.

## Combat and protection abilities

### Arms

- **Cut**: default one-handed sword attack.
- **Thrust**: more precise attack if the final combat design supports it.
- **Guard**: hold the shield; timed block and riposte remain proposals.
- **Bash**: use the shield to stop or displace an attacker.
- **Throw**: a dagger or another specifically designed limited resource.

Later lessons can add a short charge, close work, and adaptation to the injured hand. Exact costs and unlocks remain unsettled.

### Faith and protection

- **Sign of the Cross**: a possible brief ward against a hostile presence.
- **Psalm**: a possible channel that steadies allies or resists fear.
- **Spare**: a nonlethal option where an attacker can safely be stopped or taken into custody.
- **Aid during prayer**: defend Hugh and Anselm while spiritual help is given.
- **Escort and shelter**: encounter objectives that protect a person or usable route.

A person may need righteous force to stop an attack. Sparing everyone is not a universal victory condition, and wounds or appearance do not define the enemy group.

Sacramental reception belongs to worship in its proper context. A reserved host is not an instant combat consumable. Robert does not give absolution, and holy attacks can contribute to the final victory.

## Equipment and meaningful objects

### Starting vocabulary

Mail, a nasal helmet, a kite shield, a one-handed arming sword, a dagger, a repaired wool cloak, linen, leather footwear, a belt and purse, and a borrowed mule. Exact textile layering, mail hand construction, and additional protection need dated references.

A personal household mark can be an art choice. Robert does not wear an official military-order mantle simply because Templars and Hospitallers now exist.

### Narrative equipment categories

| Category | Starting or relevant object | Story purpose |
|---|---|---|
| Head | Repaired nasal helmet. | Ordinary protection and a recognizable face. |
| Body | Mail and a selected textile layer. | Wealth, repair, and vulnerability. |
| Hands and feet | Practical leather and selected period protection. | Work, injury, and travel. |
| Cloak | Worn local wool. | Household identity and the journey home. |
| Shield | Kite shield with worn personal paint. | Active protection. |
| Weapon and sidearm | Arming sword and dagger. | Trained martial craft. |
| Devotional object | Rag-wrapped splinter. | Sincere devotion with uncertain provenance. |
| Evidence or burden | A copied record, seal impression, or the dangerous casket when a scene requires it. | Inquiry and responsibility, not automatic combat power. |

These categories describe narrative use; they do not change the prototype's inventory locations or define a new saved-data schema.

Items can carry weight, repair needs, period materials, and particular histories. Avoid an unrelated flood of magical jewelry. A genuine blessing does not secretly reverse because Robert prayed or opposed evil.

### The splinter

Acquired during Robert's 1148 pilgrimage on a claim of True Cross provenance. The uncertainty concerns the object, not whether sincere devotion is itself harmful.

It may support a memory or prayer scene if the design retains that use. It is not a second hidden key for Abaddon and need not be destroyed to win. Item voices and their presentation remain open design questions.

### Hugh's counterfeit casket

The dangerous object established by the plot. Hugh brought it home in spring 1149; the care house received it; Hamon took it to Blackthorn Hold.

Its false promise, specific contamination, and supernatural foothold create the danger. Evidence and prayer expose different aspects of it. Breaking the casket-heart belongs to the final approach. A generic rule that all relics feed evil would contradict the story.

### Records and the household seal

Alice's recollection and copies, Oswin's entries, Agatha's witnesses, and Walter's misused seal establish what particular people did. They are tools for a local challenge, not modern administrative access keys.

A failed Letters check can bring a clerk into the scene. Missing one optional witness can increase the cost of reaching the truth; it cannot make the entire campaign insoluble.

## What progression looks like in the world

| Beat | Visible consequence |
|---|---|
| Prayer at the stone cross. | The need for hope, will, guidance, and strength is named sincerely. |
| Stops Ernald's collection. | Neighbors and seed grain remain protected. |
| Defends the House of Saint Michael. | Patients are moved safely, witnesses remain, and separate meals resume. |
| Frees captives and men coerced by Gilbert. | People return to kin or choose useful service. |
| Protects Hugh during release. | A frightened man can turn toward Christ and survive to help another. |
| Allies guard supplies during the descent. | Earlier protection becomes reciprocal action. |
| Breaks the counterfeit and defeats Abaddon. | The local grip ends and a real future in 1150 becomes visible. |

The fellowship shown here is not a currency for grace. Robert's prayer is answered in restored strength, meaningful resistance, goodness recognized, and victory.

## Memory encounters

Use the 1147–1148 march, failed siege, pilgrimage, and 1148–1149 road home. War memories can test perseverance and reveal a kindness Robert once overlooked.

Remove the former personal visionary-lance episodes and any required later arrival of that lance as equipment. These are experiences of the Second Crusade and return, not a mechanical reskin of the First Crusade.

## Open design decisions

- How will restored will and conviction be expressed: narrative, a track, or an encounter resource?
- What pacing mechanism suits active prayer abilities?
- How much survivability comes from health, armor, timing, allies, and protection?
- Which rescues are mainline, and how do optional losses change assistance without blocking completion?
- What exact equipment references and upgrade paths fit 1149?
- Does the mule affect carry capacity or serve as homecoming presentation?
- How, if at all, do item memories or voices appear?
- Which save and respec decisions from the earlier draft remain wanted?

The period, names, governing prayer, care-house defense, and meaningful local victory are active narrative choices. Numerical values and new implementation contracts are not settled by this document.
