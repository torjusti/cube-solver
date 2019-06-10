import getPLLScramble from '../pll';
import { doAlgorithm, Edges, Corners } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted, getAllBut } from './utils';

configureMathMock(3425346);

const EDGES = [Edges.UR, Edges.UF, Edges.UL, Edges.UB];

const CORNERS = [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR];

test('pll scrambler', () => {
  const scramble = getPLLScramble();
  const cube = doAlgorithm(scramble);

  expect(checkOriented(cube.eo, EDGES)).toBe(true);
  expect(checkOriented(cube.co, CORNERS)).toBe(true);
  expect(checkOriented(cube.eo, getAllBut(EDGES, 12))).toBe(true);
  expect(checkOriented(cube.co, getAllBut(CORNERS, 8))).toBe(true);
  expect(checkPermuted(cube.ep, getAllBut(EDGES, 12))).toBe(true);
  expect(checkPermuted(cube.cp, getAllBut(CORNERS, 8))).toBe(true);
});
