import { useState } from "react";

export const ObjectState = () => {
    //el estado inicial es un objeto, es inmutable por lo que cuando llamemos al metodo onchange y seteemos ek nuevo valor, lo haremos en una copia con spread operator
    //con este componente estamos controlando varios valores con un solo estado
	const [avengerInfo, setAvengerInfo] = useState({
    name: "Thor",
    lastName: "Odinson",
	 });

	 return (
    <>
     <h4>
        {avengerInfo.name} | {avengerInfo.lastName}
      </h4>

      <input
        type="text"
        value={avengerInfo.name}
        onChange={(e) =>
          setAvengerInfo({
            ...avengerInfo,
            name: e.target.value,
          })
        }
      />

      <input
        type="text"
        value={avengerInfo.lastName}
        onChange={(e) =>
          setAvengerInfo({
            ...avengerInfo,
            lastName: e.target.value,
          })
        }
      />
    </>
  );
};