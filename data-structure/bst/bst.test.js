/**
 * em2046
 * 2017-10-29
 */
import { BST } from './bst.js'
import { Entry } from '../entry/entry.js'
import { drawBinTree } from '../bin-tree/bin-tree-helper.js'

let bst = new BST()
console.log(bst)

let eA = new Entry(13, 'A')
let eB = new Entry(11, 'B')
let eC = new Entry(9, 'C')
let eD = new Entry(7, 'D')
let eE = new Entry(5, 'E')
let eF = new Entry(3, 'F')
let eG = new Entry(1, 'G')
let eH = new Entry(2, 'H')
let eI = new Entry(4, 'I')
let eJ = new Entry(6, 'J')
let eK = new Entry(8, 'K')
let eL = new Entry(10, 'L')
let eM = new Entry(12, 'M')
let eN = new Entry(14, 'N')

bst.insert(eA)
bst.insert(eB)
bst.insert(eC)
bst.insert(eD)
bst.insert(eE)
bst.insert(eF)
bst.insert(eG)
bst.insert(eH)
bst.insert(eI)
bst.insert(eJ)
bst.insert(eK)
bst.insert(eL)
bst.insert(eM)
bst.insert(eN)

console.log(drawBinTree(bst))

bst.remove(new Entry(1))
bst.remove(new Entry(2))
bst.remove(new Entry(3))
bst.remove(new Entry(4))
bst.remove(new Entry(5))
bst.remove(new Entry(6))
bst.remove(new Entry(7))
bst.remove(new Entry(8))
bst.remove(new Entry(9))
bst.remove(new Entry(10))
bst.remove(new Entry(11))
bst.remove(new Entry(12))
bst.remove(new Entry(13))
bst.remove(new Entry(14))

console.log(drawBinTree(bst))
