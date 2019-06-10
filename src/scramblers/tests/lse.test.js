import getLSEScramble from '../lse';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(309248823);

test('lse scrambler', () => {
  const scramble = getLSEScramble();
  const cube = doAlgorithm(scramble);

  expect(checkOriented(cube.eo, [4, 6, 8, 9, 10, 11])).toBe(true);
  expect(checkOriented(cube.co, [0, 1, 2, 3, 4, 5, 6, 7])).toBe(true);
  expect(checkPermuted(cube.ep, [4, 6, 8, 9, 10, 11])).toBe(true);
  expect(checkPermuted(cube.cp, [0, 1, 2, 3, 4, 5, 6, 7])).toBe(true);
});
