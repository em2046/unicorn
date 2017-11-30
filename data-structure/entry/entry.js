/**
 * em2046
 * 2017-10-29
 */
export class Entry {
  constructor (k, v) {
    this.key = k
    this.value = v
  }

  lessThan (e) {
    return this.key < e.key
  }

  greaterThan (e) {
    return this.key > e.key
  }

  equal (e) {
    return this.key === e.key
  }

  notEqual (e) {
    return this.key !== e.key
  }

  toString () {
    return this.key
  }
}
