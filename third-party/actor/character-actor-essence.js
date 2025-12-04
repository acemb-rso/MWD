
export class CharacterActorEssence {
  static getMalus(actor, essence) {
    const max = 6;
    const malus = Math.min(0, -Math.floor((1 + max - essence) / 2));
    return malus
  }
}
