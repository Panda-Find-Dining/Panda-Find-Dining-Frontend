// @ts-nocheck (TODO KE: remove after typescript refactor)
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import FindDiningLogo from "../images/FindDiningLogo.png";

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

const Login = ({ setToken, setUser, setUserPk }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    setError("");
    axios
      .post("https://find-dining-panda.herokuapp.com/api/tokenpk/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data.user_id);
        setToken(response.data.token);
        setUserPk(response.data.user_id);
        setUser(username);
      })
      .catch((e) => setError("Login unsuccessful! Try Again!"));
  };
  const navigate = useNavigate();

  console.log(error);
  return (
    <Container>
      <img src={FindDiningLogo} alt="logo" />
      <Span>
        <Form>
          <Form.Group>
            <h1
              style={{
                marginBottom: 10,
              }}
            >
              Login
            </h1>
            <Form.Label>{error}</Form.Label>
            <Form.Label
              style={{
                color: "black",
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
              value={username}
              name="username"
              onChange={(event) => handleChange(event)}
            />
            <Form.Label
              style={{
                color: "black",
              }}
            >
              Password
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "#da0063",
              }}
              required
              className="input"
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={(event) => handleChange(event)}
            />
            <Form.Text>Forgot Password?</Form.Text>
            <div className="text-center">
              <div>
                <StyledButton
                  style={{
                    marginTop: 50,
                    width: 150,
                  }}
                  onClick={handleLogin}
                >
                  Login
                </StyledButton>
              </div>
              <div>
                <StyledButton
                  onClick={() => navigate("/register")}
                  style={{
                    marginTop: 5,
                    backgroundColor: "#da0063",
                    width: 150,
                  }}
                >
                  Register
                </StyledButton>
              </div>
            </div>
          </Form.Group>
        </Form>
      </Span>
    </Container>
  );
};

export default Login;
