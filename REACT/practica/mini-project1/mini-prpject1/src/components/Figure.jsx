import "./Figure.css";

export const Figure = ({ name, src, status, origin }) => {
  return (
    <figure>
      <h3 id="name">{name}</h3>
      <img src={src} alt={name} />
      <h3>{status}</h3>
      <p>{origin}</p>
    </figure>
  );
};
