export type Move = { from: number; to: number };
export type DiscPosition = { base: number; level: number };
export type DetailedMove = { disc: number; from: DiscPosition; to: DiscPosition };

export function* createDetailedSolution(discCount: number): Iterable<DetailedMove> {
  const runningCounts = [discCount, 0, 0];
  function* solve(discsToMove: number, from: number, to: number): Iterable<DetailedMove> {
    if (discsToMove > 0) {
      var other = 6 - from - to;

      // Move all except the largest disc to the other base.
      yield* solve(discsToMove - 1, from, other);

      // Move the largest disc to the destination base.
      runningCounts[from - 1] = runningCounts[from - 1] - 1;
      runningCounts[to - 1] = runningCounts[to - 1] + 1;
      yield {
        disc: discsToMove,
        from: { base: from, level: runningCounts[from - 1] + 1 },
        to: { base: to, level: runningCounts[to - 1] },
      };

      // Move all except the largest disc to the destination base.
      yield* solve(discsToMove - 1, other, to);
    }
  }

  yield* solve(discCount, 1, 3);
}

export function* createSolution(discCount: number): Iterable<Move> {
  function* solve(discsToMove: number, from: number, to: number): Iterable<Move> {
    if (discsToMove > 0) {
      var other = 6 - from - to;

      // Move all except the largest disc to the other base.
      yield* solve(discsToMove - 1, from, other);

      // Move the largest disc to the destination base.
      yield { from: from, to: to };

      // Move all except the largest disc to the destination base.
      yield* solve(discsToMove - 1, other, to);
    }
  }

  yield* solve(discCount, 1, 3);
}
