// @ts-nocheck (TODO KE: remove after typescript refactor)
import React, { useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import FDLogo from "../images/FDLogo.png";
import { Form } from "react-bootstrap";

const StyledButton = styled(Button)`
  background-color: #196052;
  box-shadow: none;
  border: none;
  min-width: 10px;
  &:hover {
    background-color: #196052;
    outline: none;
  }
  &:focus {
    box-shadow: none;
    border: none;
  }
`;
const Span = styled.span`
  color: #196052;
  font: Lato;
  font-weight: bold;
`;

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const Register = ({ setToken, setUser }) => {
  // const location = useLocation()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
              setSuccess("Registration Complete!");
              navigate("/");
            });
        })
        .catch((e) => setError("Login Unsuccessful please Try Again!"));
    }
  };
  return (
    <Container>
      <img src={FDLogo} alt="logo" />
      <Span>
        <Form>
          <Form.Group>
            <div>
              <h1 style={{
                marginBottom: 10,
              }}>Register</h1>
            </div>
            <Form.Label
              style={{
                color: "black",
                marginBottom: 2,
              }}
            >
              Username
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "#da0063",
                marginBottom: "5px",
              }}
              required
              className="input"
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(event) => handleChange(event)}
            />
            <Form.Label
              style={{
                color: "black",
                marginBottom: 2,
                marginTop: 10,
                
              }}
            >
              Email
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "#da0063",
                marginBottom: "5px",
              }}
              className="input"
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(event) => handleChange(event)}
            />
            <Form.Label
              style={{
                color: "black",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Password
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "#da0063",
                marginBottom: "5px",
              }}
              required
              className="input"
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(event) => handleChange(event)}
            />
            <Form.Label
              style={{
                color: "black",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Confirm Password
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "#da0063",
                marginBottom: "5px",
              }}
              required
              className="input"
              type="password"
              placeholder="confirm password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>
          <PasswordChecklist
            rules={["match"]}
            minLength={5}
            value={password}
            valueAgain={confirmPassword}
            onChange={(isValid) => {}}
          />
          <div className="text-center">
            <StyledButton
              style={{
                marginTop: 50,
                width: 150,
                backgroundColor: "black"
              }}
              onClick={handleRegister}
            >
              Register
            </StyledButton>
          </div>
          <div className="error">{error}</div>
          <div className="success">{success}</div>
        </Form>
      </Span>
    </Container>
  );
};

export default Register;
