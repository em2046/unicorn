/**
 * em2046
 * 2017-10-28
 */
import { Queue } from '../queue/queue.js'

export class BinNode {
  constructor (data, p = null, lc = null, rc = null) {
    this.data = data
    this.parent = p
    this.lChild = lc
    this.rChild = rc
    this.height = 0
  }

  static hasChild (x) {
    return BinNode.hasLChild(x) || BinNode.hasRChild(x)
  }

  static hasLChild (x) {
    return !!x.lChild
  }

  static hasRChild (x) {
    return !!x.rChild
  }

  static isRoot (x) {
    return !x.parent
  }

  static isLChild (x) {
    return !BinNode.isRoot(x) && (x === x.parent.lChild)
  }

  static isRChild (x) {
    return !BinNode.isRoot(x) && (x === x.parent.rChild)
  }

  static sibling (x) {
    return BinNode.isLChild(x) ? x.parent.rChild : x.parent.lChild
  }

  depth () {
    let depth = 0
    let x = this
    while (x.parent) {
      depth++
      x = x.parent
    }
    return depth
  }

  insertAsLC (e) {
    this.lChild = new BinNode(e, this)
    return this.lChild
  }

  insertAsRC (e) {
    this.rChild = new BinNode(e, this)
    return this.rChild
  }

  size () {
    let s = 1
    if (this.lChild) {
      s += this.lChild.size()
    }
    if (this.rChild) {
      s += this.rChild.size()
    }
    return s
  }

  succ () {
    let s = this
    if (this.rChild) {
      s = this.rChild
      while (BinNode.hasLChild(s)) {
        s = s.lChild
      }
    } else {
      while (BinNode.isRChild(s)) {
        s = s.parent
      }
      s = s.parent
    }
    return s
  }

  travPre (visit) {
    this.travPreR(this, visit)
  }

  travPreR (x, visit) {
    if (!x) {
      return
    }
    visit(x.data, x)
    this.travPreR(x.lChild, visit)
    this.travPreR(x.rChild, visit)
  }

  travIn (visit) {
    this.travInR(this, visit)
  }

  travInR (x, visit) {
    if (!x) {
      return
    }
    this.travInR(x.lChild, visit)
    visit(x.data, x)
    this.travInR(x.rChild, visit)
  }

  travPost (visit) {
    this.travPostR(this, visit)
  }

  travPostR (x, visit) {
    if (!x) {
      return
    }
    this.travPostR(x.lChild, visit)
    this.travPostR(x.rChild, visit)
    visit(x.data, x)
  }

  travLevel (visit) {
    let Q = new Queue()
    Q.enqueue(this)
    while (!Q.empty()) {
      let x = Q.dequeue()
      visit(x.data, x)
      if (BinNode.hasLChild(x)) {
        Q.enqueue(x.lChild)
      }
      if (BinNode.hasRChild(x)) {
        Q.enqueue(x.rChild)
      }
    }
  }
}
