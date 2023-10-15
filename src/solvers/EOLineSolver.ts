import { EdgeOrientationTable, EdgePermutationTable } from '../MoveTable';
import Search from '../Search';

export const EOLineSearch = new Search(() => ({
  moveTables: [
    new EdgeOrientationTable('EdgeOrientation', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    new EdgePermutationTable('EdgePermutation', [5, 7]),
  ],

  pruningTables: [['EdgeOrientation'], ['EdgePermutation']],
}));

const EOLineSolver = (scramble: string) => EOLineSearch.solve(scramble).formatted;

export default EOLineSolver;
