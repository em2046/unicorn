/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { toLeft } from './to-left.js'

export function inTriangle (p, q, r, s) {
  let pqLeft = toLeft(p, q, s)
  let qrLeft = toLeft(q, r, s)
  let rpLeft = toLeft(r, p, s)
  return (pqLeft === qrLeft) && (qrLeft === rpLeft)
}
