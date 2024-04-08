import { getUserData, setUserData } from "../../global/state/globalstate";
import "./CardPokemons.css";

export const CardsPokemon = (data) => {
    //me traigo al usuario
    const appUser= getUserData();
    // borro la galeria
    document.getElementById("galleryPokemon").innerHTML = "";
/** De los datos completos mandados a pintar por este componente CardsPokemons los recorremos
   * Lo primero que le vamos a hacer es una clase que sea dinamica para cada uno de los tipos de pokemon
   * y luego hacemos un template con un figure con el pokemon que vamos a renderizar*/
data.map((pokemon) => {
    const classCustomType = `"figurePokemon ${pokemon.type[0].type.name}"`;

    const templateFigure = ` <figure class=${classCustomType} id=${pokemon.id}>
    <img src=${pokemon.image} alt=${pokemon.name} />
    <h2>${pokemon.name}</h2>
    <span class="material-symbols-outlined  ${
        appUser.fav.includes(pokemon.id.toString()) ? "like" : ""
    }"> favorite </span>
    </figure>`;

    document.getElementById("galleryPokemon").innerHTML += templateFigure;

    /** ahora para que ese span sea clicable hay que darle su evento correspondiente por lo que
     * llamamos a una funcion para meterle los eventos y le pasamos la data completa
     */
    addListeners(data);
});
};

const addListeners = (data) => {
  /** nos volvemos a traer los datos del usuario para saber sobretodo los fav que tiene en el array de id
   * de sus pokemons favoritos
   */
    const appUser = getUserData();

  /** apuntamos a tods los span que son realmente los corazones. Los recorremos todos los span y le metemos
   * el evento de tipo click
   */
    const spanAll = document.querySelectorAll("span");
    spanAll.forEach((span) => {
    span.addEventListener("click", (e) => {
      /** Y aqui hacemos un toggle, es decir si el corazon que clico es ya favorito lo quito de favorito
       * si este no esta como favorito lo pongo como favorito
       * Esto lo va a saber gracias al usuario que hay en el contesto y su array de fav ya que lo que hace en este if es comprobar que ese array de fav ver si incluye o no el id del padre del span el cual es el figure
       * que recordar en el template metemos el id del pokemon como id del figure
       */
        if (appUser.fav.includes(e.target.parentNode.id)) {
        /** Si lo incluye entonces tenemos que sacarlo del array para eso nos traemos de nuevo los datos del user
         * logado del contexto para actualizar sus fav ( es decir el array con los id de los pokemon fav)
         */
        const appUser = getUserData();

        const newFavArray = [];
        /** cremoa un array nuevo donde metermos todos los id de los pokemons que estaban como fav menos
         * el que queremos quitar como favorito
         */
        appUser.fav.forEach((id) => {
            if (e.target.parentNode.id != id) newFavArray.push(id);
        });

        /** y una vez creado el nuevo array de fav lo que vamos a hacer es con la funcion set del estado
         * meter este nuevo array en el contexto, en los datos del usuario, y esta funcion
				* los meterá en el localStorage actualizados
         *
         * Para esto hacemos una copia de lo que teniamos con un spread operator y despues modificamos la clave
         * fav y le metemos como valor el nuevo array sin el elemento que hemos quitado de fav que es el id del figure el cual
         * es padre del span que corresponde con el corazon
         */
        setUserData({
            ...appUser,
            fav: newFavArray,
        });

        /** inportante a ese span quitarle la clase like para asi se le quite el rojo */
        span.classList.toggle("like");
        } else {
        /** En caso de no incluir ese id en el arrray de fav del user logado del contesto lo que tenemos que hacer es meter el id de ese figire
         * en el array de fav de los datos de usuario del contesto y de nuevo utilizamos la funcion de set para modificar el estado
         */
        const appUser = getUserData();
        appUser.fav.push(e.target.parentNode.id);
        setUserData(appUser);

        /** En este caso metemos la clase like al elemento que hemos hecho fav, recordar que el metodo toggle lo hace solo el quitar o poner la clase
         * en caso de que la tenga o no
         */
        span.classList.toggle("like");
      }
    });
  });
};

