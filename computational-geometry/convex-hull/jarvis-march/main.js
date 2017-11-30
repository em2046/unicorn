/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */

import { Canvas } from '../../../canvas/canvas.js'
import { Point } from '../../../canvas/point.js'
import { Segment } from '../../../canvas/segment.js'
import { jarvis, lowestThenLeftmost } from './jarvis-march.js'

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
jarvis(points, points.length)
console.timeEnd('Convex Hull')

let ltl = lowestThenLeftmost(points, points.length)
let k = ltl
let point
for (let i = 0; i < points.length; i++) {
  if (points[k].succ === ltl) {
    break
  }
  point = points[k]
  let segment = new Segment(point, points[point.succ])
  k = point.succ
  canvas.drawSegment(segment, 'rgba(255,165,0,0.5)')
}
canvas.drawSegment(new Segment(points[point.succ], points[ltl]), 'rgba(255,165,0,0.5)')

for (let i = 0; i < points.length; i++) {
  let point = points[i]
  if (point.extreme) {
    canvas.drawPoint(point, '#FFA500', 4)
  } else {
    canvas.drawPoint(point, 'rgba(127,127,127,0.5)', 2)
  }
}
