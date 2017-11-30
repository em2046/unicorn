/**
 * em2046
 * 2017-10-28
 */
import { BinNode } from './bin-node.js'

export class BinTree {
  constructor () {
    this._size = 0
    this._root = null
  }

  static stature (p) {
    return p ? p.height : -1
  }

  updateHeight (x) {
    x.height = 1 + Math.max(BinTree.stature(x.lChild), BinTree.stature(x.rChild))
    return x.height
  }

  updateHeightAbove (x) {
    while (x) {
      this.updateHeight(x)
      x = x.parent
    }
  }

  size () {
    return this._size
  }

  empty () {
    return !this._root
  }

  root () {
    return this._root
  }

  insertAsRoot (e) {
    this._size = 1
    this._root = new BinNode(e)
    return this._root
  }

  insertAsLC (x, e) {
    this._size++
    x.insertAsLC(e)
    this.updateHeightAbove(x)
    return x.lChild
  }

  insertAsRC (x, e) {
    this._size++
    x.insertAsRC(e)
    this.updateHeightAbove(x)
    return x.rChild
  }

  travPre (visit) {
    this._root && this._root.travPre(visit)
  }

  travIn (visit) {
    this._root && this._root.travIn(visit)
  }

  travPost (visit) {
    this._root && this._root.travPost(visit)
  }

  travLevel (visit) {
    this._root && this._root.travLevel(visit)
  }
}
