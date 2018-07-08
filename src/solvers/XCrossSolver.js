import {
  createEdgePermutationTable,
  createCornerPermutationTable,
  createEdgeOrientationTable,
  createCornerOrientationTable,
} from '../MoveTable';

import Search from '../Search';

const XCrossSearch = new Search(() => ({
  moveTables: [
    createEdgePermutationTable({
      name: 'CrossEdgePermutation',
      affected: [4, 5, 6, 7],
    }),

    createEdgeOrientationTable({
      name: 'CrossEdgeOrientation',
      affected: [4, 5, 6, 7],
    }),

    createEdgePermutationTable({
      name: 'BonusEdgePermutation',
      affected: [9],
    }),

    createEdgeOrientationTable({
      name: 'BonusEdgeOrientation',
      affected: [9],
    }),

    createCornerPermutationTable({
      name: 'CornerPermutation',
      affected: [5],
    }),

    createCornerOrientationTable({
      name: 'CornerOrientation',
      affected: [5],
    }),
  ],

  pruningTables: [
    ['CornerPermutation', 'CornerOrientation'],
    ['BonusEdgePermutation', 'BonusEdgeOrientation'],
    ['CrossEdgePermutation'],
    ['CrossEdgeOrientation'],
  ],
}));

const XCrossSolver = scramble => XCrossSearch.solve({ scramble });