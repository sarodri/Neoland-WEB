import { celdas, jugadores, status, reiniciar } from "../../pages"
import { getStateTicTacToe, setStateTicTacToe } from "../../global/state/tictactoe.state";
import { incrementarContador, hayGanador, cambiarTurno, clicarCasilla, marcarCasilla } from "../../utils";


// Añadimos un evento de clic a todas las casillas del tablero
export const activarCasillas =(celdas)=>{
    for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener("click",  () => {
    if (getStateTicTacToe("huboGanador")==true){
        return
    }
        marcarCasilla(this);
        clicarCasilla(this);
        incrementarContador();
        status.innerHTML = string;
        hayGanador();
    if (getStateTicTacToe("huboGanador")==false){
        console.log("cambiar turno")
        cambiarTurno();
    }
    });
  }}

export const reiniciarJuego = () =>{ 
    reiniciar.addEventListener("click",   ()=> {
    setStateTicTacToe("huboGanador", false);
    console.log("entra en start")
    console.log(jugadores)
    jugadores[0].classList.add("active");
    jugadores[1].classList.remove("active");

    setStateTicTacToe("playerO", []);
    setStateTicTacToe("playerX", []);
    setStateTicTacToe("contador", 0);

    // Borramos el contenido de todas las casillas
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].textContent = "";
    }
    // Reiniciamos la variable de turn
    setStateTicTacToe("turn", "x");

    status.innerHTML = "Game in progress...";
    reiniciar.style.display =  "none";
   }
);
}

