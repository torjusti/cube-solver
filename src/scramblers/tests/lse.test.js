import getLSEScramble from '../lse';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(309248823);

test('lse scrambler', () => {
  const scramble = getLSEScramble();
  const cube = doAlgorithm(scramble);

  if (!checkOriented(cube.eo, [4, 6, 8, 9, 10, 11])) {
    fail();
  }

  if (!checkOriented(cube.co, [0, 1, 2, 3, 4, 5, 6, 7])) {
    fail();
  }

  if (!checkPermuted(cube.ep, [4, 6, 8, 9, 10, 11])) {
    fail();
  }

  if (!checkPermuted(cube.cp, [0, 1, 2, 3, 4, 5, 6, 7])) {
    fail();
  }
});