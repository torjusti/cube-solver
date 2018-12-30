import getZBLLScramble from '../zbll';
import { doAlgorithm, Edges, Corners } from '../../cube';
import { configureMathMock, checkOriented, checkPermuted, getAllBut } from './utils';

configureMathMock(3425346);

const EDGES = [Edges.UR, Edges.UF, Edges.UL, Edges.UB];

const CORNERS = [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR];

test('pll scrambler', () => {
  const scramble = getZBLLScramble();
  const cube = doAlgorithm(scramble);

  if (!checkOriented(cube.eo, EDGES)) {
    fail();
  }

  if (!checkOriented(cube.eo, getAllBut(EDGES, 12))) {
    fail();
  }

  if (!checkOriented(cube.co, getAllBut(CORNERS, 8))) {
    fail();
  }

  if (!checkPermuted(cube.ep, getAllBut(EDGES, 12))) {
    fail();
  }

  if (!checkPermuted(cube.cp, getAllBut(CORNERS, 8))) {
    fail();
  }
});
