const powers = {
  '': 0,
  '2': 1,
  '\'': 2,
};

export const parseAlgorithm = algorithm => {
  const result = [];

  const moves = algorithm.match(/[FRUBLD][2']?/g);

  for (let move of moves) {
    const moveNum = 'FRUBLD'.indexOf(move.charAt(0));
    let pow = powers[move.charAt(1)];
    result.push(moveNum * 3 + pow);
  }

  return result;
};

export const formatAlgorithm = moves => {
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
