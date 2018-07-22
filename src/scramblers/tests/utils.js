import Chance from 'chance';

export const configureMathMock = () => {
    const chances = {};

    const math = Object.create(Math);

    math.random = (seed = 1337) => {
    chances[seed] = chances[seed] || new Chance(seed);
    return chances[seed].random();
    };

    global.Math = math;
};

export const checkOriented = (vector, oriented) =>
  oriented.every(piece => vector[piece] === 0);

export const checkPermuted = (vector, permuted) =>
  permuted.every(piece => vector[piece] === piece);