import { getStateTicTacToe, setStateTicTacToe } from "../global/state/tictactoe.state";
import { players, tiles } from "../components";
import { status } from "../pages";
import { celdas } from "../pages";


function setStatus(string) { 
    status.innerHTML = string;
  }
export function hayGanador() {
    combGanadora = [ 
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [4, 8, 12, 16],
      [1, 2, 5, 6],
      [3, 4, 7, 8],
      [9, 10, 13, 14],
      [11, 12, 15, 16],
      [2, 3, 6, 7],
      [10, 11, 14, 15],
      [5, 6, 9, 10],
      [7, 8, 11, 12],
      [6, 7, 10, 11],
    ];

    combGanadora.forEach(element => {

   
        if (getStateTicTacToe("turn") === "x" && checkComb(playerX.map(Number), element)){
            setStatus("Player 1 won!");
            huboGanador = true
            document.getElementById("restart-btn").style = 'display:block';
                return
        }
        if (getStateTicTacToe("turn") === "o" && checkComb(playerO.map(Number), element)){
            setStatus("Player 2 won!");
            huboGanador = true
            document.getElementById("restart-btn").style = 'display:block';
                return
        }else if(contador == 16){
            setStatus("Draw!")
            document.getElementById("restart-btn").style = 'display:block';
        }
       
    });
  }

  let checkComb = (array1, array2) => {
    return array2.every((x) => {
        return array1.includes(x)
    })
}

export function cambiarTurno() {
    if (getStateTicTacToe("turn") === "x") {
      document.getElementsByClassName('tile').innerHTML = "o"
      setStateTicTacToe("turn", "o");
      players[1].classList.add("active")
      players[0].classList.remove("active")
    } else {
      document.getElementsByClassName('tile').innerHTML = "x"
      setStateTicTacToe("turn", "x");
      players[0].classList.add("active")
      players[1].classList.remove("active")
    }
  }
export const incrementarContador = () => {
    getStateTicTacToe("contador")++
}
export function clicarCasilla() {
//Obtenemos la clase de la casilla clicada y seleccionamos la segunda clase para saber que casilla es
    celdas.className.split(" ")[1] = tile;
    if (getStateTicTacToe("turn") === "x") {//inyecto el jugador que toque por turno en esa casilla
      getStateTicTacToe("playerX").push(tile);
    } else {
        getStateTicTacToe("playerO").push(tile);
    }
}
export function marcarCasilla() {
    // Si la tiles ya está marcada, no hacemos nada
    if (celdas.textContent !== "") {
        return;
    }
    // Marcamos la tiles con el símbolo del jugador actual
    celdas.textContent = getStateTicTacToe("turn");
}