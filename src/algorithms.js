/**
 * Numeric representation of the different powers of moves.
 */
const powers = {
  '': 0,
  2: 1,
  '\'': 2,
};

/**
 * Check whether or not we are able to parse the given algorithm string.
 */
export const validateAlgorithm = algorithm => /^([FRUBLD][2']?\s*)+$/.test(algorithm);

/**
 * Parses a scramble, returning an array of integers describing the moves.
 */
export const parseAlgorithm = (algorithm) => {
  if (!validateAlgorithm(algorithm)) {
    throw new Error('Invalid algorithm provided to algorithm parser');
  }

  const result = [];

  const moves = algorithm.match(/[FRUBLD][2']?/g);

  moves.forEach((move) => {
    const moveNum = 'FRUBLD'.indexOf(move.charAt(0));
    const pow = powers[move.charAt(1)];
    result.push(moveNum * 3 + pow);
  });

  return result;
};

/**
 * Convert an array of integers to a human-readable representation.
 */
export const formatAlgorithm = (moves) => {
  let sequence = '';

  moves.forEach((move) => {
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

  // Trim extra spaces.
  return sequence.trim();
};
