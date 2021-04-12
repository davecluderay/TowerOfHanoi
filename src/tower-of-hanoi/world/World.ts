import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';

import { createCamera } from './camera';
import { createLights } from './lights';
import { createScene } from './scene';
import { createControls } from './controls';
import { createRenderer } from './renderer';
import { Resizer } from './Resizer';
import { Loop } from './Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createCube } from './cube';

class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private resizer: Resizer;
  private loop: Loop;
  private controls: OrbitControls;

  constructor(container: HTMLElement) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();

    this.loop = new Loop(this.camera, this.scene, this.renderer);

    while (container.firstChild) container.removeChild(container.firstChild);

    container.append(this.renderer.domElement);

    const lights = createLights();

    this.controls = createControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => this.render());

    const cube = createCube();
    this.scene.add(cube);

    this.loop.updaters.push(cube, this.camera, this.controls);

    this.scene.add(...lights);

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
