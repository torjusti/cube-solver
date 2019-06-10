import getEdgesOnlyScramble from '../edges';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(4235632);

test('edges-only scrambler', () => {
  const scramble = getEdgesOnlyScramble();
  const cube = doAlgorithm(scramble);

  const ALL_CORNERS = [0, 1, 2, 3, 4, 5, 6, 7];

  expect(checkOriented(cube.co, ALL_CORNERS)).toBe(true);
  expect(checkPermuted(cube.cp, ALL_CORNERS)).toBe(true);
});
