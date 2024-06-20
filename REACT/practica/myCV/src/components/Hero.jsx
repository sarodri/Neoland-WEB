import "./Hero.css";
import React from "react";


const Hero = ({ hero }) => {
  return (
    <div className="hero card">
      <img src={hero.image} alt="foto" />
      <h2>
        {hero.name} {hero.surname}
      </h2>
        <p>🗺️{hero.city} </p>
        <p>🗓️{hero.birthDate}</p>
        <p>
          📧
          <a href={"mailto:" + hero.email}>
          sroperodri@gmail.com
          </a>
        </p>
        <p>📱 {hero.phone}</p>
        <p>💾 <a href={hero.linkedin}>
            LinkedIn
          </a></p>
        <p>💾 <a href={hero.gitHub}>
            GitHub
          </a></p>
    </div>
  );
};

export default Hero;