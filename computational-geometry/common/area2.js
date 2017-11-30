/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
export function area2 (p, q, s) {
  return p.x * q.y - p.y * q.x +
    q.x * s.y - q.y * s.x +
    s.x * p.y - s.y * p.x
}
