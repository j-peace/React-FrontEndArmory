import React from 'react'
import ReactDOM from 'react-dom'

let fields = [
  <label key={1}><input type="checkbox" /> Bill</label>,
  <label key={2}><input type="checkbox" /> Jeff</label>,
  <label key={3}><input type="checkbox" /> Tim</label>,
  <label key={4}><input type="checkbox" /> Zuck</label>,
]

function App(props) {
  return (
    <div>
      <h2>RSVPs</h2>
      {props.fields}
      <button onClick={reverseAndRender}>Reverse</button>
    </div>
  )
}
  
function reverseAndRender() {
  ReactDOM.render(
    <App fields={fields.reverse().slice(0)} />,
    document.getElementById('root')
  )
}

reverseAndRender()
