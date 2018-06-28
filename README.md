cube-solver
===========

[![travis](https://travis-ci.org/torjusti/cube-solver.svg?branch=master)] [![codecov](https://codecov.io/gh/torjusti/cube-solver/branch/master/graph/badge.svg)](https://codecov.io/gh/torjusti/cube-solver)

This module contains a collection of Rubiks cube solvers implemented in JavaScript. It can solve a given cube using Kociemba's fantastic two-phase algorithm, generate random state scrambles and solve the cross, EO-line and first block for any given scramble. The solver attempts to be easily extendable, at the cost of speed.

Installation
-------------

To install, simply run `yarn install cube-solver`, and require the `cube-solver` module. You can also manually add the `bundle.js` file to your webpage, in which case the solver will be available globally as `cubeSolver`.

Usage
-----

```
const scramble = "F2 L' B' U R2 F";

// Solve the given scramble using the two-phase algorithm
cubeSolver.solve(scramble) // => R F' U' R2 B' R' B2 L F2

// Find an optimal cross solution
cubeSolver.crossSolver(scramble) // => R2 F U' F2 B L

// Find an optimal EOLine solution
cubeSolver.EOLineSolver(scramble) // => R F U' F2 R2 B

// Find an optimal first block solution
cubeSolver.firstBlockSolver(scramble) // => R2 F' B2 L F'
```

Speed
-----

The solver is pretty slow, as the implementation aims at being pretty modular and extendable. The solver initializes on the first solve, usually in about 2 seconds. It usually uses about 100 ms to generate and solve a random cube, but this number may be a lot higher for specific cubes. For example, the scramble `F U' F2 D' B U R' F' L D' R' U' L U B' D2 R' F U2 D2` takes almost a minute to complete. If speed is your main concern, you should probably be using the GWT compiled versions of Chen Shuang's min2phase solver.
