export const assert = ({ given, should, actual, expected }) => {
  const stringify = value =>
    Array.isArray(value) ? `[${value.map(stringify).join(",")}]` : `${value}`;

  const actualString = stringify(actual);
  const expectedString = stringify(expected);

  if (actualString === expectedString) {
    /*
    console.log(`OK:
      given: ${given}
      should: ${should}
      actual: ${actualString}
      expected: ${expectedString}
    `);
    */
  } else {
    throw new Error(`NOT OK:
      given ${given}
      should ${should}
      actual: ${actualString}
      expected: ${expectedString}
    `);
  }
};

export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
