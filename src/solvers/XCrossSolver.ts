import { CornerOrientationTable, CornerPermutationTable, EdgeOrientationTable, EdgePermutationTable } from '../MoveTable';
import Search from '../Search';

export const XCrossSearch = new Search(() => ({
  moveTables: [
    new EdgePermutationTable('EdgePermutation', [4, 5, 6, 7, 9]),
    new EdgeOrientationTable('EdgeOrientation', [4, 5, 6, 7, 9]),
    new CornerPermutationTable('CornerPermutation', [5]),
    new CornerOrientationTable('CornerOrientation', [5]),
  ],

  pruningTables: [
    ['EdgePermutation', 'CornerPermutation'],
    ['EdgeOrientation', 'CornerOrientation'],
  ],
}));

const XCrossSolver = (scramble: string) => XCrossSearch.solve(scramble).formatted;

export default XCrossSolver;
