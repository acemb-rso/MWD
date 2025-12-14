// src/modules/gm/gm-anarchy.js
export class GMAnarchyManager {
  constructor() {
    // You can wire this to a setting if you want persistence
    this.value = 0;
    this.max = 10;   // tweak for your game
  }

  getAnarchy() {
    return {
      isGM: true,
      value: this.value,
      max: this.max
    };
  }

  async setAnarchy(newValue) {
    const clamped = Math.clamped(newValue, 0, this.max);
    if (clamped === this.value) return;

    this.value = clamped;

    // Optional: if you want UI to update when GM pool changes
    if (ui.checkbars?.render) {
      ui.checkbars.render(true);
    }
  }

  async npcConsumesAnarchy(actor, count) {
    if (!count || count <= 0) return;
    await this.setAnarchy(this.value - count);
  }

  async awardToGM(count) {
    if (!count || count <= 0) return;
    await this.setAnarchy(this.value + count);
  }
}
