/**
 * author: Sheng JIANG
 * date: 2017-10-17
 */
const DEFAULT_CAPACITY = 8

export class Vector {
  constructor () {
    this.init()
    if (arguments.length === 0) {
      return
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
      this.copyFrom(arguments[0])
    }
  }

  init () {
    this._elements = new Array(DEFAULT_CAPACITY)
    this._size = 0
    this._capacity = DEFAULT_CAPACITY
  }

  copyFrom () {
    if (arguments.length === 1) {
      this._copyFromAll(...arguments)
      return
    }
    if (arguments.length === 3) {
      this._copyFromInterval(...arguments)
    }
  }

  _copyFromInterval (array, low, high) {
    this._elements = new Array(array.length)
    for (let i = 0, j = low; i < array.length && j < high; i++, j++) {
      this._elements[i] = array[j]
    }
    this._size = high - low
  }

  _copyFromAll (array) {
    this._copyFromInterval(array, 0, array.length)
  }

  size () {
    return this._size
  }

  empty () {
    return this._size === 0
  }

  _expand () {
    if (this._size < this._capacity) {
      return
    }

    this._capacity = this._capacity * 2
    let oldElements = this._elements
    let newElements = new Array(this._capacity)
    for (let i = 0; i < this._size; i++) {
      newElements[i] = oldElements[i]
      this._elements = newElements
    }
  }

  get (index) {
    return this._elements[index]
  }

  add (element) {
    this._expand()
    this._elements[this._size] = element
    this._size++
  }

  clear () {
    this.init()
  }

  remove () {
    if (arguments.length === 1) {
      return this._removeAt(...arguments)
    }
    if (arguments.length === 2) {
      return this._removeInterval(...arguments)
    }
  }

  _removeAt (index) {
    let element = this._elements[index]
    this._removeInterval(index, index + 1)
    return element
  }

  _removeInterval (low, high) {
    if (low === high) {
      return 0
    }
    while (high < this._size) {
      this._elements[low++] = this._elements[high++]
    }
    this._size = low
    return high - low
  }

  sort (comparator) {
    this._quickSortInterval(0, this._size, comparator)
  }

  mergeSort (comparator) {
    this._mergeSortInterval(0, this._size, comparator)
  }

  quickSort (comparator) {
    this._quickSortInterval(0, this._size, comparator)
  }

  _mergeSortInterval (lo, hi, comparator) {
    if (hi - lo < 2) {
      return
    }
    let mi = (lo + hi) >> 1
    this._mergeSortInterval(lo, mi, comparator)
    this._mergeSortInterval(mi, hi, comparator)
    this._merge(lo, mi, hi, comparator)
  }

  _merge (lo, mi, hi, comparator) {
    // lo = low
    // mi = middle
    // hi = high
    // o = offset
    // i = index
    // l = length

    let oa = lo
    let lb = mi - lo

    //    lo      mi     hi
    // A [empty         ]
    // B [x1, x2]
    //         C [x3, x4]
    let A = this._elements
    let C = this._elements
    let B = new Array(lb)
    for (let i = 0; i < lb; i++) {
      B[i] = A[oa + i]
    }

    let lc = hi - mi
    let oc = mi

    // until b is overflow
    for (let ia = 0, ib = 0, ic = 0; ib < lb;) {
      // if (c is not overflow) && (c < b),
      if ((ic < lc) && (comparator(C[oc + ic], B[ib]) === -1)) {
        // then move c to A
        A[oa + ia++] = C[oc + ic++]
      }

      // if (c is overflow) || (b < c),
      if ((!(ic < lc) || comparator(B[ib], C[ic + oc]) !== 1)) {
        // then move b to A
        A[oa + ia++] = B[ib++]
      }
    }
  }

  _quickSortInterval (lo, hi, comparator) {
    if (hi - lo < 2) {
      return
    }
    let mi = this._partition(lo, hi - 1, comparator)
    this._quickSortInterval(lo, mi, comparator)
    this._quickSortInterval(mi + 1, hi, comparator)
  }

  // TODO document
  _partition (lo, hi, comparator) {
    this._swap(lo, lo + ~~(Math.random() * (hi - lo + 1)))
    let pivot = this._elements[lo]
    while (lo < hi) {
      while ((lo < hi) && (comparator(pivot, this._elements[hi]) !== 1)) {
        hi--
      }
      this._elements[lo] = this._elements[hi]

      while ((lo < hi) && (comparator(this._elements[lo], pivot) !== 1)) {
        lo++
      }
      this._elements[hi] = this._elements[lo]
    }
    this._elements[lo] = pivot
    return lo
  }

  _swap (aIndex, bIndex) {
    let temp = this._elements[aIndex]
    this._elements[aIndex] = this._elements[bIndex]
    this._elements[bIndex] = temp
  }

  toArray () {
    let array = new Array(this._size)
    for (let i = 0; i < this._size; i++) {
      array[i] = this._elements[i]
    }
    return array
  }
}
