/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
import { Stack } from '../../../data-structure/stack/stack.js'
import { Vector } from '../../../data-structure/vector/vector.js'
import { toLeft } from '../../common/to-left.js'

export function grahamScan (A, n) {
  let ltl = lowestThenLeftmost(A, n)
  let ltlPoint = A[ltl]

  let V = new Vector(A)

  V.remove(ltl)

  console.time('sort')
  V.sort(function (a, b) {
    let left = toLeft(ltlPoint, a, b)
    return left ? -1 : 1
  })
  console.timeEnd('sort')

  console.time('create stack')
  // Create a stack S = [p0, p1>
  let S = new Stack()
  S.push(ltlPoint)
  S.push(V.get(0))

  // Create a stack T = [pn, ..., p2, p1>
  let T = new Stack()
  for (let i = V.size() - 1; i > 0; i--) {
    T.push(V.get(i))
  }
  console.timeEnd('create stack')

  console.time('core')
  while (!T.empty()) {
    if (toLeft(S.second(), S.top(), T.top())) {
      S.push(T.pop())
    } else {
      S.pop()
    }
  }
  console.timeEnd('core')

  return S
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
