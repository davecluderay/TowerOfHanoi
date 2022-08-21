import { Object3D } from 'three';
import { DetailedMove } from '../../solver';
import { Animation, createMoveAnimations } from './animation';

class SolutionPlayer {
  private runState: 'stopped' | 'paused' | 'playing';
  private animations: Animation[];
  private currentIndex: number;

  constructor(moves: DetailedMove[], discs: Object3D[]) {
    this.runState = 'stopped';
    this.animations = createMoveAnimations(moves, discs);
    this.currentIndex = 0;
  }

  // TODO: Expose more advanced controls, e.g. setDirection(), setSpeed()

  public reset() {
    this.currentIndex = 0;
    for (let i = this.animations.length - 1; i >= 0; i--) {
      this.animations[i].reset();
    }
  }

  public play(): void {
    this.runState = 'playing';
  }

  public pause() {
    this.runState = 'paused';
  }

  public stopAndReset(): void {
    this.pause();
    this.reset();
    this.runState = 'stopped';
  }

  public isPlaying() {
    return this.runState === 'playing';
  }

  public isPaused() {
    return this.runState === 'paused';
  }

  public isStopped() {
    return this.runState === 'stopped';
  }

  public tick(delta: number): void {
    if (!this.isPlaying() || this.currentIndex >= this.animations.length) return;

    const current = this.animations[this.currentIndex];

    current.tick(delta);

    if (current.isDone) this.currentIndex++;
  }
}

export { SolutionPlayer };
