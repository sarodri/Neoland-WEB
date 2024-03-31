// Crea una función llamada swap() que reciba un array y dos parametros que sean indices del array. La función deberá intercambiar la posición de los valores de los indices que hayamos enviado como parametro. Retorna el array resultante.

const ejemplo = ['Mesirve', 'Cristiano Romualdo', 'Fernando Muralla', 'Ronalguiño']

function swap(array, x, y) {
    const temp = array[x]
    array[x] = array[y]
    array[y] = temp;
    return array
}

console.log(swap(ejemplo, 2,3))
console.log(swap(ejemplo, 0,3))