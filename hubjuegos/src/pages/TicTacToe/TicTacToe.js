import { startJuego} from "../../components";
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
    <div id="player1" class="player 1">Player 1</div>
    <div id="player2" class="player 2">Player 2</div>
</section>
`

// exporto los elementos del template que voy a necesitar
export const status = document.getElementById("status")
export const celdas = document.querySelectorAll(".tile")
export const jugadores = document.querySelectorAll(".player");
//const reinicio = document.getElementsByClassName("restart");
export const reiniciar = document.getElementById("restart-btn");


export const PrintTicTacToePage = () =>{
    document.querySelector("main").innerHTML = template();
    
    startJuego();

    document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("restart-btn").style.display="none";
    players[0].classList.add("active")
})
}