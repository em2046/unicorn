/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */

import { Canvas } from '../../../canvas/canvas.js'
import { Point } from '../../../canvas/point.js'
import { Segment } from '../../../canvas/segment.js'
import { bruteForce } from './segment-intersection.js'

const SIZE = 10

let canvas = new Canvas(document.querySelector('#canvas'))
canvas.drawAxis()
let segments = []
for (let i = 0; i < SIZE; i++) {
  let startPoint = new Point(Canvas.random(), Canvas.random())
  let endPoint = new Point(Canvas.random(), Canvas.random())
  let segment = new Segment(startPoint, endPoint)
  segments.push(segment)
  canvas.drawSegment(segment, 'rgba(255,165,0,0.4)', 2)
}

let intersections = bruteForce(segments, SIZE)
for (let i = 0; i < intersections.length; i++) {
  let intersection = intersections[i]
  canvas.drawPoint(intersection, 'rgba(255,165,0,1)', 4)
}
