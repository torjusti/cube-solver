import * as cube from '../cube';

describe('cube', () => {
  it('performs an edge orientation move', () => {
    expect(cube.edgeOrientationMove(Array(12).fill(0), 0)).toMatchSnapshot();
  });

  it('resets the edge orientation when doing a move twice', () => {
    let eo = Array(12).fill(0);

    for (let i = 0; i < 2; i += 1) {
      eo = cube.edgeOrientationMove(eo);
    }

    expect(eo).toMatchSnapshot();
  });

  it('performs a corner orientation move', () => {
    expect(cube.cornerOrientationMove(Array(8).fill(0), 0)).toMatchSnapshot();
  });

  it('performs an edge permutation move', () => {
    expect(
      cube.edgePermutationMove([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 0),
    ).toMatchSnapshot();
  });

  it('performs a corner permutation move', () => {
    expect(
      cube.cornerPermutationMove([0, 1, 2, 3, 4, 5, 6, 7], 0),
    ).toMatchSnapshot();
  });

  it('performs an algorithm correctly', () => {
    expect(cube.doAlgorithm("R U R' U' R' F R F'")).toMatchSnapshot();
  });
});
