import get2GLLScramble from '../2gll';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(879998076);

test('2gll scrambler', () => {
  const scramble = get2GLLScramble();
  const cube = doAlgorithm(scramble);

  expect(checkOriented(cube.eo, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toBe(true);
  expect(checkPermuted(cube.cp, [0, 1, 2, 3, 4, 5, 6, 7], true)).toBe(true);
  expect(checkPermuted(cube.ep, [4, 5, 6, 7, 8, 9, 10, 11])).toBe(true);
  expect(checkOriented(cube.co, [4, 5, 6, 7])).toBe(true);
});
