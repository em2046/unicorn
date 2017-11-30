/**
 * author: Sheng JIANG
 * date: 2017-10-19
 */
import { List } from '../list/list.js'

export class Queue extends List {
  enqueue (element) {
    this.insertLast(element)
  }

  dequeue () {
    return this.remove(this.first())
  }

  front () {
    return this.first().element
  }
}
