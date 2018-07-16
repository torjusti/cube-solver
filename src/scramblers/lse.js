import getScrambleForPieces from './scramblePieces';
import { Edges } from '../cube';

const getScramble = () =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB, Edges.DF, Edges.DB],

    [],
  );

export default getScramble;
