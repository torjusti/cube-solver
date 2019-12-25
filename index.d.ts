type Scrambler = '3x3' | '2gll' | 'cmll' | 'corners' | 'edges' | 'lse' | 'lsll' | 'pll' | 'zbll' | 'zzls';

type Solver = 'kociemba' | 'cross' | 'eoline' | 'fb' | 'xcross';

declare module 'cube-solver' {
  // Main method for generating scrambles.
  export const scramble: (scrambler: Scrambler) => string;
  // Solve specific subset of a given cube.
  export const solve: (scramble: string, type: Solver) => string;
  // Initialize given solver.
  export const initialize: (solver: Solver) => void;
};