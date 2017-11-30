/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { inTriangle } from '../../common/in-triangle.js'

export function extremePoint (S, n) {
  for (let s = 0; s < n; s++) {
    S[s].extreme = true
  }
  for (let p = 0; p < n; p++) {
    for (let q = p + 1; q < n; q++) {
      for (let r = q + 1; r < n; r++) {
        for (let s = 0; s < n; s++) {
          if (s === p || s === q || s === r || !S[s].extreme) {
            continue
          }
          if (inTriangle(S[p], S[q], S[r], S[s])) {
            S[s].extreme = false
          }
        }
      }
    }
  }
}
