import { startJuego } from "../../pages"
import { getStateTicTacToe, setStateTicTacToe } from "../../global/state/tictactoe.state";
import "../../pages/TicTacToe/TicTacToe.css"


// export const reiniciarJuego = () =>{ 
//   document.getElementById("restart-btn").addEventListener("click",   ()=> {
//     setStateTicTacToe("huboGanador", false);
//     console.log("entra en start")
//     console.log(jugadores)
//     document.getElementById("player 1").classList.add("active")
//     document.getElementById("player 1").classList.remove("active")

//  // Reiniciamos la variable 
//     setStateTicTacToe("playerO", []);
//     setStateTicTacToe("playerX", []);
//     setStateTicTacToe("contador", 0);
//     setStateTicTacToe("turn", "x");

//     // Borramos el contenido de todas las casillas
//     for (let i = 0; i < celdas.length; i++) {
//         celdas[i].textContent = "";
//     }
//     document.getElementById("status").innerHTML = "Game in progress...";
//     reiniciar.style.display =  "none";
//    }
// );
// }

export const reiniciarJuego = () =>{ 

  const reiniciarVariables = () =>{
    console.log("reiniciando variables")
      setStateTicTacToe("huboGanador", false);
      console.log(getStateTicTacToe("huboGanador"))
      setStateTicTacToe("playerO", []);
      console.log(getStateTicTacToe("playerO"))
      setStateTicTacToe("playerX", []);
      console.log(getStateTicTacToe("playerX"))
      setStateTicTacToe("contador", 0);
      console.log(getStateTicTacToe("contador"))
      setStateTicTacToe("turn", "x");
      // console.log(getStateTicTacToe("turn"))
      // document.getElementById("player 1").classList.add("active")
      document.getElementById("player 2").classList.remove("active")  
      document.getElementById("status").innerHTML = "Game in progress...";
      vaciarCeldas()
       console.log("al pulsar" , getStateTicTacToe("all")) 
      startJuego()
    
    // document.getElementById("restart-btn").style.display = 'none';
  }

  const vaciarCeldas = () =>{ 
    const celdas = document.querySelectorAll(".tile") 
    console.log(celdas,"celda vaciada")
    celdas.forEach(celda =>{
      celda.textContent= " ";
     })
  }
  const botonReinicio = document.getElementById("restart-btn")
  botonReinicio.addEventListener("click", reiniciarVariables)
  
  return   botonReinicio
}

