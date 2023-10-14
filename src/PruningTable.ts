import { MoveTable } from './MoveTable';
import { cartesian } from './tools';

/**
 * A pruning table gives a lower bound on the number of moves
 * required to reach a target state.
 */
class PruningTable {
  private table: number[];

  constructor(moveTables: MoveTable[], moves: number[]) {
    this.computePruningTable(moveTables, moves);
  }

  setPruningValue(index: number, value: number) {
    this.table[index >> 3] ^= (0xf ^ value) << ((index & 7) << 2);
  }

  getPruningValue(index: number) {
    return (this.table[index >> 3] >> ((index & 7) << 2)) & 0xf;
  }

  computePruningTable(moveTables: MoveTable[], moves: number[]) {
    const size = moveTables.reduce((acc, obj) => acc * obj.getSize(), 1);

    this.table = [];

    for (let i = 0; i < (size + 7) >> 3; i += 1) {
      this.table.push(-1);
    }

    let depth = 0;
    let done = 0;

    const powers = [1];

    for (let i = 1; i < moveTables.length; i += 1) {
      powers.push(moveTables[i - 1].getSize() * powers[i - 1]);
    }

    const permutations = cartesian(moveTables.map((data) => data.getSolvedIndices()));

    for (const permutation of permutations) {
      let index = 0;

      for (let j = 0; j < permutation.length; j += 1) {
        index += powers[j] * permutation[j];
      }

      this.setPruningValue(index, 0);

      done += 1;
    }

    // We generate the table using a BFS. Depth 0 contains all positions which
    // are solved, and we loop through the correct indexes and apply all 18 moves
    // to the correct states. Then we visit all positions at depth 2, and apply
    // the 18 moves, and so on.
    while (done !== size) {
      // When half the table is generated, we switch to a backward search
      // where we apply the 18 moves to all empty entries. If the result
      // is a position which corresponds to the previous depth, we set the
      // index to the current depth.
      const inverse = done > size / 2;
      const find = inverse ? 0xf : depth;
      const check = inverse ? depth : 0xf;

      depth += 1;

      for (let index = 0; index < size; index += 1) {
        if (this.getPruningValue(index) === find) {
          for (const move of moves) {
            let currentIndex = index;
            let position = 0;

            for (let i = powers.length - 1; i >= 0; i -= 1) {
              position += powers[i] * moveTables[i].doMove(Math.floor(currentIndex / powers[i]), move);
              currentIndex %= powers[i];
            }

            if (this.getPruningValue(position) === check) {
              done += 1;

              if (inverse) {
                this.setPruningValue(index, depth);
                break;
              }

              this.setPruningValue(position, depth);
            }
          }
        }
      }
    }
  }
}

export default PruningTable;
