import Chance from 'chance'; // eslint-disable-line import/no-extraneous-dependencies
import { adjustUpperFace } from '../scramblePieces';

export const configureMathMock = (seed) => {
  const chances = {};

  const math = Object.create(Math);

  math.random = () => {
    chances[seed] = chances[seed] || new Chance(seed);
    return chances[seed].random();
  };

  global.Math = math;
};

const allOriented = (oriented, vector) => oriented.every((piece) => vector[piece] === 0);

export const checkOriented = (vector, oriented, allowAdjustedUpperFace = false) => {
  for (let i = 0; i < allowAdjustedUpperFace ? 4 : 1; i += 1) {
    if (allOriented(oriented, vector)) {
      return true;
    }

    vector = adjustUpperFace(vector, 1);
  }

  return false;
};

const allPermuted = (permuted, vector) => permuted.every((piece) => vector[piece] === piece);

export const checkPermuted = (vector, permuted, allowAdjustedUpperFace = false) => {
  for (let i = 0; i < allowAdjustedUpperFace ? 4 : 1; i += 1) {
    if (allPermuted(permuted, vector)) {
      return true;
    }

    vector = adjustUpperFace(vector, 1);
  }

  return false;
};

export const getAllBut = (pieces, size) => {
  const allPieces = [];

  for (let i = 0; i < size; i += 1) {
    allPieces.push(i);
  }

  return allPieces.filter((piece) => !pieces.includes(piece));
};
