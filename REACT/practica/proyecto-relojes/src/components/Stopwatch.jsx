import React from 'react'
import { useState,useEffect } from 'react';
import { MdOutlineTimer } from "react-icons/md";

const Stopwatch = () => {
    //time sera 0 por defecto y el timerOn estara en false
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false); //tenemos que definir un useEffect para cuendo el valor de timerOn cambie

    useEffect(() => {
        let interval = null;
    //si el timerOn esta en true, almaceno el valor cada 10 milisegundos en la variable time. Si no esta en true, ponemos el intervalo en nulo
        if (timerOn) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [timerOn]);
  return ( //se crean los botones del cronometro para poder controlar el estado de timerOn
    <div className="stopwatch">
        <MdOutlineTimer />
      <h2>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
     </h2>
      
      <span> {/**con estos condicionales podemos ocultar y mostrar los valores según sean necesarios en el momento del cronometro que nos encontremos */}
      {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
      </span>
      {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
    </div>
  )
}

export default Stopwatch
