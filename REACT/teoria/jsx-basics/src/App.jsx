import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Saludo } from './components'


function App() {


  const [count, setCount] = useState(0)
//creo 3 formas de añadir el saludo (a traves de un array o con un condicional if(mediante el contador, o con horas que nosotros introducimos en la funcion como parametro))
  const arrayHoras = [
    { id: 1, hora: 8 },
    { id: 2, hora: 5 },
    { id: 3, hora: 23 }
  ];

  const Saludar = (hora) => {
    if (hora >= 6 && hora < 12) {
      return 'Buenos días con array';
    } else if (hora >= 12 && hora < 20) {
      return 'Buenas tardes con array';
    } else {
      return 'Buenas noches con array';
    }
  };
  const printConCounter = ()=>{
    if (count > 6 && count <=12){
      return <p>Buenos días--contador</p>
    } else if(count >12 && count <=19){
      return <p>Buenas tardes--contador</p>
    } else if (count >19 || count <6){
      return <p>Buenas noches--contador</p>
    }
  }
  const printConHour = (hora)=>{
    if (hora > 6 && hora <=12){
      return <p>Buenos días--hora</p>
    } else if(hora >12 && hora <=19){
      return <p>Buenas tardes--hora</p>
    } else if (hora >19 || hora <6){
      return <p>Buenas noches--hora</p>
    }
  }

  //creo un estado en false para despues con un boto cambiar a true y pintar un texto
  const [mostrarEstado, setMostrarEstado] = useState(false);
//el toggle setea el estado opuesto al actual
  const toggleContent = () => {
    setMostrarEstado(!mostrarEstado);
  };
  return (
    <>
    {console.log(count)}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {printConCounter()}
      {printConHour(0)}
      {arrayHoras.map(obj => (
        <Saludo key={obj.id} saludo={Saludar(obj.hora)} />
      ))}
      <button onClick={toggleContent}>Mostrar estado</button>
      {mostrarEstado && <p>Cambio a true</p>}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} 
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
