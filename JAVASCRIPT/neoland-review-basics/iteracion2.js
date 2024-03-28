// Dado el siguiente javascript usa forof y forin para hacer la media del volumen de todos los sonidos favoritos que tienen los usuarios.

const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]

// Declaro array para almacenar todos los sonidos favoritos y crear un array de objetos
let volumenes = []

for (let usuario of users){
    volumenes.push(usuario.favoritesSounds)
}
// Declaro array para almacenar los valores de los volumenes de los sonidos
let valoresDeVolume = [];

// Con el bucle for of recorro el array de objetos
for (let objeto of volumenes) {
  // Con el bucle for in recorro las claves de cada objeto y las añado al array
    for (let clave in objeto) {
        valoresDeVolume.push(objeto[clave].volume)
    }
}

// con el método reduce() hago el sumatorio de los valores y calculo la media
const mediaVolumen = valoresDeVolume.reduce((acc, valor) => acc + valor ) / valoresDeVolume.length

console.log(mediaVolumen)

