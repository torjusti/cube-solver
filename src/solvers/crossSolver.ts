import { EdgeOrientationTable, EdgePermutationTable, JointEdgeTable } from '../MoveTable';
import Search from '../Search';

export const CrossSearch = new Search(() => ({
  moveTables: [
    new EdgePermutationTable('EdgePermutation', [4, 5, 6, 7]),
    new EdgeOrientationTable('EdgeOrientation', [4, 5, 6, 7]),
  ],

  pruningTables: [['EdgePermutation'], ['EdgeOrientation']],
}));

const crossSolver = (scramble: string) => CrossSearch.solve(scramble).formatted;

export default crossSolver;

console.time()
for (let i = 0; i < 10000; i++) {
  console.log(crossSolver("R' D R D2 L F2 L B2 L2 F2 L D2 U2 F L' F L U B2 U"))
}
console.timeEnd()