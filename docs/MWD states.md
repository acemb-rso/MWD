# CONTROL / STABILITY
|Status|Mechanical Impact|Remediation|SA Cost|DN|Note|
|-|-|-|-|-|-|
Unstable|-2 dice Piloting; Move == Piloting test or Prone|pilotRecovery|1 SA|2|
Staggered|Lose 1 SA at start of activation|.|.|.|
Prone|Cannot move except Crawl; -3 dice making Close attacks; -5 DR vs Close attacks|stand|1 SA|1|Mech Only
Skidding|Forced movement; collision == Prone|pilotRecovery|1 SA|2|
Stalled|-1 Handling; -1 System; no Sprint/Jump|systemReset|1 SA|2|
# WEAPONS / OFFENSE
Status|Mechanical Impact|Remediation|SA Cost|DN|
|-|-|-|-|-|
Weapon Failure (Group)|Weapon group unusable|emergencyRepair|2 SA|2|
Jammed (Ballistic)|Cannot fire weapon/group|feedReset|1 SA|1|
Suppressed|-2 AR; cannot generate targetingData|reposition|1 SA |.|
# SENSORS / EW
Status|Mechanical Impact|Remediation|SA Cost|DN|
|-|-|-|-|-|
Sensor Degraded|-2 dice to Acquire Target|reboot|1 SA|2|
Sensor Blind|Cannot target beyond Close; no targetingData|reboot|2 SA|3|
ECM Jamming|+2 trackingPenalty; targetingData -2; Target detectionState capped at 'Track'|epmFilter|2 SA|2|
Tracking Lost|targetingData unusable|acquireTarget|1 SA|2|
Sensor Locked (defender)|attacker gains targeting bonuses|breakLock |Reaction|2|
EPM Boosted|-2 dice to ECM Spike|toggle|2 SA||Free Action Sustained
# HEAT / POWER
Status|Mechanical Impact|Remediation|SA Cost|DN|
|-|-|-|-|-|
Thermal Surge|+2 Heat at start of turn|coolantDump|1 SA|1|
Reactor Instability|+1 Heat (energy weapons); -1 dmg"|powerReroute|1 SA|2|
Cooling Failure|-2 heat dissipation|emergencyRepair|2 SA|2|
Shutdown|Cannot act; must restart|powerCycle|2 SA|2|
# MOBILITY / STRUCTURE
Status|Mechanical Impact|Remediation|SA Cost|DN|
|-|-|-|-|-|
Limping|-30 m movement; +1 Piloting DN|stabalize|1 SA|2|
Jump Jet Failure|Cannot Jump|emergencyRepair|2 SA|2|
Actuator Failure|-1 Handling|major repair|.|.|
Gyro Damage|+1 Piloting DN|major repair|.|.|
Arm Destroyed|Lose weapon groups|major repair|.|.|
Leg Destroyed|Forced Prone; Movement = 0|major repair|.|.|
# POSITIONAL / STANCES
Status|Mechanical Impact|Remediation|SA Cost|DN|
|-|-|-|-|-|
Evasive|+2 DR; -2 AR|toggle|FA|.|self-induced
Braced|+1 AR; no recoil; no Movement|toggle|1 SA|.|self-induced
Target Focused|"+1 die| +2 AR vs one target; -2 DR "|toggle|FA|.|self-induced
# ENVIRONMENTAL
Status|Mechanical Impact|Remediation|SA Cost|DN|
|-|-|-|-|-|
Obscured (Light)|+1 trackingPenalty|reposition|1 SA|.|
Obscured (Heavy)|+3 trackingPenalty|reposition|1 SA|.|
Entrenched / Hull Down|+5 DR|toggle|1 SA|.|self-induced
Exposed|-2 DR|reposition|1 SA|.|
# FIRE / CATASTROPHIC
Status|Mechanical Impact|Remediation|SA Cost|DN|
|-|-|-|-|-|
On Fire|+1 Heat/turn; explosion risk|Extinquish|2 SA|2|
Reactor Breach|*see below* |jettisonCore|2 SA|3|

## Reactor Breach Mechanic
At the end of round roll **2d6**
Roll|Result|Effect
|-|-|-|
11 or 12|Stable Termination|**Shutdown**
7 to 10|Containment Holding|**No Effect**
2 to 6|Catastrophic Failure|**Explosion** 60m radius blast dealing 10 damage and OnFire status; Machine is completely destroyed, occupants *dead*.


