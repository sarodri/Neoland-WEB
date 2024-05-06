let artistas = [
    { id: 1, nombre: "Queen", mejorCancion: "Bohemian Rhapsody" },
    { id: 2, nombre: "The Beatles", mejorCancion: "Hey Jude" },
    { id: 3, nombre: "Michael Jackson", mejorCancion: "Thriller" },
    { id: 4, nombre: "Bob Marley", mejorCancion: "No Woman, No Cry" },
    { id: 5, nombre: "Madonna", mejorCancion: "Like a Prayer" },
    { id: 6, nombre: "Elvis Presley", mejorCancion: "Suspicious Minds" }
];
export const getArtistas = () => artistas; //permite traer a todos los artistas
  
  
export const getArtista = id => artistas.find( //traemos un artista a través de su id
  artista => artista.id.toString() === id
);

export const deleteArtista = async (id) => artistas = artistas.filter( //borramos un artista a través de su id
  artista => artista.id !== id
);