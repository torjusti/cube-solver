import kociemba from './kociemba';
import getRandomScramble from './scramble';
import { crossSolver, firstBlockSolver, EOLineSolver } from './solvers';

export default {
  solve: kociemba,
  getRandomScramble,
  crossSolver,
  firstBlockSolver,
  EOLineSolver,
};
