import { getStateTicTacToe, setStateTicTacToe } from "../global/state/tictactoe.state";
import { status } from "../pages";
import { celdas, jugadores, reiniciar } from "../pages";


function setStatus(string) { 
    status.innerHTML = string;
}
export const hayGanador = ()=> {
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
        //RECORRO EL ARRAY DE COMBINACIONES PARA CADA JUGADOR Y SI ALGUNO LO HA LOGRADO LO NOMBRO GANADOR, SI NO HAY GANADOR Y EL TABLERO ESTA COMPLETO, VOY AL ELSE IF
    combGanadora.forEach(element => {
        if (getStateTicTacToe("turn") === "x" && checkComb(playerX.map(Number), element)){
            setStatus("Player 1 won!");
            huboGanador = true
            reiniciar.style.display = 'block';
            return
        }
        if (getStateTicTacToe("turn") === "o" && checkComb(playerO.map(Number), element)){
            setStatus("Player 2 won!");
            huboGanador = true
            reiniciar.style.display = 'block';
            return
        }else if(contador == 16){
            setStatus("Draw!")
            reiniciar.style.display = 'block';
        }
    });
    // COMPROBAMOS SI LAS CASILLAS CLICADAS POR CADA JUGADOR CORRESPONDEN CON ALGUNO DE LOS ELEMENTOS DEL ARRAY DE COMBINACIONES GANADORAS
    let checkComb = (array1, array2) => {
        return array2.every((x) => {
            return array1.includes(x)
        })
    }
}

//COMPRUEBO QUE JUGADOR ESTA ACTIVO CON EL ESTADO, Y CAMBIO AL OTRO JUGADOR
export const cambiarTurno = () =>{
    if (getStateTicTacToe("turn") === "x") {
      celdas.innerHTML = "o"
      setStateTicTacToe("turn", "o");
      jugadores[1].classList.add("active")
      jugadores[0].classList.remove("active")
    } else {
      celdas.innerHTML = "x"
      setStateTicTacToe("turn", "x");
      jugadores[0].classList.add("active")
      jugadores[1].classList.remove("active")
    }
}
export const incrementarContador = () => {
    getStateTicTacToe("contador")++
}
export const clicarCasilla = (celdas)=> {
//Obtenemos la clase de la casilla clicada y seleccionamos la segunda clase para saber que casilla es
    let tile = celdas.className.split(" ")[1] ;
    if (getStateTicTacToe("turn") == "x") {//inyecto el jugador que toque por turno en esa casilla
      getStateTicTacToe("playerX").push(tile);
    } else {
        getStateTicTacToe("playerO").push(tile);
    }
}
export const marcarCasilla = (celdas) =>{
    // Si la celda ya está marcada, no hacemos nada
    if (celdas.textContent !== " ") {
        return;
    }
    // Marcamos la celda con el símbolo del jugador actual
    celdas.textContent = getStateTicTacToe("turn");
}