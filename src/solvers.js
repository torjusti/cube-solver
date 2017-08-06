import {
  createEdgePermutationTable,
  createCornerPermutationTable,
  createEdgeOrientationTable,
  createCornerOrientationTable,
} from './MoveTable';

import Search from './Search';

const CrossSearch = new Search(() => ({
  moveTables: [
    createEdgePermutationTable({
      name: 'EdgePermutation',
      affected: [4, 5, 6, 7],
    }),

    createEdgeOrientationTable({
      name: 'EdgeOrientation',
      affected: [4, 5, 6, 7],
    }),
  ],

  pruningTables: [
    ['EdgePermutation'],
    ['EdgeOrientation'],
  ],
}));

export const crossSolver = scramble => CrossSearch.solve({ scramble });

const FirstBlockSearch = new Search(() => ({
  moveTables: [
    createEdgeOrientationTable({
      name: 'EdgeOrientation',
      affected: [6, 9, 10],
    }),

    createCornerOrientationTable({
      name: 'CornerOrientation',
      affected: [5, 6],
    }),

    createEdgePermutationTable({
      name: 'EdgePermutation',
      affected: [6, 9, 10],
    }),

    createCornerPermutationTable({
      name: 'CornerPermutation',
      affected: [5, 6],
    }),
  ],

  pruningTables: [
    ['EdgeOrientation', 'CornerPermutation'],
    ['CornerOrientation', 'CornerPermutation'],
    ['EdgePermutation', 'CornerPermutation'],
  ],
}));

export const firstBlockSolver = scramble => FirstBlockSearch.solve({ scramble });

const EOLineSearch = new Search(() => ({
  moveTables: [
    createEdgeOrientationTable({
      name: 'EdgeOrientation',
      affected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    }),

    createEdgePermutationTable({
      name: 'EdgePermutation',
      affected: [5, 7],
    }),
  ],

  pruningTables: [
    ['EdgeOrientation'],
    ['EdgePermutation'],
  ],
}));

export const EOLineSolver = scramble => EOLineSearch.solve({ scramble });
