import { useState } from 'react'

export const MyState = () => {
    const [myName, setMyName] = useState("Ziggy Stardust");
    return (
   <> {/**renderizamos el nombre en tiempo real a traves del estado con el onchange */}
   <h1>{myName}</h1>
    <input
      type="text"
      value={myName}
      onChange={(e) => setMyName(e.target.value)} 
    />
    </> 
    )
};

  //componente de tipo funcion, que devuelve elementos de tipo React e