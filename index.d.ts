export type Scrambler = '3x3' | '2gll' | 'cmll' | 'corners' | 'edges' | 'lse' | 'lsll' | 'pll' | 'zbll' | 'zzls';

export type Solver = 'kociemba' | 'cross' | 'eoline' | 'fb' | 'xcross';

export interface Settings {
  randomize: boolean;
}

declare module 'cube-solver' {
  // Main method for generating scrambles.
  export const scramble: (scrambler: Scrambler, settings: Settings) => string;
  // Solve specific subset of a given cube.
  export const solve: (scramble: string, type: Solver, settings: Settings) => string;
  // Initialize given solver.
  export const initialize: (solver: Solver) => void;
}
