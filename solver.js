const factorial = (n) => {
  let res = 1;

  for (let i = 2; i <= n; i += 1) {
    res *= i;
  }

  return res;
};

const binomials = [];

const choose = (n, k) => {
  if (k > n) {
    return 0;
  }

  while (n >= binomials.length) {
    let s = binomials.length, nextRow = [];

    nextRow[0] = 1;

    for (let i = 1, prev= s - 1; i < s; i += 1) {
      nextRow[i] = binomials[prev][i-1] + binomials[prev][i];
    }

    nextRow[s] = 1;

    binomials.push(nextRow);
  }

  return binomials[n][k];
};

const cartesian = arg => {
  const result = [], max = arg.length - 1;

  const helper = (arr, i) => {
    for (let j = 0; j < arg[i].length; j++) {
      const copy = arr.slice(0);

      copy.push(arg[i][j]);

      if (i === max) {
        result.push(copy);
      } else {
        helper(copy, i + 1);
      }
    }
  };

  helper([], 0);

  return result;
};

const rotateLeft = (pieces, left, right) => {
  const original = pieces[left];

  for (let i = left; i < right; i += 1) {
    pieces[i] = pieces[i + 1];
  }

  pieces[right] = original;
};

const rotateRight = (pieces, left, right) => {
  const original = pieces[right];

  for (let i = right; i > left; i -= 1) {
    pieces[i] = pieces[i - 1];
  }

  pieces[left] = original;
};

const getIndexFromOrientation = (pieces, flipCount) => {
  let sum = 0;

  for (let i = 0; i < pieces.length - 1; i++) {
    sum = flipCount * sum + pieces[i];
  }

  return sum;
};

const getOrientationFromIndex = (index, numPieces, numFlips) => {
  const orientation = [];

  let parity = 0;

  for (let i = numPieces - 2; i >= 0; i--) {
    const ori = index % numFlips;
    index = Math.floor(index / numFlips);
    orientation[i] = ori;
    parity += ori;
  }

  orientation[numPieces - 1] = (numFlips - parity % numFlips) % numFlips;

  return orientation;
};

const getParity = (pieces) => {
  let sum = 0;

  for (let i = pieces.length - 1; i > 0; i -= 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      if (pieces[j] > pieces[i]) {
        sum += 1;
      }
    }
  }

  return sum % 2;
};

const getIndexFromPermutation = (pieces, affected, reversed = false) => {
  let position = 0, k = 1, offset = pieces.length - 1;

  const edges = [];

  if (reversed) {
    for (let n = pieces.length - 1; n >= 0; n -= 1) {
      if (affected.indexOf(pieces[n]) >= 0) {
        offset = Math.min(offset, pieces[n]);
        position += choose(pieces.length - 1 - n, k);
        edges.unshift(pieces[n]);
        k += 1;
      }
    }
  } else {
    for (let n = 0; n < pieces.length; n += 1) {
      if (affected.indexOf(pieces[n]) >= 0) {
        offset = Math.min(offset, pieces[n]);
        position += choose(n, k);
        edges.push(pieces[n]);
        k += 1;
      }
    }
  }

  let permutation = 0;

  for (let i = edges.length - 1; i > 0; i -= 1) {
    let s = 0;

    while (edges[i] != i + offset) {
      rotateLeft(edges, 0, i);
      s += 1;
    }

    permutation = (i + 1) * permutation + s;
  }

  return factorial(affected.length) * position + permutation;
};

const getPermutationFromIndex = (index, affected, size, reversed = false) => {
  const base = factorial(affected.length);

  let position = Math.floor(index / base);
  let permutation = index % base;

  const pieces = [];

  for (let i = 0; i < size; i += 1) {
    pieces.push(-1);
  }

  for (let i = 1; i < affected.length; i += 1) {
    let s = permutation % (i + 1);
    permutation = Math.floor(permutation / (i + 1));

    while (s > 0) {
      rotateRight(affected, 0, i);
      s -= 1;
    }
  }

  let k = affected.length - 1;

  if (reversed) {
    for (let n = 0; n < size; n += 1) {
      const binomial = choose(size - 1 - n, k + 1);

      if (position - binomial >= 0) {
        pieces[n] = affected[affected.length - 1 - k];
        position -= binomial;
        k -= 1;
      }
    }
  } else {
    for (let n = size - 1; n >= 0; n -= 1) {
      const binomial = choose(n, k + 1);

      if (position - binomial >= 0) {
        pieces[n] = affected[k];
        position -= binomial;
        k -= 1;
      }
    }
  }

  return pieces;
};

const edgeMoves =  [
  [1, 8, 5, 9],
  [0, 11, 4, 8],
  [1, 2, 3, 0],
  [3, 10, 7, 11],
  [2, 9, 6, 10],
  [5, 4, 7, 6],
];

const cornerPermutationMoves = [
  [1, 5, 2, 3, 0, 4, 6, 7],
  [4, 1, 2, 0, 7, 5, 6, 3],
  [3, 0, 1, 2, 4, 5, 6, 7],
  [0, 1, 3, 7, 4, 5, 2, 6],
  [0, 2, 6, 3, 4, 1, 5, 7],
  [0, 1, 2, 3, 5, 6, 7, 4],
];

const cornerOrientationMoves = [
  [1, 2, 0, 0, 2, 1, 0, 0],
  [2, 0, 0, 1, 1, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 0, 0, 2, 1],
  [0, 1, 2, 0, 0, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const rotateParts = (edges, elems) => {
  const updatedPieces = edges.slice(0);

  updatedPieces[elems[0]] = edges[elems[elems.length - 1]];

  for (let i = 1; i < elems.length; i += 1) {
    updatedPieces[elems[i]] = edges[elems[i - 1]];
  }

  return updatedPieces;
};

const edgePermutationMove = (pieces, moveIndex) => {
  const move = edgeMoves[Math.floor(moveIndex / 3)];
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i += 1) {
    pieces = rotateParts(pieces, move);
  }

  return pieces;
};

const edgeOrientationMove = (pieces, moveIndex) => {
  const moveNumber = Math.floor(moveIndex / 3);
  const move = edgeMoves[moveNumber];
  const pow = moveIndex % 3;

  let updatedPieces = edgePermutationMove(pieces, moveIndex);

  if ((moveNumber === 0 || moveNumber === 3) && pow % 2 === 0) {
    for (let i = 0; i < 4; i += 1) {
      updatedPieces[move[i]] = (updatedPieces[move[i]] + 1) % 2;
    }
  }

  return updatedPieces;
};

const cornerPermutationMove = (pieces, moveIndex) => {
  const move = cornerPermutationMoves[Math.floor(moveIndex / 3)];
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i += 1) {
    const round = pieces.slice(0);

    for (let j = 0; j < 8; j += 1) {
      pieces[j] = round[move[j]];
    }
  }

  return pieces;
};

const cornerOrientationMove = (pieces, moveIndex) => {
  const move = Math.floor(moveIndex / 3);
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i += 1) {
    const round = pieces.slice(0);

    for (let j = 0; j < 8; j++) {
      const from = cornerPermutationMoves[move][j];
      pieces[j] = (round[from] + cornerOrientationMoves[move][j]) % 3;
    }
  }

  return pieces;
};

const createMoveHandler = (getVector, doMove, getIndex) => (index, move) => {
  let vector = getVector(index);
  vector = doMove(vector, move);
  return getIndex(vector);
};

const allMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

class MoveTable {
  constructor(settings) {
    this.defaultIndex = defaultIndex;
    this.solvedIndexes = solvedIndexes || [defaultIndex];

    const doMove = createMoveHandler(
      settings.getVector,
      settings.doMove,
      settings.getIndex
    );

    this.createMoveTable(settings.size, doMove, settings.moves);
  }

  createMoveTable(size, doMove, moves = allMoves) {
    this.table = [];

    for (let i = 0; i < size; i += 1) {
      this.table.push([]);
    }

    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < moves.length; j += 1) {
        const move = moves[j];

        if (!this.table[i][move]) {
          const result = doMove(i, move);
          const inverse = move - 2 * (move % 3) + 2;
          this.table[i][move] = result;
          this.table[result][inverse] = i;
        }
      }
    }
  }

  doMove(index, move) {
    return this.table[index][move];
  }

  getSize() {
    return this.table.length;
  }
}

const createMoveTable = (settings) => {
  const table = [];

  const doMove = createMoveHandler(
    settings.getVector,
    settings.doMove,
    settings.getIndex
  );

  const moves = settings.moves || allMoves;

  for (let i = 0; i < settings.size; i += 1) {
    table.push([]);
  }

  for (let i = 0; i < settings.size; i += 1) {
    for (let j = 0; j < moves.length; j += 1) {
      const move = moves[j];

      if (!table[i][move]) {
        const result = doMove(i, move);
        const inverse = move - 2 * (move % 3) + 2;
        table[i][move] = result;
        table[result][inverse] = i;
      }
    }
  }

  return table;
};

const twistMoves = createMoveTable({
  size: 2187,
  getVector: (index) => getOrientationFromIndex(index, 8, 3),
  doMove: cornerOrientationMove,
  getIndex: (twists) => getIndexFromOrientation(twists, 3),
});

const flipMoves = createMoveTable({
  size: 2048,
  getVector: (index) => getOrientationFromIndex(index, 12, 2),
  doMove: edgeOrientationMove,
  getIndex: (flips) => getIndexFromOrientation(flips, 2),
});

const parityMoves = [
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
];

const FRToBR = createMoveTable({
  size: 11880,
  getVector: (index) => getPermutationFromIndex(index, [8, 9, 10, 11], 12),
  doMove: edgePermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [8, 9, 10, 11], true),
});

const URFToDLF = createMoveTable({
  size: 20160,
  getVector: (index) => getPermutationFromIndex(index, [0, 1, 2, 3, 4, 5], 8),
  doMove: cornerPermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [0, 1, 2, 3, 4, 5]),
});

const phaseTwoMoves = [1, 10, 4, 13, 6, 7, 8, 15, 16, 17];

const URToDF = createMoveTable({
  size: 20160,
  moves: phaseTwoMoves,
  getVector: (index) => getPermutationFromIndex(index, [0, 1, 2, 3, 4, 5], 12),
  doMove: edgePermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [0, 1, 2, 3, 4, 5]),
});

const getMergeCoord = (x, y) => {
  let a = getPermutationFromIndex(x, [0, 1, 2], 12);
  let b = getPermutationFromIndex(y, [3, 4, 5], 12);

  for (let i = 0; i < 8; i += 1) {
    if (a !== -1) {
      if (b !== -1) {
        return -1;
      } else {
        b[i] = a[i];
      }
    }
  }

  return getIndexFromPermutation(a.concat(b), [0, 1, 2, 3, 4, 5], 8);
};

const merge = [];

for (let i = 0; i < 1320; i += 1) {
  merge.push([]);

  for (let j = 0; j < 1320; j += 1) {
    merge[i][j] = getMergeCoord(i, j);
  }
}

const URToUL = createMoveTable({
  size: 1320,
  getVector: (index) => getPermutationFromIndex(index, [0, 1, 2], 12),
  doMove: edgePermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [0, 1, 2]),
});

const UBToDF = createMoveTable({
  size: 1320,
  getVector: (index) => getPermutationFromIndex(index, [3, 4, 5], 12),
  doMove: edgePermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [3, 4, 5]),
});

class PruningTable {
  constructor(moveTables, moves = allMoves) {
    this.computePruningTable(moveTables, moves);
  }

  setPruningValue(index, value) {
     this.table[index >> 3] ^= (0xf ^ value) << ((index & 7) << 2);
  }

  getPruningValue(index) {
    return this.table[index >> 3] >> ((index & 7) << 2) & 0xf;
  }

  computePruningTable(moveTables, moves) {
    let size = moveTables.reduce((acc, obj) => acc * obj.getSize(), 1);

    this.table = [];

    for (let i = 0; i < (size + 7) >> 3; i++) {
      this.table.push(-1);
    }

    let depth = 0, done = 0;

    const powers = [1];

    for (let i = 1; i < moveTables.length; i++) {
      powers.push(moveTables[i - 1].getSize() * powers[i - 1]);
    }

    const permutations = cartesian(moveTables.map(data => data.solvedIndexes));

    for (let i = 0; i < permutations.length; i++) {
      let index = 0;

      for (let j = 0; j < permutations[i].length; j++) {
        index += powers[j] * permutations[i][j];
      }

      this.setPruningValue(index, 0);
      done += 1;
    }

    while (done !== size) {
      // When we are halfway done with the entries in the pruning table, we
      // flip to backward search. This speeds up the initialization phase.
      const inverse = done >= size / 2;
      const find = inverse ? 0xf : depth;
      const check = inverse ? depth : 0xf;

      depth += 1;

      let value = 0;

      for (let index = 0; index < size; index++) {
        if (this.getPruningValue(index) !== find) {
          continue;
        }

        for (let moveIndex = 0; moveIndex < moves.length; moveIndex++) {
          const move = moves[moveIndex];

          let currentIndex = index, position = 0;

          for (let i = powers.length - 1; i >= 0; i--) {
            position += powers[i] * moveTables[i].doMove(~~(currentIndex / powers[i]), move);
            currentIndex = currentIndex % powers[i];
          }

          if (this.getPruningValue(position) !== check) {
            continue;
          }

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
