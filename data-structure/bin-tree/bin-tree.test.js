/**
 * em2046
 * 2017-10-28
 */
import { BinTree } from './bin-tree.js'
import { drawBinTree } from './bin-tree-helper.js'

/**
 *    A
 *  B   C
 * D E F G
 * ...
 */
let bt = new BinTree()
let bnA = bt.insertAsRoot('A')
let bnB = bt.insertAsLC(bnA, 'B')
let bnC = bt.insertAsRC(bnA, 'C')
let bnD = bt.insertAsLC(bnB, 'D')
let bnE = bt.insertAsRC(bnB, 'E')
let bnF = bt.insertAsLC(bnC, 'F')
let bnG = bt.insertAsRC(bnC, 'G')
bt.insertAsLC(bnD, 'H')
let bnI = bt.insertAsRC(bnD, 'I')
bt.insertAsLC(bnE, 'J')
let bnK = bt.insertAsRC(bnE, 'K')
bt.insertAsLC(bnF, 'L')
bt.insertAsRC(bnF, 'M')
bt.insertAsLC(bnG, 'N')
bt.insertAsRC(bnG, 'O')
let bnP = bt.insertAsLC(bnI, 'P')
bt.insertAsRC(bnI, 'Q')
bt.insertAsLC(bnK, 'R')
let bnS = bt.insertAsRC(bnK, 'S')
bt.insertAsLC(bnP, 'T')
bt.insertAsLC(bnS, 'U')
let bnV = bt.insertAsRC(bnS, 'V')
bt.insertAsRC(bnV, 'W')

console.log(bt)

console.log(drawBinTree(bt))

// A B D E C F G
let travPreOutput = 'travPre:\n'
bt.travPre((e, x) => {
  let tab = ''
  // let depth = treeDepth - x.height
  for (let i = x.depth(); i > 0; i--) {
    tab += '\t'
  }
  travPreOutput += tab + e + '\n'
})
console.log(travPreOutput)

// D B E A F C G
let travInOutput = 'travIn:\n'
bt.travIn((e, x) => {
  let tab = ''
  for (let i = x.depth(); i > 0; i--) {
    tab += '\t'
  }
  travInOutput += tab + e + '\n'
})
console.log(travInOutput)

// D E B F G C A
let travPostOutput = 'travPost:\n'
bt.travPost((e, x) => {
  let tab = ''
  for (let i = x.depth(); i > 0; i--) {
    tab += '\t'
  }
  travPostOutput += tab + e + '\n'
})
console.log(travPostOutput)

// A B C D E F G
let travLevel = 'travLevel:\n'
bt.travLevel((e) => {
  travLevel += e + '\t'
})
console.log(travLevel)
