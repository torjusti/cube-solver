// TODO: Never use slice for performance reasons

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
    for (let j = 0; j < arg[i].length; j += 1) {
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

  for (let i = 0; i < pieces.length - 1; i += 1) {
    sum = flipCount * sum + pieces[i];
  }

  return sum;
};

const getOrientationFromIndex = (index, numPieces, numFlips) => {
  const orientation = [];

  let parity = 0;

  for (let i = numPieces - 2; i >= 0; i -= 1) {
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

    for (let j = 0; j < 8; j += 1) {
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

const phaseTwoMoves = [1, 10, 4, 13, 6, 7, 8, 15, 16, 17];

class MoveTable {
  constructor(settings) {
    this.name = settings.name;
    this.size = settings.size;

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
    let size = moveTables.reduce((acc, obj) => acc * obj.size, 1);

    this.table = [];

    for (let i = 0; i < (size + 7) >> 3; i += 1) {
      this.table.push(-1);
    }

    let depth = 0, done = 0;

    const powers = [1];

    for (let i = 1; i < moveTables.length; i += 1) {
      powers.push(moveTables[i - 1].size * powers[i - 1]);
    }

    const permutations = cartesian(moveTables.map(data => data.solvedIndexes));

    for (let i = 0; i < permutations.length; i += 1) {
      let index = 0;

      for (let j = 0; j < permutations[i].length; j += 1) {
        index += powers[j] * permutations[i][j];
      }

      this.setPruningValue(index, 0);

      done += 1;
    }

    while (done !== size) {
      const inverse = done > size / 2;
      const find = inverse ? 0xf : depth;
      const check = inverse ? depth : 0xf;

      depth += 1;

      let value = 0;

      for (let index = 0; index < size; index += 1) {
        if (this.getPruningValue(index) !== find) {
          continue;
        }

        for (let moveIndex = 0; moveIndex < moves.length; moveIndex += 1) {
          const move = moves[moveIndex];

          let currentIndex = index, position = 0;

          for (let i = powers.length - 1; i >= 0; i -= 1) {
            position += powers[i] * moveTables[i].doMove(Math.floor(currentIndex / powers[i]), move);
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

const parseAlgorithm = algorithm => {
  const result = [];

  // TODO: Improve regex
  const moves = algorithm.match(/[FRUBLD][2']?/g);

  for (let move of moves) {
    const moveNum = 'FRUBLD'.indexOf(move.charAt(0));

    let pow = 0;

    if (move.length === 2) {
      if (move.charAt(1) === '2') {
        pow = 1;
      } else if (move.charAt(1) === '\'') {
        pow = 2;
      }
    }

    result.push(moveNum * 3 + pow);
  }

  return result;
};

const formatAlgorithm = moves => {
  let sequence = '';

  moves.forEach(move => {
    sequence += ' ';
    sequence += 'FRUBLD'.charAt(Math.floor(move / 3));

    switch (move % 3) {
      case 1:
        sequence += '2';
        break;
      case 2:
        sequence += '\'';
        break;
      default:
    }
  });

  return sequence;
};

class Search {
  constructor(moveTables, pruningTables, moves = allMoves) {
    this.moveTables = moveTables;

    this.pruningTables = [];

    this.moves = moves;

    for (let moveTableNames of pruningTables) {
      const moveTableIndexes = moveTableNames.map(name =>
        this.moveTables.map(table => table.name).indexOf(name));

      moveTableIndexes.sort((a, b) =>
        this.moveTables[a].size - this.moveTables[b].size);

      // TODO: Use different variable name
      const moveTables = [];

      moveTableIndexes.forEach(i => moveTables.push(this.moveTables[i]));

      const pruningTable = new PruningTable(moveTables, this.moves);

      this.pruningTables.push({
        pruningTable,
        moveTableIndexes,
      });
    }
  }

  * search(indexes, depth, lastMove, solution, startDepth) {
      let maximumDistance = 0;

      for (let i = 0; i < this.pruningTables.length; i += 1) {
        const powers = [1];

        for (let j = 1; j < this.pruningTables[i].moveTableIndexes.length; j += 1) {
          powers.push(this.moveTables[this.pruningTables[i].moveTableIndexes[j - 1]].size * powers[j - 1]);
        }

        let index = 0;

        for (let j = 0; j < this.pruningTables[i].moveTableIndexes.length; j += 1) {
          index += indexes[this.pruningTables[i].moveTableIndexes[j]] * powers[j];
        }

        const distance = this.pruningTables[i].pruningTable.getPruningValue(index);

        if (distance > depth) {
          return false;
        }

        if (distance > maximumDistance) {
          maximumDistance = distance;
        }
      }

      if (maximumDistance === 0) {
        if (this.phaseOne) {
          if (lastMove % 2 == 0 && Math.floor(lastMove / 3) === 6 && Math.floor(lastMove / 3) === 15) {
            return false;
          }
        }

        return {
          solution,
          indexes,
        };
      }

      if (depth > 0) {
        for (let i = 0; i < this.moves.length; i += 1) {
          const move = this.moves[i];

          if (Math.floor(move / 3) !== Math.floor(lastMove / 3) && Math.floor(move / 3) !== Math.floor(lastMove / 3) - 3) {
            const updatedIndexes = [];

            for (let j = 0; j < indexes.length; j++) {
              updatedIndexes.push(this.moveTables[j].doMove(indexes[j], move));
            }

            const result = this.search(updatedIndexes, depth - 1, move, solution.concat([move]), startDepth).next().value;

            if (result) {
              yield result;
            }
          }
        }
      }

      return false;
    }

    * solve(settings) {
      settings = Object.assign({
        minDepth: 0,
        maxDepth: 20,
        lastMove: -1,
      }, settings);

      const indexes = settings.indexes || [];

      // Unless indexes are provided.
      if (settings.scramble) {
        const moves = parseAlgorithm(settings.scramble);

        for (let i = 0; i < this.moveTables.length; i += 1) {
          indexes.push(this.moveTables[i].defaultIndex);
        }

        moves.forEach(move => {
          for (let i = 0; i < indexes.length; i += 1) {
            indexes[i] = this.moveTables[i].doMove(indexes[i], move);
          }
        });
      }

      for (let depth = settings.minDepth; depth < settings.maxDepth; depth += 1) {
        const generator = this.search(indexes, depth, settings.lastMove, [], depth);

        let solution = generator.next().value;

        while (solution) {
          yield solution;
          solution = generator.next().value;
        }
      }

      return;
    }
}

const getMergeCoord = (x, y) => {
  let a = getPermutationFromIndex(x, [0, 1, 2], 12);
  let b = getPermutationFromIndex(y, [3, 4, 5], 12);

  for (let i = 0; i < 8; i += 1) {
    if (a[i] !== -1) {
      if (b[i] !== -1) {
        return -1;
      } else {
        b[i] = a[i];
      }
    }
  }

  return getIndexFromPermutation(b, [0, 1, 2, 3, 4, 5]);
};

const parity = new MoveTable({
  name: 'parity',

  size: 2,

  table: [
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  ],
});

const URFToDLF = new MoveTable({
  name: 'URFToDLF',
  size: 20160,
  getVector: (index) => getPermutationFromIndex(index, [0, 1, 2, 3, 4, 5], 8),
  cubieMove: cornerPermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [0, 1, 2, 3, 4, 5]),
});

const slice = new MoveTable({
  name: 'slice',
  size: 11880,
  getVector: (index) => getPermutationFromIndex(index, [8, 9, 10, 11], 12, true),
  cubieMove: edgePermutationMove,
  getIndex: (pieces) => getIndexFromPermutation(pieces, [8, 9, 10, 11], true),
});

const slicePosition = new MoveTable({
  name: 'slicePosition',
  size: 495,
  table: slice.table,
  doMove: (table, index, move) => Math.floor(table[index * 24][move] / 24),
});

const slicePermutation = new MoveTable({
  name: 'slicePermutation',
  size: 24,
  table: slice.table,
});

const phaseOneMoveTables = [
  slicePosition,

  new MoveTable({
    name: 'twist',
    size: 2187,
    getVector: (index) => getOrientationFromIndex(index, 8, 3),
    cubieMove: cornerOrientationMove,
    getIndex: (twists) => getIndexFromOrientation(twists, 3),
  }),

  new MoveTable({
    name: 'flip',
    size: 2048,
    getVector: (index) => getOrientationFromIndex(index, 12, 2),
    cubieMove: edgeOrientationMove,
    getIndex: (flips) => getIndexFromOrientation(flips, 2),
  }),

  slice,

  parity,

  URFToDLF,

  new MoveTable({
    name: 'URToUL',
    size: 1320,
    getVector: (index) => getPermutationFromIndex(index, [0, 1, 2], 12),
    cubieMove: edgePermutationMove,
    getIndex: (pieces) => getIndexFromPermutation(pieces, [0, 1, 2]),
  }),

  new MoveTable({
    name: 'UBToDF',
    defaultIndex: 114,
    size: 1320,
    getVector: (index) => getPermutationFromIndex(index, [3, 4, 5], 12),
    cubieMove: edgePermutationMove,
    getIndex: (pieces) => getIndexFromPermutation(pieces, [3, 4, 5]),
  }),
];

const phaseOnePruningTables = [
  ['slicePosition'],
  ['slicePosition', 'flip'],
  ['slicePosition', 'twist'],
];

const phaseOne = new Search(phaseOneMoveTables, phaseOnePruningTables);

const merge = [];

for (let i = 0; i < 336; i += 1) {
  merge.push([]);

  for (let j = 0; j < 336; j += 1) {
    merge[i][j] = getMergeCoord(i, j);
  }
}

const phaseTwoMoveTables = [
  slicePermutation,

  parity,

  URFToDLF,

  new MoveTable({
    name: 'URToDF',
    size: 20160,
    moves: phaseTwoMoves,
    getVector: (index) => getPermutationFromIndex(index, [0, 1, 2, 3, 4, 5], 12),
    cubieMove: edgePermutationMove,
    getIndex: (vector) => getIndexFromPermutation(vector, [0, 1, 2, 3, 4, 5]),
  }),  slicePermutation,

];

const phaseTwoPruningTables = [
  ['slicePermutation', 'parity', 'URFToDLF'],
  ['slicePermutation', 'parity', 'URToDF'],
];

const phaseTwo = new Search(phaseTwoMoveTables, phaseTwoPruningTables, phaseTwoMoves);

const scramble  = "D B2 U2 L2 D' L2 B2 F2 U' F2 B' U' L D2 B U R2 D2 L B' L2";

const phaseOneSolution = phaseOne.solve({scramble}).next().value;

const phaseTwoSolution = phaseTwo.solve({
  indexes: [
    phaseOneSolution.indexes[3],
    phaseOneSolution.indexes[4],
    phaseOneSolution.indexes[5],
    merge[phaseOneSolution.indexes[6]][phaseOneSolution.indexes[7]],
  ],
}).next().value;

console.log(formatAlgorithm(phaseOneSolution.solution), formatAlgorithm(phaseTwoSolution.solution));
