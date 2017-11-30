/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { Canvas } from './canvas.js'
import { Point } from './point.js'
import { Segment } from './segment.js'

let canvas = new Canvas(document.querySelector('#canvas'))
canvas.drawAxis()

let points = []
let segments = []
let prevPoint = null
for (let i = 0; i < 20; i++) {
  let point = new Point(Canvas.random(), Canvas.random(), i)
  points.push(point)
  if (prevPoint) {
    let segment = new Segment(point, prevPoint)
    segments.push(segment)
  }
  prevPoint = point
}

for (let i = 0; i < segments.length; i++) {
  canvas.drawSegment(segments[i])
}

for (let i = 0; i < points.length; i++) {
  canvas.drawPoint(points[i])
}
