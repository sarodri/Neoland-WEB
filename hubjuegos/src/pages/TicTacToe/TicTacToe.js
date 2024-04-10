import { setStateTicTacToe, getStateTicTacToe } from "../../global/state/tictactoe.state";
import { tiles, players } from "../../components";
import "./TicTacToe.css"
import { cambiarTurno, clicarCasilla, hayGanador, incrementarContador, marcarCasilla } from "../../utils";

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
            <div class="tile 1"></div>
            <div class="tile 2"></div>
            <div class="tile 3"></div>
            <div class="tile 4"></div>
        </div>
        <div class="row">
            <div class="tile 5"></div>
            <div class="tile 6"></div>
            <div class="tile 7"></div>
            <div class="tile 8"></div>
        </div>
        <div class="row">
            <div class="tile 9"></div>
            <div class="tile 10"></div>
            <div class="tile 11"></div>
            <div class="tile 12"></div>
        </div>
        <div class="row">
            <div class="tile 13"></div>
            <div class="tile 14"></div>
            <div class="tile 15"></div>
            <div class="tile 16"></div>
        </div>
    </div>
</section>
<section id = "players">
    <div id="player1" class="player 1">player 1</div>
    <div id="player2" class="player 2">player 2</div>
</section>
`
export const status = document.getElementById("status")
export const celdas = document.getElementsByClassName('tile')
export const jugadores = document.getElementsByClassName('player')

const reiniciarJuego = () =>{ 
    const reiniciar = document.getElementById("restart-btn");
    reiniciar.addEventListener("click",   ()=> {
    setStateTicTacToe("huboGanador", false);
    players[0].classList.add("active")
    players[1].classList.remove("active")

    setStateTicTacToe("playerO", []);
    setStateTicTacToe("playerX", []);
    setStateTicTacToe("contador", 0);

    // Borramos el contenido de todas las casillas
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].textContent = "";
    }
    // Reiniciamos la variable de turn
    setStateTicTacToe("turn", "x");

    document.getElementById("status").innerHTML = "Game in progress...";
    document.getElementById("restart-btn").style = 'display:none';
   }
);
}
// Añadimos un evento de clic a todas las casillas del tablero
const activarCasillas =()=>{
    for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function () {
    if (getStateTicTacToe("huboGanador")==true){
        return
    }
        marcarCasilla(this);
        clicarCasilla(this);
        incrementarContador();
        document.getElementById("status").innerHTML = string;
        hayGanador();
    if (getStateTicTacToe("huboGanador")==false){
        console.log("cambiar turno")
        cambiarTurno();
    }
    });
  }}


export const PrintTicTacToePage = () =>{
    document.querySelector("main").innerHTML = template();
    activarCasillas();
    reiniciarJuego();
}