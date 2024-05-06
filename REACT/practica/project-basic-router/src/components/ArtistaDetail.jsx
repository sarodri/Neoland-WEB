import React from 'react'

const ArtistaDetail = ({artista}) => { //recibe a los artistas por props y pinta los detalle del artista
  return (
    <>
    <h1>nombre: {artista.nombre}</h1>
    <p>mejor canción: {artista.mejorCancion}</p>
  </>
  )
}

export default ArtistaDetail
