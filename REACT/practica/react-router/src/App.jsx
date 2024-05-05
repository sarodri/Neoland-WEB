import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

function App() {
 //creamos el diseño de la pagina dentro de app

  return (
    <div className="App">
    <header className="header">
      <h1>React Router v6 🧪</h1>
    </header>
    <div>
      <nav>
        <NavLink to="">Home</NavLink>
        <NavLink to="heroes">Heroes</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
      <main>
        <Outlet /> {/**aqui renderizamos a Home--> el componente Home se renderizará en el path vacío sobre el Outlet */}
      </main>
    </div>
  </div>
  )
}

export default App
