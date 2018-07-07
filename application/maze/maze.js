class UnionSet {
  constructor (size) {
    this.set = new Array(size)
    for (let i = 0; i < this.set.length; i++) {
      this.set[i] = -1
    }
  }

  union (root1, root2) {
    if (this.set[root1] < this.set[root2]) {
      this.set[root2] = root1
    } else {
      if (this.set[root1] === this.set[root2]) {
        this.set[root2]--
      }
      this.set[root1] = root2
    }
  }

  findSet (x) {
    if (this.set[x] < 0) {
      return x
    }
    return this.set[x] = this.findSet(this.set[x])
  }

  sameSet (x, y) {
    return this.findSet(x) === this.findSet(y)
  }

  unionElement (x, y) {
    this.union(this.findSet(x), this.findSet(y))
  }
}

class Maze {
  constructor (columns, rows, canvas, width, height) {
    this.columns = columns
    this.rows = rows
    this.cells = columns * rows
    this.width = width
    this.height = height

    this.linkedMap = {}
    this.unionSets = new UnionSet(this.cells)
    this.canvas = canvas
  }

  generate () {
    while (!this.linkedToFirstCell()) {
      let cellPairs = this.pickRandomPairs()
      if (!this.unionSets.sameSet(cellPairs[0], cellPairs[1])) {
        this.unionSets.unionElement(cellPairs[0], cellPairs[1])
        this.addLinkedMap(cellPairs[0], cellPairs[1])
      }
    }
  }

  linkedToFirstCell () {
    for (let i = 0; i < this.cells; i++) {
      if (!this.unionSets.sameSet(0, i)) {
        return false
      }
    }
    return true
  }

  pickRandomPairs () {
    let cell = (Math.random() * this.cells) >> 0
    let neighborCells = []
    let row = (cell / this.columns) >> 0
    let columns = cell % this.rows

    if (row !== 0) {
      neighborCells.push(cell - this.columns)
    }
    if (row !== this.rows - 1) {
      neighborCells.push(cell + this.columns)
    }
    if (columns !== 0) {
      neighborCells.push(cell - 1)
    }
    if (columns !== this.columns - 1) {
      neighborCells.push(cell + 1)
    }
    let index = (Math.random() * neighborCells.length) >> 0
    return [cell, neighborCells[index]]
  }

  addLinkedMap (x, y) {
    if (!this.linkedMap[x]) {
      this.linkedMap[x] = []
    }
    if (!this.linkedMap[y]) {
      this.linkedMap[y] = []
    }
    if (this.linkedMap[x].indexOf(y) < 0) {
      this.linkedMap[x].push(y)
    }
    if (this.linkedMap[y].indexOf(x) < 0) {
      this.linkedMap[y].push(x)
    }
  }

  draw () {
    let linkedMap = this.linkedMap
    let cellWidth = this.width / this.columns
    let cellHeight = this.height / this.rows
    let ctx = canvas.getContext('2d')

    ctx.translate(0.5, 0.5)
    ctx.beginPath()
    for (let i = 0; i < this.cells; i++) {
      let row = i / this.columns >> 0
      let column = i % this.columns
      if (column !== this.columns - 1 && (!linkedMap[i] || linkedMap[i].indexOf(i + 1) < 0)) {
        ctx.moveTo((column + 1) * cellWidth >> 0, row * cellHeight >> 0)
        ctx.lineTo((column + 1) * cellWidth >> 0, (row + 1) * cellHeight >> 0)
      }
      if (row !== this.rows - 1 && (!linkedMap[i] || linkedMap[i].indexOf(i + this.columns) < 0)) {
        ctx.moveTo(column * cellWidth >> 0, (row + 1) * cellHeight >> 0)
        ctx.lineTo((column + 1) * cellWidth >> 0, (row + 1) * cellHeight >> 0)
      }
    }
    ctx.strokeStyle = 'black'
    ctx.stroke()
    ctx.closePath()
    this.drawBorder(ctx, cellWidth, cellHeight)
  }

  drawBorder (ctx, cellWidth, cellHeight) {
    ctx.strokeRect(0, 0, this.width - 1, this.height - 1)
  }

  calPath () {
    let pathTable = new Array(this.cells)
    for (let i = 0; i < pathTable.length; i++) {
      pathTable[i] = {
        known: false,
        prevCell: -1
      }
    }
    let map = this.linkedMap
    let unSearchCells = [0]
    let j = 0
    while (!pathTable[pathTable.length - 1].known) {
      while (unSearchCells.length) {
        let cell = unSearchCells.pop()
        for (let i = 0; i < map[cell].length; i++) {
          if (pathTable[map[cell][i]].known) {
            continue
          }
          pathTable[map[cell][i]].known = true
          pathTable[map[cell][i]].prevCell = cell
          unSearchCells.unshift(map[cell][i])
          if (pathTable[pathTable.length - 1].known) {
            break
          }
        }
      }
    }
    let cell = this.cells - 1
    let path = [cell]
    while (cell !== 0) {
      cell = pathTable[cell].prevCell
      path.push(cell)
    }
    return path
  }

  drawPath () {
    let cellWidth = this.width / this.columns
    let cellHeight = this.height / this.rows
    let path = this.calPath()
    ctx.translate((cellWidth >> 1) - 1, (cellWidth >> 1) - 1)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    for (let i = path.length; i >= 0; i--) {
      let point = path[i]
      let row = point / this.columns >> 0
      let column = point % this.columns
      ctx.lineTo(column * cellWidth, row * cellHeight)
    }
    ctx.lineWidth = 4
    ctx.strokeStyle = 'green'
    ctx.stroke()
    ctx.closePath()
  }
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const NUMBER_OF_CELLS = 50
const NUMBER_OF_CELLS_HORIZONTAL = NUMBER_OF_CELLS
const NUMBER_OF_CELLS_VERTICAL = NUMBER_OF_CELLS

let canvas = document.getElementById('maze')
let ctx = canvas.getContext('2d')
let dpr = window.devicePixelRatio || 1
let bsr = ctx.backingStorePixelRatio || 1
const PIXEL_RATIO = dpr / bsr
canvas.width = CANVAS_WIDTH * PIXEL_RATIO
canvas.height = CANVAS_HEIGHT * PIXEL_RATIO
canvas.style.setProperty('width', CANVAS_WIDTH.toString() + 'px')
canvas.style.setProperty('height', CANVAS_HEIGHT.toString() + 'px')
ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)

let maze = new Maze(NUMBER_OF_CELLS_HORIZONTAL, NUMBER_OF_CELLS_VERTICAL, canvas, CANVAS_WIDTH, CANVAS_HEIGHT)
maze.generate()
maze.draw()
maze.drawPath()
