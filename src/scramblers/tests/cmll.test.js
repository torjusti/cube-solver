
import getCMLLScramble from '../cmll';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(7980909);

test('cmll scrambler', () => {
  const scramble = getCMLLScramble();
  const cube = doAlgorithm(scramble);

  if (!checkOriented(cube.eo, [4, 6, 8, 9, 10, 11])) {
    fail();
  }

  if (!checkOriented(cube.co, [4, 5, 6, 7])) {
    fail();
  }

  if (!checkPermuted(cube.ep, [4, 6, 8, 9, 10, 11])) {
    fail();
  }

  if (!checkPermuted(cube.cp, [4, 5, 6, 7])) {
    fail();
  }
});