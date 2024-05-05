import React from 'react'

const Music = ({music}) => {//recorro el listado de musicos para pintar cada yno de ellos en un listado
  return (
    <div>
      <h2>Music</h2>
      <ul>
        {music.map((artist, index) => (
          <li key={index}>{artist}</li>
        ))}
      </ul>
    </div>
  )
}

export default Music
