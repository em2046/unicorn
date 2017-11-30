/**
 * em2046
 * 2017-10-28
 */
/**
 * https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param x3
 * @param y3
 * @param x4
 * @param y4
 * @returns {[x,y]}
 */
export function lineLineIntersection (x1, y1, x2, y2, x3, y3, x4, y4) {
  let x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
  let y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
  return [x, y]
}
