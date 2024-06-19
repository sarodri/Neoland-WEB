import "./More.css"
import React from "react";


const More = ({ languages, habilities, volunteer  }) => {
  return (
    <>
    <div className="more">
    <div>
        <div className="languages card">
        <h2>Languagues:</h2>
            <p className="name">💾 {languages.language}</p>
            <p>{languages.wrlevel}</p>
            <p>{languages.splevel}</p>
          
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
      <div className="volunteer card">
      <h2>volunteer: </h2>
        {volunteer.map((item) => {
          return (
            <div key={JSON.stringify(item)}>
              <p className="name">💾 {item.name}</p>
              <p>{item.where}</p>
              <p>{item.description}</p>
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