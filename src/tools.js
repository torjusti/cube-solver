const factorials = [];

export const factorial = n => {
  if (n === 0 || n == 1) {
    return 1;
  }

  if (factorials[n] > 0) {
    return factorials[n];
  }

  factorials[n] = factorial(n - 1) * n;

  return factorials[n];
};

const binomials = [];

export const choose = (n, k) => {
  if (k > n) {
    return 0;
  }

  while (n >= binomials.length) {
    let s = binomials.length, nextRow = [];

    nextRow[0] = 1;

    for (let i = 1, prev= s - 1; i < s; i += 1) {
      nextRow[i] = binomials[prev][i-1] + binomials[prev][i];
    }

    nextRow[s] = 1;

    binomials.push(nextRow);
  }

  return binomials[n][k];
};

export const cartesian = arg => {
  const result = [], max = arg.length - 1;

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

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
