import React from 'react'
import { useState, useEffect } from "react";

const Countdown = () => {
    const [time, setTime] = useState("");
    // se define el tiempo en la constate "time" y fijamos una fecha meta con el string en countDownDate.
    useEffect(() => {
        let countDownDate = new Date("May 10, 2024 10:00:00").getTime();
        let x = setInterval(() => {
        let now = new Date().getTime();
            //tenemos quwe clacular la distancia entre la fecha-hora meta y la fecha-hora actual, de esta forma en cada segundo que pase, se nos va a devolver el tiempo que falta para llegar a la fecha-hora meta (una cuenta atrás)
          let distance = countDownDate - now;
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
            // con este condicinal, una vez que lleguemos a la fecha-hora meta, limpiamos el intervalo "x" y seteamos que la cuenta ha finalizado
          if (distance < 0) {
            clearInterval(x);
            setTime("COUNTDOWN FINISHED");
          }
        }, 1000); {/**añadimos un intervalo de un segundo para que la funcion se ejecute */}
    }, []);
    return <div className="countdown">
        <h2>{time}</h2>
    </div>;
}

export default Countdown
