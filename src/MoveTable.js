const createMoveHandler = (getVector, doMove, getIndex) => (index, move) => {
  let vector = getVector(index);
  vector = doMove(vector, move);
  return getIndex(vector);
};

const allMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

class MoveTable {
  constructor(settings) {
    // required if using the generic solver
    this.name = settings.name;
    this.size = settings.size; // hack: some tables override this

    this.defaultIndex = settings.defaultIndex || 0;
    this.solvedIndexes = settings.solvedIndexes || [this.defaultIndex];

    this.doMove = (index, move) => {
      if (settings.doMove) {
        return settings.doMove(this.table, index, move);
      }

      return this.table[index][move];
    };

    if (settings.table) {
      this.table = settings.table;
      return;
    }

    const cubieMove = createMoveHandler(
      settings.getVector,
      settings.cubieMove,
      settings.getIndex
    );

    this.createMoveTable(settings.size, cubieMove, settings.moves);
  }

  createMoveTable(size, cubieMove, moves = allMoves) {
    this.table = [];

    for (let i = 0; i < size; i += 1) {
      this.table.push([]);
    }

    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < moves.length; j += 1) {
        const move = moves[j];

        if (!this.table[i][move]) {
          const result = cubieMove(i, move);
          const inverse = move - 2 * (move % 3) + 2;
          this.table[i][move] = result;
          this.table[result][inverse] = i;
        }
      }
    }
  }
}

export default MoveTable;
