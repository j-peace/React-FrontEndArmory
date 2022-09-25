import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <button onClick={() => {
    window.alert(`
      Here I am with a brain the size of a planet,
      and they tell me to add a contact.
    `)
  }}>
    Add a contact
  </button>,
  document.getElementById('root')
)


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
