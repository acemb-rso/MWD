## Personal Damage Calculation
[DamageApplied] = max(0, [DamageIncoming] - [NetResistance])
[DamageIncoming] = [WeaponDamageEff] + [NetHits]
[NetResistance] = [BaseArmorResistance] + [DamageTypeMitigation] - [WeaponAP]

[Margin] = [AttackRollHits] - [DN]
[CombatQuality] = [AttackRating] - [DefenseRating]

** Outcome

[CombatQuality] > 0 AND [Margin] = 0 => [Graze]
[CombatQuality] > 0 AND [Margin] >= 1 => [Hit]
[CombatQuality] = 0 AND [Margin] >= 1 => [Hit]
[CombatQuality] < 0 AND [Margin] = 1 => [Graze]
[CombatQuality] < 0 AND [Margin] >= 2 => [Hit]
Else => [Miss]

** NetHits (Hit only)

[Hit] => [NetHits] = max(0, [Margin])
[Graze OR Miss] => [NetHits] = 0

** Graze damage

[Graze] => [WeaponDamageEff] = [WeaponDamage] / 2
[Hit] => [WeaponDamageEff] = [WeaponDamage]

## Hit Location (3d6)
Roll 3d6 (sum):

3–4: Critical Hit (location-agnostic; roll on the Crit Table) 
5–8: Arms
9–12: Torso
13–15: Legs
16: Arms (spend 1 Edge(Chaos) to make it a Critical Hit for the Arms)
17: Legs (spend 1 Edge(Chaos) to make it a Critical Hit for the Legs)
18: Head (spend 1 Edge(Chaos) to convert to Torso + Critical Hit instead of a Head hit)

__Hit Distribution__
Head: 0.46%
Torso: 48.15%
Arms: 26.85%
Legs: 22.69%
Crit: 1.85%

## Condition Penalty
### Physical or Fatigue
**-1 for 1/3 round down**
0-2 -> -0
3-5 -> -1
6-8 -> -2
9-11 -> -3
12-14 -> -4
15-17 = -5
18 = -6

### Con(dition) Checks
**Triggered when Damage Track is full**
Make a Con Check at the end of each turn:
* STR+WILL(DN 1) Condition Modifiers apply.
    Fatigue Failure: [Staggered] -> 1/2 movement, Only Simple Actions
    Physical Failure: [Unconscious]
* Damage tracks overflows into the other track when full
* Make a Con Check immediately when new damage is taken
* Applicable Edges: Grit, Chaos, Insight, Legend
* Full Physical track means character is dying

## Personal Armor Resistance
**+1 for 1/4 round up**
1-4 -> +1
5-8 -> +2
9-12 -> +3
13-16 -> +4
17-20 -> +5

* Many armors will provide additional resistance to specific damage types
* Armor loses 1 point of rating with each use
* Some armors also provide a defense bonus
* Armor with a rating of 0 provides no resistance

## Dying and Surviving

