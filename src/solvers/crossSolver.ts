import { EdgeOrientationTable, EdgePermutationTable } from '../MoveTable';
import Search from '../Search';

export const CrossSearch = new Search(() => ({
  moveTables: [
    new EdgePermutationTable('EdgePermutation', [4, 5, 6, 7]),
    new EdgeOrientationTable('EdgeOrientation', [4, 5, 6, 7]),
  ],

  pruningTables: [['EdgePermutation'], ['EdgeOrientation']],
}));

const crossSolver = (scramble: string) => CrossSearch.solve({ scramble }).formatted;

export default crossSolver;
