import Chance from 'chance';

export const configureMathMock = seed => {
  const chances = {};

  const math = Object.create(Math);

  math.random = seed => {
    chances[seed] = chances[seed] || new Chance(seed);
    return chances[seed].random();
  };

  global.Math = math;
};

export const checkOriented = (vector, oriented) =>
  oriented.every(piece => vector[piece] === 0);

export const checkPermuted = (vector, permuted) =>
  permuted.every(piece => vector[piece] === piece);

export const getAllBut = (pieces, size) => {
  const allPieces = [];

  for (let i = 0; i < size; i += 1) {
    allPieces.push(i);
  }

  return allPieces.filter(piece => !pieces.includes(piece));
};