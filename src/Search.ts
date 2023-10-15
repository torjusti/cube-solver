import { parseAlgorithm, formatAlgorithm, invertAlgorithm, getTotalRotation } from './algorithms';
import PruningTable from './PruningTable';
import { allMoves } from './cube';
import { MoveTable } from './MoveTable';

interface PruningTableData {
  moveTableIndices: number[];
  pruningTable: PruningTable;
}

class Search {
  public createTables: () => { moveTables: MoveTable[], pruningTables: string[][] };

  public moves: number[];
  public moveTables: MoveTable[];
  public pruningTableData: PruningTableData[];
  public initialized: boolean;

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

    this.pruningTableData = [];

    pruningTables.forEach((moveTableNames) => {
      const moveTableIndices = moveTableNames.map((name) => this.moveTables.map((table) => table.getName()).indexOf(name));

      const mappedTables: MoveTable[] = [];

      moveTableIndices.forEach((i) => mappedTables.push(this.moveTables[i]));

      const pruningTable = new PruningTable(mappedTables, this.moves);

      this.pruningTableData.push({
        pruningTable,
        moveTableIndices,
      });
    });
  }

  handleSolution(solution: number[], indices: number[]): { solution: number[]; indices: number[] } | false {
    return {
      solution,
      indices,
    };
  }

  search(indices: number[], depth: number, lastMove: number, solution: number[]): { solution: number[]; indices: number[] } | false {
    let minimumDistance = 0;

    for (const entry of this.pruningTableData) {
      const distance = entry.pruningTable.getPruningValueForCoordinates(entry.moveTableIndices.map(i => indices[i]));

      if (distance > depth) {
        return false;
      }

      if (distance > minimumDistance) {
        minimumDistance = distance;
      }
    }

    if (minimumDistance === 0) {
      return this.handleSolution(solution, indices);
    }

    if (depth > 0) {
      for (const move of this.moves) {
        if (Math.floor(move / 3) !== Math.floor(lastMove / 3) && Math.floor(move / 3) !== Math.floor(lastMove / 3) - 3) {
          const updatedIndices: number[] = [];

          for (let j = 0; j < indices.length; j += 1) {
            updatedIndices.push(this.moveTables[j].doMove(indices[j], move));
          }

          const result = this.search(updatedIndices, depth - 1, move, solution.concat([move]));

          if (result) {
            return result;
          }
        }
      }
    }

    return false;
  }

  solve(scramble: string | number[]): { solution: number[], formatted: string };

  solve(scramble: string | number[], maxDepth?: number, lastMove?: number): { solution: number[], formatted: string } | null;

  solve(scramble: number[] | string = [], maxDepth = 22, lastMove?: number): { solution: number[], formatted: string } | null {
    this.initialize();

    let solutionRotation;

    const indices = typeof scramble === 'string' ? [] : scramble;

    if (typeof scramble === 'string') {
      const moves = parseAlgorithm(scramble);
      const totalRotation = getTotalRotation(scramble);

      if (totalRotation.length > 0) {
        solutionRotation = invertAlgorithm(totalRotation.join(' '));
      }

      for (const moveTable of this.moveTables) {
        indices.push(moveTable.getDefaultIndex());
      }

      moves.forEach((move) => {
        for (let i = 0; i < indices.length; i += 1) {
          if (!this.moves.includes(move)) {
            throw new Error('Scramble contains move not in set of allowed moves');
          }

          indices[i] = this.moveTables[i].doMove(indices[i], move);
        }
      });
    }

    for (let depth = 0; depth <= maxDepth; depth += 1) {
      const solution = this.search(indices, depth, lastMove, []);

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
