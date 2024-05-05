import "./Figure.css";

export const Figure = ({ character}) => {
  return (
    <figure>
      <h3 id="name">{character.name}</h3>
      <img src={character.image} alt={"character"} />
      <h3>{character.status}</h3>
      <p>{character.origin.name}</p>
    </figure>
  );
};
