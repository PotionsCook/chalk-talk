import {
  f_true,
  f_ap,
  not,
  and,
  next,
  until,
  eventually,
  always,
  or,
  after,
  sequence
} from "./ltl.js";
import { assert, pipe } from "./utils.js";

// In our test the iterable
// is a string transformed into an array
// like ['t','e','s','t']
// the following simple atomic property factory
// takes a letter and returns a formula
// comparing
//   the value provided by the iterator
//   and the letter
const ap = letter => f_ap(value => letter === value);

assert({
  given: "true formula",
  should: "return true for any iterable",
  actual: f_true([..."test"]),
  expected: true
});

assert({
  given: "atomic property formula",
  should: "return true if the atomic property is satisfied by the first letter",
  actual: ap("t")([..."test"]),
  expected: true
});

assert({
  given: "negation of the true formula",
  should: "return false for any iterable",
  actual: not(f_true)([..."test"]),
  expected: false
});

assert({
  given: "negation of the true formula",
  should: "return false for any iterable",
  actual: pipe(not)(f_true)([..."test"]),
  expected: false
});

assert({
  given: "negation of the negation of the true formula",
  should: "return ttrue for any iterable",
  actual: pipe(not, not)(f_true)([..."test"]),
  expected: true
});

assert({
  given: "true and true",
  should: "return true for any iterable",
  actual: pipe(and(f_true), f_true)([..."test"]),
  expected: true
});

assert({
  given: "true and not true formula",
  should: "return false for any iterable",
  actual: and(f_true)(not(f_true))([..."test"]),
  expected: false
});

assert({
  given: "true and not true formula",
  should: "return false for any iterable",
  actual: pipe(and(f_true), not(f_true))([..."test"]),
  expected: false
});

assert({
  given: "t and t in test",
  should: "return true",
  actual: and(ap("t"))(ap("t"))([..."test"]),
  expected: true
});

assert({
  given: "next",
  should: "return false for any empty iterable",
  actual: next(f_true)([...""]),
  expected: false
});

assert({
  given: "next of 'test' is e",
  should: "return true",
  actual: next(ap("e"))([..."test"]),
  expected: true
});

assert({
  given: "next of next of 'test' is s",
  should: "return true",
  actual: next(next(ap("s")))([..."test"]),
  expected: true
});

assert({
  given: "t and next e in test",
  should: "return true",
  actual: and(ap("t"))(next(ap("e")))([..."test"]),
  expected: true
});

assert({
  given: "t until e of 'test'",
  should: "return true",
  actual: until(ap("t"))(ap("e"))([..."test"]),
  expected: true
});

assert({
  given: "s until e of 'test'",
  should: "return false",
  actual: until(ap("s"))(ap("e"))([..."test"]),
  expected: false
});

assert({
  given: "next (e until s)",
  should: "return true",
  actual: next(until(ap("e"))(ap("s")))([..."test"]),
  expected: true
});

assert({
  given: "eventually s",
  should: "return true",
  actual: eventually(ap("s"))([..."test"]),
  expected: true
});

assert({
  given: "not eventually s in test",
  should: "return false",
  actual: not(eventually(ap("s")))([..."test"]),
  expected: false
});

assert({
  given: "eventually a in test",
  should: "return false",
  actual: eventually(ap("a"))([..."test"]),
  expected: false
});

assert({
  given: "eventually not(a) in test",
  should: "return true",
  actual: eventually(not(ap("a")))([..."test"]),
  expected: true
});

assert({
  given: "not eventually not(a) in test",
  should: "return false",
  actual: not(eventually(not(ap("a"))))([..."test"]),
  expected: false
});

assert({
  given: "until f_true not(a) in aaaa",
  should: "return false",
  actual: until(f_true)(not(ap("a")))([..."aaaa"]),
  expected: false
});

assert({
  given: "eventually not(a) in aaaa",
  should: "return false",
  actual: eventually(not(ap("a")))([..."aaaa"]),
  expected: false
});

assert({
  given: "not eventually not(a) in aaaa",
  should: "return true",
  actual: not(eventually(not(ap("a"))))([..."aaaa"]),
  expected: true
});

assert({
  given: "not eventually not(a) in test",
  should: "return true",
  actual: not(eventually(not(f_ap(value => "a" === value))))([..."aaaa"]),
  expected: true
});

assert({
  given: "always true",
  should: "return true",
  actual: always(f_true)([..."ssss"]),
  expected: true
});

assert({
  given: "always s in sssss",
  should: "return true",
  actual: always(ap("s"))([..."ssss"]),
  expected: true
});

assert({
  given: "f_true or not(f_true)",
  should: "return true",
  actual: or(f_true)(not(f_true))([..."ssss"]),
  expected: true
});

assert({
  given: "not(f_true) or not(f_true)",
  should: "return false",
  actual: or(not(f_true))(not(f_true))([..."ssss"]),
  expected: false
});

assert({
  given: "eventually(e and next s) in testoune",
  should: "return true",
  actual: eventually(and(ap("e"))(next(ap("s"))))([..."testoune"]),
  expected: true
});

assert({
  given: "eventually(e and eventually u) in testoune",
  should: "return true",
  actual: eventually(and(ap("e"))(eventually(ap("u"))))([..."testoune"]),
  expected: true
});

assert({
  given: "eventually(e and eventually n) in testoune",
  should: "return true",
  actual: eventually(and(ap("e"))(eventually(ap("n"))))([..."testoune"]),
  expected: true
});

assert({
  given: "eventually(e and eventually a) in testoune",
  should: "return false",
  actual: eventually(and(ap("e"))(eventually(ap("a"))))([..."testoune"]),
  expected: false
});

assert({
  given: "eventually(o and eventually s) in testoune",
  should: "return false",
  actual: eventually(and(ap("o"))(eventually(ap("s"))))([..."testoune"]),
  expected: false
});

assert({
  given: "eventually(s and eventually o) in testoune",
  should: "return true",
  actual: eventually(and(ap("s"))(eventually(ap("o"))))([..."testoune"]),
  expected: true
});

assert({
  given: "eventually(after(after (s, u))(e)) in testoune",
  should: "return true",
  actual: eventually(after(after(ap("s"))(ap("u")))(ap("e")))([..."testoune"]),
  expected: true
});

assert({
  given: "after (u, s) in testoune",
  should: "return false",
  actual: eventually(after(ap("u"))(ap("s")))([..."testoune"]),
  expected: false
});

assert({
  given: "sequence (s, u, e) in testoune",
  should: "return true",
  actual: sequence(ap("s"), ap("u"), ap("e"))([..."testoune"]),
  expected: true
});

assert({
  given: "sequence (a, n, o) in testoune",
  should: "return false",
  actual: sequence(ap("a"), ap("n"), ap("o"))([..."testoune"]),
  expected: false
});

// A sequence u, n, o
// means and(after(u)(n))(after(n)(o))

// A sequence u, n, o, 1
// means sum(after(u)(n), after(n,o), after(o,1))
// With a reduce taking

/*
  [1,2,3,4].reduce((acc, v)=>{
  return [...acc, [acc[acc.length-1][1],v]]
  },[0]).slice(2)
  */

assert({
  given: "sequence (u, n, o) in testoune",
  should: "return false",
  actual: sequence(ap("u"), ap("n"), ap("o"))([..."testoune"]),
  expected: false
});

assert({
  given: "sequence (e, t, o, e) in testoune",
  should: "return true",
  actual: sequence(ap("e"), ap("t"), ap("o"), ap("e"))([..."testoune"]),
  expected: true
});

assert({
  given: "sequence (t, o, t, e) in testoune",
  should: "return false",
  actual: sequence(ap("t"), ap("o"), ap("t"), ap("e"))([..."testoune"]),
  expected: false
});
