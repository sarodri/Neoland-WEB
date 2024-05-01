import "./Footer.css"
import { ChildrenFooter } from "../ChildrenFooter/ChildrenFooter"

export const Footer = ()=>{
    return <footer>
        <ChildrenFooter texto1={"Hola footer"} texto2={"Hola 2 footer"}/>
    </footer>
}