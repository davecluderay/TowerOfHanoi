import { PerspectiveCamera } from 'three';

function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(20, 1, 0.1, 1000);
  camera.position.set(-10, 20, 30);

  Object.assign(camera, {
    tick: (delta: number) => {},
  });

  return camera;
}

export { createCamera };
