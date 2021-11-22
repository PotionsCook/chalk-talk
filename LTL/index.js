import { f_true, f_ap, not, and } from "./ltl.js";
import { assert } from "./utils.js";

// LTL library offer functions
// to ease the composition of LTL formulas

// like
// formula1 = until(atomicProperty)
// fomula1(iterable) returns true or false

// where atomic property is a predicate
// taking a value of the iterator as an argument
// and returning a boolean

const str = "test";
const word = [...str];

// In our case the iterable
// is a string transformed into an array
// like ['t','e','s','t']
// the following simple atomic property factory
// takes a letter and returns a predicate
// comparing
//   the value provided by the iterator
//   and the letter

const createAtomicProperty = letter => value => letter === value;

/*
// Here we take every letter of the word
// and create an atomicProperty outt of it
const createAtomicProperties = iterable => {
  return [...new Set(iterable)].map(createAtomicProperty);
};
*/

// create a set of atomic properties from a value
// In our case the atomic properties of one letter
// is simply a set of one letter
// const createAtomicProperties = value => new Set(value)

// We want to create a new iterator where
// the value is the set of atomic propertties
// and

assert({
  given: "true formula",
  should: "return true for any iterable",
  actual: f_true([]),
  expected: true
});

assert({
  given: "atomic property formula",
  should: "return true if the atomic property is satisfied by the first letter",
  actual: f_ap(value => "t" === value)([..."test"]),
  expected: true
});

assert({
  given: "negation of the true formula",
  should: "return false for any iterable",
  actual: not(f_true)([]),
  expected: false
});

assert({
  given: "negation of the negation of the true formula",
  should: "return ttrue for any iterable",
  actual: not(not(f_true))([]),
  expected: true
});

assert({
  given: "true and true",
  should: "return true for any iterable",
  actual: and(f_true)(f_true)([]),
  expected: true
});

assert({
  given: "true and not true formula",
  should: "return false for any iterable",
  actual: and(f_true)(not(f_true))([]),
  expected: false
});
