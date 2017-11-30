/**
 * em2046
 * 2017-10-29
 */
import { BinNode } from './bin-node.js'

// FIXME
// 14
// └──4
// │  ├──2          has bug
// │  │  ├──1       has bug
// │  │  └──3       has bug
// │  └──5          has bug
export let drawBinTree = function (binTree) {
  let rec = []
  let output = ''
  binTree.travPre((e, x) => {
    let tab = ''
    let depth = x.depth()
    if (BinNode.isLChild(x) && BinNode.sibling(x)) {
      rec[depth] = 1
    } else if (BinNode.isRChild(x)) {
      rec[depth] = 0
    }
    for (let i = 0; i < depth - 1; i++) {
      if (rec[i + 1] === 1) {
        tab += '│  '
      } else {
        tab += '   '
      }
    }
    if (BinNode.isLChild(x)) {
      if (BinNode.sibling(x)) {
        output += tab + '├──' + e.toString() + '\n'
      } else {
        output += tab + '└──' + e.toString() + '\n'
      }
    } else if (BinNode.isRChild(x)) {
      output += tab + '└──' + e.toString() + '\n'
    } else {
      output += tab + '' + e.toString() + '\n'
    }
  })
  return output
}
