import {
  edgeOrientationMove,
} from '../src/cube';

test('perform an edge orientation move', () => {
  expect(edgeOrientationMove([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0))
    .toEqual([0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0]);
});

test('perform an edge orientation move twice', () => {
  let eo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 2; i += 1) {
    eo = edgeOrientationMove(eo, 0);
  }

  expect(eo).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});
