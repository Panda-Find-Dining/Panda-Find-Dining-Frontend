// @ts-nocheck (TODO KE: remove after typescript refactor)
import React, { useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";

const Register = ({ setToken, setUser }) => {
  // const location = useLocation()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === "username") {
      setUsername(event.target.value);
    }

    if (event.target.name === "password") {
      setPassword(event.target.value);
    }

    if (event.target.name === "email") {
      setEmail(event.target.value);
    }

    if (event.target.name === "confirm-password") {
      setConfirmPassword(event.target.value);
    }
  };

  const handleRegister = () => {
    axios
      .post("https://find-dining-panda.herokuapp.com/api/auth/users/", {
        username: username,
        password: password,
      })
      .then((response) => {
        axios
          .post(
            "https://find-dining-panda.herokuapp.com/api/auth/token/login/",
            {
              username: username,
              password: password,
            }
          )
          .then((response) => {
            setToken(response.data.auth_token);
            setUser(username);
            // location.pathname = "/";
          });
      });
  };

  return (
    <div>
         <div></div>
      <div className="form">
        <div>
          <h1>Register</h1>
        </div>
        <label>Username</label>
        <input required
          className="input"
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={(event) => handleChange(event)}
        />
        <label>Email</label>
        <input
          className="input"
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(event) => handleChange(event)}
        />
        <label>Password</label>
        <input required
          className="input"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(event) => handleChange(event)}
        />
        <label>Confirm Password</label>
        <input required
          className="input"
          type="password"
          placeholder="confirm password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(event) => handleChange(event)}
        />
        <div>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
