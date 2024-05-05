import React from 'react'

const Pets = ({pets}) => {//accedo a las propiedades de pets y su valor
  return (
    <div>
    <h2>Pets</h2>
      <p>Color: {pets.color}</p>
      <p>Skin: {pets.skin}</p>
      <p>Legs: {pets.legs}</p>
      <p>Age: {pets.age}</p>
    </div>
  )
}

export default Pets
