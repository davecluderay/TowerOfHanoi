type Move = { from: number; to: number };
type DiscPosition = { base: number; level: number };
type DetailedMove = { disc: number; from: DiscPosition; to: DiscPosition };

export function createDetailedSolution(discCount: number): DetailedMove[] {
  const runningCounts = [discCount, 0, 0];
  function solve(discsToMove: number, from: number, to: number): DetailedMove[] {
    if (discsToMove === 0) return [];

    var other = 6 - from - to;

    // Move all except the largest disc to the other base.
    const before = solve(discsToMove - 1, from, other);

    // Move the largest disc to the destination base.
    runningCounts[from - 1] = runningCounts[from - 1] - 1;
    runningCounts[to - 1] = runningCounts[to - 1] + 1;
    const main = {
      disc: discsToMove,
      from: { base: from, level: runningCounts[from - 1] + 1 },
      to: { base: to, level: runningCounts[to - 1] },
    };

    // Move all except the largest disc to the destination base.
    const after = solve(discsToMove - 1, other, to);

    return [...before, main, ...after];
  }

  return solve(discCount, 1, 3);
}

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
