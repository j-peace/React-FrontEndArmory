import React from 'react'
import ReactDOM from 'react-dom'

let left = undefined
let top = undefined

// The event object will be passed to your callback as its first argument.
// You can call it anything, but it doesn't hurt to stick with `event`.
function moveButton(event) {
  left = event.clientX + 2
  top = event.clientY + 2
  renderApp()
}

function renderApp() {
  ReactDOM.render(
    <button
      onMouseMove={moveButton}
      style={{ left, top, position: left ? 'fixed' : 'absolute' }}>
      Add a contact
    </button>,
    document.getElementById('root')
  )
}

renderApp()


// ORIGINAL FILE: *************
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />    
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
