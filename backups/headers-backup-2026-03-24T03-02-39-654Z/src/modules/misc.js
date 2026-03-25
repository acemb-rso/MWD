export class Misc {

  static isString = value => (typeof value === 'string' || value instanceof String)

  static ascending(orderFunction = x => x) {
    return (a, b) => Misc.sortingBy(orderFunction(a), orderFunction(b));
  }

  static descending(orderFunction = x => x) {
    return (a, b) => Misc.sortingBy(orderFunction(b), orderFunction(a));
  }

  static sortingBy(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }

  static bySortedArray(sortedArray) {
    return it => sortedArray.indexOf(it);
  }

  static ascendingBySortedArray(sortedArray) {
    return Misc.ascending(Misc.bySortedArray(sortedArray));
  }

  static sortedMap(map, compareFunction = (a, b) => 0) {
    return Object.keys(map)
      .sort(compareFunction)
      .reduce((obj, key) => {
        obj[key] = map[key];
        return obj;
      },
        {});

  }

  static reindexIds(list) {
    let index = 1;
    list.forEach(it => it.id = (index++));
    return list;
  }

  static distinct(array) {
    return [...new Set(array)];
  }

  static sum() {
    return (a, b) => a + b;
  }

  static sumValues(list, value = t => t) {
    return list.map(value).filter(v => v != undefined).reduce(Misc.sum(), 0);
  }

  static divint(value, divisor) {
    return Math.floor(value / divisor);
  }

  static divup(value, divisor) {
    return Math.ceil(value / divisor);
  }

  static join(params, separator = '') {
    return params.reduce(Misc.joiner(separator));
  }

  static joiner(separator = '') {
    return (a, b) => a + separator + b;
  }

  static classify(items, classifier = it => it.type) {
    let itemsBy = {};
    Misc.classifyInto(itemsBy, items, classifier);
    return itemsBy;
  }

  static classifyFirst(items, classifier) {
    let itemsBy = {};
    for (const item of items) {
      const classification = classifier(item);
      if (!itemsBy[classification]) {
        itemsBy[classification] = item;
      }
    }
    return itemsBy;
  }

  static classifyInto(itemsBy, items, classifier = it => it.type) {
    for (const item of items) {
      const classification = classifier(item);
      let list = itemsBy[classification];
      if (!list) {
        list = [];
        itemsBy[classification] = list;
      }
      list.push(item);
    }
  }

  static showControlWhen(control, condition) {
    if (condition) {
      control.show();
    }
    else {
      control.hide();
    }
  }
  static minmax(value, min, max) {
    return Math.max(min, Math.min(value, max))
  }
}