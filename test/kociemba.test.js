import { doAlgorithm, identity } from '../src/cube';
import kociemba from '../src/kociemba';

test('solve a random cube and return a valid algorithm', () => {
  expect(kociemba("R U R' U' R' F R F"))
    .toEqual(expect.stringMatching(/^([FRUBLD][2']?\s*)+$/));
});

test('solve a cube and verify the solution', () => {
  const cube = doAlgorithm("L F2 U2 R2 D2 L U2 R2 D2 U2 B2 F' L B L R2 D U L' B U'");
  const solution = kociemba("L F2 U2 R2 D2 L U2 R2 D2 U2 B2 F' L B L R2 D U L' B U'");
  expect(doAlgorithm(solution, cube)).toEqual(identity);
});
