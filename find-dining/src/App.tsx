import React from 'react';
import axios from "axios";
// import useLocalStorageState from "use-local-storage-state";



const App = () => {
  return (
<>
<div id="greeting-container">
  <img>
  </img>
<p>
<i>"A bond between friends is impossible to break,
except when deciding where to eat."</i>  - Indecisive Friend
</p>
<p>Find Dining will help with the emotional labor of deciding what's for dinner.  Register now to invite a friend to a meal. You'll then both be presented with restaraunt selections. Choose your preferences and submit. Once you both match on a restaurant you can be on you merry way and have time for making more pressing decisions, like what to what series to binge!
</p>
</div>
    <div className="form">
        <div>
        <h1>Register</h1>
        </div>
        <label>Username</label>
        <input
        className="input"
        type="text"
        placeholder="username"/>
        <label>Email</label>
        <input 
        className="input"
        type="email"
        placeholder="email"/>
        <label>Password</label>
        <input className="input"
        type="password"
        placeholder="password"/>
        
       
      
    </div>
    </>
  )
}

export default App;
