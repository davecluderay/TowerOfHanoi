import { Object3D } from 'three';
import { DetailedMove } from '../../solver';
import { Animation, createMoveAnimations } from './animation';

class SolutionPlayer {
  private isRunning: boolean;
  private animations: Animation[];
  private currentIndex: number;

  constructor(moves: DetailedMove[], discs: Object3D[]) {
    this.isRunning = false;
    this.animations = createMoveAnimations(moves, discs);
    this.currentIndex = -1;
  }

  play(): void {
    this.currentIndex = 0;
    this.isRunning = true;
  }

  pause(): void {
    this.isRunning = false;
  }

  tick(delta: number): void {
    if (!this.isRunning || this.currentIndex >= this.animations.length) return;

    const current = this.animations[this.currentIndex];

    current.tick(delta);

    if (current.isDone) this.currentIndex++;
  }
}

export { SolutionPlayer };
