# cube-solver

![travis](https://travis-ci.org/torjusti/cube-solver.svg?branch=master)
[![codecov](https://codecov.io/gh/torjusti/cube-solver/branch/master/graph/badge.svg)](https://codecov.io/gh/torjusti/cube-solver)

This module contains a collection of Rubiks cube solvers implemented in JavaScript. It can solve a given cube using the fantastic Kociemba two-phase algorithm, generate random state scrambles and solve the cross, EO-line and first block for any given scramble. The solver attempts to be easily extendable, at the cost of speed.

## Installation

To install, simply run `yarn install cube-solver`, and require the `cube-solver` module. You can also manually add the bundle file to your webpage, in which case the solver will be available globally as `cubeSolver`.

## Example

```javascript
const scramble = "F2 L' B' U R2 F";

// Solve the given scramble using the two-phase algorithm.
cubeSolver.solve(scramble) // => R F' U' R2 B' R' B2 L F2

// Find an optimal cross solution.
cubeSolver.crossSolver(scramble) // => R2 F U' F2 B L

// Find an optimal EOLine solution.
cubeSolver.EOLineSolver(scramble) // => R F U' F2 R2 B

// Find an optimal first block solution.
cubeSolver.firstBlockSolver(scramble) // => R2 F' B2 L F'
```

Speed
-----

The solver is pretty slow, as the implementation aims at being pretty modular and extendable. The solver initializes on the first solve, usually in about 2 seconds. It usually uses about 100 ms to generate and solve a random cube, but this number may be a lot higher for specific cubes. For example, the scramble `F U' F2 D' B U R' F' L D' R' U' L U B' D2 R' F U2 D2` takes almost a minute to complete. If speed is your main concern, you should probably be using the GWT compiled versions of Chen Shuang's min2phase solver.


## Documentation

All the following methods are methods on the exported `cubeSolver` object.

### `solve(scramble, maxDepth = 22)`

Solves the given scramble using the two-phase algorithm. The second parameter, `maxDepth`, is the maximum length of the returned soution. It is intended for internal usage only.

### getRandomScramble()

Returns a random state scramble.

### crossSolver(scramble)

Solves theh cross on the given scramble.

### firstBlockSolver(scramble)

Solves the first block on the given scramble.

### EOLineSolver

Solves the EOLine on the given scramble.

## Custom solvers

More internal functionality is also exported for advanced usage, which can be used to create your own custom solvers. For example, one can create a solver for a FL XCross using the following code.

```javascript
const MoveTable = require('./lib/bundle').MoveTable;
const Search = require('./lib/bundle').Search;

const XCrossSearch = new Search(() => ({
  moveTables: [
    MoveTable.createEdgePermutationTable({
      name: 'CrossEdgePermutation',
      affected: [4, 5, 6, 7],
    }),

    MoveTable.createEdgeOrientationTable({
      name: 'CrossEdgeOrientation',
      affected: [4, 5, 6, 7],
    }),

    MoveTable.createEdgePermutationTable({
      name: 'BonusEdgePermutation',
      affected: [9],
    }),

    MoveTable.createEdgeOrientationTable({
      name: 'BonusEdgeOrientation',
      affected: [9],
    }),

    MoveTable.createCornerPermutationTable({
      name: 'CornerPermutation',
      affected: [5],
    }),

    MoveTable.createCornerOrientationTable({
      name: 'CornerOrientation',
      affected: [5],
    }),
  ],

  pruningTables: [
    ['CornerPermutation', 'CornerOrientation'],
    ['BonusEdgePermutation', 'BonusEdgeOrientation'],
    ['CrossEdgePermutation'],
    ['CrossEdgeOrientation'],
  ],
}));

const XCrossSolver = scramble => XCrossSearch.solve({ scramble });
```