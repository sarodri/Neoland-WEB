import { PrintCardMemory } from "../components";
import { items } from "../global/data/data.memory";
import { getStateMemory, setStateMemory } from "../global/state/memoryState";

export const generateRandom = (size = 4) => {
  let tempArray = [...items]; //crea una copia de los items que tenemos en data
  let cardValues = [];
  size = (size * size) / 2; // obtenemos el numero 8
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length); /// genero un index del array de forma aleatoria
    cardValues.push(tempArray[randomIndex]);//inyecto al array el item de la posicion aleatoria
    // con el splice quitas el imagen que ya has metido en carVaslue y lo quitar de tempArray
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
//crea un contador de tiempo que empieza visualmente en 1 segundo
export const timeGenerator = () => {
  setStateMemory("seconds", getStateMemory("seconds") + 1);

  if (getStateMemory("seconds") >= 60) {
    setStateMemory("minutes", getStateMemory("minutes") + 1);
    setStateMemory("seconds", 0);
  }
  let secondsValue =
    getStateMemory("seconds") < 10
      ? `0${getStateMemory("seconds")}` //cuando es menos de 10, delante pinto un 0
      : getStateMemory("seconds");
  let minutesValue =
    getStateMemory("minutes") < 10
      ? `0${getStateMemory("minutes")}`
      : getStateMemory("minutes");
  const timeValue = document.getElementById("time"); //inyecto el html
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//genero el tablero de cartas con un bucle
export const generador = (cardValues, size = 4) => {
  const gameContainer = document.querySelector(".game-c");
  gameContainer.innerHTML = "";
  //como tenemos 8 cartas de cardValues, la duplico en copia para generar las 16 (8parejas)
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5); //las desordeno a traves de una funcion aleatoria
// con el bucle pinto las 16 a traves de su indice del array de cartas desordenadas
  for (let i = 0; i < size * size; i++) {
    PrintCardMemory(cardValues[i]);
  }
  //añado el evento para cuando cliquemos
  listeners(cardValues);
};

const listeners = (cardValues) => { //selecciono todos los elementos .card- y los almaceno en memoria como cartas
  const cards = document.querySelectorAll(".card-container");
  setStateMemory("cards", cards);
//recorro las cartas y añado evento para contrastar si estan o no ya clicadas; veo si es primera o segunda carta, les añado el flipped y si son iguales les pongo el matched
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {//no tiene match, pues dale la vuelta
        card.classList.add("flipped");
        if (!getStateMemory("firstCard")) {//no es primera carta, pues seteala como primera a traves de su atributo
          console.log("entro");
          setStateMemory("firstCard", card);
          console.log("lo ha metido", getStateMemory("firstCard"));
          setStateMemory(
            "firstCardValue",
            card.getAttribute("data-card-value")
          );
        } else {//en casa de que no sea la primera, añade un movimiento y seteala como segunda carta en memoria 
          movesCounter();
          setStateMemory("secondCard", card);

          setStateMemory(
            "secondCardValue",
            card.getAttribute("data-card-value")
          );

          if (
            getStateMemory("firstCardValue") ==
            getStateMemory("secondCardValue")   //si son iguales, las dejamos vueltas en matched y reseteamos los valores de memoria para la siguiente pareja
          ) {
            getStateMemory("firstCard").classList.add("matched");
            getStateMemory("secondCard").classList.add("matched");

            setStateMemory("firstCard", false);

            setStateMemory("winCount", getStateMemory("winCount") + 1);

            if (// cuando tengo 8 moviemintos quiere decir que he emparejado todas las cartas:he ganado y paro el juego
              getStateMemory("winCount") == Math.floor(cardValues.length / 2)
            ) {
              const result = document.getElementById("result");
              result.innerHTML = `<div class="won"><img class src="./sourceMemory/YOUW.gif" />
            `;
              getStateMemory("stopGame")();
            }
          } else {
            /** crea dos variables tempFirst, tempSecond que asocia su valor
             * al los valores de firstCard, secondCard */

            //como no son iguales, las almaceno y pongo en false y tras un pequeño tiempo las vuelvo a girar
            let [tempFirst, tempSecond] = [
              getStateMemory("firstCard"),
              getStateMemory("secondCard"),
            ];
            setStateMemory("firstCard", false);
            setStateMemory("secondCard", false);
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//incrementa en 1 el estado de la memoria del contador
const movesCounter = () => {
  setStateMemory("movesCount", getStateMemory("movesCount") + 1);
  const moves = document.getElementById("moves");
  moves.innerHTML = `<span>Moves:</span>${getStateMemory("movesCount")}`;
};