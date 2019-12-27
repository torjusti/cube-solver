import {
  createEdgePermutationTable,
  createEdgeOrientationTable,
} from '../MoveTable';

import Search from '../Search';

export const EOLineSearch = new Search(() => ({
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

  pruningTables: [['EdgeOrientation'], ['EdgePermutation']],
}));

const EOLineSolver = (scramble) => EOLineSearch.solve({ scramble });

export default EOLineSolver;
