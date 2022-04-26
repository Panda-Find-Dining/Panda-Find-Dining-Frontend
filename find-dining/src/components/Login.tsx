// @ts-nocheck (TODO KE: remove after typescript refactor)
import axios from "axios";
import React, { useState } from "react";

const Login = ({ setToken, setUser }) => {
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
    axios
      .post("https://find-dining-panda.herokuapp.com/api/auth/token/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        setToken(response.data.auth_token);
        setUser(username);
      });
  };

  return (
    <div className="box">
      <h1
        style={{
          marginBottom: 10,
        }}
      >
        Login
      </h1>
      <label>Username</label>
      <input
        className="input"
        type="text"
        placeholder="username"
        value={username}
        name="username"
        onChange={(event) => handleChange(event)}
      />
      <label>Password</label>
      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        name="password"
        onChange={(event) => handleChange(event)}
      />
      <button
        style={{
          marginTop: 5,
        }}
        className="button"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
