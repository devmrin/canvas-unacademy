import React, { useState } from 'react'
import {
  PenIcon,
  HighlighterIcon,
  EraserIcon,
  ClearIcon,
} from '../../assets/menu-icons'
import { CircleShape } from '../../assets/shapes'
import './menu-controls.css'

function MenuControls({
  currentMenu,
  setCurrentMenu,
  strokeWidth,
  highlightColor,
  eraserSize,
  updateStrokeWidth,
  updateHighlighter,
  updateEraserWidth,
  clearCanvas,
}) {
  const [hideSecondaryMenu, setHideSecondaryMenu] = useState(false)

  const toggleMenu = (menu) => {
    if (menu === currentMenu) {
      setHideSecondaryMenu(!hideSecondaryMenu)
    }
    setCurrentMenu(menu)
  }

  return (
    <>
      <div className="menu-controls primary-menu">
        <span>
          <button
            onClick={() => {
              toggleMenu('stroke')
              updateStrokeWidth(4)
            }}
            className={
              currentMenu === 'stroke'
                ? 'menu-button selected first-btn'
                : 'menu-button first-btn'
            }
          >
            <PenIcon />
            {/* <img src={PenIcon} className="menu-icon pen-icon" alt="pen" /> */}
          </button>
          {currentMenu === 'stroke' && !hideSecondaryMenu && (
            <div className="menu-controls secondary-menu">
              <button
                className={
                  strokeWidth === 2
                    ? 'menu-button selected first-btn'
                    : 'menu-button first-btn'
                }
                onClick={() => updateStrokeWidth(2)}
              >
                <CircleShape />
              </button>
              <button
                className={
                  strokeWidth === 4 ? 'menu-button selected' : 'menu-button'
                }
                onClick={() => updateStrokeWidth(4)}
              >
                4
              </button>
              <button
                className={
                  strokeWidth === 6 ? 'menu-button selected' : 'menu-button'
                }
                onClick={() => updateStrokeWidth(6)}
              >
                6
              </button>
              <button
                className={
                  strokeWidth === 8
                    ? 'menu-button selected last-btn'
                    : 'menu-button last-btn'
                }
                onClick={() => updateStrokeWidth(8)}
              >
                8
              </button>
            </div>
          )}
        </span>
        <span>
          <button
            onClick={() => {
              toggleMenu('highlight')
              updateHighlighter('red', 'rgba(248,144,185,0.1)')
            }}
            className={
              currentMenu === 'highlight'
                ? 'menu-button selected'
                : 'menu-button'
            }
          >
            <HighlighterIcon />
          </button>
          {currentMenu === 'highlight' && !hideSecondaryMenu && (
            <div className="menu-controls secondary-menu">
              <button
                className={
                  highlightColor === 'red'
                    ? 'menu-button selected first-btn'
                    : 'menu-button first-btn'
                }
                onClick={() =>
                  updateHighlighter('red', 'rgba(248,144,185,0.1)')
                }
              >
                Red
              </button>
              <button
                className={
                  highlightColor === 'green'
                    ? 'menu-button selected'
                    : 'menu-button'
                }
                onClick={() =>
                  updateHighlighter('green', 'rgba(144,248,185,0.1)')
                }
              >
                Green
              </button>
              <button
                className={
                  highlightColor === 'blue'
                    ? 'menu-button selected'
                    : 'menu-button'
                }
                onClick={() =>
                  updateHighlighter('blue', 'rgba(144,185,248,0.1)')
                }
              >
                Blue
              </button>
              <button
                className={
                  highlightColor === 'yellow'
                    ? 'menu-button selected last-btn'
                    : 'menu-button last-btn'
                }
                onClick={() =>
                  updateHighlighter('yellow', 'rgba(248,248,12,0.1)')
                }
              >
                Yllw
              </button>
            </div>
          )}
        </span>
        <span>
          <button
            onClick={() => {
              toggleMenu('eraser')
              updateEraserWidth('md', 2)
            }}
            className={
              currentMenu === 'eraser' ? 'menu-button selected' : 'menu-button'
            }
          >
            <EraserIcon />
          </button>
          {currentMenu === 'eraser' && !hideSecondaryMenu && (
            <div className="menu-controls secondary-menu">
              <button
                className={
                  eraserSize === 'sm'
                    ? 'menu-button selected first-btn'
                    : 'menu-button first-btn'
                }
                onClick={() => updateEraserWidth('sm', 2)}
              >
                sm
              </button>
              <button
                className={
                  eraserSize === 'md' ? 'menu-button selected' : 'menu-button'
                }
                onClick={() => updateEraserWidth('md', 4)}
              >
                md
              </button>
              <button
                className={
                  eraserSize === 'lg' ? 'menu-button selected' : 'menu-button'
                }
                onClick={() => updateEraserWidth('lg', 6)}
              >
                lg
              </button>
              <button
                className={
                  eraserSize === 'x-lg'
                    ? 'menu-button selected last-btn'
                    : 'menu-button last-btn'
                }
                onClick={() => updateEraserWidth('x-lg', 8)}
              >
                x-lg
              </button>
            </div>
          )}
        </span>
        <button
          onClick={() => {
            clearCanvas()
          }}
          className="menu-button last-btn"
        >
          <ClearIcon />
        </button>
      </div>
    </>
  )
}

export default MenuControls
