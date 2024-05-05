import React from 'react'

const Sports = ({sports}) => {
  return (
    <div>
      <h2>Sports</h2>
      <ul>
        {sports.map((sport, index) => ( //recorremos deportes y entramos en sus propiedades
          <li key={index}>
            <p>Name: {sport.name}</p>
            <p>Indoor: {sport.indoor ? 'Yes' : 'No'}</p> {/* uso un ternario para transfrmar el booleano a frontend */}
            <p>Favorite Team: {sport.favoriteTeam}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sports
