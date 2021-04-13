import { ExtrudeGeometry, FrontSide, Group, Mesh, MeshStandardMaterial, Object3D, Shape } from 'three';
import { createBezierCircle } from './helpers';
import {
  baseBevelSize,
  baseColor,
  baseHeight,
  baseRadius,
  baseThickness,
  baseXPositions,
  poleBevelSize,
  poleRadius,
} from '../options';

function createBaseMaterial(color: number): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: color,
    side: FrontSide,
  });
}

function createBase(baseIndex: number): Object3D {
  const poleShape = new Shape();
  poleShape.add(createBezierCircle(poleRadius - poleBevelSize));
  const poleGeometry = new ExtrudeGeometry(poleShape, {
    depth: baseHeight + baseThickness - poleBevelSize * 2,
    curveSegments: 100,
    bevelEnabled: !!poleBevelSize,
    bevelSize: poleBevelSize,
    bevelThickness: poleBevelSize,
    bevelSegments: 20,
  });
  poleGeometry.translate(0, 0, -poleBevelSize);

  poleGeometry.rotateX(Math.PI / 2);
  poleGeometry.translate(0, baseHeight - poleBevelSize, 0);
  const poleMaterial = createBaseMaterial(baseColor);
  const pole = new Mesh(poleGeometry, poleMaterial);

  const baseShape = new Shape();
  baseShape.add(createBezierCircle(baseRadius - baseBevelSize));
  const baseGeometry = new ExtrudeGeometry(baseShape, {
    depth: baseThickness - baseBevelSize * 2,
    curveSegments: 100,
    bevelEnabled: true,
    bevelSize: baseBevelSize,
    bevelThickness: baseBevelSize,
    bevelSegments: 20,
  });
  baseGeometry.rotateX(Math.PI / 2);
  baseGeometry.translate(0, -baseBevelSize, 0);
  const baseMaterial = createBaseMaterial(baseColor);
  const base = new Mesh(baseGeometry, baseMaterial);

  const model = new Group().add(base).add(pole);
  model.position.x = baseXPositions[baseIndex];
  return model;
}

export function createBases() {
  return [createBase(0), createBase(1), createBase(2)];
}
