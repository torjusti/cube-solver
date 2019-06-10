import solveEOLine from '../EOLineSolver';
import { doAlgorithm } from '../../cube';

const SCRAMBLE = "B2 U2 R' D2 F2 R B2 L' D2 F2 L' B D R F' L U B2 R B' R2";

test('EOLine solver', () => {
  const solution = solveEOLine(SCRAMBLE);
  const solvedCube = doAlgorithm(solution, doAlgorithm(SCRAMBLE));

  expect(solvedCube.eo).toEqual(Array(12).fill(0));

  [5, 7].forEach((edge) => {
    expect(solvedCube.ep[edge]).toEqual(edge);
  });
});
