import { Object3D } from 'three';
import { DetailedMove } from '../../solver';
import { baseHeight, baseXPositions, discThickness, moveAnimationDurationMs } from '../options';

export interface Animation {
  isDone: boolean;
  tick(delta: number): void;
}

function easeInOutCubic(t: number) {
  t = Math.max(0, Math.min(t, 1));
  if (t < 0.5) return 4 * t * t * t;
  return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function createInitAnimation(discs: Object3D[], base: number): Animation {
  class InitAnimation extends Animation {
    private discs: Object3D[];
    private base: number;
    public isDone: boolean = false;

    constructor(discs: Object3D[], base: number) {
      super();
      this.discs = discs;
      this.base = base;
    }

    public tick(delta: number): void {
      const x = baseXPositions[this.base - 1];
      this.discs.forEach((disc, index) => {
        disc.position.x = x;
        disc.position.y = (this.discs.length - index) * discThickness;
      });
      this.isDone = true;
    }
  }

  return new InitAnimation(discs, base);
}

function createMoveAnimation(move: DetailedMove, discs: Object3D[]): Animation {
  type XParams = { start: number; end: number };
  type YParams = { start: number; liftTo: number; end: number };

  class MoveAnimation extends Animation {
    private elapsedMs: number = 0;
    private phaseDurationMs: number = moveAnimationDurationMs / 3;
    private disc: Object3D;
    private xParams: XParams;
    private yParams: YParams;
    public isDone: boolean = false;

    constructor(move: DetailedMove, discs: Object3D[]) {
      super();
      this.disc = discs[move.disc - 1];
      this.xParams = {
        start: baseXPositions[move.from.base - 1],
        end: baseXPositions[move.to.base - 1],
      };
      this.yParams = {
        start: move.from.level * discThickness,
        liftTo: baseHeight + discThickness * 3,
        end: move.to.level * discThickness,
      };
    }

    public tick(delta: number): void {
      this.elapsedMs += delta * 1000;
      const phase = Math.floor(this.elapsedMs / this.phaseDurationMs);
      const progress = easeInOutCubic((this.elapsedMs - phase * this.phaseDurationMs) / this.phaseDurationMs);
      switch (phase) {
        case 0:
          // Lifting.
          this.disc.position.x = this.xParams.start;
          this.disc.position.y = this.yParams.start + (this.yParams.liftTo - this.yParams.start) * progress;
          break;
        case 1:
          // Shifting.
          this.disc.position.x = this.xParams.start + (this.xParams.end - this.xParams.start) * progress;
          this.disc.position.y = this.yParams.liftTo;
          break;
        case 2:
          // Dropping.
          this.disc.position.x = this.xParams.end;
          this.disc.position.y = this.yParams.liftTo + (this.yParams.end - this.yParams.liftTo) * progress;
          break;
        default:
          // Done.
          this.disc.position.x = this.xParams.end;
          this.disc.position.y = this.yParams.end;
          this.isDone = true;
          break;
      }
    }
  }

  return new MoveAnimation(move, discs);
}

export function createMoveAnimations(moves: DetailedMove[], discs: Object3D[]): Animation[] {
  const init = createInitAnimation(discs, 1);
  const main = moves.map((move) => createMoveAnimation(move, discs));
  return [init, ...main];
}
