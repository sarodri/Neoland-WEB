import React from 'react'
import { getHeroes } from '../data/data';
import { Link, Outlet } from 'react-router-dom'
import HeroeDetail from '../components/HeroeDetail';

const Heroes = () => {
    const heroes = getHeroes();
  return (
    <>

    <div>
      <h1>All heroes 🦸‍♂️🦸‍♀️</h1>
      <ul> {/**hacemos un listado clicable de todos los heroes poniendo su id en los params de la ruta y despues mostrando los detealles que hemos pintado en el componenete HeroeDetail */}
        {heroes.map((heroe) => (
          <li key={heroe.id}>
            <Link to={`/heroe/${heroe.id}`}> {/**ojo en notion hay error en la ruta */}
              <HeroeDetail heroe={heroe} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Outlet />
  </>
  )
}

export default Heroes
