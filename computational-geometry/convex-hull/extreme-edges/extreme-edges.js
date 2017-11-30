/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { toLeft } from '../../common/to-left.js'

export function makeEE (S, n) {
  for (let k = 0; k < n; k++) {
    S[k].extreme = false
  }
  for (let p = 0; p < n; p++) {
    for (let q = p + 1; q < n; q++) {
      checkEdge(S, n, p, q)
    }
  }
}

function checkEdge (S, n, p, q) {
  let lEmpty = true
  let rEmpty = true
  for (let k = 0; k < n && (lEmpty || rEmpty); k++) {
    if (k !== p && k !== q) {
      toLeft(S[p], S[q], S[k]) ? lEmpty = false : rEmpty = false
    }
  }
  if (lEmpty || rEmpty) {
    S[p].extreme = S[q].extreme = true
  }
}
