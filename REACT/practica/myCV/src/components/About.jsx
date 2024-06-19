
import React from "react";

const About = ({ hero }) => {
    return (
      <div className="about card">
        <h2>About Me:</h2>
        {hero.aboutMe.map((item, index) => {
          return (
            <div key={index} className="aboutItem">
              <p className="info">📕 {item.info}</p>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default About;