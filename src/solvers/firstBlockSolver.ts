import { CornerOrientationTable, CornerPermutationTable, EdgeOrientationTable, EdgePermutationTable } from '../MoveTable';
import Search from '../Search';

export const FirstBlockSearch = new Search(() => ({
  moveTables: [
    new EdgeOrientationTable('EdgeOrientation', [6, 9, 10]),
    new EdgePermutationTable('EdgePermutation', [6, 9, 10]),
    
    new CornerOrientationTable('CornerOrientation', [5, 6]),
    new CornerPermutationTable('CornerPermutation', [5, 6]),
  ],

  pruningTables: [
    ['EdgeOrientation', 'CornerPermutation'],
    ['CornerOrientation', 'CornerPermutation'],
    ['EdgePermutation', 'CornerPermutation'],
  ],
}));

const firstBlockSolver = (scramble: string) => FirstBlockSearch.solve(scramble).formatted;

export default firstBlockSolver;

console.time()
for (let i = 0; i < 10000; i++) {
  console.log(firstBlockSolver("R' D R D2 L F2 L B2 L2 F2 L D2 U2 F L' F L U B2 U"))
}
console.timeEnd()