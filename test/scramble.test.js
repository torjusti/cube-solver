import getRandomScramble from '../src/scramble';

test('solve a random state cube', () => {
  expect(getRandomScramble())
    .toEqual(expect.stringMatching(/^([FRUBLD][2']?\s*)+$/));
});
