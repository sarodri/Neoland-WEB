import React from 'react'

const Stopwatch = () => {
    //time sera 0 por defecto y el timerOn estara en false
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
  return ( //se crean los botones del cronometro para poder controlar el estado de timerOn
    <div className="stopwatch">
      <h2>{time}</h2>
      <button onClick={() => setTimerOn(true)}>Start</button>
      <button onClick={() => setTimerOn(false)}>Stop</button>
      <button onClick={() => setTimerOn(true)}>Resume</button>
      <button onClick={() => setTime(0)}>Reset</button>
    </div>
  )
}

export default Stopwatch
