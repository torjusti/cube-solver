// Import solvers.
import kociemba from './kociemba';
import getRandomScramble from './scramble';
import { crossSolver, firstBlockSolver, EOLineSolver } from './solvers';

// Import utility modules.
import * as algorithms from './algorithms';
import * as coordinates from './coordinates';
import * as cube from './cube';
import * as MoveTable from './MoveTable';
import PruningTable from './PruningTable';
import Search from './Search';
import * as tools from './tools';

export default {
  solve: kociemba,
  getRandomScramble,
  crossSolver,
  firstBlockSolver,
  EOLineSolver,

  algorithms,
  coordinates,
  cube,
  MoveTable,
  PruningTable,
  Search,
  tools,
};
