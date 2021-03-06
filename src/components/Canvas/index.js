import React, { useEffect, useRef, useState } from 'react'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants'
import logEvent from '../../util/logEvent'
import MenuControls from '../MenuControls'

function Canvas() {
  const canvasRef = useRef(null)
  const [canvasCtx, setCanvasCtx] = useState(null)
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [highlightColor, setHighlightColor] = useState('red')
  const [eraserSize, setEraserSize] = useState('md')
  const [isDrawing, setIsDrawing] = useState(false)
  const [isErasing, setIsErasing] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('stroke')
  const [currentEvent, setCurrentEvent] = useState('draw')

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    canvas.style.width = `${CANVAS_WIDTH}px`
    canvas.style.height = `${CANVAS_HEIGHT}px`

    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 4
    setCanvasCtx(ctx)
    logEvent('canvas initialized')

    // load previously saved canvas
    if (localStorage.getItem('main-canvas')) {
      const dataURL = localStorage.getItem('main-canvas')
      const img = new Image()
      img.src = dataURL
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
      }
      logEvent('canvas loaded from localStorage')
    }
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    canvasCtx.beginPath()
    canvasCtx.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const startTouchDrawing = ({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent && nativeEvent.touches[0]
    canvasCtx.beginPath()
    canvasCtx.moveTo(clientX, clientY)
    setIsDrawing(true)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    canvasCtx.lineTo(offsetX, offsetY)
    canvasCtx.stroke()
  }

  const touchDraw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { clientX, clientY } = nativeEvent && nativeEvent.touches[0]
    canvasCtx.lineTo(clientX, clientY)
    canvasCtx.stroke()
  }

  const finishDrawing = () => {
    logEvent(currentEvent)
    canvasCtx.closePath()
    setIsDrawing(false)

    // save to localStorage
    localStorage.setItem('main-canvas', canvasRef.current.toDataURL())

    // check if eraser mode is off
    if (!isErasing) {
      resetStrokeStyle()
    }
  }

  const resetStrokeStyle = (width) => {
    canvasCtx.lineCap = 'round'
    canvasCtx.strokeStyle = 'black'
    canvasCtx.lineWidth = width ? width : strokeWidth
    setCurrentEvent('draw')
    setCurrentMenu('stroke')
  }

  const updateStrokeWidth = (width) => {
    resetStrokeStyle()
    setStrokeWidth(width)
    canvasCtx.lineWidth = width
  }

  const updateEraserWidth = (eraserState, width) => {
    setCurrentEvent('eraser')
    setIsErasing(true)
    setStrokeWidth(width)
    setEraserSize(eraserState)
    canvasCtx.lineWidth = width
    canvasCtx.strokeStyle = 'white'
  }

  const updateHighlighter = (colorState, color) => {
    canvasCtx.lineWidth = 50
    canvasCtx.globalAlpha = 0.2
    canvasCtx.lineCap = 'square'
    canvasCtx.strokeStyle = color
    setHighlightColor(colorState)
    setCurrentEvent('highlight')
  }

  const clearCanvas = () => {
    canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    setStrokeWidth(4)
    resetStrokeStyle(4)
    localStorage.clear()
    logEvent('canvas cleared')
  }

  return (
    <div className="canvas-wrapper">
      <canvas
        id="main-canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onTouchStart={startTouchDrawing}
        onMouseUp={finishDrawing}
        onTouchEnd={finishDrawing}
        onMouseMove={draw}
        onTouchMove={touchDraw}
      />
      <MenuControls
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
        strokeWidth={strokeWidth}
        highlightColor={highlightColor}
        eraserSize={eraserSize}
        updateStrokeWidth={updateStrokeWidth}
        updateHighlighter={updateHighlighter}
        updateEraserWidth={updateEraserWidth}
        clearCanvas={clearCanvas}
      />
    </div>
  )
}

export default Canvas
