// Numeric representation of the different powers of moves.
const powers = {
  '': 0,
  2: 1,
  "'": 2,
};

/**
 * Check whether or not we are able to parse the given algorithm string.
 */
const validateAlgorithm = (algorithm: string) => /^([FRUBLDfrubldxyzMSE][2']?\s*)+$/.test(algorithm);

// Map single-power wide moves to a rotation + moves.
const wideMoves = {
  f: ['z', 'B'],
  r: ['x', 'L'],
  u: ['y', 'D'],
  b: ["z'", 'F'],
  l: ["x'", 'R'],
  d: ["y'", 'U'],
  M: ["x'", 'R', "L'"],
  S: ['z', "F'", 'B'],
  E: ["y'", 'U', "D'"],
};

// Specifies the translation of FRUBLD as performed by rotations.
const rotations = {
  x: 'DRFULB',
  y: 'RBULFD',
  z: 'FULBDR',
};

/**
 * Strip rotations and wide moves from an algorithm. Returns
 * an array of moves as strings.
 */
const normalize = (moves: string[]) => {
  // Replace wide moves with rotations + moves.
  moves = moves.reduce((acc: string[], move) => {
    const axis = move.charAt(0) as keyof typeof wideMoves;
    const pow = powers[move.charAt(1) as keyof typeof powers];

    if (wideMoves[axis]) {
      for (let i = 0; i <= pow; i += 1) {
        acc = acc.concat(wideMoves[axis]);
      }

      return acc;
    }

    return acc.concat(move);
  }, []);

  let output: string[] = [];

  // We store all rotations that were encountered, to map the
  // solution to the same final rotation as the scramble.
  const totalRotation: string[] = [];

  // Remove rotations by mapping all moves to the right of the rotation.
  for (let i = moves.length - 1; i >= 0; i -= 1) {
    const axis = moves[i].charAt(0) as keyof typeof rotations;
    const pow = powers[moves[i].charAt(1) as keyof typeof powers];

    if ('xyz'.includes(axis)) {
      totalRotation.unshift(moves[i]);

      for (let j = 0; j <= pow; j += 1) {
        output = output.map((outputMove) => rotations[axis]['FRUBLD'.indexOf(outputMove[0])] + outputMove.charAt(1));
      }
    } else {
      output.unshift(moves[i]);
    }
  }

  return [output, totalRotation];
};

export const getChunks = (algorithm: string): string[] => {
  const result = algorithm.match(/[FRUBLDfrubldxyzMSE][2']?/g);

  if (!validateAlgorithm(algorithm) || !result) {
    throw new Error('Invalid algorithm provided to algorithm parser');
  }

  return result;
};

/**
 * Parses a scramble, returning an array of integers describing the moves.
 */
export const parseAlgorithm = (algorithm: string) => {
  const [moves, totalRotation] = normalize(
    getChunks(algorithm)
  );

  const result: number[] = [];

  moves.forEach((move) => {
    const moveNum = 'FRUBLD'.indexOf(move.charAt(0));
    const pow = powers[move.charAt(1) as keyof typeof powers];
    result.push(moveNum * 3 + pow);
  });

  return result;
};

export const getTotalRotation = (algorithm: string) => normalize(getChunks(algorithm))[1];

/**
 * Computes the inverse of a given algorithm. Rotations are supported.
 */
export const invertAlgorithm = (algorithm: string) => {
  const moves = getChunks(algorithm);

  const inverted = moves.reverse().map((move) => {
    const axis = move.charAt(0);
    const pow = powers[move.charAt(1) as keyof typeof powers];
    const inv = pow - 2 * (pow % 3) + 2;

    if (inv === 1) {
      return `${axis}2`;
    }

    if (inv === 2) {
      return `${axis}'`;
    }

    return axis;
  });

  return inverted.join(' ');
};

/**
 * Convert an array of integers to a human-readable representation.
 */
export const formatAlgorithm = (moves: number[]) => {
  let sequence = '';

  moves.forEach((move) => {
    sequence += ' ';
    sequence += 'FRUBLD'.charAt(Math.floor(move / 3));

    switch (move % 3) {
      case 1:
        sequence += '2';
        break;

      case 2:
        sequence += "'";
        break;

      default:
    }
  });

  // Trim extra spaces.
  return sequence.trim();
};
