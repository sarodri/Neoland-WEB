import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import More from "./components/More";
import { CV } from "./CV/CV.js";

const { hero, education, experience, languages, habilities, projects } = CV; //hacemos destructuring

function App() {
 
  const [showEducation, setShowEducation] = useState(true);
  return (
    <div className="App">
        <Hero hero={hero} />
        <About hero={hero} />
        <div className="buttons">
        <button
              className="custom-btn btn-4"
              onClick={() => setShowEducation(true)}
            >
              Education
            </button>
            <button
              className="custom-btn btn-4"
              onClick={() => setShowEducation(false)}
            >
              Experience
            </button>
          </div>
          <div>
            {showEducation ? (
              <Education education={education} />
              ) : (
              <Experience experience={experience} />
              )}
          </div>
	      <More
          languages={languages}
          habilities={habilities}
          projects={projects}
	      />
    </div>
  )
}

export default App
