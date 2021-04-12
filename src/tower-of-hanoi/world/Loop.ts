import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { createStatsPanel } from './stats';

class Loop {
  private clock: Clock;
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private stats: Stats | null;

  updaters: any[];

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer, showStats: boolean | undefined) {
    this.clock = new Clock();
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.stats = showStats ? createStatsPanel(this.renderer.domElement.parentElement as HTMLElement) : null;

    this.updaters = [];
  }

  public start() {
    this.renderer.setAnimationLoop(() => {
      this.stats?.begin();
      this.tick();
      this.renderer.render(this.scene, this.camera);
      this.stats?.end();
      this.stats?.update();
    });
  }

  public stop() {
    this.renderer.setAnimationLoop(null);
  }

  private tick() {
    const delta = this.clock.getDelta();
    this.updaters.forEach((u) => {
      u.tick && u.tick(delta);
    });
  }
}

export { Loop };
