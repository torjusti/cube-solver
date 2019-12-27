import * as algorithms from '../algorithms';

describe('algorithms', () => {
  it('allow parsing invalid algorithms', () => {
    expect(() => {
      algorithms.parseAlgorithm("R U R' U' 1337 R' F R F'");
    }).toThrowError();
  });

  it('should correctly invert a given algorithm', () => {
    expect(algorithms.invertAlgorithm("r U R' U' r' F R F'"))
      .toEqual("F R' F' r U R U' r'");
  });

  it('should strip rotations from algorithms correctly', () => {
    expect(algorithms.parseAlgorithm("x R u R' u' y' z2 R' f R f'"))
      .toMatchSnapshot();
  });
});
