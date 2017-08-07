import kociemba from './kociemba';
import getRandomScramble from './scramble';
import { crossSolver, firstBlockSolver, EOLineSolver } from './solvers';

console.time('init+solve');
getRandomScramble();
console.timeEnd('init+solve');

export default {
  solve: kociemba,
  getRandomScramble,
  crossSolver,
  firstBlockSolver,
  EOLineSolver,
};
