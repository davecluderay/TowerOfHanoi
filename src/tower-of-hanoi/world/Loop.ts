import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

class Loop {
  private clock: Clock;
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;

  updaters: any[];

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.clock = new Clock();
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updaters = [];
  }

  public start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
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
