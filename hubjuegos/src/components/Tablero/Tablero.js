function crearTablero() {
    const tablero = Array(4).fill().map(() => Array(4).fill(""));
    return tablero;
}

function mostrarTablero(tablero) {
    const tableroElement = document.createElement('div');
    tableroElement.className = 'tablero';
    tablero.forEach((fila, i) => {
        fila.forEach((casilla, j) => {
            const casillaElement = document.createElement('div');
            casillaElement.className = 'casilla';
            casillaElement.textContent = casilla;
            tableroElement.appendChild(casillaElement);
        });
    });
    document.getElementById('app').appendChild(tableroElement);
}

const tablero = crearTablero();
mostrarTablero(tablero);