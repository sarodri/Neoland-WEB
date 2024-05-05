import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Heroes from './pages/Heroes'
import Heroe from './pages/Heroe'


//!---- NO SE RENDERIZA EL COMPONENTE HEROE ?? RUTA NO EXISTE: SOLUCIONADO hay un error en el codigo del componente Heroes a la hora de escribir la ruta----//

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>{/**son componentes qeu renderizan elementos */}
        <Route path="/" element={<App />}> {/**ruta principal */}
          <Route index element={<Home />} />{/**ruta sin path que se renderiza al acceder al padre (App) */}
          <Route path="heroes" element={<Heroes />} />{/**se renderiza el elemento cuando el path coincida*/}
          <Route path='/heroe/:id' element={<Heroe />} /> 
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
