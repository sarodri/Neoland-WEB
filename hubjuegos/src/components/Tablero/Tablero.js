import { celdas, jugadores, status, reiniciar } from "../../pages"
import { getStateTicTacToe, setStateTicTacToe } from "../../global/state/tictactoe.state";
import { incrementarContador, hayGanador, cambiarTurno, clicarCasilla, marcarCasilla } from "../../utils";
import "../../pages/TicTacToe/TicTacToe.css"


// Añadimos un evento de clic a todas las casillas del tablero
export const startJuego = () => {
    celdas.forEach(celda => {
      celda.addEventListener("click", function() {
        if (getStateTicTacToe("huboGanador")) {
          return;
        }// con el (this) hacemos referencia a la casilla clicada
        marcarCasilla(this);
        clicarCasilla(this);
        incrementarContador();
        status.innerHTML = string;
        hayGanador();
        if (!getStateTicTacToe("huboGanador")) {
          console.log("cambiar turno");
          cambiarTurno();
        }
      });
    });
  };

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

