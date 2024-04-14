import { hayGanador,cambiarTurno,clicarCasilla, incrementarContador } from "../../utils"
import { getStateTicTacToe} from "../../global/state/tictactoe.state"
import "./TicTacToe.css"

const template=() => `
<section id="status">Game in progress...</section>
<section class="restart"><button id="restart-btn">Restart Game</button></section>
<section id = "table-section">
    <div class = "line horizontal line1"></div>
    <div class = "line horizontal line2"></div>
    <div class = "line horizontal line3"></div>
    <div class = "line vertical line4"></div>
    <div class = "line vertical line5"></div>
    <div class = "line vertical line6"></div>
    <div id = "boxes" class="boxes">
        <div class="row">
            <div class="tile 1"> </div>
            <div class="tile 2"> </div>
            <div class="tile 3"> </div>
            <div class="tile 4"> </div>
        </div>
        <div class="row">
            <div class="tile 5"> </div>
            <div class="tile 6"> </div>
            <div class="tile 7"> </div>
            <div class="tile 8"> </div>
        </div>
        <div class="row">
            <div class="tile 9"> </div>
            <div class="tile 10"> </div>
            <div class="tile 11"> </div>
            <div class="tile 12"> </div>
        </div>
        <div class="row">
            <div class="tile 13"> </div>
            <div class="tile 14"> </div>
            <div class="tile 15"> </div>
            <div class="tile 16"> </div>
        </div>
    </div>
</section>
<section id = "players">
    <div id="player 1" class="player 1">Player 1</div>
    <div id="player 2" class="player 2">Player 2</div>
</section>
`

// exporto los elementos del template que voy a necesitar
export const status = document.getElementById("status")
export const celdas = document.querySelectorAll(".tile")
//!jugadores no esta bien
export const jugadores = document.getElementById("player");
//const reinicio = document.getElementsByClassName("restart");
export const reiniciar = document.getElementById("restart-btn");

// Añadimos un evento de clic a todas las casillas del tablero

export const startJuego = () => {
    console.log("en inicio", getStateTicTacToe("all")) 
    //ocultamos boton de reinicio y activamos al jugador 1
        document.getElementById("restart-btn").style.display="none";
        document.getElementById("player 1").classList.add("active")
    const celdas = document.querySelectorAll(".tile")
    console.log(celdas)
    celdas.forEach(celda => {
      celda.addEventListener("click", function() {
        if (getStateTicTacToe("huboGanador")) {
            console.log("hay ganador")
            return;
        }// con el (this) hacemos referencia a la casilla clicada
        clicarCasilla(this);
        hayGanador();
        if (!getStateTicTacToe("huboGanador")) {
            console.log("no hay ganador cambiar turno");
            cambiarTurno();
            console.log("entro y cambio de turno")
        }
      });
    });
  };
export const PrintTicTacToePage = () =>{
    document.querySelector("main").innerHTML = template();
    startJuego();
}
