import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';

import { createCamera } from './camera';
import { createLights } from './lights';
import { createScene } from './scene';
import { createControls } from './controls';
import { createRenderer } from './renderer';
import { Resizer } from './Resizer';
import { Loop } from './Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createDiscs } from './disc';
import { createBases } from './base';

export type WorldOptions = {
  container: HTMLElement;
  showStats?: boolean | undefined;
};

class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private resizer: Resizer;
  private loop: Loop;
  private controls: OrbitControls;

  constructor(options: WorldOptions) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();

    const container = options.container;
    while (container.firstChild) container.removeChild(container.firstChild);
    container.append(this.renderer.domElement);

    this.loop = new Loop(this.camera, this.scene, this.renderer, options.showStats);

    const lights = createLights();

    this.controls = createControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => this.render());

    this.scene.add(...createDiscs(), ...createBases(), ...lights);
    this.loop.updaters.push(this.camera, this.controls);

    this.resizer = new Resizer(container, this.camera, this.renderer);
  }

  public async init(): Promise<void> {}

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public start() {
    this.loop.start();
  }

  public stop() {
    this.loop.stop();
  }

  public dispose() {
    this.resizer.dispose();
  }
}

export { World };
