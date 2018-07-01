const CANVAS_SIZE = 680
const CANVAS_WIDTH = CANVAS_SIZE
const CANVAS_HEIGHT = CANVAS_SIZE

const NUMBER_OF_CELLS = 17
const NUMBER_OF_CELLS_HORIZONTAL = NUMBER_OF_CELLS
const NUMBER_OF_CELLS_VERTICAL = NUMBER_OF_CELLS

const CELL_SIZE_OF_HORIZONTAL = CANVAS_WIDTH / NUMBER_OF_CELLS_HORIZONTAL
const CELL_SIZE_OF_VERTICAL = CANVAS_HEIGHT / NUMBER_OF_CELLS_VERTICAL

const BLACK = '#000000'

function canvasInit () {
  let canvas = document.querySelector('#canvas')
  let ctx = canvas.getContext('2d')
  let dpr = window.devicePixelRatio || 1
  let bsr = ctx.backingStorePixelRatio || 1
  const PIXEL_RATIO = dpr / bsr
  canvas.width = CANVAS_WIDTH * PIXEL_RATIO
  canvas.height = CANVAS_HEIGHT * PIXEL_RATIO
  canvas.style.setProperty('width', CANVAS_WIDTH.toString() + 'px')
  canvas.style.setProperty('height', CANVAS_HEIGHT.toString() + 'px')
  ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)
  return ctx
}

let ctx = canvasInit()

class LifeMap {
  constructor (width, height, mapData) {
    this.cells = []
    for (let i = 0; i < height; i++) {
      let row = []
      for (let j = 0; j < width; j++) {
        if (mapData && mapData[i] && mapData[i][j]) {
          row[j] = new LifeCell(true)
        } else {
          row[j] = new LifeCell(false)
        }
      }
      this.cells[i] = row
    }
  }
}

class LifeCell {
  constructor (isAlive = false) {
    this.isAlive = isAlive
  }
}

function clearCanvas () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function drawLifeMap (map) {
  for (let i = 0; i < NUMBER_OF_CELLS_VERTICAL; i++) {
    for (let j = 0; j < NUMBER_OF_CELLS_HORIZONTAL; j++) {
      let cell = map.cells[i][j]
      drawLifeCell(cell, j, i)
    }
  }
}

function drawLifeCell (cell, x, y) {
  let left = x * CELL_SIZE_OF_HORIZONTAL
  let top = y * CELL_SIZE_OF_VERTICAL

  if (cell.isAlive) {
    ctx.fillStyle = BLACK

    ctx.beginPath()
    ctx.rect(left, top, CELL_SIZE_OF_HORIZONTAL, CELL_SIZE_OF_VERTICAL)
    ctx.fill()
  } else {
  }

}

function lifeTransition (map) {
  let stateTable = []

  for (let i = 0; i < NUMBER_OF_CELLS_VERTICAL; i++) {
    stateTable[i] = []
    for (let j = 0; j < NUMBER_OF_CELLS_HORIZONTAL; j++) {
      let cell = map.cells[i][j]
      let neighbours = getCellNeighbours(map, j, i)
      stateTable[i][j] = getStateOfCell(cell, neighbours)
    }
  }
  for (let i = 0; i < stateTable.length; i++) {
    for (let j = 0; j < stateTable[i].length; j++) {
      map.cells[i][j].isAlive = stateTable[i][j]
    }
  }
}

function getStateOfCell (cell, neighbours) {
  let aliveCount = 0
  let nextState = cell.isAlive
  for (let i = 0; i < neighbours.length; i++) {
    let neighbour = neighbours[i]
    if (neighbour.isAlive) {
      aliveCount++
    }
  }
  if (cell.isAlive) {
    if (aliveCount < 2) {
      nextState = false
    } else if ((aliveCount === 2) || (aliveCount === 3)) {
      nextState = true
    } else if (aliveCount > 3) {
      nextState = false
    }
  } else {
    if (aliveCount === 3 && !cell.isAlive) {
      nextState = true
    }
  }

  return nextState
}

function getCellNeighbours (map, x, y) {
  /**
   * NW   N   NE
   * W    C   E
   * SW   S   SE
   */
  let northwest = getCellOfOffset(map, x, y, -1, -1)
  let north = getCellOfOffset(map, x, y, 0, -1)
  let northeast = getCellOfOffset(map, x, y, 1, -1)

  let west = getCellOfOffset(map, x, y, -1, 0)
  let east = getCellOfOffset(map, x, y, 1, 0)

  let southwest = getCellOfOffset(map, x, y, -1, 1)
  let south = getCellOfOffset(map, x, y, 0, 1)
  let southeast = getCellOfOffset(map, x, y, 1, 1)

  return [
    northwest,
    north,
    northeast,
    west,
    east,
    southwest,
    south,
    southeast
  ]
}

function getMapDeviation (originX, originY, offsetX, offsetY) {
  let x
  let y

  let nextX = originX + offsetX
  let nextY = originY + offsetY

  if (nextX < 0) {
    x = (nextX + NUMBER_OF_CELLS_HORIZONTAL) % NUMBER_OF_CELLS_HORIZONTAL
  } else if (nextX >= NUMBER_OF_CELLS_HORIZONTAL) {
    x = nextX % NUMBER_OF_CELLS_HORIZONTAL
  } else {
    x = nextX
  }

  if (nextY < 0) {
    y = (nextY + NUMBER_OF_CELLS_VERTICAL) % NUMBER_OF_CELLS_VERTICAL
  } else if (nextY >= NUMBER_OF_CELLS_VERTICAL) {
    y = nextY % NUMBER_OF_CELLS_VERTICAL
  } else {
    y = nextY
  }

  return [x, y]
}

function getCellOfOffset (map, x, y, offsetX, offsetY) {
  let position = getMapDeviation(x, y, offsetX, offsetY)
  return map.cells[position[1]][position[0]]
}

let mapData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let lifeMap = new LifeMap(NUMBER_OF_CELLS_HORIZONTAL, NUMBER_OF_CELLS_VERTICAL, mapData)

drawLifeMap(lifeMap)

setInterval(function () {
  lifeTransition(lifeMap)
  clearCanvas()
  drawLifeMap(lifeMap)
}, 1000)
