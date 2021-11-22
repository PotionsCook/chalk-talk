import { pipe, assert } from "./utils.js";

("use strict");

/*
// First let's better undersand iterator
// an Iterator is a particular object
// with a next method that "consumes"
// the original iterable
const iterator = word[Symbol.iterator]();
console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
*/

// The first easiest formula
export const f_true = iterable => true;

// A formula created from an ap
export const f_ap = ap => iterable => {
  const value = iterable[Symbol.iterator]().next().value;
  return ap(value);
};

// A formula created by negating another formula
export const not = formula => iterable => !formula(iterable);

// 2-ary operations on formulas
export const and = formula1 => formula2 => iterable =>
  formula1(iterable) && formula2(iterable);

// The next operator of a formula
// require the higher-order function slice
// on any iterable
/*
export const next = formula => iterable => {
  formula(iterable.slice(1));
};
*/

export const chain = operation => (...formulas) =>
  formulas.reduce((f, g) => operation(f)(g), f_TRUE);

export const sum = chain(and);
