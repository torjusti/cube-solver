import getScramble from '../3x3';

test('create a 3x3 scramble', () => {
  expect(getScramble()).toEqual(
    expect.stringMatching(/^([FRUBLD][2']?\s*)+$/),
  );
});