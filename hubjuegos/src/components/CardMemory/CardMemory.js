import "./CardMemory.css";

const template = (info) => `
    <div class="card-container" data-card-value="${info.name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${info.image}" class="image"/></div>
     </div>`;
//pintamos el contenedor con la informacion correspondiente de las cartas para despues usarla en utils, multiplico el template x4 con el grid
export const PrintCardMemory = (info) => {
  const gameContainer = document.querySelector(".game-c");
  gameContainer.innerHTML += template(info);
  gameContainer.style.gridTemplateColumns = `repeat(${4},auto)`;
};
