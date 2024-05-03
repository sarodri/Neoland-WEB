import React from 'react';
import './App.css'
import { Figure } from './components';
// 1. Recoger el nombre del personaje.
// 2. Recoger el id del personaje → usarlo como key.
// 3. Recoger la image proporcionada por la API.
// 4. Recoger el status e informar si nuestro personaje está “alive”
//     1. Si un personaje no está vivo hacer uso de JSX para no renderizar ese personaje.
// 5. Recoger el lugar de origen.
// 6. Estilar el listado haciendo uso de los CSS modules y obtener una visualización más atractiva.

// const charactersMock = [
//     {
//       id: 1,
//       name: "Rick Sanchez",
//       status: "Alive",
//     },
//     {
//       id: 2,
//       name: "Morty Smith",
//       status: "Alive",
//     },
//   ];

function App() {
  // const mystate= React.useState(charactersMock)

  // const characters= mystate[0]
  // const charactersSet = mystate[1]

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
          <div key={character.id}>
            <Figure
            src={character.image}
            name={character.name}
            status={character.status}
            origin={character.origin.name}
            />
          </div>
        ) : null // Si el personaje no está "Alive", no se renderiza nada
      )}
    </div>
      
    </>
  )
}

export default App
