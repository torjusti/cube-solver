const factorials = [];

/**
 * Calculates n factorial and attempts to cache
 * as much information as possible.
 */
export const factorial = (n) => {
  if (n === 0 || n === 1) {
    return 1;
  }

  if (factorials[n] > 0) {
    return factorials[n];
  }

  factorials[n] = factorial(n - 1) * n;

  return factorials[n];
};

const binomials = [];

/**
 * Calculates n choose k using cached binomial numbers.
 */
export const choose = (n, k) => {
  if (k > n) {
    return 0;
  }

  while (n >= binomials.length) {
    const s = binomials.length;
    const nextRow = [];

    nextRow[0] = 1;

    for (let i = 1, prev = s - 1; i < s; i += 1) {
      nextRow[i] = binomials[prev][i - 1] + binomials[prev][i];
    }

    nextRow[s] = 1;

    binomials.push(nextRow);
  }

  return binomials[n][k];
};

/**
 * Cartesian product of a given nested array.
 */
export const cartesian = (arg) => {
  const result = [];
  const max = arg.length - 1;

  const helper = (arr, i) => {
    for (let j = 0; j < arg[i].length; j += 1) {
      const copy = arr.slice(0);

      copy.push(arg[i][j]);

      if (i === max) {
        result.push(copy);
      } else {
        helper(copy, i + 1);
      }
    }
  };

  helper([], 0);

  return result;
};

// Ger a random integer in the provided range, inclusive.
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const permute = (n, r) => factorial(n) / factorial(n - r);

/**
 * Rotates the subarray containing the affected pieces
 * to the right by one.
 */
export const rotateParts = (pieces, affected) => {
  const updatedPieces = pieces.slice(0);

  updatedPieces[affected[0]] = pieces[affected[affected.length - 1]];

  for (let i = 1; i < affected.length; i += 1) {
    updatedPieces[affected[i]] = pieces[affected[i - 1]];
  }

  return updatedPieces;
};
