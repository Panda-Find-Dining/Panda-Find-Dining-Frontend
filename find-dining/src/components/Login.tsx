import axios from "axios";
import React, { useState } from "react";

const Login = ({ setToken, url, setUser, }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleChange = (event) => {
      event.preventDefault();
  
      if (event.target.name === "username") {
        setUsername(event.target.value);
      }
  
      if (event.target.name === "password") {
        setPassword(event.target.value);
      }
    };
  
    const handleLogin = () => {
      // this is where I need to make an axios POST request
      // to the LOGIN endpoint /api/auth/token/login/
      // I need to send the username and password with the request so
      // I can get an authorization token as a reponse
      // I need to add the request URL as the first argument
      axios
        .post(url + "/auth/token/login/", {
          // this is where I need to send the username and password
          // data from state
          username: username,
          password: password,
        })
        .then((response) => {
          // once I get an auth token, I need to call setToken and pass
          // the auth token as an arugment
          setToken(response.data.auth_token)
          setUser(username)
          window.location.pathname = "/"
        });
    };
  
  
    return (
      <div className="box">
          <h1 style={{
              marginBottom:10
          }}>Login</h1>
        <label>Username</label>
        <input className="input"
          type="text"
          placeholder="username"
          value={username}
          name="username"
          onChange={(event) => handleChange(event)}
        />
        <label>Password</label>
        <input className="input"
          type="password"
          placeholder="password"
          value={password}
          name="password"
          onChange={(event) => handleChange(event)}
        />
        {/* <span class="icon is-small is-left"></span> */}
        <button style={{
              marginTop:5
          }}className="button" onClick={handleLogin}>Submit</button>
      </div>
    );
  };
  
  export default Login;
  