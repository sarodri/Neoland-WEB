import React from 'react'
import { useState, useEffect } from 'react';
import { FaRegClock } from "react-icons/fa";

const DigitalClock = () => {
    //con useState vamos a setear la hora
    const [clockState, setClockState] = useState();

    //con useEffect vamoa a recoger y setear la hora local cada vez que carguemos la pagina y en cada intervalo que pasamos en la funcion, en este caso 1 segundo.

    useEffect(() => {
        setInterval(() => {
          const date = new Date();
          setClockState(date.toLocaleTimeString());
        }, 1000);
      }, []);
  return (
    <div className="digital-clock">
    <FaRegClock />
    <h2>{clockState}</h2>
  </div>
  )
}

export default DigitalClock
