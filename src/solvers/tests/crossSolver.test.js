import solveCross from '../crossSolver';
import { doAlgorithm } from '../../cube';

const SCRAMBLE = "B2 U2 R' D2 F2 R B2 L' D2 F2 L' B D R F' L U B2 R B' R2";

test('cross solver', () => {
  const solution = solveCross(SCRAMBLE);
  const solvedCube = doAlgorithm(solution, doAlgorithm(SCRAMBLE));

  [4, 5, 6, 7].forEach((edge) => {
    expect(solvedCube.eo[edge]).toEqual(0);
    expect(solvedCube.ep[edge]).toEqual(edge);
  });
});
