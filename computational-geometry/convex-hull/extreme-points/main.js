/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */

import { Canvas } from '../../../canvas/canvas.js'
import { Point } from '../../../canvas/point.js'
import { extremePoint } from './extreme-points.js'

const POINT_SIZE = 20

let canvas = new Canvas(document.querySelector('#canvas'))
canvas.drawAxis()

let points = []
for (let i = 0; i < POINT_SIZE; i++) {
  let point = new Point(Canvas.random(), Canvas.random(), i)
  points.push(point)
}

extremePoint(points, points.length)

for (let i = 0; i < points.length; i++) {
  let point = points[i]
  if (point.extreme) {
    canvas.drawPoint(point, '#FFA500')
  } else {
    canvas.drawPoint(point, '#999999')
  }
}
