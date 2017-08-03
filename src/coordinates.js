import { factorial, choose } from './tools';

const rotateLeft = (pieces, left, right) => {
  const original = pieces[left];

  for (let i = left; i < right; i += 1) {
    pieces[i] = pieces[i + 1];
  }

  pieces[right] = original;
};

const rotateRight = (pieces, left, right) => {
  const original = pieces[right];

  for (let i = right; i > left; i -= 1) {
    pieces[i] = pieces[i - 1];
  }

  pieces[left] = original;
};

export const getIndexFromOrientation = (pieces, flipCount) => {
  let sum = 0;

  for (let i = 0; i < pieces.length - 1; i += 1) {
    sum = flipCount * sum + pieces[i];
  }

  return sum;
};

export const getOrientationFromIndex = (index, numPieces, numFlips) => {
  const orientation = [];

  let parity = 0;

  for (let i = numPieces - 2; i >= 0; i -= 1) {
    const ori = index % numFlips;
    index = Math.floor(index / numFlips);
    orientation[i] = ori;
    parity += ori;
  }

  orientation[numPieces - 1] = (numFlips - parity % numFlips) % numFlips;

  return orientation;
};

export const getParity = (pieces) => {
  let sum = 0;

  for (let i = pieces.length - 1; i > 0; i -= 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      if (pieces[j] > pieces[i]) {
        sum += 1;
      }
    }
  }

  return sum % 2;
};

export const getIndexFromPermutation = (pieces, affected, reversed = false) => {
  let position = 0, k = 1, offset = pieces.length - 1;

  const edges = [];

  if (reversed) {
    for (let n = pieces.length - 1; n >= 0; n -= 1) {
      if (affected.indexOf(pieces[n]) >= 0) {
        offset = Math.min(offset, pieces[n]);
        position += choose(pieces.length - 1 - n, k);
        edges.unshift(pieces[n]);
        k += 1;
      }
    }
  } else {
    for (let n = 0; n < pieces.length; n += 1) {
      if (affected.indexOf(pieces[n]) >= 0) {
        offset = Math.min(offset, pieces[n]);
        position += choose(n, k);
        edges.push(pieces[n]);
        k += 1;
      }
    }
  }

  let permutation = 0;

  for (let i = edges.length - 1; i > 0; i -= 1) {
    let s = 0;

    while (edges[i] != affected[i]) {
      rotateLeft(edges, 0, i);
      s += 1;
    }

    permutation = (i + 1) * permutation + s;
  }

  return factorial(affected.length) * position + permutation;
};

export const getPermutationFromIndex = (index, affected, size, reversed = false) => {
  const base = factorial(affected.length);

  let position = Math.floor(index / base);
  let permutation = index % base;

  const pieces = [];

  for (let i = 0; i < size; i += 1) {
    pieces.push(-1);
  }

  for (let i = 1; i < affected.length; i += 1) {
    let s = permutation % (i + 1);
    permutation = Math.floor(permutation / (i + 1));

    while (s > 0) {
      rotateRight(affected, 0, i);
      s -= 1;
    }
  }

  let k = affected.length - 1;

  if (reversed) {
    for (let n = 0; n < size; n += 1) {
      const binomial = choose(size - 1 - n, k + 1);

      if (position - binomial >= 0) {
        pieces[n] = affected[affected.length - 1 - k];
        position -= binomial;
        k -= 1;
      }
    }
  } else {
    for (let n = size - 1; n >= 0; n -= 1) {
      const binomial = choose(n, k + 1);

      if (position - binomial >= 0) {
        pieces[n] = affected[k];
        position -= binomial;
        k -= 1;
      }
    }
  }

  return pieces;
};
