export class Tokens {
  static getToken(tokenId) {
    if (tokenId == undefined) {
      return undefined
    }
    let token = game.scenes.current?.tokens.get(tokenId);
    if (token) {
      return token;
    }
    for (let scene of game.scenes) {
      token = scene.tokens.find(token => token.id == tokenId);
      if (token) {
        return token;
      }
    }
    console.warn('No token found in any scene with id', tokenId);
    return undefined;
  }
}