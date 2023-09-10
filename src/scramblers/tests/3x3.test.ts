import getScramble from '../3x3';
import { configureMathMock } from './utils';

configureMathMock(98098097898);

test('create a 3x3 scramble', () => {
  expect(getScramble()).toEqual(expect.stringMatching(/^([FRUBLD][2']?\s*)+$/));
});
