/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { toLeft } from '../../common/to-left.js'

export function jarvis (S, n) {
  for (let k = 0; k < n; k++) {
    S[k].extreme = false
  }
  let ltl = lowestThenLeftmost(S, n)
  let k = ltl
  do {
    S[k].extreme = true
    let s = -1
    for (let t = 0; t < n; t++) {
      if (t !== k && t !== s &&
        (s === -1 || toLeft(S[k], S[s], S[t]))) {
        s = t
      }
    }
    S[k].succ = s
    k = s
  } while (ltl !== k)
}

export function lowestThenLeftmost (S, n) {
  let ltl = 0
  for (let k = 1; k < n; k++) {
    if (S[k].y < S[ltl].y ||
      (S[k].y === S[ltl].y &&
        S[k].x < S[ltl].x)) {
      ltl = k
    }
  }
  return ltl
}
