import kociemba from '../src/kociemba';

test('solve a cube and return an algorithm', () => {
  expect(kociemba("R U R' U' R' F R F"))
    .toEqual(expect.stringMatching(/^([FRUBLD][2']?\s*)+$/));
});
