import React from 'react'
import { getArtistas } from '../data/data';
import { Link, Outlet } from 'react-router-dom'
import ArtistaDetail from '../components/ArtistaDetail';
import Footer from '../components/Footer';


const Listado = () => {
    const artistas = getArtistas();
  return (
    <>

    <div>
      <h1>Todos los artistas</h1>
      <ul> 
        {artistas.map((artista) => (
          <li key={artista.id}>
            <Link to={`/artista/${artista.id}`}> 
              <ArtistaDetail artista={artista} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Outlet />
  </>
  )
}

export default Listado
