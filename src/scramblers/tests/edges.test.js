import getEdgesOnlyScramble from '../edges';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(4235632);

test('cmll scrambler', () => {
  const scramble = getEdgesOnlyScramble();
  const cube = doAlgorithm(scramble);

  const ALL_CORNERS = [0, 1, 2, 3, 4, 5, 6, 7];

  if (!checkOriented(cube.co, ALL_CORNERS)) {
    fail();
  }

  if (!checkPermuted(cube.cp, ALL_CORNERS)) {
    fail();
  }
});
