# [Chalk-Talk] LTL

# What ?

---

LTL provides a library to ease the composition of LTL formulas in javascript.

For instance it enables in a few lines of code to test

- if a word satisfies : has an 'r' eventually followed by an 'e'

  ```jsx
  import { f_ap, after } from "./ltl.js";

  // An atomic proposition factory
  const ap = letter => f_ap(value => letter === value);
  // The predicate has an "e" after an "r"
  const predicate = sequence(ap("r"), ap("e"));
  console.log(predicate([..."superb"])); // returns false
  console.log(predicate([..."superbe"])); // returns true
  ```

- the same way, if a sequence of events satisfies: has an event 'saw_product' eventually followed by a 'purchase'

  ```jsx
  import { f_ap, after } from "./ltl.js";

  // seque
  const sequence_1 = [{ name: "saw_product" }, { name: "purchase" }];
  const sequence_2 = [{ name: "saw_product" }];
  // An atomic proposition factory
  const ap = event_name => f_ap(event => event_name === event.name);
  // The predicate has an event "purchase" after "saw_product"
  const predicate = sequence(ap("saw_product"), ap("purchase"));
  console.log(predicate(sequence_2)); // returns false
  console.log(predicate(sequence_1)); // returns true
  ```

But also way more complex predicates like the one described in Google Analytics Segments.

[Segments - Feature Reference | Analytics Core Reporting API | Google Developers](https://developers.google.com/analytics/devguides/reporting/core/v3/segments-feature-reference)

# Why ?

---

I recently read in full Eric Eliott amazing Medium pages on composing software. I advise all software developers interested in functional programming to do the same.

By the end of your read you'll be confident in saying :

> _“A monad is just a monoid in the category of endofunctors. What’s the problem?”_

[Composing Software: The Book](https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc)

I've also been looking into simple ways to query sequences of events in the browser.

For instance querying a user who did A then B is not an easy task with simple SQL queries.

This is how I came across [Linear Temporal Logic](https://en.wikipedia.org/wiki/Linear_temporal_logic) which appears to me extremely understudied in regular software development and "could be"/"is" an amazing tool to check if a software is functioning correctly.

This video might help you understand the key concepts of the LTL grammar

[https://www.youtube.com/watch?v=W5Q0DL9plns](https://www.youtube.com/watch?v=W5Q0DL9plns)
