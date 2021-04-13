import { Camera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { baseHeight, baseXPositions } from '../options';

function createCameraControls(camera: Camera, element: HTMLElement) {
  const controls = new OrbitControls(camera, element);
  controls.enableDamping = true;
  controls.minDistance = 1;
  controls.maxDistance = 500;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2;

  Object.assign(controls, {
    tick: (delta: number) => controls.update(),
  });

  const center = new Vector3(baseXPositions[1], baseHeight / 2, 0);
  controls.target = center;

  return controls;
}

export { createCameraControls };
