// We define moves as the four pieces which are
// rotated in a circular fashion.
const edgeMoves =  [
  [1, 8, 5, 9],
  [0, 11, 4, 8],
  [1, 2, 3, 0],
  [3, 10, 7, 11],
  [2, 9, 6, 10],
  [5, 4, 7, 6],
];

// Corner moves are defined in the same way as
// the edge moves are defined.
const cornerMoves = [
  [1, 0, 4, 5],
  [0, 3, 7, 4],
  [0, 1, 2, 3],
  [3, 2, 6, 7],
  [2, 1, 5, 6],
  [5, 4, 7, 6],
];

/**
 * Rotates the subarray containing the affected pieces
 * to the right by one.
 */
const rotateParts = (pieces, affected) => {
  const updatedPieces = pieces.slice(0);

  updatedPieces[affected[0]] = pieces[affected[affected.length - 1]];

  for (let i = 1; i < affected.length; i += 1) {
    updatedPieces[affected[i]] = pieces[affected[i - 1]];
  }

  return updatedPieces;
};

/**
 * Helper function to perform a corner or edge permutation move
 * to the given permutation vector.
 */
const permutationMove = (pieces, moveIndex, moves) => {
  const move = moves[Math.floor(moveIndex / 3)];
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i += 1) {
    pieces = rotateParts(pieces, move);
  }

  return pieces;
};

/**
 * Perform a move to an edge permutaion vector.
 */
export const edgePermutationMove = (pieces, moveIndex) =>
  permutationMove(pieces, moveIndex, edgeMoves);

/**
 * Perform a move to a corner permuttaion vector.
 */
export const cornerPermutationMove = (pieces, moveIndex) =>
  permutationMove(pieces, moveIndex, cornerMoves);

/**
 * Perform a move to an edge orientation vector.
 */
export const edgeOrientationMove = (pieces, moveIndex) => {
  const moveNumber = Math.floor(moveIndex / 3);
  const move = edgeMoves[moveNumber];
  const pow = moveIndex % 3;

  let updatedPieces = edgePermutationMove(pieces, moveIndex);

  // Only quarter moves of the F and B faces affect the edge orientation.
  if ((moveNumber === 0 || moveNumber === 3) && pow % 2 === 0) {
    for (let i = 0; i < 4; i += 1) {
      updatedPieces[move[i]] = (updatedPieces[move[i]] + 1) % 2;
    }
  }

  return updatedPieces;
};

/**
 * Perform a move to a corner orientation vector.
 */
export const cornerOrientationMove = (pieces, moveIndex) => {
  const moveNumber = Math.floor(moveIndex / 3);
  const move = cornerMoves[moveNumber];
  const pow = moveIndex % 3;

  let updatedPieces = cornerPermutationMove(pieces, moveIndex);

  // Only quarter moves of any slice but the U and D slices
  // affect the corner orientation.
  if (moveNumber !== 2 && moveNumber !== 5 && pow % 2 === 0) {
    for (let i = 0; i < 4; i += 1) {
      updatedPieces[move[i]] = (updatedPieces[move[i]] + ((i + 1) % 2) + 1) % 3;
    }
  }

  return updatedPieces;
};
