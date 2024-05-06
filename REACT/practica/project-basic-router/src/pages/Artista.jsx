import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteArtista, getArtista } from '../data/data';
import ArtistaDetail from '../components/ArtistaDetail';

const Artista = () => {
  const params = useParams();
  const navigate = useNavigate();
  const artista = getArtista(params.id);

  if (!artista) return <p>No existe el artista que buscas 😭</p>;
  return (
    <div>
      <h1>Mis artistas 🦸‍♂️🦸‍♀️</h1>
      <ArtistaDetail artista={artista} />
      <button
        onClick={() => {
          deleteArtista(artista.id).then(() => {navigate('/artistas');});
        }}
      >
        Borrar a {artista.nombre}
      </button>
    </div>
  )
}

export default Artista
