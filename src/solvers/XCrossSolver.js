import {
  createEdgePermutationTable,
  createCornerPermutationTable,
  createEdgeOrientationTable,
  createCornerOrientationTable,
} from '../MoveTable';

import Search from '../Search';

export const XCrossSearch = new Search(() => ({
  moveTables: [
    createEdgePermutationTable({
      name: 'EdgePermutation',
      affected: [4, 5, 6, 7, 9],
    }),

    createEdgeOrientationTable({
      name: 'EdgeOrientation',
      affected: [4, 5, 6, 7, 9],
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
    ['EdgePermutation', 'CornerPermutation'],
    ['EdgeOrientation', 'CornerOrientation'],
  ],
}));

const XCrossSolver = (scramble) => XCrossSearch.solve({ scramble });

export default XCrossSolver;
