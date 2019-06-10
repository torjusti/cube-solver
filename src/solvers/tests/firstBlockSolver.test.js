import solveFirstBlock from '../firstBlockSolver';
import { doAlgorithm } from '../../cube';

const SCRAMBLE = "B2 U2 R' D2 F2 R B2 L' D2 F2 L' B D R F' L U B2 R B' R2";

test('first block solver', () => {
  const solution = solveFirstBlock(SCRAMBLE);
  const solvedCube = doAlgorithm(solution, doAlgorithm(SCRAMBLE));

  [6, 9, 10].forEach((edge) => {
    expect(solvedCube.ep[edge]).toEqual(edge);
    expect(solvedCube.eo[edge]).toEqual(0);
  });

  [5, 6].forEach((corner) => {
    expect(solvedCube.cp[corner]).toEqual(corner);
    expect(solvedCube.co[corner]).toEqual(0);
  });
});
