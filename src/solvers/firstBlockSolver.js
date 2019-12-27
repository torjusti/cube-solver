import {
  createEdgePermutationTable,
  createCornerPermutationTable,
  createEdgeOrientationTable,
  createCornerOrientationTable,
} from '../MoveTable';

import Search from '../Search';

export const FirstBlockSearch = new Search(() => ({
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

const firstBlockSolver = (scramble) => FirstBlockSearch.solve({ scramble });

export default firstBlockSolver;
