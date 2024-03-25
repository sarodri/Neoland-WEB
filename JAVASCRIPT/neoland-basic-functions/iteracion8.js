// Crea una función que nos devuelva el número de veces que se repite cada una de las palabras que lo conforma.  Puedes usar este array para probar tu función:

const counterWords = [
    'code',
    'repeat',
    'eat',
    'sleep',
    'code',
    'enjoy',
    'sleep',
    'code',
    'enjoy',
    'upgrade',
    'code'
  ];
  function repeatCounter(array) {
    // arranco un objeto vacio donde almacenar la informacion
    const contador = {};
    for (let palabra of array){
        //recorro el array y compruebo si existe la palabra existe en el objeto contador, si existe sumo uno en el contador, si no le doy el valor 1
     if(contador[palabra]){
        contador[palabra]++;
     } else {
        contador[palabra] = 1;
     }
   } return contador
  }

console.log(repeatCounter(counterWords));