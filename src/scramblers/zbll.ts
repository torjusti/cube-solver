import getScrambleForPieces from './scramblePieces';
import { Edges, Corners } from '../cube';

const EDGES = [Edges.UR, Edges.UF, Edges.UL, Edges.UB];

const CORNERS = [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR];

const getScramble = () => getScrambleForPieces(
  EDGES,

  CORNERS,

  [],

  CORNERS,
);

export default getScramble;
