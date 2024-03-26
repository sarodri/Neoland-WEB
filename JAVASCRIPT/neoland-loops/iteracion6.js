// Usa un bucle for...of para recorrer todos los juguetes y elimina los que incluyan la palabra gato. Recuerda que puedes usar la función .includes() para comprobarlo.Puedes usar este array:

const toys = [
    {id: 5, name: 'Buzz MyYear'}, 
    {id: 11, name: 'Action Woman'}, 
    {id: 23, name: 'Barbie Man'}, 
    {id: 40, name: 'El gato con Guantes'},
    {id: 40, name: 'El gato felix'}
    ]

    // Con esta solución recorremos el array tantas veces como elemtos haya y hacemos el proceso más lento
// for (let i =0; i<toys.length; i++){
//     for (const toy of toys) {
//         if (toy.name.includes('gato')) {
//             const x = toys.indexOf(toy);
//             toys.splice(x, 1);
//         }
//     }
// }


// Creo una variable para almacenar las posiciones de los elementos que contiene "gato" y con el for of solo recorremos el array una vez y comprobamos cada elemento, añadiendo al array juguetesEliminar los que contengas la palabra "gato"

const juguetesEliminar = [];
for (const toy of toys) {
    if (toy.name.includes('gato')) {
        juguetesEliminar.push(toy);
    }
}
// Eliminamos los juguetes del array padre a través de su posición
for (const toy of juguetesEliminar) {
    const i = toys.indexOf(toy);
    toys.splice(i, 1);
}

console.log(toys)