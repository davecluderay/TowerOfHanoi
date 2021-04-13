import { Path } from 'three';

export function createBezierCircle(r: number): Path {
  const k = ((r * 4) / 3) * (Math.sqrt(2) - 1);
  const path = new Path()
    .moveTo(r, 0)
    .bezierCurveTo(r, k, k, r, 0, r)
    .bezierCurveTo(-k, r, -r, k, -r, 0)
    .bezierCurveTo(-r, -k, -k, -r, 0, -r)
    .bezierCurveTo(k, -r, r, -k, r, 0);
  path.closePath();
  return path;
}
