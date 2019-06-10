import { factorial, choose } from './tools';

/**
 * In-place rotation of the subarray determined by the two
 * indexes left and right to the left by one.
 */
const rotateLeft = (pieces, left, right) => {
  const original = pieces[left];

  for (let i = left; i < right; i += 1) {
    pieces[i] = pieces[i + 1];
  }

  pieces[right] = original;
};

/**
 * In-place rotation of the subarray determined by the two
 * indexes left and right to the right by one.
 */
const rotateRight = (pieces, left, right) => {
  const original = pieces[right];

  for (let i = right; i > left; i -= 1) {
    pieces[i] = pieces[i - 1];
  }

  pieces[left] = original;
};

/**
 * Bijection which encodes a given orientation vector to an unique index.
 * The flip count is the number of ways in which a single piece in the
 * orientation vector may be oriented. For edges, this number is 2 flips,
 * and for corners there are 3 possible twists. Thus, edges are encoded
 * using a binary number system, and corners using a trinary number system.
 */
export const getIndexFromOrientation = (pieces, flipCount) => {
  let sum = 0;

  // Note that we do not include the last element in the vector here.
  // This is because the orientation of the last piece if determined
  // by the orientation of all the other pieces - when you rotate any
  // axis on the cube, only an even number of pieces is affected.
  for (let i = 0; i < pieces.length - 1; i += 1) {
    sum = flipCount * sum + pieces[i];
  }

  return sum;
};

/**
 * Returns the original orientation vector given the number which
 * describes it, the number of pieces in the vector, and the number
 * of ways in which an individual piece may be oriented.
 */
export const getOrientationFromIndex = (index, numPieces, numFlips) => {
  const orientation = [];

  let parity = 0;

  for (let i = numPieces - 2; i >= 0; i -= 1) {
    const ori = index % numFlips;
    index = Math.floor(index / numFlips);
    orientation[i] = ori;
    parity += ori;
  }

  // Restore the last piece based on the orientation of the other pieces.
  orientation[numPieces - 1] = (numFlips - (parity % numFlips)) % numFlips;

  return orientation;
};

/**
 * Each move on a cube perform an even number of swaps when considering
 * both edges and corner pieces at the same time. Thus, only half of all
 * cube states are reachable using legal moves. This also implies that
 * for a cube to be solvable, the parity of both corners and edges must
 * both be either even or odd. We use this to verify that a cube is
 * solvable when generating random state scrambles, and also to
 * describe the overall cube permutation using only 10 edges, 6 corners
 * and the parity of either the corners or the edges.
 */
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

/**
 * Encodes the permutation of the affected pieces within the entire
 * permutation vector, by encoding both their position and then the
 * permutation of the affected pieces within the permutation vector
 * using a variable-base number system. If reversed is true, the
 * values are assigned right-to-left. This is used in the Kociemba
 * solver, so that 0 is used as the solved coordinate for the move
 * table describing the UD-slice edges.
 */
export const getIndexFromPermutation = (pieces, affected, reversed = false) => {
  let offset = pieces.length - 1;
  let position = 0;
  let k = 1;

  // Store the permutation of the subarray containing
  // only the affected pieces.
  const edges = [];

  // Encode the position of the affected pieces in a number
  // from 0 up to n choose k, where n is the number of pieces
  // in the permutation vector and k is the number of affected pieces.
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

  // Encode the position of the subarray as a number from 0 and up
  // to n factorial, where n is the number of affected pieces.
  for (let i = edges.length - 1; i > 0; i -= 1) {
    let s = 0;

    while (edges[i] !== affected[i]) {
      rotateLeft(edges, 0, i);
      s += 1;
    }

    permutation = (i + 1) * permutation + s;
  }

  // Encode both the position and the permutation
  // as a number using a variable base.
  return factorial(affected.length) * position + permutation;
};

/**
 * Restores the permutation described by an index, number of affected
 * pieces and the permutation vector size. If reversed is true, the
 * indexes have been assigned right-to-left.
 */
export const getPermutationFromIndex = (
  index,
  affected,
  size,
  reversed = false,
) => {
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
