import { parseAlgorithm, formatAlgorithm, invertAlgorithm, getTotalRotation } from './algorithms';
import PruningTable from './PruningTable';
import { allMoves } from './cube';
import { MoveTable } from './MoveTable';

interface Settings {
  lastMove: number; 
  indexes?: number[]; 
  scramble?: string; 
  maxDepth: number;
}

class Search {
  public createTables: () => { moveTables: MoveTable[], pruningTables: string[][] };
  public moves: number[];
  public initialized: boolean;
  public moveTables: MoveTable[];
  public pruningTables: { moveTableIndexes: number[], pruningTable: PruningTable }[];
  public settings: Settings;

  constructor(createTables: () => { moveTables: MoveTable[], pruningTables: string[][] }, moves = allMoves) {
    this.createTables = createTables;
    this.moves = moves;
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    const { moveTables, pruningTables } = this.createTables();

    this.moveTables = moveTables;

    this.pruningTables = [];

    pruningTables.forEach((moveTableNames) => {
      const moveTableIndexes = moveTableNames.map((name) => this.moveTables.map((table) => table.getName()).indexOf(name));

      moveTableIndexes.sort(
        (a, b) => this.moveTables[a].getSize() - this.moveTables[b].getSize(),
      );

      const mappedTables: MoveTable[] = [];

      moveTableIndexes.forEach((i) => mappedTables.push(this.moveTables[i]));

      const pruningTable = new PruningTable(mappedTables, this.moves);

      this.pruningTables.push({
        pruningTable,
        moveTableIndexes,
      });
    });
  }

  handleSolution(solution: number[], indexes: number[]): { solution: number[]; indexes: number[] } | false {
    return {
      solution,
      indexes,
    };
  }

  search(indexes: number[], depth: number, lastMove: number, solution: number[]): { solution: number[]; indexes: number[] } | false {
    let minimumDistance = 0;

    for (const pruningTable of this.pruningTables) {
      let index = indexes[pruningTable.moveTableIndexes[0]];
      let power = 1;

      for (let j = 1; j < pruningTable.moveTableIndexes.length; j += 1) {
        power *= this.moveTables[pruningTable.moveTableIndexes[j - 1]].getSize();
        index += indexes[pruningTable.moveTableIndexes[j]] * power;
      }

      const distance = pruningTable.pruningTable.getPruningValue(index);

      if (distance > depth) {
        return false;
      }

      // The true minimum distance to the solved indexes is
      // given by the pruning table with the largest distance.
      if (distance > minimumDistance) {
        minimumDistance = distance;
      }
    }

    if (minimumDistance === 0) {
      return this.handleSolution(solution, indexes);
    }

    if (depth > 0) {
      for (const move of this.moves) {
        if (Math.floor(move / 3) !== Math.floor(lastMove / 3) && Math.floor(move / 3) !== Math.floor(lastMove / 3) - 3) {
          const updatedIndexes: number[] = [];

          for (let j = 0; j < indexes.length; j += 1) {
            updatedIndexes.push(this.moveTables[j].doMove(indexes[j], move));
          }

          const result = this.search(updatedIndexes, depth - 1, move, solution.concat([move]));

          if (result) {
            return result;
          }
        }
      }
    }

    return false;
  }

  solve(settings: Partial<Settings>): { solution: number[], formatted: string };
  solve(settings: Partial<Settings>, maxDepth: number): { solution: number[], formatted: string } | null;

  solve(settings: Partial<Settings>, maxDepth = 22): { solution: number[], formatted: string } | null {
    this.initialize();

    this.settings = { 
      maxDepth, // For the Kociemba solver.
      lastMove: null,
      ...settings,
    };

    const indexes = this.settings.indexes || [];

    let solutionRotation;

    if (this.settings.scramble) {
      const moves = parseAlgorithm(this.settings.scramble);
      const totalRotation = getTotalRotation(this.settings.scramble);

      if (totalRotation.length > 0) {
        solutionRotation = invertAlgorithm(totalRotation.join(' '));
      }

      for (const moveTable of this.moveTables) {
        indexes.push(moveTable.getDefaultIndex());
      }

      moves.forEach((move) => {
        for (let i = 0; i < indexes.length; i += 1) {
          indexes[i] = this.moveTables[i].doMove(indexes[i], move);
        }
      });
    }

    for (let depth = 0; depth <= this.settings.maxDepth; depth += 1) {
      const solution = this.search(indexes, depth, this.settings.lastMove, []);

      if (solution) {
        let formatted = formatAlgorithm(solution.solution);

        if (solutionRotation) {
          // If we have rotations in the scramble, apply the inverse to the solution
          // and then parse again to remove the rotations. This results in a
          // solution that can be applied from the result scramble orientation.
          formatted = formatAlgorithm(parseAlgorithm(`${solutionRotation} ${formatted}`));
        }

        return {
          solution: solution.solution,
          formatted,
        };
      }
    }

    return null;
  }
}

export default Search;
