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
  solve: (scramble, solver = 'kociemba') => {
    const solvers = {
      'kociemba': kociemba,
      'cross': crossSolver,
      'eoline': EOLineSolver,
      'fb': firstBlockSolver,
      'xcross': XCrossSolver,
    };

    if (solvers[solver]) {
      return solvers[solver](scramble);
    }

    throw new Error('Specified solver does not exist.');
  },

  scramble: (scrambler = '3x3') => {
    const scramblers = {
      '3x3': get3x3Scramble,
      '2gll': get2GLLScramble,
      'cmll': getCMLLScramble,
      'corners': getCornersOnlycramble,
      'edges': getEdgesOnlyScramble,
      'lse': getLSEScramble,
      'lsll': getLSLLScramble,
      'pll': getPLLscramble,
      'zbll': getZBLLScramble,
      'zzls': getZZLSScramble,
    };

    if (scramblers[scrambler]) {
      return scramblers[scrambler]();
    }

    throw new Error('Specified scrambler does not exist.');
  },
};
