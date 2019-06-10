import getCMLLScramble from '../cmll';
import { doAlgorithm } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted } from './utils';

configureMathMock(7980909);

test('cmll scrambler', () => {
  const scramble = getCMLLScramble();
  const cube = doAlgorithm(scramble);

  expect(checkOriented(cube.eo, [4, 6, 8, 9, 10, 11])).toBe(true);
  expect(checkPermuted(cube.ep, [4, 6, 8, 9, 10, 11])).toBe(true);
  expect(checkOriented(cube.co, [4, 5, 6, 7])).toBe(true);
  expect(checkPermuted(cube.cp, [4, 5, 6, 7])).toBe(true);
});
