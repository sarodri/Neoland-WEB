let heroes = [
    {
      id: 1,
      name: "Superman",
      age: 45,
      alias: "Clark Kent"
    },
    {
      id: 2,
      name: "Batman",
      age: 55,
      alias: "Bruce Wayne"
    },
    {
      id: 3,
      name: "Wonder Woman",
      age: 1555,
      alias: "Diana"
    },
    {
      id: 4,
      name: "Green Latern",
      age: 31,
      alias: "Jal Jordan"
    },
    {
      id: 5,
      name: "Aquaman",
      age: 42,
      alias: "Arthur Curry"
    }
  ];
  
  export const getHeroes = () => heroes; //permite traer a todos los heroes
  
  
  export const getHeroe = id => heroes.find( //traemos un heroe a través de su id
    heroe => heroe.id.toString() === id
  );
  
  export const deleteHeroe = async (id) => heroes = heroes.filter( //borramos un heroe a través de su id
    heroe => heroe.id !== id
  );