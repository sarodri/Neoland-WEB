import { PrintTicTacToePage} from "../../pages"
import "../../pages/TicTacToe/TicTacToe.css"

export const reiniciarJuego = () =>{ 

  const botonReinicio = document.getElementById("restart-btn")
  botonReinicio.addEventListener("click", PrintTicTacToePage)
  
  return   botonReinicio
}

