// src/modules/grammar.js
// Purpose: Provides module-level utilities or helpers.
// How it fits: Describes role within src/modules or template rendering pipeline.



export class Grammar {
  static toLowerCaseNoAccent(words) {
    return words?.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(words) {
    return words?.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}