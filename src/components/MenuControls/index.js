import React, { useState } from 'react'
import './menu-controls.css'

function MenuControls({
  strokeWidth,
  highlightColor,
  eraserSize,
  clearCanvas,
}) {
  const [currentMenu, setCurrentMenu] = useState('stroke')
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
            }}
            className={
              currentMenu === 'stroke' ? 'menu-button selected' : 'menu-button'
            }
          >
            Strke
          </button>
          {currentMenu === 'stroke' && !hideSecondaryMenu && (
            <div className="menu-controls secondary-menu">
              <button
                className={
                  strokeWidth === 2 ? 'menu-button selected' : 'menu-button'
                }
              >
                2
              </button>
              <button
                className={
                  strokeWidth === 4 ? 'menu-button selected' : 'menu-button'
                }
              >
                4
              </button>
              <button
                className={
                  strokeWidth === 6 ? 'menu-button selected' : 'menu-button'
                }
              >
                6
              </button>
              <button
                className={
                  strokeWidth === 8 ? 'menu-button selected' : 'menu-button'
                }
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
            }}
            className={
              currentMenu === 'highlight'
                ? 'menu-button selected'
                : 'menu-button'
            }
          >
            Hgltr
          </button>
          {currentMenu === 'highlight' && !hideSecondaryMenu && (
            <div className="menu-controls secondary-menu">
              <button
                className={
                  highlightColor === 'red'
                    ? 'menu-button selected'
                    : 'menu-button'
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
              >
                Green
              </button>
              <button
                className={
                  highlightColor === 'blue'
                    ? 'menu-button selected'
                    : 'menu-button'
                }
              >
                Blue
              </button>
              <button
                className={
                  highlightColor === 'yellow'
                    ? 'menu-button selected'
                    : 'menu-button'
                }
              >
                Yellow
              </button>
            </div>
          )}
        </span>
        <span>
          <button
            onClick={() => {
              toggleMenu('eraser')
            }}
            className={
              currentMenu === 'eraser' ? 'menu-button selected' : 'menu-button'
            }
          >
            Erser
          </button>
          {currentMenu === 'eraser' && !hideSecondaryMenu && (
            <div className="menu-controls secondary-menu">
              <button
                className={
                  eraserSize === 'sm' ? 'menu-button selected' : 'menu-button'
                }
              >
                sm
              </button>
              <button
                className={
                  eraserSize === 'md' ? 'menu-button selected' : 'menu-button'
                }
              >
                md
              </button>
              <button
                className={
                  eraserSize === 'lg' ? 'menu-button selected' : 'menu-button'
                }
              >
                lg
              </button>
              <button
                className={
                  eraserSize === 'x-lg' ? 'menu-button selected' : 'menu-button'
                }
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
          className="menu-button"
        >
          Clear
        </button>
      </div>
    </>
  )
}

export default MenuControls
