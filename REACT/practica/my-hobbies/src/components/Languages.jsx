const Languages= ({ languages })=> {
    return ( //accedo a la propiedad del objeto
      <div>
        <h2>Languages</h2>
        <p>Language: {languages.language}</p>
        <p>Writing Level: {languages.wrlevel}</p>
        <p>Speaking Level: {languages.splevel}</p>
      </div>
    );
  }

export default Languages;