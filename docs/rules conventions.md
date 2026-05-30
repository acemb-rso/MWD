## Personal Damage Calculation
[DamageApplied] = max(0, [DamageIncoming] - [NetResistance])
[DamageIncoming] = [WeaponDamageEff]    // flat — NetHits no longer adds damage
[NetResistance] = [BaseArmorResistance] + [DamageTypeMitigation] - [WeaponAP]

> Personal (and synthetic / unarmed) damage is now **flat**, matching machines.
> NetHits no longer adds to [DamageIncoming]; instead it drives the Personal
> Critical Hit system. See `personal-critical-hit.md`.

[Margin] = [AttackRollHits] - [DN]
[CombatQuality] = [AttackRating] - [DefenseRating]

** Outcome

[CombatQuality] > 0 AND [Margin] = 0 => [Graze]
[CombatQuality] > 0 AND [Margin] >= 1 => [Hit]
[CombatQuality] = 0 AND [Margin] >= 1 => [Hit]
[CombatQuality] < 0 AND [Margin] = 1 => [Graze]
[CombatQuality] < 0 AND [Margin] >= 2 => [Hit]
Else => [Miss]

** NetHits (Hit only) — drives Critical Threat severity, NOT damage

[Hit] => [NetHits] = max(0, [Margin])
[Graze OR Miss] => [NetHits] = 0

On a Hit, NetHits sets the Critical Threat Severity instead of adding damage:
[1–2] => +0, [3–4] => +1, [5–6] => +2, [7+] => +3. Roll [2d6 + Severity]:
[10] Minor, [11] Moderate, [12+] Severe, else No Critical. See
`personal-critical-hit.md`.

** Graze damage

[Graze] => [WeaponDamageEff] = [WeaponDamage] / 2
[Hit] => [WeaponDamageEff] = [WeaponDamage]

## Critical Hits

Personal combat does **not** use a 3d6 hit-location roll — that mechanic
(location + location-agnostic Critical Hit on 3–4, with Chaos-Edge conversions
on 16/17/18) belongs to **machine** combat only; see `critical-hit.md`.

Personal criticals are triggered by **attack margin** and resolved with
**2d6 + Severity** (band), then **1d6** (effect family). See
`personal-critical-hit.md`.

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


