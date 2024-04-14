import { reiniciarJuego } from "../components";
import { getStateTicTacToe, setStateTicTacToe } from "../global/state/tictactoe.state";

export const checkGanador = ()=> {
    const combGanadora = [ 
    // combinaciones en horizontal
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    // combinaciones en vertical
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [4, 8, 12, 16],
    // combinaciones en diagonal
      [1, 6, 11, 16],
      [4, 7, 10, 13],
    ];
        //RECORRO EL ARRAY DE COMBINACIONES PARA CADA JUGADOR Y SI ALGUNO LO HA LOGRADO LO NOMBRO GANADOR, SI NO HAY GANADOR Y EL TABLERO ESTA COMPLETO ME DARA TABLERO LLENO
    combGanadora.forEach(element => {
        // COMPROBAMOS SI LAS CASILLAS CLICADAS POR CADA JUGADOR CORRESPONDEN CON ALGUNO DE LOS ELEMENTOS DEL ARRAY DE COMBINACIONES (CHEKCOMB) GANADORAS VIENDO SI EL ARRAY DE COMBINACIONES GANADORAS INCLUYE LOS ELEMENTOS DEL ARRAY DEL JUGADOR
    let checkComb = (array1, array2) => {
        return array2.every((x) => {
            return array1.includes(x)
        })
    } //mapeo el array del jugador pra cada elemento numérico y los compruebo con el array de combinaciones ganadoras
        if (getStateTicTacToe("turn") === "x" && checkComb(getStateTicTacToe("playerX").map(Number), element)){
            document.getElementById("status").innerHTML ="Player 1 won!";
            setStateTicTacToe("huboGanador", true)
            console.log(getStateTicTacToe("huboGanador"),"x")
            document.getElementById("restart-btn").style.display = 'block';
            reiniciarJuego();
            return
        }
        if (getStateTicTacToe("turn") === "o" && checkComb(getStateTicTacToe("playerO").map(Number), element)){
            document.getElementById("status").innerHTML ="Player 2 won!";
            setStateTicTacToe("huboGanador", true)
            document.getElementById("restart-btn").style.display = 'block';
            reiniciarJuego()
            return
        }else if(getStateTicTacToe("contador") == 16){
            console.log("contador lleno")
            document.getElementById("status").innerHTML ="Draw!!!";
            document.getElementById("restart-btn").style.display = 'block';
            reiniciarJuego()
        }
    });
    
}

//COMPRUEBO QUE JUGADOR ESTA ACTIVO CON EL ESTADO, Y CAMBIO AL OTRO JUGADOR
export const cambiarTurno = () =>{
    // obtenemos por estado el turno actual, y lo cambiamos al contrario activando la casilla de jugador actual y desactivando la otra
    if (getStateTicTacToe("turn") === "x") {
        console.log("si esta en x")
      setStateTicTacToe("turn", "o");
      
      document.getElementById("player 2").classList.add("active")
      document.getElementById("player 1").classList.remove("active")
      console.log("turno cambiado a:", getStateTicTacToe("turn"))
    } else {
      setStateTicTacToe("turn", "x");
      document.getElementById("player 1").classList.add("active")
      document.getElementById("player 2").classList.remove("active")
      console.log(getStateTicTacToe("turn"))
    }
}
export const incrementarContador = () => {
    //coge el estado del conotador, e incrementa una unidad por jugada válida
    const contadorActual = getStateTicTacToe("contador");
    setStateTicTacToe("contador", contadorActual + 1);
}
let celda = document.getElementsByClassName('tile')

export const clicarCasilla = (celdas)=> {
//Obtenemos la clase de la casilla clicada y seleccionamos la segunda clase para saber que casilla es
    let tile = celdas.className.split(" ")[1] ;
    console.log(document.getElementsByClassName('tile')[tile-1], "casilla clicada")
    // si la celda está llena, no hacemos nada y el jugador pierde turno
    if (document.getElementsByClassName('tile')[tile-1].textContent !== " ") {
        console.log(document.getElementsByClassName('tile')[tile-1])
        console.log("esta lleno")
        return
    }
    else{
        // si la celda está vacia, obtenemos el jugador ue está turno, asignamos la casilla al jugador, añadimos el numero de casilla al array de combinaciones del jugador e incrementamos el contador de jugadas
        if (getStateTicTacToe("turn") == "x") {
            console.log(tile, "celda en turnoX")
            getStateTicTacToe("playerX").push(tile);
            celda[tile-1].textContent = getStateTicTacToe("turn");
            incrementarContador(); console.log("contador:", getStateTicTacToe("contador"))
          
        }
        else if (getStateTicTacToe("turn") == "o") {
            console.log(tile, "celda en turnoO")
            getStateTicTacToe("playerO").push(tile);
            celda[tile-1].textContent = getStateTicTacToe("turn");
            incrementarContador(); console.log(getStateTicTacToe("contador"))
          
        }
    }
}
