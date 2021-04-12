import { PerspectiveCamera, WebGLRenderer } from 'three';

class Resizer {
  public dispose: () => void;

  constructor(container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    function setSize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    }

    setSize();

    const resizeHandler = () => setSize();
    window.addEventListener('resize', resizeHandler);
    this.dispose = () => window.removeEventListener('resize', resizeHandler);
  }
}

export { Resizer };
