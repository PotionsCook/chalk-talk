# [Chalk-Talk] LTL

<aside>
🎯 - Show functional programming and ES6 syntax in action (currying, point-free notation, composition...)
- Implement a small and useful LTL library to query iterables.

</aside>

LTL provides a library to ease the composition of LTL formulas .

For instance it enables in a few lines of code to test

- if a word satisfies : has an 'r' eventually followed by an 'e'
- if a sequence of events satisfies: has an event 'saw this product' eventually followed by a 'purchase'

But also way more complex sequences like the one described in Google Analytics Segment.

I recently read in full Eric Eliott amazing Medium pages on composing software. I advised all software developers interested in functional programming to do the same.

By the end of your read you'll be confident in saying :

> _“A monad is just a monoid in the category of endofunctors. What’s the problem?”_

[Composing Software: The Book](https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc)

I've also been looking into simple ways to query sequences of events in the browser.

For instance querying a user who did A then B is not an easy task with simple SQL queries.

This is how I came across [Linear Temporal Logic](https://en.wikipedia.org/wiki/Linear_temporal_logic) which appears to me extremely understudied in regular software development and "could be"/"is" an amazing tool to check if a software is functioning correctly.

This video might help you understand the key concepts of the LTL grammar

[https://www.youtube.com/watch?v=W5Q0DL9plns](https://www.youtube.com/watch?v=W5Q0DL9plns)
