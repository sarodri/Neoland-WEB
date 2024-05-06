import { useState, useEffect } from "react";

export const EffectOnLoad= () => {
  const [myName, setMyName] = useState("David");
//añado un valor por defecto para cuando se haya renderizad el DOM [ ]: solo ocurrira una vez en el ciclo de vida del componente
//si añado valor al array se ejecutara siempre que este valor sea modificado
// si no añado array de dependencias, se ejecutara despues de cada render y tendremos una ejecucion continua
useEffect(() => {
    // vamos a simular que esto fuese la respuesta de una API, la pagina carga de inicio con "David" y 1,5 segundos más tarde renderiza a "Ziggy Stardust"
    setTimeout(() => {
      setMyName("Ziggy Stardust");
    }, 1500);
  }, []);

  return (
    <>
      <h4>{myName}</h4>
      <input
        type="text"
        value={myName}
        onChange={(e) => setMyName(e.target.value)}
      />
    </>
  );
};