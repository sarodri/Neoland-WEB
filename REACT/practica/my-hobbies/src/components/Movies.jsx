import React from 'react'

const Movies = ({ movies }) => {
  return ( //recorro el array de peliculas y accedo a sus propiedades
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <p>Name: {movie.name}</p>
            <p>Type: {movie.type}</p>
            <p>Genre: {movie.genre}</p>
            <p>Vote: {movie.vote}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Movies
