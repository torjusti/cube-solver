import {
  getPermutationFromIndex,
  getOrientationFromIndex,
  getParity,
} from '../coordinates';

import { getRandomInt, factorial, rotateParts } from '../tools';

import { solveCoordinates } from '../solvers/kociemba';

const UPPER_FACE_POSITIONS = [0, 1, 2, 3];

/**
 * Returns an orientation vector where all pieces
 * are solved, except for the given enabled pieces.
 */
const getOrientationFromEnabled = (enabled, flipCount, size) => {
  const pieces = getOrientationFromIndex(
    getRandomInt(0, flipCount ** (enabled.length - 1)),
    enabled.length,
    flipCount,
  );

  const orientation = Array(size).fill(0);

  enabled.forEach((piece, i) => {
    orientation[piece] = pieces[i];
  });

  return orientation;
};

/**
 * Returns a permutation vector where all pieces are
 * solved, except for the given enabled pieces.
 */
const getPermutationFromEnabled = (enabled, size) => {
  const pieces = getPermutationFromIndex(
    getRandomInt(0, factorial(enabled.length)),
    enabled.slice(0),
    enabled.length,
  );

  const permutation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].slice(0, size);

  enabled.forEach((piece, i) => {
    permutation[piece] = pieces[i];
  });

  return permutation;
};

export const adjustUpperFace = (pieces, amount) => {
  amount = amount || getRandomInt(0, 4);

  for (let i = 0; i < amount; i += 1) {
    pieces = rotateParts(pieces, UPPER_FACE_POSITIONS);
  }

  return pieces;
};

/**
 * Generates a random scramble where all pieces are solved, except
 * for the provided edges and corners, which will be scrambled randomly.
 */
export const getScrambleForPieces = (
  permutationEdges,
  permutationCorners,
  orientationEdges = permutationEdges,
  orientationCorners = permutationCorners,
  adjustEdges = false,
  adjustCorners = false,
) => {
  let eo;
  let ep;
  let co;
  let cp;

  do {
    eo = getOrientationFromEnabled(orientationEdges, 2, 12);

    ep = getPermutationFromEnabled(permutationEdges, 12);

    if (adjustEdges) {
      ep = adjustUpperFace(ep);
    }

    co = getOrientationFromEnabled(orientationCorners, 3, 8);

    cp = getPermutationFromEnabled(permutationCorners, 8);

    if (adjustCorners) {
      cp = adjustUpperFace(cp);
    }
  } while (getParity(ep) !== getParity(cp));

  return solveCoordinates(eo, ep, co, cp);
};

export default getScrambleForPieces;
