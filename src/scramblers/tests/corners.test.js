
import getCornersOnlyScramble from '../corners';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(7980909);

test('cmll scrambler', () => {
  const scramble = getCornersOnlyScramble();
  const cube = doAlgorithm(scramble);

  const ALL_EDGES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  if (!checkOriented(cube.eo, ALL_EDGES)) {
    fail();
  }

  if (!checkPermuted(cube.ep, ALL_EDGES)) {
    fail();
  }
});