("use strict");

// LTL library offer functions
// to ease the composition of LTL formulas
// like
// formula1 = until(atomicProperty)
// fomula1(iterable) returns true or false

// where atomicProperty is a predicate
// taking the value of the iterator as an argument
// and returning a boolean

// The first easiest formula
export const f_true = iterable => {
  return true;
};

// A formula created from an ap
export const f_ap = ap => iterable => {
  const value = [...iterable][0];
  return ap(value);
};

// A formula created by negating another formula
export const not = formula => iterable => {
  return !formula(iterable);
};

// The next operator of a formula
export const next = formula => iterable => {
  const iter = [...iterable];
  if (iter.length === 0) return false;
  return formula(iter.slice(1));
};

// 2-ary operations on formulas
export const and = formula1 => formula2 => iterable =>
  formula1(iterable) && formula2(iterable);

export const until = formula1 => formula2 => iterable => {
  // TO DO IMPROVE
  const iter = [...iterable];
  let n = 0;
  while (n < iter.length) {
    if (formula2(iter.slice(n))) {
      let k = 0;
      while (k < n) {
        if (!formula1(iter.slice(k))) return false;
        k = k + 1;
      }
      return true;
    }
    n = n + 1;
  }
  return false;
};

// composite "point-free"
// of the same operator
export const chain = operation => (...formulas) =>
  formulas.reduce((f, g) => operation(f)(g), f_true);

export const sum = chain(and);
export const eventually = formula => until(f_true)(formula);
export const always = formula => not(eventually(not(formula)));
export const never = formula => not(eventually(formula));
export const or = formula1 => formula2 =>
  not(and(not(formula1))(not(formula2)));
export const implies = formula1 => formula2 => or(not(formula1))(formula2);

export const after = formula1 => formula2 =>
  // This "after" is not conventionnal at all
  // Needs to be understood well before use
  // Can be modified if it's not the after
  // you are looking for
  eventually(and(formula1)(eventually(formula2)));

export const sequence = (...formulas) => {
  // A sequence u, n, o, 1
  // means sum(after(u)(n), after(n,o), after(o,1))
  return sum(
    ...formulas
      .reduce(
        (acc, v) => {
          return [...acc, [acc[acc.length - 1][1], v]];
        },
        [0]
      )
      .slice(2) // turns [f,g,h] into [[f,g],[g,h]]
      .map(pair => after(pair[0])(pair[1])) // turns [[f,g],[g,h]] in [after(f)(g), after(g)(h)]
  );
};
