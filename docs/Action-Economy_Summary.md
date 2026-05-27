
# 🎯 Action Economy Summary (Personal Scale)

## 🧱 Action Categories (System Meaning)

### **Standard Actions (SA)**

> **Deliberate effort under time pressure**

* Represent meaningful, intentional activity during an activation
* Form the core of what a character *does*
* Governed by:

  * baseline allowance (e.g., 3 per activation)
  * Burn when exceeded
* Used for positioning, setup, interaction, and information gathering

---

### **Complex Actions (CA)**

> **High-commitment actions that dominate an activation**

* Mechanically: **cost 2 SA (not a separate type)**
* Represent actions requiring sustained focus or effort
* Typically:

  * produce direct system impact (damage or recovery)
  * anchor the activation’s primary outcome

---

### **Free Actions (FA)**

> **Minor, low-friction activity**

* Represent quick adjustments, toggles, or communication
* Do **not**:

  * require rolls
  * resolve against targets
  * directly change tracks or CQ
* Used for setup, coordination, and state preparation

---

### **Reactions (RA)**

> **Interrupts and responses outside your activation**

* Triggered by external events
* Represent responsiveness and situational awareness
* Governed by:

  * first reaction free
  * additional reactions generate Burn
* Used to modify outcomes, assist allies, or respond to threats

---

# 🧩 Action List

## 🟢 Standard Actions (Cost: 1 SA)

### **Aim**

* Prepare an attack or targeting solution
* Enables bonuses, targeting states, or CQ modifiers on future actions

---

### **Move**

* Reposition within the environment
* Establishes range, positioning, and engagement state

---

### **Interact**

* Meaningful manipulation of objects or environment
* Examples:

  * reload
  * operate machinery
  * use equipment that requires effort or precision

---

### **Assess** *(or Observe)*

* Gather information or evaluate the situation
* Examples:

  * perception checks
  * threat analysis
  * identifying targets or conditions

---

## 🔵 Complex Actions (Cost: 2 SA)

### **Attack**

* Execute an offensive action via the resolver
* Produces:

  * CQ calculation
  * hit/graze/miss outcome
  * damage preview and queued mutations

---

### **First Aid**

* Costs 2 SA as a Complex Action.
* Launches a MedTech simple roll against a condition DN:

  * DN 1: Excellent Conditions
  * DN 2: Normal Conditions
  * DN 3: Poor Conditions

* Applies roll-time pool adjustments:

  * -2 dice when the acting character treats themself
  * medical gear adds its rating to the dice pool

* Produces:

  * a chat card with an Apply First Aid action
  * Fatigue recovery: each net hit recovers 1 point
  * Physical recovery: every 2 net hits after the first recovers 1 point
  * track adjustment through the shared HarmEngine `trackDelta` path

* Recovery is applied from the chat card so post-roll Edge can be used before the target monitor changes.
* Once First Aid recovery is applied, post-roll Edge is disabled for that roll card.

---

## 🟡 Free Actions (Cost: 0)

### **Ready Item**

* Draw, stow, or ready equipment

---

### **Prepare**

* Declare a conditional future action
* Creates a stored trigger that resolves later as **Interrupt (RA)**
* Limited (typically 1 active Prepare at a time)

---

### **Drop**

* Release or discard an item

---

### **Communicate**

* Speak, signal, or issue commands
* No mechanical impact by default

---

### **Adjust**

* Minor physical manipulation without changing system state
* Examples:

  * reposition object
  * steady or brace equipment

---

### **Activate Item**

* Toggle or initialize an item/system
* Changes state but does **not** resolve an effect
* Examples:

  * power on system
  * switch modes
  * enable equipment

---

## 🔴 Reactions (Triggered)

### **React (Generic)**

* System or trait-driven response hook
* Catch-all for triggered behavior

---

### **Evade**

* Mitigate incoming harm from area effects, hazards, or non-targeted sources (no roll)
* Does not apply to direct attacks resolved via CQ unless explicitly modified
* Examples:
  * reduce incoming damage
  * downgrade severity of effect
  * avoid secondary effects (e.g., splash, spread, or lingering harm)

---

### **Opportunity**

* Triggered by enemy vulnerability or movement
* Allows reactive offensive action

---

### **Assist**

* Support an ally’s action or outcome
* Applies modifiers or benefits at defined resolution stages

---

### **Interrupt** *(from Prepare)*

* Execute a pre-declared conditional action
* Triggered when Prepare condition is met
* Must match declared scope

---

# 🔥 Burn Integration (System Role)

* **SA**

  * First 3 per activation → free
  * Additional → generate Burn

* **CA**

  * Count as 2 SA toward Burn thresholds

* **RA**

  * First → free
  * Additional → generate Burn

* **FA**

  * Always free
  * Limited by scope and constraints (not cost)

---

# 🧠 System Intent

This structure ensures:

* **Consistency**
  All gameplay routes through a small set of action hooks

* **Extensibility**
  Traits, gear, and payloads modify actions instead of replacing them

* **Clarity**
  Players understand what type of effort something requires

* **Control**
  Burn and action limits regulate pacing and prevent abuse

---

# ✅ One-line Summary

A small set of **Standard, Complex, Free, and Reaction actions** defines all player intent—where **SA drives effort, CA delivers impact, FA handles setup, and RA governs responsiveness**, all regulated by Burn and activation limits.
