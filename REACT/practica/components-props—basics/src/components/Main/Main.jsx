import "./Main.css"
import {ChildrenMain} from "../ChildrenMain/ChildrenMain"
import { SubTile } from "../SubTile/SubTile"
import { Image } from "../Image/Image"
import react from "../../assets/react.svg"
import { Paragraph } from "../Paragraph/Paragraph"

export const Main = ()=>{
    return<main>
        <SubTile texto={"Soy el subtile del MAIN"} />
        <Image src={react} alt={"react"}/>
        <Paragraph texto={"Este es el texto asociado al componente PARRAFO"} />
    </main>
}