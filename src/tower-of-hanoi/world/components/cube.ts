import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
  const geometry = new BoxGeometry(5, 5, 5);
  const material = new MeshStandardMaterial({ color: 'purple' });
  const cube = new Mesh(geometry, material);

  Object.assign(cube, {
    tick: (delta: number) => cube.rotateY((delta * Math.PI) / 2),
  });

  return cube;
}

export { createCube };
