/**
 * em2046
 * 2017-10-29
 */
import { BinTree } from '../bin-tree/bin-tree.js'
import { BinNode } from '../bin-tree/bin-node.js'

export class BST extends BinTree {
  constructor () {
    super()
    this._hot = null
  }

  search (e) {
    this._hot = null
    return this.searchIn(this._root, e)
  }

  searchIn (v, e) {
    if (!v || (e.equal(v.data))) {
      return v
    }
    this._hot = v

    if (e.lessThan(v.data)) {
      this._hotDirection = 0
      return this.searchIn(v.lChild, e)
    } else {
      this._hotDirection = 1
      return this.searchIn(v.rChild, e)
    }
  }

  insert (e) {
    if (this.empty()) {
      this.insertAsRoot(e)
      return
    }

    let x = this.search(e)
    if (!x) {
      let x = new BinNode(e, this._hot)
      if (this._hotDirection === 0) {
        this._hot.lChild = x
      } else if (this._hotDirection === 1) {
        this._hot.rChild = x
      } else {
        throw new Error('Hot direction Error')
      }
    }
    this._size++
    this.updateHeightAbove(x)
  }

  remove (e) {
    let x = this.search(e)
    if (!x) {
      return false
    }

    this.removeAt(x)
    this._size--
    this.updateHeightAbove(this._hot)
    return true
  }

  removeAt (x) {
    let w = x
    let succ = null
    let isRoot = BinNode.isRoot(x)

    if (!BinNode.hasLChild(x)) {
      // has not leftChild
      if (BinNode.isLChild(x)) {
        this._hot.lChild = x.rChild
      } else if (BinNode.isRChild(x)) {
        this._hot.rChild = x.rChild
      }
      x = x.rChild
      succ = x
      if (isRoot) {
        this._root = x
      }
    } else if (!BinNode.hasRChild(x)) {
      // has leftChild but has not rightChild
      if (BinNode.isLChild(x)) {
        this._hot.lChild = x.lChild
      } else if (BinNode.isRChild(x)) {
        this._hot.rChild = x.lChild
      }
      x = x.lChild
      succ = x
      if (isRoot) {
        this._root = x
      }
    } else {
      // has two children
      w = w.succ()
      // swap x and w
      let temp = x.data
      x.data = w.data
      w.data = temp

      succ = w.rChild
      let u = w.parent
      if (u === x) {
        u.rChild = succ
      } else {
        u.lChild = succ
      }
    }

    this._hot = w.parent
    if (succ) {
      succ.parent = this._hot
    }

    return succ
  }
}
