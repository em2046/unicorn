/**
 * author: Sheng JIANG
 * date: 2017-10-17
 */
import { Vector } from '../vector/vector.js'

export class Stack extends Vector {
  push (element) {
    this.add(element)
  }

  pop () {
    return this.remove(this._size - 1)
  }

  top () {
    return this._elements[this._size - 1]
  }

  second () {
    return this._elements[this._size - 2]
  }
}
