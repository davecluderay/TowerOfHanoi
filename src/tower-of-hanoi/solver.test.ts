import { createDetailedSolution, createSolution } from './solver';

test('basic solver produces correct solution for 2 discs', () => {
  const moves = createSolution(2);
  expect(moves).toEqual([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
  ]);
});

test('basic solver produces correct solution for 3 discs', () => {
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

describe('basic solver produces optimal solutions', () => {
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

test('detailed solver produces correct solution for 2 discs', () => {
  const moves = createDetailedSolution(2);
  expect(moves).toEqual([
    { disc: 1, from: { base: 1, level: 2 }, to: { base: 2, level: 1 } },
    { disc: 2, from: { base: 1, level: 1 }, to: { base: 3, level: 1 } },
    { disc: 1, from: { base: 2, level: 1 }, to: { base: 3, level: 2 } },
  ]);
});

test('detailed solver produces correct solution for 3 discs', () => {
  const moves = createDetailedSolution(3);
  expect(moves).toEqual([
    { disc: 1, from: { base: 1, level: 3 }, to: { base: 3, level: 1 } },
    { disc: 2, from: { base: 1, level: 2 }, to: { base: 2, level: 1 } },
    { disc: 1, from: { base: 3, level: 1 }, to: { base: 2, level: 2 } },
    { disc: 3, from: { base: 1, level: 1 }, to: { base: 3, level: 1 } },
    { disc: 1, from: { base: 2, level: 2 }, to: { base: 1, level: 1 } },
    { disc: 2, from: { base: 2, level: 1 }, to: { base: 3, level: 2 } },
    { disc: 1, from: { base: 1, level: 1 }, to: { base: 3, level: 3 } },
  ]);
});

describe('detailed solver produces optimal solutions', () => {
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
    const moves = createDetailedSolution(discs);
    expect(moves).toHaveLength(expectedMoveCount);
  });
});
