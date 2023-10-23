import React from 'react'

const svgStyle = {
  display: 'flex',
  justifyContent: 'center',
}

const SvgComponent = ({ svgCode }) => {
  return <div dangerouslySetInnerHTML={{ __html: svgCode }} style={svgStyle} />
}

export default SvgComponent
