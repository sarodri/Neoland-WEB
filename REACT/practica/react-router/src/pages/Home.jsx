import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <h2>Home Page</h2>

    <p>App ejemplo sobre React Router</p>

    <ul>
      <li>
        <p>
          <span>Visita la página de héroes 🦸‍♀️:</span>
          <Link to="heroes">Heroes</Link> {/**el componente Link permite navegar a "heroes" */}
        </p>
      </li>
    </ul>
  </>
  )
}

export default Home
