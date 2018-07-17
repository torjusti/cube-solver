import crossSolver from './solvers/crossSolver';
import EOLineSolver from './solvers/EOLineSolver';
import firstBlockSolver from './solvers/firstBlockSolver';
import kociemba from './solvers/kociemba';
import XCrossSolver from './solvers/XCrossSolver';
import get2GLLScramble from './scramblers/2gll';
import get3x3Scramble from './scramblers/3x3';
import getCMLLScramble from './scramblers/cmll';
import getCornersOnlycramble from './scramblers/corners';
import getEdgesOnlyScramble from './scramblers/edges';
import getLSEScramble from './scramblers/lse';
import getLSLLScramble from './scramblers/lsll';
import getPLLscramble from './scramblers/pll';
import getZBLLScramble from './scramblers/zbll';
import getZZLSScramble from './scramblers/zzls';

export default {
  solvers: {
    crossSolver,
    EOLineSolver,
    firstBlockSolver,
    kociemba,
    XCrossSolver,
  },

  scramblers: {
    get2GLLScramble,
    get3x3Scramble,
    getCMLLScramble,
    getCornersOnlycramble,
    getEdgesOnlyScramble,
    getLSEScramble,
    getLSLLScramble,
    getPLLscramble,
    getZBLLScramble,
    getZZLSScramble,
  }
};