/**
 * author: Sheng JIANG
 * date: 2017-10-23
 */
const CANVAS_SIZE = 800
const CANVAS_BORDER_SIZE = 50

export class Canvas {
  constructor (canvas) {
    this.init(canvas)
  }

  init (canvas) {
    let ctx = canvas.getContext('2d')
    this.ctx = ctx
    let dpr = window.devicePixelRatio || 1
    let bsr = ctx.backingStorePixelRatio || 1
    const PIXEL_RATIO = dpr / bsr
    let size = (CANVAS_SIZE + CANVAS_BORDER_SIZE * 2)
    canvas.width = size * PIXEL_RATIO
    canvas.height = size * PIXEL_RATIO
    canvas.style.setProperty('width', size.toString() + 'px')
    canvas.style.setProperty('height', size.toString() + 'px')
    ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)
  }

  drawAxis () {
    let ctx = this.ctx
    ctx.strokeStyle = '#CCCCCC'
    ctx.fillStyle = '#CCCCCC'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(Canvas.transform(-1), Canvas.transform(0))
    ctx.lineTo(Canvas.transform(1), Canvas.transform(0))
    ctx.moveTo(Canvas.transform(0), Canvas.transform(-1))
    ctx.lineTo(Canvas.transform(0), Canvas.transform(1))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(Canvas.transform(1), Canvas.transform(0) + CANVAS_SIZE / 120)
    ctx.lineTo(Canvas.transform(1) + CANVAS_SIZE / 80, Canvas.transform(0))
    ctx.lineTo(Canvas.transform(1), Canvas.transform(0) - CANVAS_SIZE / 120)
    ctx.moveTo(Canvas.transform(0) + CANVAS_SIZE / 120, Canvas.transform(1))
    ctx.lineTo(Canvas.transform(0), Canvas.transform(1) + CANVAS_SIZE / 80)
    ctx.lineTo(Canvas.transform(0) - CANVAS_SIZE / 120, Canvas.transform(1))
    ctx.fill()
  }

  drawPoint (point, color = '#999999', size = 10) {
    let ctx = this.ctx
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(Canvas.transform(point.x), Canvas.transform(point.y), size, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '12px Fira Code'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'baseline'
    ctx.fillText(point.char, Canvas.transform(point.x), Canvas.transform(point.y) + 4)
  }

  drawSegment (segment, color = 'rgba(255,165,0,0.1)', size = 4) {
    let ctx = this.ctx
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(Canvas.transform(segment.startPoint.x), Canvas.transform(segment.startPoint.y))
    ctx.lineTo(Canvas.transform(segment.endPoint.x), Canvas.transform(segment.endPoint.y))
    ctx.stroke()
  }

  static random () {
    return Math.random() * 2 - 1
  }

  static transform (a) {
    return a * CANVAS_SIZE / 2 + CANVAS_SIZE / 2 + CANVAS_BORDER_SIZE
  }
}
