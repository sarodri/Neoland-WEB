import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./Footer.css"

const Footer = ({children}) => {
  return <footer> 
  <span>Visita la página de listado de artistas musicales:</span>
  <Link to="artistas">Artistas</Link>
  </footer>
}

export default Footer
