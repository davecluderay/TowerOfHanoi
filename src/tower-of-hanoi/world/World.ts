import { Light, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { createCamera } from './components/camera';
import { createLights } from './components/light';
import { createScene } from './components/scene';
import { createCameraControls } from './interaction/cameraControls';
import { createRenderer } from './rendering/renderer';
import { Resizer } from './interaction/Resizer';
import { Loop } from './rendering/Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createDiscs } from './components/disc';
import { createBases } from './components/base';
import { createDetailedSolution } from '../solver';
import { numberOfDiscs, showStats } from './options';
import { SolutionPlayer } from './animation/SolutionPlayer';

export type WorldOptions = {
  container: HTMLElement;
};

class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private lights: Light[];
  private bases: Object3D[];
  private discs: Object3D[];
  private player: SolutionPlayer;
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
    this.player = new SolutionPlayer(createDetailedSolution(numberOfDiscs), this.discs);

    const container = options.container;
    while (container.firstChild) container.removeChild(container.firstChild);
    container.append(this.renderer.domElement);

    this.loop = new Loop(this.camera, this.scene, this.renderer, showStats);

    this.controls = createCameraControls(this.camera, this.renderer.domElement);
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
    this.player.reset();
    this.loop.start();
  }

  public getPlaybackControls() {
    return {
      reset: () => this.player.reset(),
      play: () => this.player.play(),
      pause: () => this.player.pause(),
      stop: () => this.player.stop(),
      isPlaying: () => this.player.isPlaying(),
      isPaused: () => this.player.isPaused(),
      isStopped: () => this.player.isStopped(),
    };
  }

  public stop() {
    this.loop.stop();
  }

  public dispose() {
    this.resizer.dispose();
  }
}

export { World };
