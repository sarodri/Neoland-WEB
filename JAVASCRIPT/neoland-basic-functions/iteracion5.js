// Crea una función que reciba por parámetro un array y cuando es un valor number lo sume y de lo contrario cuente la longitud del string y lo sume. Puedes usar este array para probar tu función:

const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
function averageWord(array) {
   let suma= 0;
    for (let parametro of array){
         if (typeof parametro === 'number'){
            suma= suma + parametro ;
        }
        else if (typeof parametro === 'string'){
            suma = suma + parametro.length ;
        } 
    }return suma 
}

console.log("La suma de los numeros y las letras de las palabras es:", averageWord(mixedElements));