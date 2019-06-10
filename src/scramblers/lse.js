import getScrambleForPieces from './scramblePieces';
import { Edges } from '../cube';

const LSE_EDGES = [Edges.UR, Edges.UF, Edges.UL, Edges.UB, Edges.DF, Edges.DB];

const getScramble = () => getScrambleForPieces(
  LSE_EDGES,

  [],

  LSE_EDGES,

  [],

  false,

  true,
);

export default getScramble;
