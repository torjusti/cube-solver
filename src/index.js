import kociemba from './kociemba';
import getRandomScramble from './scramble';
import { crossSolver, firstBlockSolver, EOLineSolver } from './solvers';

module.exports = {
  solve: kociemba,
  getRandomScramble,
  crossSolver,
  firstBlockSolver,
  EOLineSolver,
};
