import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Main from './components/Main'
import Header from './components/Header'

function App() {
 //creamos el diseño de la pagina dentro de app

  return (
    <div className="App">
    <Header>
      <h1>Proyecto basic router</h1>
      <nav className='navbar'>
        <NavLink to="">Principal</NavLink>
        <NavLink to="about">Sobre mí</NavLink>
        <NavLink to="artistas">Listado</NavLink>
      </nav>
    </Header>
      <Main>
        <Outlet /> 
      </Main>
      <footer>
        <Footer/>
      </footer>
  </div>
  )
}

export default App