import {
  getPermutationFromIndex,
  getOrientationFromIndex,
  getIndexFromPermutation,
  getIndexFromOrientation,
  getParity,
} from './coordinates';

import { getRandomInt } from './tools';

import kociemba from './kociemba';

const getRandomScramble = () => {
  let eo, ep, co, cp;

  do {
    eo = getOrientationFromIndex(getRandomInt(0, 2048), 12, 2);
    co = getOrientationFromIndex(getRandomInt(0, 2187), 8, 3);
    ep = getPermutationFromIndex(getRandomInt(0, 479001600), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12);
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

console.time('rand');
for (let i = 0; i < 1000; i++)
  console.log(getRandomScramble());
console.timeEnd('rand')
