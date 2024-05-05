
import './App.css'
import { HOBBIES } from './HOOBIES/HOBBIES'
import Languages  from './components/Languages'
import Movies from './components/Movies'
import Music from './components/Music'
import Pets from './components/Pets'
import Sports from './components/Sports'

function App() {
  

  return (
    <>
     <h1>My Hobbies</h1>
      <Pets pets={HOBBIES.pets} />
      <Sports sports={HOBBIES.sports} />
      <Movies movies={HOBBIES.movies} />
      <Languages languages={HOBBIES.languages} />
      <Music music={HOBBIES.music} />
    </>
  )
}

export default App
