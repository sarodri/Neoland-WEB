import './App.css'
import CharacterList from './components/CharacterList'
import Footer from './components/Footer'
import Header from './components/Header'
import Image from './components/Image'
import ItemList from './components/ItemList'
import Main from './components/Main'
import Paragraph from './components/Paragraph'
import SubTile from './components/SubTile'
import Tile from './components/Tile'
import img from "./assets/react.svg"

function App() {
  const characters = ["Pepe", "Lucía", "Diana", "Borja"]

  return (
    <>
    <Header>
      <Tile texto="Tile Header"/>
    </Header>
    <Main>
      <SubTile texto="SubTile del MAIN"/>
      <CharacterList >
        <ItemList items={[<Paragraph texto="Name"/>, <Paragraph texto="Status"/>, <Paragraph texto="Origin" />]} />
      </CharacterList>
    </Main>
    <Footer>
      <Paragraph texto="Created by Sandra" />
      <Image src={img} alt="logo" width="100px" height="100px" />
      <Paragraph texto="Copyright" />
    </Footer>
   
    </>
  )
}

export default App
