import { Light, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { createCamera } from './camera';
import { createLights } from './light';
import { createScene } from './scene';
import { createControls } from './controls';
import { createRenderer } from './renderer';
import { Resizer } from './Resizer';
import { Loop } from './Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createDiscs } from './disc';
import { createBases } from './base';
import { createDetailedSolution } from '../solver';
import { numberOfDiscs } from './options';
import { MovePlayer } from './MovePlayer';

export type WorldOptions = {
  container: HTMLElement;
  showStats?: boolean | undefined;
};

class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private lights: Light[];
  private bases: Object3D[];
  private discs: Object3D[];
  private player: MovePlayer;
  private loop: Loop;
  private resizer: Resizer;
  private controls: OrbitControls;

  constructor(options: WorldOptions) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.lights = createLights();
    this.bases = createBases();
    this.discs = createDiscs();
    this.player = new MovePlayer(createDetailedSolution(numberOfDiscs), this.discs);

    const container = options.container;
    while (container.firstChild) container.removeChild(container.firstChild);
    container.append(this.renderer.domElement);

    this.loop = new Loop(this.camera, this.scene, this.renderer, options.showStats);

    this.controls = createControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => this.render());

    this.scene.add(...this.bases, ...this.discs, ...this.lights);
    this.loop.updaters.push(this.camera, this.controls, this.player);

    this.resizer = new Resizer(container, this.camera, this.renderer);
  }

  public async init(): Promise<void> {}

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public start() {
    this.loop.start();
    this.player.play();
  }

  public stop() {
    this.loop.stop();
  }

  public dispose() {
    this.resizer.dispose();
  }
}

export { World };
