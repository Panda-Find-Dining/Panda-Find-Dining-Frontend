import React from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './components/example-person';



function App() {

const person = "ryan"

  return (
    <div className="App">
      <header className="App-header">

        <p>
          Hey y'all 
        </p>
<Person person={ person }/>
      </header>
    </div>
  );
}

export default App;
