/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { area2 } from './area2.js'

export function toLeft (p, q, s) {
  return area2(p, q, s) > 0
}
