import React from '../../useState, props/node_modules/@types/react/index.js'
import ReactDOM from 'react-dom/client.js'
import App from './App.jsx'
import './index.css'

//StrictMode hace un doble render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
)
