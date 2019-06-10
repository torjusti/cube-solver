import getScrambleForPieces from './scramblePieces';
import { Edges, Corners } from '../cube';

const CORNERS = [
  Corners.URF,
  Corners.UFL,
  Corners.ULB,
  Corners.UBR,
  Corners.DFR,
];

const getScramble = () => getScrambleForPieces(
  [Edges.UR, Edges.UF, Edges.UL, Edges.UB, Edges.FR],

  CORNERS,

  [],

  CORNERS,
);

export default getScramble;
