/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */

import { Canvas } from '../../../canvas/canvas.js'
import { Point } from '../../../canvas/point.js'
import { Segment } from '../../../canvas/segment.js'
import { grahamScan } from './graham-scan.js'

const POINT_SIZE = 20000

let canvas = new Canvas(document.querySelector('#canvas'))
canvas.drawAxis()

function getInUnitCirclePoint () {
  let x = Canvas.random()
  let y = Canvas.random()
  while (Math.hypot(x, y) > 1) {
    x = Canvas.random()
    y = Canvas.random()
  }
  return new Point(x, y)
}

let points = []
for (let i = 0; i < POINT_SIZE; i++) {
  points.push(getInUnitCirclePoint())
}

console.time('Convex Hull')
let extremePoints = grahamScan(points, points.length)
console.timeEnd('Convex Hull')

for (let i = 0; i < extremePoints.size(); i++) {
  let point = extremePoints.get(i)

  let endPoint
  if (i !== extremePoints.size() - 1) {
    endPoint = extremePoints.get(i + 1)
  } else {
    endPoint = extremePoints.get(0)
  }
  let segment = new Segment(point, endPoint)
  canvas.drawSegment(segment, 'rgba(255,165,0,0.5)')
}

for (let i = 0; i < extremePoints.size(); i++) {
  let point = extremePoints.get(i)
  point.extreme = true
}

for (let i = 0; i < points.length; i++) {
  let point = points[i]
  if (point.extreme) {
    canvas.drawPoint(point, '#FFA500', 4)
  }
}

for (let i = 0; i < points.length; i++) {
  let point = points[i]
  if (!point.extreme) {
    canvas.drawPoint(point, 'rgba(127,127,127,0.5)', 2)
  }
}
