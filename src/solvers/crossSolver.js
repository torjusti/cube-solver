import {
  createEdgePermutationTable,
  createEdgeOrientationTable,
} from '../MoveTable';

import Search from '../Search';

export const CrossSearch = new Search(() => ({
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

  pruningTables: [['EdgePermutation'], ['EdgeOrientation']],
}));

const crossSolver = (scramble) => CrossSearch.solve({ scramble });

export default crossSolver;
