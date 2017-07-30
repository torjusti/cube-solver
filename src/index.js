import {
  getIndexFromOrientation,
  getOrientationFromIndex,
  getIndexFromPermutation,
  getPermutationFromIndex,
} from './coordinates';

import {
  edgeOrientationMove,
  cornerOrientationMove,
  edgePermutationMove,
  cornerPermutationMove,
} from './cube';

import { cartesian, factorial, choose } from './tools';
import { formatAlgorithm } from './algorithms';
import PruningTable from './PruningTable';
import MoveTable from './MoveTable';
import Search from './Search';

const phaseTwoMoves = [1, 10, 4, 13, 6, 7, 8, 15, 16, 17];

const parity = new MoveTable({
  name: 'parity',

  size: 2,

  table: [
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  ],
});

const URFToDLF = new MoveTable({
  name: 'URFToDLF',
  size: 20160,
  getVector: (index) => getPermutationFromIndex(index, [0, 1, 2, 3, 4, 5], 8),
  cubieMove: cornerPermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [0, 1, 2, 3, 4, 5]),
});

const slice = new MoveTable({
  name: 'slice',
  size: 11880,
  getVector: (index) => getPermutationFromIndex(index, [8, 9, 10, 11], 12, true),
  cubieMove: edgePermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [8, 9, 10, 11], true),
});

const phaseOneMoveTables = [
  new MoveTable({
    name: 'slicePosition',
    size: 495,
    table: slice.table,
    doMove: (table, index, move) => Math.floor(table[index * 24][move] / 24),
  }),

  new MoveTable({
    name: 'twist',
    size: 2187,
    getVector: (index) => getOrientationFromIndex(index, 8, 3),
    cubieMove: cornerOrientationMove,
    getIndex: (twists) => getIndexFromOrientation(twists, 3),
  }),

  new MoveTable({
    name: 'flip',
    size: 2048,
    getVector: (index) => getOrientationFromIndex(index, 12, 2),
    cubieMove: edgeOrientationMove,
    getIndex: (flips) => getIndexFromOrientation(flips, 2),
  }),

  slice, parity, URFToDLF,

  new MoveTable({
    name: 'URToUL',
    size: 1320,
    getVector: (index) => getPermutationFromIndex(index, [0, 1, 2], 12),
    cubieMove: edgePermutationMove,
    getIndex: (pieces) => getIndexFromPermutation(pieces, [0, 1, 2]),
  }),

  new MoveTable({
    name: 'UBToDF',
    defaultIndex: 114,
    size: 1320,
    getVector: (index) => getPermutationFromIndex(index, [3, 4, 5], 12),
    cubieMove: edgePermutationMove,
    getIndex: (pieces) => getIndexFromPermutation(pieces, [3, 4, 5]),
  }),
];

const phaseOnePruningTables = [
  ['slicePosition'],
  ['slicePosition', 'flip'],
  ['slicePosition', 'twist'],
];

const phaseOne = new Search(phaseOneMoveTables, phaseOnePruningTables);

const getMergeCoord = (x, y) => {
  let a = getPermutationFromIndex(x, [0, 1, 2], 12);
  let b = getPermutationFromIndex(y, [3, 4, 5], 12);

  for (let i = 0; i < 8; i += 1) {
    if (a[i] !== -1) {
      if (b[i] !== -1) {
        return -1;
      } else {
        b[i] = a[i];
      }
    }
  }

  return getIndexFromPermutation(b, [0, 1, 2, 3, 4, 5]);
};

const merge = [];

for (let i = 0; i < 336; i += 1) {
  merge.push([]);

  for (let j = 0; j < 336; j += 1) {
    merge[i][j] = getMergeCoord(i, j);
  }
}

const phaseTwoMoveTables = [
  new MoveTable({
    name: 'slicePermutation',
    size: 24,
    table: slice.table,
  }),

  parity, URFToDLF,

  new MoveTable({
    name: 'URToDF',
    size: 20160,
    moves: phaseTwoMoves,
    getVector: (index) => getPermutationFromIndex(index, [0, 1, 2, 3, 4, 5], 12),
    cubieMove: edgePermutationMove,
    getIndex: (vector) => getIndexFromPermutation(vector, [0, 1, 2, 3, 4, 5]),
  }),

];

const phaseTwoPruningTables = [
  ['slicePermutation', 'parity', 'URFToDLF'],
  ['slicePermutation', 'parity', 'URToDF'],
];

const phaseTwo = new Search(phaseTwoMoveTables, phaseTwoPruningTables, phaseTwoMoves);

const solver = scramble => {
  let maxDepth = 30, solution;

  outer: for (let depth = 0; depth <= maxDepth; depth += 1) {
    let phaseOneSolution = phaseOne.solve({
      scramble,
      minDepth: depth,
      maxDepth: depth,
    });

    if (phaseOneSolution) {
      let lastMove = phaseOneSolution.solution.slice(-1)[0];

      if (lastMove % 2 == 0 && Math.floor(lastMove / 3) === 6 && Math.floor(lastMove / 3) === 15) {
        continue outer;
      }

      const phaseTwoSolution = phaseTwo.solve({
        indexes: [
          phaseOneSolution.indexes[3],
          phaseOneSolution.indexes[4],
          phaseOneSolution.indexes[5],
          merge[phaseOneSolution.indexes[6]][phaseOneSolution.indexes[7]],
        ],

        lastMove,

        maxDepth: maxDepth - phaseOneSolution.solution.length,
      });

      if (phaseTwoSolution) {
        const candidate = phaseOneSolution.solution.concat(phaseTwoSolution.solution);

        if (candidate.length < maxDepth) {
          maxDepth = candidate.length - 1;
          solution = candidate;
        }
      }
    }
  }

  return formatAlgorithm(solution);
}

console.log('Solver initialized');

console.log(solver("U L2 F2 L2 B2 U B2 U2 B2 R2 D F U F2 U' B' L2 D L B' D2 L2"));
