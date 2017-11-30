/**
 * author: Sheng JIANG
 * date: 2017-10-19
 */
export class ListNode {
  constructor (element = null, precursor = null, successor = null) {
    this.element = element
    this.precursor = precursor
    this.successor = successor
  }

  insertAsPrecursor (element) {
    let x = new ListNode(element, this.precursor, this)
    if (this.precursor) {
      this.precursor.successor = x
    }
    this.precursor = x
    return x
  }

  insertAsSuccessor (element) {
    let x = new ListNode(element, this, this.successor)
    if (this.successor) {
      this.successor.precursor = x
    }
    this.successor = x
    return x
  }
}
