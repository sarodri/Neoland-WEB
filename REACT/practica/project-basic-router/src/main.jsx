import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Listado from './pages/Listado'
import Artista from './pages/Artista'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter basename="/">
      <Routes>{/**son componentes qeu renderizan elementos */}
        <Route path="/" element={<App />}> {/**ruta principal */}
          <Route index element={<Home />} />{/**ruta sin path que se renderiza al acceder al padre (App) */}
          <Route path="artistas" element={<Listado />} />{/**se renderiza el elemento cuando el path coincida*/}
          <Route path='/artista/:id' element={<Artista />} /> 
          <Route path="about" element={<About />} />
          <Route
            path="*"
            element={
              <main>
                <p>404 - No existe la ruta!</p>
              </main>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
