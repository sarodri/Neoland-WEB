import React from 'react'
import { Figure } from './Figure';

export const CharacterList = () => {
  
    const [characterList, setCharacterList] = React.useState([]);

    React.useEffect(() => {
      (async () => {
        let data = await fetch(`https://rickandmortyapi.com/api/character/`).then(
          (res) => res.json()
        );
  
        setCharacterList(data.results);
      })();
    }, []);
  
    return (
      <>
      <h1>Ricky and Morty characters</h1>
      
      <div id="characterFigure">
        {characterList.map((character) =>
          character.status === "Alive" ? ( //Comprobamos que el status del personaje sea "Alive" y si es así renderizar el Figure
          <Figure key={character.id} character={character} />
          ) : null // Si el personaje no está "Alive", no se renderiza nada
        )}
      </div>
        
      </>
    )
}

export default CharacterList
