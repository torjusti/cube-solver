import kociemba from './kociemba';
import getRandomScramble from './scramble';
import { crossSolver, firstBlockSolver, EOLineSolver } from './solvers';

console.time('total')
console.log(kociemba("U' R L2 B' D F U D B R D2 R2 B' R2 F2 L2 D2 F' U2 F2"))
console.timeEnd('total')

module.exports = {
  solve: kociemba,
  getRandomScramble,
  crossSolver,
  firstBlockSolver,
  EOLineSolver,
};
