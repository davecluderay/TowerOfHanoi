import { ExtrudeGeometry, FrontSide, Mesh, MeshStandardMaterial, Object3D, Shape } from 'three';
import { createBezierCircle } from './helpers';
import {
  discBevelSize,
  discColors,
  discRadiusDelta,
  discThickness,
  numberOfDiscs,
  poleRadius,
  smallestDiscRadius,
} from './options';

function createDiscMaterial(color: number): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: color,
    side: FrontSide,
  });
}

function createDisc(sizeIndex: number, color: number): Object3D {
  const outer = createBezierCircle(smallestDiscRadius - discBevelSize + sizeIndex * discRadiusDelta);
  const inner = createBezierCircle(poleRadius + discBevelSize);

  const shape = new Shape();
  shape.add(outer);
  shape.holes.push(inner);

  const geometry = new ExtrudeGeometry(shape, {
    depth: discThickness - discBevelSize * 2,
    curveSegments: 60,
    bevelEnabled: true,
    bevelSize: discBevelSize,
    bevelThickness: discBevelSize,
    bevelSegments: 10,
  });
  geometry.rotateX(Math.PI / 2);
  geometry.translate(0, -discBevelSize, 0);

  const material = createDiscMaterial(color);

  const disc = new Mesh(geometry, material);
  disc.translateY(discThickness * (numberOfDiscs - sizeIndex));
  return disc;
}

export function createDiscs() {
  return discColors.map((color, index) => createDisc(index, color));
}
