/**
 * em2046
 * 2017-10-28
 */
import { BinNode } from './bin-node.js'

let bn = new BinNode('A')
bn.insertAsLC('B')
bn.insertAsRC('C')

console.log(bn)
console.log(bn.size())
