/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { Point } from '../../../canvas/point.js'
import { toLeft } from '../../common/to-left.js'
import { lineLineIntersection } from '../../common/line-line-intersection.js'

export function bruteForce (S, n) {
  let points = []
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let si = S[i]
      let sj = S[j]

      let isIntersection = segmentIntersectionTest(si, sj)
      if (isIntersection) {
        let spRaw = segmentIntersection(si, sj)
        let sp = new Point(...spRaw)
        points.push(sp)
      }
    }
  }
  return points
}

function segmentIntersectionTest (a, b) {
  let aStart = a.startPoint
  let aEnd = a.endPoint
  let bStart = b.startPoint
  let bEnd = b.endPoint

  let jOnBothSideOfI = toLeft(aStart, aEnd, bStart) !==
    toLeft(aStart, aEnd, bEnd)
  let iOnBothSideOfJ = toLeft(bStart, bEnd, aStart) !==
    toLeft(bStart, bEnd, aEnd)
  return jOnBothSideOfI && iOnBothSideOfJ
}

function segmentIntersection (a, b) {
  let aStart = a.startPoint
  let aEnd = a.endPoint
  let bStart = b.startPoint
  let bEnd = b.endPoint
  return lineLineIntersection(aStart.x, aStart.y, aEnd.x, aEnd.y, bStart.x, bStart.y, bEnd.x, bEnd.y)
}
