import { doAlgorithm, identity } from '../src/cube';
import kociemba from '../src/solvers/kociemba';

test('solve a random cube and return a valid algorithm', () => {
  expect(kociemba("R U R' U' R' F R F")).toEqual(
    expect.stringMatching(/^([FRUBLD][2']?\s*)+$/),
  );
});

test('solve a cube and verify the solution', () => {
  // The scramble we will be solving.
  const scramble = "L F2 U2 R2 D2 L U2 R2 D2 U2 B2 F' L B L R2 D U L' B U'";

  // The solution given by our implementation.
  const solution = kociemba(scramble);

  // Perform the algorithm using the low level cube API.
  const cube = doAlgorithm(scramble);

  // Expect the solution to solve the cube.
  expect(doAlgorithm(solution, cube)).toEqual(identity);
});
