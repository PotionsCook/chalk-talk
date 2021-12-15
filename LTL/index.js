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

import "./test.js";

const occurences = universe => predicate => [...universe].filter(predicate);
const proba = universe => occurences => occurences.length / universe.length;

const prior_impact = lexic => objective => prior => {
  // In mathematical terms we want to return
  // impact = Probability(objective|prior) / P(objective)
  // impact = conditional_proba / objective_proba

  // The conditional posterior probability is defined by
  // P(objective|prior) = P(objective after prior)/P(prior)

  const [
    objective_after_prior_occurences,
    prior_occurences,
    objective_occurences
  ] = [after(prior)(objective), eventually(prior), eventually(objective)].map(
    occurences(lexic)
  );

  const conditional_proba = proba(prior_occurences)(
    objective_after_prior_occurences
  );
  const objective_proba = proba(lexic)(objective_occurences);
  const impact_ratio = conditional_proba / objective_proba;

  return {
    impact_ratio,
    objective_proba,
    conditional_proba,
    objective_after_prior_occurences,
    prior_occurences,
    objective_occurences
  };
};

const print = ({ lexic, objective, prior, impact_ratio }) => {
  console.log(`Considering the following lexic`);
  console.log(lexic);
  console.log(
    `"${objective}" is ${impact_ratio} more likely to happen after "${prior}" than random
    `
  );
};

const lexic = "where atomic property is a predicate taking a value of the iterator as an argument and returning a boolean"
  .split(" ")
  .map(word => [...word]);

// In our case the iterable
// is a string transformed into an array
// like ['t','e','s','t']
// the following simple atomic property factory
// takes a letter and returns a formula
// comparing
//   the value provided by the iterator
//   and the letter
const ap = letter => f_ap(value => letter === value);

const impact_r_on_e = prior_impact(lexic)(ap("e"))(ap("r"));
print({ lexic, prior: "r", objective: "e", ...impact_r_on_e });

const impact_in_on_g = prior_impact(lexic)(ap("g"))(
  and(ap("i"))(next(ap("n")))
);
print({ lexic, prior: "in", objective: "g", ...impact_in_on_g });
