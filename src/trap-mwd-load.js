// put this at the very top of trap-mwd-load.js (before MutationObserver)
(() => {
  const TARGET = "mwd-roll-dialog";

  // Trap element.className = "..."
  const desc = Object.getOwnPropertyDescriptor(Element.prototype, "className");
  if (desc?.set && desc?.get) {
    Object.defineProperty(Element.prototype, "className", {
      configurable: true,
      get() { return desc.get.call(this); },
      set(v) {
        if (typeof v === "string" && v.includes(TARGET)) {
          console.warn("TRAP: className set includes target", {
            el: this,
            value: v,
            stack: new Error().stack
          });
          debugger;
        }
        return desc.set.call(this, v);
      }
    });
  }

  // Trap el.setAttribute("class", "...")
  const origSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value) {
    if (name === "class" && typeof value === "string" && value.includes(TARGET)) {
      console.warn('TRAP: setAttribute("class") includes target', {
        el: this,
        value,
        stack: new Error().stack
      });
      debugger;
    }
    return origSetAttribute.call(this, name, value);
  };

  console.log("Installed class assignment traps for:", TARGET);
})();
