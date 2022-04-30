// @ts-nocheck (TODO KE: remove after typescript refactor)
import React, { useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"

const Register = ({ setToken, setUser }) => {
  // const location = useLocation()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
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
    if (password !== confirmPassword) {
      setError("Passwords Must Match!!");
    } else {
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
            setSuccess("Registration Complete!")
          });
      }).catch((e) => setError("Login Unsuccessful please Try Again!"))
  }
  }
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
        <div className="error">{error}</div>
        <div className="success">{success}</div>
        <PasswordChecklist
				rules={["match"]}
				minLength={5}
				value={password}
				valueAgain={confirmPassword}
				onChange={(isValid) => {}}
			/>
      </div>
    </div>
  );
};

export default Register
