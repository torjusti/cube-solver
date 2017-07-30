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

export const edgePermutationMove = (pieces, moveIndex) => {
  const move = edgeMoves[Math.floor(moveIndex / 3)];
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i += 1) {
    pieces = rotateParts(pieces, move);
  }

  return pieces;
};

export const edgeOrientationMove = (pieces, moveIndex) => {
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

export const cornerPermutationMove = (pieces, moveIndex) => {
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

export const cornerOrientationMove = (pieces, moveIndex) => {
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
