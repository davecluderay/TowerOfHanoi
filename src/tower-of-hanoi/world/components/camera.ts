import { PerspectiveCamera } from 'three';

function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(16, 1, 0.1, 1000);
  camera.position.set(-3, 20, 60);

  Object.assign(camera, {
    tick: (_: number) => {},
  });

  return camera;
}

export { createCamera };
