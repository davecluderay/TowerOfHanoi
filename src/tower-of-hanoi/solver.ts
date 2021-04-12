type Move = { from: number; to: number };

export function createSolution(discCount: number): Move[] {
  function solve(discsToMove: number, from: number, to: number): Move[] {
    if (discsToMove === 0) return [];

    var other = 6 - from - to;

    // Move all except the largest disc to the other base.
    const before = solve(discsToMove - 1, from, other);

    // Move the largest disc to the destination base.
    const main = { from: from, to: to };

    // Move all except the largest disc to the destination base.
    const after = solve(discsToMove - 1, other, to);

    return [...before, main, ...after];
  }

  return solve(discCount, 1, 3);
}
