import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import FDLogo from "../images/FDLogo.png";

interface loginProps {
  setToken: React.Dispatch<string>;
  setUser: React.Dispatch<string>;
  setUserPk: React.Dispatch<string>;
}
const StyledButton = styled(Button)`
  background-color: #eb1b67;
  box-shadow: none;
  border: none;
  min-width: 10px;
  &:hover {
    background-color: #eb1b67;
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
const Login = ({ setToken, setUser, setUserPk }: loginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState("");
  const [resetConfirm, setResetConfirm] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const resetPassword = () => {
    setError("");
    const options = {
      method: "POST",
      url: "https://find-dining-panda.herokuapp.com/api/auth/users/reset_password/",
      data: {
        email: email,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setResetConfirm("Password Reset Email Sent!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  console.log(error);
  console.log(reset);
  console.log(email);
  return (
    <Container>
     <div className="text-center">
      <img 
        style={{
          marginBottom: 10,
          width: 240,
        }}
        src={FDLogo}
        alt="logo"
      />
      </div>
      <Span>
        <Form>
          <Form.Group>
            <Form.Label>{error}</Form.Label>
            <Form.Label
              style={{
                color: "#eb1b67",
                marginBottom: 2,
              }}
            >
              Username
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "black",
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
                color: "#eb1b67",
                marginTop: 20,
                marginBottom: 2,
              }}
            >
              Password
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "black",
              }}
              required
              className="input"
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={(event) => handleChange(event)}
            />
            <Form.Text onClick={() => setReset(!reset)}>
              Forgot Password?
            </Form.Text>
            {reset === true ? (
              <>
                <Form.Control
                  style={{
                    borderColor: "black",
                    marginBottom: "5px",
                  }}
                  required
                  className="input"
                  type="text"
                  placeholder="email"
                  value={email}
                  name="email"
                  onChange={(event) => handleChange(event)}
                />
                <StyledButton
                  style={{
                    marginTop: 50,
                    width: 150,
                  }}
                  onClick={() => resetPassword()}
                >
                  Reset Password
                </StyledButton>
                <Form.Label
                  style={{
                    color: "#eb1b67",
                    marginTop: 20,
                    marginBottom: 2,
                  }}
                >
                  Please Enter your e-mail to reset your password.
                </Form.Label>
                <p>{resetConfirm}</p>
                <div></div>
              </>
            ) : (
              <></>
            )}
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
                    backgroundColor: "black",
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
