import "./More.css"
import React from "react";


const More = ({ languages, habilities, projects  }) => {
  return (
    <>
    <div className="more">
    <div>
        <div className="languages card">
        <h2>Languagues:</h2>
        {languages.map((item, index)=>{
            return (
            <div key={index}>
                <p className="name">💾 {item.language}</p>
                <p>{item.wrlevel}</p>
                <p>{item.splevel}</p>
            </div>
            );
        })}
        </div>
    </div>
    <div>
        <div className="habilities card">
        <h2>Habilities:</h2>
        {habilities.map((item) => {
          return (
            <div key={JSON.stringify(item)}>
              <p>{item}</p>
            </div>
          );
        })}
        </div>
    </div>
    <div>
      <div className="projects card">
      <h2>Projects: </h2>
        {projects.map((item) => {
          return (
            <div key={JSON.stringify(item)}>
              <p className="name">💾 {item.name}</p>
              <p>{item.where}</p>
              <p>{item.description}</p>
              <img src={item.image} alt="project" />
            </div>
          );
        })}
      </div>
    </div>
    </div>
    </>
  );
};

export default More;