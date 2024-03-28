// Dado el siguiente javascript usa forof para recorrer el array de películas, genera un nuevo array con las categorías de las películas e imprime por consola el array de categorías. Ten en cuenta que las categorías no deberían repetirse. Para filtrar las categorías puedes ayudarte de la función .includes()

const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]
 //recorro elo array de películas y obtengo un n uevo array sólo con las categorías de cada pelicula
let categoriesMovie = []

for (let movie of movies){
  categoriesMovie.push(movie.categories)
}

// para recorrer el nuevo array y obtener solo las categorias sin que se repitan, uso el método Set() que obtiene los no repetidos y comparo cada elemento dentro de los arrays de categorias

let noRepetidos = new Set();

for (let conjunto of categoriesMovie){
    for ( let elemento of conjunto){
        noRepetidos.add(elemento)
    }
}

console.log(noRepetidos)