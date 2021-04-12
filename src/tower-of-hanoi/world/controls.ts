import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createControls(camera: Camera, element: HTMLElement) {
  const controls = new OrbitControls(camera, element);
  controls.enableDamping = true;
  controls.minDistance = 1;
  controls.maxDistance = 500;

  Object.assign(controls, {
    tick: (delta: number) => controls.update(),
  });

  return controls;
}

export { createControls };
