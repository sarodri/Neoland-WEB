// Dado el siguiente javascript usa forof y forin para saber cuantas veces ha sido cada sonido agregado por los usuarios a favorito. Para ello recorre la lista de usuarios y usa forin para recoger el nombre de los sonidos que el usuario tenga como favoritos.
// Una vez accedas a ellos piensa en la mejor forma de hacer un conteo de cada vez que ese sonido se repita como favorito en cada usuario.

// Este ejercicio es un poco complicado con los conocimientos actuales pero...a la vez un buen reto y oportunidad para comprender que hay muchas formas de hacer las cosas en javascript.


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
let sonidosFav = []

for (let usuario of users){
    sonidosFav.push(usuario.favoritesSounds)
}
console.log(sonidosFav)

//Una vez que tengo el array de sonidos favoritos, lo recorro y veo en cada objeto que tipo de sonido hay y lo voy almacenando en un contador; si existe, me suma uno, si no existe lo crea con el valor 1.
let contadorFav= {}

for (let sonido of sonidosFav){//en tro en el objeto
    for(let tipo in sonido){
        if(tipo in contadorFav){//recorro cada tipo de sonido y veo si existe
            contadorFav[tipo]++;
        } else{
            contadorFav[tipo]=1;
        }
    }
}

console.log(contadorFav)