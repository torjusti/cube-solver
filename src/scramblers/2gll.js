import getScrambleForPieces from './scramblePieces';
import { Edges, Corners } from '../cube';

const getScramble = () => getScrambleForPieces(
  [Edges.UR, Edges.UF, Edges.UL, Edges.UB],

  [],

  [],

  [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],

  false,

  true,
);

export default getScramble;
