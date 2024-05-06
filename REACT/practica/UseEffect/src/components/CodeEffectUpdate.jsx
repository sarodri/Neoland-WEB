import { MessageComponent } from "./MessageComponent";

export const CodeEffectUpdate = () => {
    const [visible, setVisible] = useState(false);
  
    return (
      <>
        {visible && <MessageComponent />}
        <button onClick={() => setVisible(!visible)}>Open SuperHero</button>
      </>
    );
  };