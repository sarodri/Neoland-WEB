let dataTablero = {
    turn : "x",
    playerX : [],
    playerO : [],
    contador : 0,
    huboGanador : false
}

export const initTablero = () =>{
    dataTablero.turn= "x",
    dataTablero.playerX = [],
    dataTablero.playerO = [],
    dataTablero.contador = 0,
    dataTablero.huboGanador = false
}

export const getStateTicTacToe = (typeOfValue) => {
    switch (typeOfValue) {
        case "turn":
            return dataTablero.turn;
        case "playerX":
            return dataTablero.playerX;
        case "playerO":
            return dataTablero.playerO;
        case "contador":
            return dataTablero.contador;
        case "huboGanador":
            return dataTablero.huboGanador;
        case "all":
            return dataTablero;
    }
}

export const setStateTicTacToe = (typeOfValue, setValue) => {
    switch (typeOfValue) {
        case "turn":
            dataTablero.turn= setValue;
            break;
        case "playerX":
            dataTablero.playerX= setValue;
            break;
        case "playerO":
            dataTablero.playerO= setValue;
            break;
        case "contador":
            dataTablero.contador= setValue;
            break;
        case "huboGanador":
            dataTablero.huboGanador= setValue;
            break;
        case "all":
            initTablero();
            break;
    }
}