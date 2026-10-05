# Dias Irae — Systems (draft)

First pass at attributes, axes, combat resources, abilities, and equipment. Narrative locks live in [story-arch.md](story-arch.md). This document is design, not implementation. The architecture already names Combat, Loot, and Progression as domains. Numerical progression remains a proposal; implementation should follow settled design decisions, not treat every draft value as approved.

Guarin is thirty-four and a veteran of the Provençal host. He does not begin as a level-one peasant and he does not become a demigod by Act V. Progression is vocational and spiritual. He begins as a trained knight. His will and conviction can be restored as Christ sustains him and he sees that his struggle matters. The fulfillment of his prayer must be visible in saved lives, goodness encountered, and meaningful victory, even if prayer also has combat effects.

---

## Design pillars

1. **D&D chassis, medieval loadout.** Six attributes, derived defenses, skills used in hubs and investigation. Combat itself is action, not turn-based to-hit rolls.
2. **Progression through the campaign.** Martial practice, prayer, relationships, and victories can unlock abilities. The final structure of spiritual tracks remains open.
3. **Faith strengthens resistance to evil.** Prayer can sustain will, conviction, courage, and discernment. Trust in Christ is not a susceptibility penalty or a trap.
4. **Sword and Mantle.** Combat and protection serve the same vocation. The player fights hostile forces and protects people who need help. Illness and disfigurement alone do not identify an enemy.
5. **Holy things remain good.** Genuine blessings, prayer, and sacraments can help. Counterfeits are exposed through evidence and discernment; righteous attacks do not power the final enemy.
6. **Period kit.** 1101 is mail, nasal helm, kite shield, arming sword. Not plate.

The exact opening prayer and the arc of restored hope are narrative requirements in the story outline. Do not reduce their fulfillment to a combat bonus or a numerical test of Guarin's worthiness.

---

## Attributes

Rolled or assigned once. They advance rarely and in small amounts — a point from a named event, not from a level-up screen. Use the familiar six so the chassis is readable.

| Attribute | In this world | Combat | Out of combat |
|---|---|---|---|
| **Strength** | A hauberk-wearer's shoulders. | Melee damage, shove, how long the kite shield stays up. | Forced doors, carrying the wounded, the millstone. |
| **Dexterity** | Hands on a sword-grip and a mule's reins. | Attack speed, block timing window, placing a thrust. | Catching a falling cask, a child's wrist, not walking into a scythe. |
| **Constitution** | What the East did not take. | Maximum health, stagger resist, how slowly **Heat** becomes gangrene. | Forced marches, standing the infirmary smell, ergot fits. |
| **Intelligence** | Letters, not wizardry. | None directly. Identifies enemy tells a half-second earlier if a lore check has already been made. | Latin, registers, graffiti, telling wheat from rye in a bakehouse, reading Isarn's books. |
| **Wisdom** | Discernment and practical judgment. | Resistance to vision-stun; discerning deceptive apparitions and rites, supported by Faith. | Insight into Fulk, Agnes, Lambert's ledger; knowing when a psalm is wrong. |
| **Charisma** | Household presence, not court beauty. | Companion staying power; shout range. | Almodis, Isarn, Lambert, Raimbaut, holding a chapter while a mitre comes off. |

**Suggested start** (a competent mid-rank knight, not a hero of romances):

| STR | DEX | CON | INT | WIS | CHA |
|---|---|---|---|---|---|
| 14 | 12 | 13 | 10 | 11 | 10 |

Modifiers in the usual D&D shape (+2 Str, +1 Dex, +1 Con). He is already past the age of sudden athletic blooming. A +1 to an attribute is a story event: the infirmary teaches Constitution, the scriptorium Intelligence, helping Fulk resist the binding Wisdom or Charisma.

---

## Progression tracks

The previous four-axis proposal is superseded where it made Penance the victory gate and Zeal a source of power for Abaddon. Replacement tracks, thresholds, and starting values remain undecided. No implementation should preserve those old rules.

### Arms

Martial craft. New attacks, tighter timing, a little more health if the design keeps that option, and better use of shield and mail. Raised by fighting well, drilling, surviving named enemies, and learning from experienced soldiers.

Arms and faith can support one another. A blessed weapon or attack can be effective against evil. The final encounter does not require Guarin to abandon blessing or faith.

### Faith

Prayer, trust in Christ, and spiritual discernment expressed through available abilities and story choices. It is not blind certainty that every relic claim or remedy is genuine. Recognizing deception need not diminish faith.

Faith can support resistance to fear and despair, protection, prayer against hostile presences, and the courage to continue. Its growth should connect to the answered prayer and goodness encountered. A low starting value, if retained, represents Guarin's spiritual crisis; it does not make Christ refuse him or turn his prayer into a mistake.

Genuine worship and counsel can sustain him. False rites remain a danger because of the hostile presence and contaminated material behind them, not because sincere belief amplifies their power.

### Will and conviction

These are the strengths Guarin asks for. The campaign restores his capacity to keep fighting and his hope that the fight matters. Show this through perseverance, people helped, kindness received, allies choosing courage, and the final victory.

Whether will and conviction need a separate track, an encounter resource, or only narrative expression remains open. No starting numbers or unlock thresholds are fixed here. Mercy, repentance, and protection remain meaningful deeds without becoming payment for God's help or prerequisites for an unblessed final hit.

### Sight

A derived perception condition, if kept:

`Sight = f(Wisdom, Faith, Heat)`

Discernment and prayer can reveal a hostile disguise. Heat can produce intrusive or misleading visions. Investigative evidence helps the player distinguish the two. Unworthy communion and unconfessed atrocities are removed as Sight triggers. Faith does not inherently make Guarin less able to recognize a counterfeit.

---

## Resources

### Health

A single integer pool, as the combat domain already models. Constitution sets the base. Arms adds a little. There is no twenty-level hit-point balloon. A veteran’s body is already near its ceiling; late-game survival comes from armor, block, Heat management, protective prayer, and resisting the enemy's attacks.

Wounds can be **ordinary** or **burning**. Burning damage is holy fire: it leaves a Heat remainder after the hit. Physic and clean wine clear ordinary wounds better than burning ones. Prayer and genuine sacramental life can sustain recovery. Counterfeit remedies may promise relief while continuing to poison him.

### Armor (soak, not D&D Armor Class)

This is an action game. Attacks connect. Armor reduces and deflects; it does not make swings miss as if the man were a cloud.

| Layer | What it is in 1101 | What it does |
|---|---|---|
| **Padding** | Gambeson / aketon under the mail. | Flat soak, especially against crush and stagger. The real shock absorber. |
| **Mail** | Hauberk, maybe coif and mufflers. | Strong against cut and thrust-glancing; weaker against maces, hammers, and the locusts’ iron. A deflect roll or percent, not immunity. |
| **Helm** | Nasal helm. | Critical protection to the head. Does not cover the face. Vision-stun resist. |
| **Shield** | Kite shield, left arm. | Active block. Holds a cone. Costs Strength-stamina. Can bash. |

No plate. See Equipment.

### Heat

The fire in the body. Contaminated provisions, burning wounds, and exposure to the supernatural blight.

- Builds from burning wounds, contaminated food or drink, the ticking counterfeit, and hostile attacks. Genuine blessings and righteous combat do not add Heat by their nature.
- High Heat: Sight opens; attacks may ignite; visions interrupt; limbs threaten to charcoal (a stacking “member” risk, telegraphed, not a cheap instant death).
- Reduced through appropriate care, safe provisions, recovery in a safe house, and prayer or sacramental support as the design settles. Stopping a harmful cask prevents further dosing. Confession of an invented past atrocity is not a treatment gate.
- At the top of the bar he is in a fit: powerful and not steering. Agnes lives here. Fulk lives here.

Heat is the ergot made mechanical. It is not mana.

### Prayer use

Cooldowns, concentration, or a small encounter resource may pace active prayer abilities. The choice remains open. It must not imply that grace is bought through scored deeds, that God abandons him when a meter empties, or that praying inherently adds the blight's Heat.

---

## Skills

Used in hubs, rites, and investigation. Combat abilities are a separate list. Checks are attribute + skill + settled progression modifiers, against a hidden difficulty. Fail forward: a failed Letters check still opens the book; Isarn notices you mouthed the Latin.

Draft list, kept short:

| Skill | Attribute | What it is |
|---|---|---|
| **Vigil** | Wisdom / Dexterity | Noticing a tau that was not carpentered, a wolf that stands too long, graffiti. |
| **Letters** | Intelligence | Latin, registers, the illuminator’s margins, Lambert’s ledger. |
| **Scripture** | Intelligence / Wisdom / Faith | Naming what Agnes recites; choosing the right psalm; knowing Revelation 9 when you see it. |
| **Physic** | Intelligence / Wisdom | Wounds, lard, wine, whether a limb is still the man’s. |
| **Authority** | Charisma | Household, chapter, Raimbaut’s courtesy, getting a gate open. |
| **Insight** | Wisdom | Fulk’s two voices, Lambert’s fear, which patient is helping Durand. |
| **Market** | Intelligence / Charisma | The splinter was bought. Brokers, authenticity, what a relic costs. |
| **Endure** | Constitution | Fits, smells, forced marches, holding a block, holding a rite. |

No stealth class. No arcane spellcraft. A knight can walk softly; he is not a thief.

Item memories or rare voices may add context and modify checks if retained. Their source and presentation remain open. Uncertain provenance should support investigation without making genuine devotion a hidden source of corruption.

---

## Combat abilities

A small bar, unlocked through martial and spiritual progression as the design settles.

### Arms

- **Cut** — default. The arming sword's work.
- **Thrust** — tighter, better against mail, costs cleaner timing.
- **Guard** — hold the kite. Timed block, then riposte.
- **Bash** — shield as a weapon. Stagger.
- **Throw** — the dagger. Short resource.

Later Arms can retain a short charge, a bind-and-pommel, and adaptation to an injured hand.

### Faith and protection

- **Sign of the Cross** — brief ward against a hostile presence. It does not punish Guarin for praying near a counterfeit.
- **Psalm** — a short channel that can steady allies, resist fear, or oppose the blight. Exact effects remain draft. A mistaken quotation is not automatically food for the enemy.
- **Spare** — a nonlethal option where a human can be safely stopped or protected. Outcomes depend on the person and situation, not a universal requirement to avoid righteous force.
- **Aid during prayer** — protect a vulnerable person while a priest prays or hears confession, including the Fulk encounter. Guarin does not give priestly absolution.

Sacramental reception belongs to worship and support in the appropriate scene. Do not make a reserved host an instant consumable with an unworthy-reception damage mode.

Blessed attacks and invocations of Christ can contribute to defeating Abaddon. The old unconsecrated-blow finisher and rules that made holy attacks invalid at the last hit are removed. New attack names, resource costs, and unlock thresholds remain to be designed.

War memories can test perseverance and conviction. They contain no cannibalism mechanic or compulsory personal-atrocity confession.

---

## Equipment

### What a knight of 1101 actually wears

**Plate does not exist yet** as a harness. Full plate is a fifteenth-century thing. Even coat-of-plates is a century and a half away. Guarin’s world is the world of the Bayeux tapestry and the First Crusade:

- **Gambeson** — thick quilted linen. Worn under mail. This is most of the blunt protection.
- **Hauberk** — knee-length mail shirt, split for the saddle, sleeves to the wrist or to mail mittens (*mufflers*) made in one with the sleeve. A coif (mail hood) if he owns one.
- **Nasal helm** — iron cone, nasal bar. The face is open. The great helm is later.
- **Kite shield** — long teardrop, leather over wood, maybe a painted device. Heater shields are thirteenth century.
- **Arming sword** — one-handed, worn at the left hip, used *with* the shield. Not a longsword.
- **Dagger** / *cultellus*.
- **Cloak** — wool, brooch. A full heraldic surcoat is only just beginning to appear; do not put him in late crusader white-and-cross unless you are making a point.
- **Boots** — leather, riding.
- **Gloves** — leather; the real hand armor is the muffler if the hauberk has it. No plate gauntlets.
- **Belt, purse, pilgrim’s ampulla, the rag at the breast.**

Chausses (mail legs) are possible for a man who came home with loot. They are a find, not a start. A spear or lance is a battlefield weapon; on foot in gorges he is a sword-and-shield man. The *memory* of the lance can inform an Arms ability, not a starting polearm he walks through Saint-Laurent with.

### Slots

| Slot | Starting piece | Notes |
|---|---|---|
| Head | Nasal helm, dinted at Dorylaeum | Face open on purpose. Visions hit the eyes. |
| Body, padding | Travel-stained gambeson | Soak. Can be replaced with Antonine-quilted linen, for better or worse. |
| Body, mail | Hauberk | The knight’s wealth. Repairable. Does little against crush and against Heat. |
| Hands | Leather gloves | Upgrade: mufflers, or Durand’s linen wraps (physic, no deflect). |
| Feet | Riding boots | Upgrade: mail chausses + better boots, late. |
| Cloak | Wool cloak of the Royans | Eastern cloak as a find: dust, prestige, Market, Heat. |
| Off-hand | Kite shield, household paint worn off | Can be swapped for a second relic only at great foolishness. |
| Weapon | Arming sword | It may be named or blessed later. A genuine blessing supports righteous use. |
| Sidearm | Dagger | Throw and practical use. |
| Relic | **The splinter**, in a rag, against the sternum | See below. |
| Burden | Empty | Where the Antioch iron would sit. A second relic slot that *weighs*. |

Jewelry is scarce. A ring from Almodis if he takes it. No inventory of twenty magic rings.

### Item rules

- Items have **weight**, **repair**, and **period materials** (linen, leather, iron, wool, bone, relic-dust).
- Mail is excellent against the parish’s flails and against rye-men’s cuts. Maces, millstones, and locust iron ignore much of it. That is the historical truth and the encounter grammar.
- Gear made by the brothers can support care and protection. Any contaminated item requires a specific cause; its Christian association is not itself a penalty.
- A genuine blessing can help resist evil. Its benefits must not secretly reverse because Guarin prayed, fought righteously, or approached the counterfeit. A false claim about an item is investigated separately.
- No random rare-green explosion. Named finds from named rooms.

---

## Relics and exceptional items

Relics can carry devotional meaning, uncertain provenance, and investigative interest. The Cross is not a concealed key for evil. Item claims and the genuine good of faith remain distinct.

### The splinter

A rag-wrapped sliver of wood, bought in Jerusalem on a claim that it came from the True Cross. Worn inside the shirt, over the sternum. Guarin's devotion is sincere even while its provenance remains uncertain.

**As equipment.** Occupies Relic. Its exact effects remain draft. It may support prayer, recall a meaningful memory, or prompt investigation of a claim. It neither adds Heat because of his faith nor secretly counts as a key for Abaddon. No final encounter requires him to destroy it or reject the Cross.

**As a voice or memory.** Presentation remains open. If it speaks, the writing must make the source meaningful rather than automatically equating devotion with a dangerous hallucination.

### The Antioch iron

The claimed Holy Lance can remain part of Guarin's war memories. A westward journey and later appearance as a usable item are optional fiction; no such item is required to finish the campaign.

If retained, investigate its claim and particular history. Decide its effects separately. It cannot establish a universal rule that holy weapons strengthen Abaddon, nor can destroying it become a mandatory repudiation of faith.

### Fulk's counterfeit

The Eastern box is the dangerous object established by the plot. Its deception and the contamination it carries supply a concrete cause for its effects. Evidence and prayer expose it. Breaking its foothold belongs to the final approach; genuine holy things remain distinct from it.

---

## Starting kit (the rest)

What he actually has on the mule, late summer 1101:

- Travel-stained bliaut over the gambeson
- Hauberk, packed for the road, put on before the last league when he sees the rye
- Nasal helm, dinted
- Kite shield, device worn to a ghost
- Arming sword, kept oiled
- Dagger
- Cloak of the Royans
- Riding boots, leather gloves
- Belt, empty purse, a pilgrim’s empty ampulla
- The rag and the splinter
- A borrowed mule (not a warhorse; those died or were sold coming west)

No lance in the hand. No plate. No blessed sword yet. No Antioch iron.

---

## How progression feels

There is no ding. A named encounter, lesson, prayer, or act of protection can bring a new ability or a clearer sense of purpose. Numerical rewards remain draft.

| Campaign beat | Progression or visible consequence |
|---|---|
| Prayer in the rain at the stone cross | Establishes the plea for will and hope; no complete instant resolution is required |
| Protects someone in Rivoire | A person lives because he acted; the hub can show that outcome |
| Stops Durand's harmful cask | Patients cease receiving the dose; safe care resumes |
| Protects Raimbaut's postulants | Preserves people who may offer help later |
| Helps Fulk resist the binding | A terrified man can turn toward Christ; a priest provides absolution |
| Receives courage or kindness from others | Goodness becomes visible and sustains conviction |
| Defeats Abaddon through faith and perseverance | A real victory; the saved people and rebuilding make its meaning visible |

The answer to the prayer is the restoration of will, hope, and the knowledge that the fight matters. A reward screen alone cannot express it.

---

## What this gives the story

- **The prayer** establishes Guarin's spiritual crisis and the strengths he seeks.
- **Faith** sustains the fight, protection, and discernment; it does not empower the enemy.
- **The investigation** exposes contaminated provisions and the counterfeit through evidence and prayer.
- **Fulk's encounter** joins protection and spiritual aid, with absolution belonging to a priest.
- **Act V** tests the strength to persevere and confront evil. Prayer and blessings can help him win.
- **The epilogue** shows lives preserved, goodness in other people, and a future worth living for.

---

## Open questions

- How are restored will and conviction expressed in play: narrative, a track, or an encounter resource?
- What pacing mechanism suits active prayer abilities?
- Is Arms allowed to add health, or does survival grow through skill, equipment, and support?
- Does the mule exist as a carry-capacity / hub object, or is it flavor on the last league?
- How, if at all, do item voices appear?
- What numerical starting values and unlock conditions fit this spiritual crisis without measuring divine favor?
- One save-file, progression persistent; no respec. Confirm.

These decisions remain open. The narrative requirements above are settled; replacement progression values are not yet an implementation contract.
