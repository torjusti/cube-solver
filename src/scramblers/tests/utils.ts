import Chance from 'chance';
import { adjustUpperFace } from '../scramblePieces';

export const configureMathMock = (seed: number) => {
  const chances: { [key: number]: any } = {};

  const math = Object.create(Math);

  math.random = () => {
    chances[seed] = chances[seed] || new Chance(seed);
    return chances[seed].random();
  };

  global.Math = math;
};

const allOriented = (oriented: number[], vector: number[]) => oriented.every((piece) => vector[piece] === 0);

export const checkOriented = (vector: number[], oriented: number[], allowAdjustedUpperFace = false) => {
  for (let i = 0; i < (allowAdjustedUpperFace ? 4 : 1); i += 1) {
    if (allOriented(oriented, vector)) {
      return true;
    }

    vector = adjustUpperFace(vector, 1);
  }

  return false;
};

const allPermuted = (permuted: number[], vector: number[]) => permuted.every((piece) => vector[piece] === piece);

export const checkPermuted = (vector: number[], permuted: number[], allowAdjustedUpperFace = false) => {
  for (let i = 0; i < (allowAdjustedUpperFace ? 4 : 1); i += 1) {
    if (allPermuted(permuted, vector)) {
      return true;
    }

    vector = adjustUpperFace(vector, 1);
  }

  return false;
};

export const getAllBut = (pieces: number[], size: number) => {
  const allPieces: number[] = [];

  for (let i = 0; i < size; i += 1) {
    allPieces.push(i);
  }

  return allPieces.filter((piece) => !pieces.includes(piece));
};
