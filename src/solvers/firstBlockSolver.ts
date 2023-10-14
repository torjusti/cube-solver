import { CornerOrientationTable, CornerPermutationTable, EdgeOrientationTable, EdgePermutationTable } from '../MoveTable';
import Search from '../Search';

export const FirstBlockSearch = new Search(() => ({
  moveTables: [
    new EdgeOrientationTable('EdgeOrientation', [6, 9, 10]),
    new CornerOrientationTable('CornerOrientation', [5, 6]),
    new EdgePermutationTable('EdgePermutation', [6, 9, 10]),
    new CornerPermutationTable('CornerPermutation', [5, 6]),
  ],

  pruningTables: [
    ['EdgeOrientation', 'CornerPermutation'],
    ['CornerOrientation', 'CornerPermutation'],
    ['EdgePermutation', 'CornerPermutation'],
  ],
}));

const firstBlockSolver = (scramble: string) => FirstBlockSearch.solve({ scramble }).formatted;

export default firstBlockSolver;
