import { filterPokemon } from "../../utils";
import "./ButtonFilter.css";

export const PrintButton = (types) => {

  types.forEach((type) => {
    const buttonType = `<button class="buttonFilter ${type}">
      ${type}
    </button>`;
    const containerFilter = document.getElementById("filterButton");
    containerFilter.innerHTML += buttonType;
  });

  addListeners(types);
};

const addListeners = (types) => {
  types.forEach((type) => {
    const buttonType = document.querySelector(`.${type}`);
    buttonType.addEventListener("click", (e) => {
      /** En este caso llamara a la funcion de filtrar pero para
       * cuando es el switch de caso type
       */
      filterPokemon(type, "type");
    });
  });
};