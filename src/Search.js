import { parseAlgorithm, formatAlgorithm } from './algorithms';
import PruningTable from './PruningTable';

const allMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

class Search {
  constructor(createTables, moves = allMoves) {
    this.createTables = createTables;
    this.moves = moves;
  }

  initialize() {
    this.initialized = true;

    const { moveTables, pruningTables } = this.createTables();

    this.moveTables = moveTables;

    this.pruningTables = [];

    pruningTables.forEach((moveTableNames) => {
      const moveTableIndexes = moveTableNames.map(name =>
        this.moveTables.map(table => table.name).indexOf(name));

      moveTableIndexes.sort((a, b) =>
        this.moveTables[a].size - this.moveTables[b].size);

      const mappedTables = [];

      moveTableIndexes.forEach(i => mappedTables.push(this.moveTables[i]));

      const pruningTable = new PruningTable(mappedTables, this.moves);

      this.pruningTables.push({
        pruningTable,
        moveTableIndexes,
      });
    });
  }

  handleSolution(solution, indexes) {
    return {
      solution,
      indexes,
    };
  }

  search(indexes, depth, lastMove, solution) {
    let minimumDistance = 0;

    for (let i = 0; i < this.pruningTables.length; i += 1) {
      let index = indexes[this.pruningTables[i].moveTableIndexes[0]];
      let power = 1;

      for (let j = 1; j < this.pruningTables[i].moveTableIndexes.length; j += 1) {
        power *= this.moveTables[this.pruningTables[i].moveTableIndexes[j - 1]].size;
        index += indexes[this.pruningTables[i].moveTableIndexes[j]] * power;
      }

      const distance = this.pruningTables[i].pruningTable.getPruningValue(index);

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
      for (let i = 0; i < this.moves.length; i += 1) {
        const move = this.moves[i];

        // Do not use moves that cancels. Note that R L is the same as L R.
        // We therfore also disallow moves which are parallel to the last move.
        if (Math.floor(move / 3) !== Math.floor(lastMove / 3) && Math.floor(move / 3)
            !== Math.floor(lastMove / 3) - 3) {
          const updatedIndexes = [];

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

  solve(settings) {
    if (!this.initialized) {
      this.initialize();
    }

    this.settings = Object.assign({
      maxDepth: 22, // For the Kociemba solver
      lastMove: null,
      format: true,
    }, settings);

    const indexes = this.settings.indexes || [];

    if (this.settings.scramble) {
      const moves = parseAlgorithm(this.settings.scramble);

      for (let i = 0; i < this.moveTables.length; i += 1) {
        indexes.push(this.moveTables[i].defaultIndex);
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
        return this.settings.format ? formatAlgorithm(solution.solution) : solution;
      }
    }

    return false;
  }
}

export default Search;
