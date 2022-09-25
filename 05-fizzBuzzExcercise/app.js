import React from 'react'
import ReactDOM from 'react-dom'
import { getSpiralStyle } from './getSpiralStyle.js'

let createElement = React.createElement

const boxes = []
for (let i = 1; i <= 15; i++) {
  let content = ''
  if (i % 3 === 0) content += 'Fizz'
  if (i % 5 === 0) content += 'Buzz'
  if (content === '') {
    content = String(i)
  }
  else {
    content = <strong>{content}</strong>
  }
  boxes.push(
    <div style={getSpiralStyle(i - 1)} key={i}>{content}</div>
  )
}

ReactDOM.render(
  createElement('div', {}, boxes),
  document.getElementById('root')
)
