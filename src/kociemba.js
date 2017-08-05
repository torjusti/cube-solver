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

import MoveTable, {
  createEdgePermutationTable,
  createCornerPermutationTable,
  createEdgeOrientationTable,
  createCornerOrientationTable,
} from './MoveTable';

import Search from './Search';

// In phase two, only quarter moves of U and D and double turns of
// all the other faces are allowed, in order to keep the cube in
//  the phase two group G1.
const phaseTwoMoves = [1, 10, 4, 13, 6, 7, 8, 15, 16, 17];

let parity, URFToDLF, slice, merge;

const phaseOneTables = () => {
  // The parity move table is so small that we inline it. It
  // describes the parity of both the edge and corner pieces,
  // which must be equal for the cube to be solvable. The
  // coordinate is included in both phases, but only used
  // in phase two.
  parity = new MoveTable({
    name: 'parity',

    size: 2,

    table: [
      [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    ],
  });

  //
  URFToDLF = createCornerPermutationTable({
    name: 'URFToDLF',
    affected: [0, 1, 2, 3, 4, 5],
  });

  // This table is not used directly. This coordinate modulo 24 gives the
  // permutation of the subarray containing the UD-slice pieces, while this
  // coordinate divided by 24 gives the position of the UD-slice pieces.
  // Two smaller move tables are created using this table, one to solve the
  // position of the UD-slice pieces in phase one, and one to solve the
  // pieces in phase two. Due to the reduced move set in phase two, the pruning
  // table for this coordinate is smaller than it would normally be.
  slice = createEdgePermutationTable({
    name: 'slice',
    affected: [8, 9, 10, 11],
    reversed: true,
  });

  // Initialize phase two, since it now is guaranteed that the
  // heper move tables have finished generating.
  phaseTwo.initialize();

  return {
    moveTables: [
      new MoveTable({
        name: 'slicePosition',
        size: 495,
        table: slice.table,
        doMove: (table, index, move) => Math.floor(table[index * 24][move] / 24),
      }),

      createCornerOrientationTable({
        name: 'twist',
        affected: [0, 1, 2, 3, 4, 5, 6, 7]
      }),

      createEdgeOrientationTable({
        name: 'flip',
        affected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),

      slice, parity, URFToDLF,

      createEdgePermutationTable({
        name: 'URToUL',
        affected: [0, 1, 2],
      }),

      createEdgePermutationTable({
        name: 'UBToDF',
        affected: [3, 4, 5],
      }),
    ],

    pruningTables: [
      ['slicePosition', 'flip'],
      ['slicePosition', 'twist'],
    ]
  };
};

const phaseTwoTables = () => {
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

  merge = [];

  for (let i = 0; i < 336; i += 1) {
    merge.push([]);

    for (let j = 0; j < 336; j += 1) {
      merge[i][j] = getMergeCoord(i, j);
    }
  }

  return {
    moveTables: [
      new MoveTable({
        name: 'slicePermutation',
        size: 24,
        table: slice.table,
      }),

      parity, URFToDLF,

      createEdgePermutationTable({
        name: 'URToDF',
        size: 20160,
        moves: phaseTwoMoves,
        affected: [0, 1, 2, 3, 4, 5],
      }),
    ],

    pruningTables: [
      ['slicePermutation', 'parity', 'URFToDLF'],
      ['slicePermutation', 'parity', 'URToDF'],
    ]
  };
};

class PhaseOneSearch extends Search {
  constructor() {
    super(...arguments);

    this.maxDepth = 22;
    this.solution = null;
  }

  handleSolution(solution, indexes) {
    const lastMove = solution.slice(-1)[0];

    if (lastMove % 2 === 0 && Math.floor(lastMove / 3) === 6 && Math.floor(lastMove / 3) === 15) {
      return;
    }

    const phaseTwoSolution = phaseTwo.solve({
      indexes: [
        indexes[3],
        indexes[4],
        indexes[5],
        merge[indexes[6]][indexes[7]],
      ],

      maxDepth: this.maxDepth - solution.length,

      lastMove,

      format: false,
    });

    if (phaseTwoSolution) {
      this.solution = solution.concat(phaseTwoSolution.solution);

      if (this.maxDepth <= this.settings.maxDepth) {
        return {
          solution: this.solution,
          indexes,
        };
      }

      this.maxDepth = this.solution.length - 1;
    }
  }
}

const phaseOne = new PhaseOneSearch(phaseOneTables);

const phaseTwo = new Search(phaseTwoTables, phaseTwoMoves);

const kociemba = (scramble, maxDepth = 22) => {
  if (Array.isArray(scramble)) {
    return formatAlgorithm(phaseOne.solve({
      indexes: scramble,
      format: false,
      maxDepth,
    }).solution);
  }

  return formatAlgorithm(phaseOne.solve({
    scramble,
    format: false,
    maxDepth,
  }).solution);
};

export default kociemba;
