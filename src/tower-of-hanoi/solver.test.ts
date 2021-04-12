import { createSolution } from './solver';

test('produces correct solution for 2 discs', () => {
  const moves = createSolution(2);
  expect(moves).toEqual([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
  ]);
});

test('produces correct solution for 3 discs', () => {
  const moves = createSolution(3);
  expect(moves).toEqual([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 3, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 1 },
    { from: 2, to: 3 },
    { from: 1, to: 3 },
  ]);
});

describe('produces optimal solutions', () => {
  test.each([
    [1, 1],
    [2, 3],
    [3, 7],
    [4, 15],
    [5, 31],
    [6, 63],
    [7, 127],
    [8, 255],
    [9, 511],
    [10, 1023],
  ])('given %d discs, produces %d moves', (discs: number, expectedMoveCount: number) => {
    const moves = createSolution(discs);
    expect(moves).toHaveLength(expectedMoveCount);
  });
});
