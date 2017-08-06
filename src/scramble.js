import {
  getPermutationFromIndex,
  getOrientationFromIndex,
  getIndexFromPermutation,
  getIndexFromOrientation,
  getParity,
} from './coordinates';

import { getRandomInt } from './tools';

import kociemba from './kociemba';

/**
 * Generates a random state and solves it. The state is created
 * by generating random numbers and using the coordinate definitions
 * to restore the vectors describing the orientations and permutations
 * of the cube. This guarantees valid orientations, but we have to
 * ensure the parity of the generated cube is valid.
 */
const getRandomScramble = () => {
  let eo;
  let ep;
  let co;
  let cp;

  do {
    eo = getOrientationFromIndex(getRandomInt(0, 2048), 12, 2);

    co = getOrientationFromIndex(getRandomInt(0, 2187), 8, 3);

    ep = getPermutationFromIndex(getRandomInt(0, 479001600),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12);

    cp = getPermutationFromIndex(getRandomInt(0, 40320), [0, 1, 2, 3, 4, 5, 6, 7], 8);
  } while (getParity(ep) !== getParity(cp));

  const indexes = [
    Math.floor(getIndexFromPermutation(ep, [8, 9, 10, 11], true) / 24),
    getIndexFromOrientation(co, 3),
    getIndexFromOrientation(eo, 2),
    getIndexFromPermutation(ep, [8, 9, 10, 11], true),
    getParity(cp),
    getIndexFromPermutation(cp, [0, 1, 2, 3, 4, 5]),
    getIndexFromPermutation(ep, [0, 1, 2]),
    getIndexFromPermutation(ep, [3, 4, 5]),
  ];

  return kociemba(indexes);
};

export default getRandomScramble;
