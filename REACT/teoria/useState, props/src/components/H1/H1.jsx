import "./H1.css"

//las props son un tipo de children, sicrven para enviar informacion
export const H1 = ({children, className}) => {
  return <h1 className={className}>{children}</h1>

};
