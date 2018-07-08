import getRandomScramble from '../src/scramblers/randomScramble';

test('solve a random state cube', () => {
  expect(getRandomScramble())
    .toEqual(expect.stringMatching(/^([FRUBLD][2']?\s*)+$/));
});
