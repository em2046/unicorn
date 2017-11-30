/**
 * author: Sheng JIANG
 * date: 2017-10-19
 */
import { ListNode } from './list-node.js'

export class List {
  constructor () {
    this.init()
  }

  init () {
    this._size = 0
    this.header = new ListNode(null)
    this.trailer = new ListNode(null)

    this.header.precursor = null
    this.header.successor = this.trailer

    this.trailer.successor = null
    this.trailer.precursor = this.header
  }

  empty () {
    return this._size === 0
  }

  first () {
    return this.header.successor
  }

  last () {
    return this.trailer.precursor
  }

  insertFirst (element) {
    this._size++
    return this.header.insertAsSuccessor(element)
  }

  insertLast (element) {
    this._size++
    return this.trailer.insertAsPrecursor(element)
  }

  insertBefore (node, element) {
    this._size++
    return node.insertAsPrecursor(element)
  }

  insertAfter (node, element) {
    this._size++
    return node.insertAsSuccessor(element)
  }

  remove (node) {
    let element = node.element
    node.precursor.successor = node.successor
    node.successor.precursor = node.precursor
    this._size--
    return element
  }

  traverse (visit) {
    for (let p = this.header.successor; p !== this.trailer; p = p.successor) {
      visit(p.element)
    }
  }

  toArray () {
    let array = new Array(this._size)
    for (let p = this.header.successor, i = 0; p !== this.trailer && i < this._size; p = p.successor, i++) {
      array[i] = p.element
    }
    return array
  }
}
