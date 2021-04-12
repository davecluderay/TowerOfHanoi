import { AmbientLight, DirectionalLight, Light } from 'three';

function createLights(): Light[] {
  const ambient = new AmbientLight(0xffffff, 1);

  const directional = new DirectionalLight(0xffffff, 3);
  directional.position.set(1, 1, 1);

  return [ambient, directional];
}

export { createLights };
