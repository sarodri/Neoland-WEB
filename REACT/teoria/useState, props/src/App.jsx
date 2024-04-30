import { useEffect } from 'react'
import './App.css'
import {  H1 } from './components'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Gallery } from './pages'
//ciclo de vida de un componente: 
  // SE MONTA
  // SE ACTUALIZA: setData-- > actualiza una variable
  // SE DESMONTA
function App() {
useEffect (()=> {
//siempre tengo que ponerle array de dependencias [], para q  o se actulice cada vez que modifique el estadp o el valor del componente que tiene el efecto
    return ()=> {

    }
  }, []
)
  return (
    <>
    <Header />
     <main>
        <H1 className={["titulo-galllery"]}>GALLERY</H1>
       {/* { <Gallery data={[dataGallery]}/>} */}
       {/**React revisa para renderizar cada vez que un estado se mmidifica
        El useEffct es un hook que sirve para saber cuando se monta, desmonta un componente o se lance una logica*/}
     </main>
     <Footer />
    </>
  )
}

export default App
