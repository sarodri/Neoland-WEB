import { useState } from "react";
import MessageComponent from "./MessageComponent";

export const CodeEffectUnmount = () => {
    const [visible, setVisible] = useState(false);

    return <>
    {visible && <MessageComponent/>}
    <button onClick={() => setVisible(!visible)}>I'm inevitable</button> {/**el boton cambiara el estado de visile */}
    </>; //si es visible, se mostrara el titulo
  };