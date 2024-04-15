import { getStateMemory, setStateMemory } from "../../global/state/memoryState";
import { generateRandom, timeGenerator, generador } from "../../utils";
import Swal from "sweetalert2";

import "./Memory.css";

const template = () => `
<div id="containerMemory"> 
    <div class="wrapper">
      <div class="stats-c">
        <div id="moves"></div>
        <div id="time"></div>
      </div>
      <div class="game-c"></div>
      <button id="stop" class="hide">Stop Game</button>
    </div>
    <div class="controls-c">
      <div class="portada"><img src="./sourceMemory/portada.gif"></div>
      <p id="result"></p>
      <button id="start"><img src="./sourceMemory/star_game.gif"></button>
</div></div>`;

const starGame = () => {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");

  startButton.addEventListener("click", () => {
    // me carga el contador de movimientos a través del estado, mientras lo hace vemos el swal
    setStateMemory("interval", setInterval(timeGenerator, 1000));
    Swal.fire({
      position: "center",
      title: "SUERTE 😘",
      imageUrl:
        "https://res.cloudinary.com/dq186ej4c/image/upload/v1712312456/WmP_nkjrov.gif",
      imageHeight: 300,
      imageAlt: "A tall image",
      showConfirmButton: false,
      timer: 1000,
    });
    //seteo los valores a 0 y oculto los controles
    setTimeout(() => {
      setStateMemory("movesCount", 0);
      setStateMemory("seconds", 0);
      setStateMemory("minutes", 0);
      const controls = document.querySelector(".controls-c");
      controls.classList.add("hide");
      stopButton.classList.remove("hide");
      startButton.classList.add("hide");
      //me traigo los movimientos a traves del estado
      const moves = document.getElementById("moves");
      moves.innerHTML = `<span>Moves:</span> ${getStateMemory("movesCount")}`;
      init(); //llamo a init para cargar las cartas,ocultar el resultado y poner los movimeintos a 0
    }, 900);
  });

  // --------- BOTON DE STOP  ---------------
  const handleStop = () => {
    //el boton de stop me limpia el tiempo, resetea el intervalo y me muestra de nuevo los controles
    const time = document.getElementById("time");
    time.innerHTML = "";
    clearInterval(getStateMemory("interval"));
    const controls = document.querySelector(".controls-c");
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
  };
//pongo en memoria los valores del boton de stop
  setStateMemory("stopGame", handleStop);
  stopButton.addEventListener("click", handleStop);
};

const init = () => {
  const result = document.getElementById("result");
  result.innerText = "";
  setStateMemory("winCount", 0);
  let cardValues = generateRandom();
  generador(cardValues);
};
//pinto pagina e inicio el juego
export const PrintMemoryPage = () => {
  document.querySelector("main").innerHTML = template();
  starGame();
};
