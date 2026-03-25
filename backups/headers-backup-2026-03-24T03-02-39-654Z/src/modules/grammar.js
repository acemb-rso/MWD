
export class Grammar {
  static toLowerCaseNoAccent(words) {
    return words?.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(words) {
    return words?.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}