import { getInverseMove } from './algorithms';

import {
  getPermutationFromIndex,
  getIndexFromPermutation,
  getOrientationFromIndex,
  getIndexFromOrientation,
} from './coordinates';

import {
  edgePermutationMove,
  cornerPermutationMove,
  edgeOrientationMove,
  cornerOrientationMove,
  allMoves,
} from './cube';

import { factorial } from './tools';

export interface MoveTable {
  getName(): string;

  getSize(): number;

  doMove(index: number, move: number): number;

  getDefaultIndex(): number;

  getSolvedIndices(): number[];
}

export abstract class AbstractMoveTable implements MoveTable {
  private name: string;

  public table: number[][];

  private initialized = false;

  constructor(name: string) {
    this.name = name;
  }

  abstract getSize(): number;

  abstract getMoves(): number[];

  abstract getIndex(pieces: number[]): number;

  abstract getPieces(index: number): number[];

  abstract doCubieMove(pieces: number[], move: number): number[];

  abstract getDefaultIndex(): number;

  abstract getSolvedIndices(): number[];
    
  getName(): string {
    return this.name;
  }

  doMove(index: number, move: number): number {
    if (this.initialized) {
      return this.table[index][move];
    }

    throw new Error(`Move table ${this.name} not initialized`);
  }

  protected initialize() {
    this.table = [];

    for (let i = 0; i < this.getSize(); i += 1) {
      this.table.push([]);
    }

    for (let i = 0; i < this.getSize(); i += 1) {
      for (const move of this.getMoves()) {
        if (!this.table[i][move]) {
          // Assign both the value and its inverse at once to avoid excess computation on the cubie level.
          const result = this.getIndex(this.doCubieMove(this.getPieces(i), move));
          const inverse = getInverseMove(move);
          this.table[i][move] = result;
          this.table[result][inverse] = i;
        }
      }
    }

    this.initialized = true;
  }
}

export class EdgePermutationTable extends AbstractMoveTable {
  private affected: number[];
  private reversed: boolean;
  private moves: number[];

  constructor(name: string, affected: number[], moves = allMoves, reversed = false) {
    super(name);

    this.affected = affected;
    this.moves = moves;
    this.reversed = reversed;

    this.initialize();
  }

  getSize(): number {
    return factorial(12) / factorial(12 - this.affected.length);
  }

  getMoves(): number[] {
    return this.moves;
  }

  getIndex(pieces: number[]): number {
    return getIndexFromPermutation(pieces, this.affected, this.reversed);
  }

  getPieces(index: number): number[] {
    return getPermutationFromIndex(index, this.affected, 12, this.reversed);
  }

  doCubieMove(pieces: number[], move: number): number[] {
    return edgePermutationMove(pieces, move);
  }

  getDefaultIndex(): number {
    return getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.affected, this.reversed);
  }

  getSolvedIndices(): number[] {
    return [this.getDefaultIndex()];
  }
}

export class CornerPermutationTable extends AbstractMoveTable {
  private affected: number[];
  private reversed: boolean;
  private moves: number[];

  constructor(name: string, affected: number[], moves = allMoves, reversed = false) {
    super(name);

    this.affected = affected;
    this.moves = moves;
    this.reversed = reversed;

    this.initialize();
  }

  getSize(): number {
    return factorial(8) / factorial(8 - this.affected.length);
  }

  getMoves(): number[] {
    return this.moves;
  }

  getIndex(pieces: number[]): number {
    return getIndexFromPermutation(pieces, this.affected, this.reversed);
  }

  getPieces(index: number): number[] {
    return getPermutationFromIndex(index, this.affected, 8, this.reversed);
  }

  doCubieMove(pieces: number[], move: number): number[] {
    return cornerPermutationMove(pieces, move);
  }

  getDefaultIndex(): number {
    return getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7], this.affected, this.reversed);
  }

  getSolvedIndices(): number[] {
    return [this.getDefaultIndex()];
  }
}

const getCorrectOrientations = (affected: number[], numPieces: number, numStates: number) => {
  const indices: number[] = [];

  const size = numStates ** (numPieces - 1);

  const target = numStates ** (numPieces - affected.length - 1);

  for (let i = 0; i < size && indices.length < target; i += 1) {
    const orientation = getOrientationFromIndex(i, numPieces, numStates);

    if (affected.every((piece) => orientation[piece] === 0)) {
      indices.push(i);
    }
  }

  return indices;
};

export class EdgeOrientationTable extends AbstractMoveTable {
  private affected: number[];

  constructor(name: string, affected: number[]) {
    super(name);

    this.affected = affected;

    this.initialize();
  }

  getSize(): number {
    return 2048;
  }

  getMoves(): number[] {
    return allMoves;
  }

  getIndex(pieces: number[]): number {
    return getIndexFromOrientation(pieces, 2);
  }

  getPieces(index: number): number[] {
    return getOrientationFromIndex(index, 12, 2);
  }

  doCubieMove(pieces: number[], move: number): number[] {
    return edgeOrientationMove(pieces, move);
  }

  getDefaultIndex(): number {
    return 0;
  }

  getSolvedIndices(): number[] {
    return getCorrectOrientations(this.affected, 12, 2);
  }
}

export class CornerOrientationTable extends AbstractMoveTable {
  private affected: number[];

  constructor(name: string, affected: number[]) {
    super(name);

    this.affected = affected;

    this.initialize();
  }

  getSize(): number {
    return 2187;
  }

  getMoves(): number[] {
    return allMoves;
  }

  getIndex(pieces: number[]): number {
    return getIndexFromOrientation(pieces, 3);
  }

  getPieces(index: number): number[] {
    return getOrientationFromIndex(index, 8, 3);
  }

  doCubieMove(pieces: number[], move: number): number[] {
    return cornerOrientationMove(pieces, move);
  }

  getDefaultIndex(): number {
    return 0;
  }

  getSolvedIndices(): number[] {
    return getCorrectOrientations(this.affected, 8, 3);
  }
}
