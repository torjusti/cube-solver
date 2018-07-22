import get2GLLScramble from '../2gll';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock();

test('2gll scrambler', () => {
  const scramble = get2GLLScramble();
  const cube = doAlgorithm(scramble);

  if (!checkOriented(cube.eo, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])) {
    fail();
  }

  if (!checkOriented(cube.co, [4, 5, 6, 7])) {
    fail();
  }

  if (!checkPermuted(cube.ep, [4, 5, 6, 7, 8, 9, 10, 11])) {
    fail();
  }

  if (!checkPermuted(cube.cp, [0, 1, 2, 3, 4, 5, 6, 7])) {
    fail();
  }
});