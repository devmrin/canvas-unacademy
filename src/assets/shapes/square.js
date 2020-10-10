import React from 'react'

export default ({ length = 10, color = 'red' }) => (
  <svg
    viewBox="0 0 44 44"
    width="32px"
    height="32px"
    shapeRendering="geometricPrecision"
    className="sc-erNlkL chaJNV"
  >
    <rect
      width={length + 'px'}
      height={length + 'px'}
      x="18"
      y="18"
      style={{ fill: 'red' }}
    ></rect>
  </svg>
)
