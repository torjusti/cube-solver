# cube-solver

![travis](https://travis-ci.org/torjusti/cube-solver.svg?branch=master)
[![codecov](https://codecov.io/gh/torjusti/cube-solver/branch/master/graph/badge.svg)](https://codecov.io/gh/torjusti/cube-solver)

This module contains a collection of Rubik's cube solvers implemented in JavaScript. It can solve a given cube using the fantastic Kociemba two-phase algorithm, generate random state scrambles, solve steps such as the cross or the Roux first block, as well as provide a variety of different scramble types.

## Installation

To install, simply run `yarn install cube-solver` or similar, and require the `cube-solver` module. You can also manually add the bundle file to your webpage using [this unpkg link](https://unpkg.com/cube-solver/dist/bundle.js), in which case the solver will be available globally as `cubeSolver`.

## Example

```javascript
// Get a new random-state scramble.
const scramble = cubeSolver.scramble();
// Solve the first block.
cubeSolver.solve(scramble, 'fb') // => R L2 B' U' L2 D' F'
// Get a ZBLL scramble.
cubeSolver.scramble('zbll'); // => R B2 R' U' L U' L U' F2 R2 U' B2 U R2 D' F2 U'
```

## Notes

The solver is pretty slow compared to other solvers such as the GWT compiled version of min2phase, but rather aims to be simple and extensible. The solver initializes when solving the first cube, which usually takes around 2 seconds. Generating and solving a random cube takes around 100ms on average, but for some cubes this number can be quite high.

## Documentation

The solver exposes two methods. The first,`cubeSolver.scramble(type = '3x3')`, allows for scrambling the cube or different subsets of it, and `cubeSolver.solve(scramble, type = 'kociemba')` allows for solving the cube or different subsets of it.

### Available scramble types

| Type    | Description                             |
|---------|-----------------------------------------|
| 3x3     | A random-state 3x3 scrable.             |
| 2gll    | A 2-generator last layer scramble.      |
| cmll    | A Roux CMLL scramble.                   |
| corners | A corners-only scramble.                |
| edges   | An edges-only scramble.                 |
| lse     | A Roux LSE scramble.                    |
| lsll    | Scramble for last slot + last layer.    |
| pll     | A PLL scramble.                         |
| zbll    | A ZBLL scramble.                        |
| zzls    | Scramble for ZZ last slot + last layer. |

### Available solver types

| Type     | Description                                        |
|----------|----------------------------------------------------|
| kociemba | Solve the whole cube using the Kociemba algorithm. |
| cross    | Solve the CFOP cross.                              |
| eoline   | Solve the ZZ EOLine.                               |
| fb       | Solve the Roux first block, on the bottom left.    |
| xcross   | Solve an extended CFOP cross.                      |