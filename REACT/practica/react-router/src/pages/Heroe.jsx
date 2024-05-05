import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteHeroe, getHeroe } from '../data/data';
import HeroeDetail from '../components/HeroeDetail';

const Heroe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const heroe = getHeroe(params.id);

  if (!heroe) return <p>No existe el héroe que buscas 😭</p>;
  return (
    <div>
      <h1>My heroes 🦸‍♂️🦸‍♀️</h1>
      <HeroeDetail heroe={heroe} />
      <button
        onClick={() => {
          deleteHeroe(heroe.id).then(() => {navigate('/heroes');});
        }}
      >
        Borrar a {heroe.name}
      </button>
    </div>
  )
}

export default Heroe
