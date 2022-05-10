import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import FDLogo from "../images/FDLogo.png";
import { Form } from "react-bootstrap";
import PasswordCheckList from "./PasswordCheckList";
import SuccessIcon from "./SuccessIcon";
import ErrorIcon from "./ErrorIcon";

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
interface registerProps {
  setToken: React.Dispatch<string>;
  setUser: React.Dispatch<string>;
  setUserPk: React.Dispatch<string>;
}

const Register = ({ setToken, setUser, setUserPk }: registerProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
          re_password: confirmPassword,
          email: email,
        })
        .then((response) => {
          axios
            .post("https://find-dining-panda.herokuapp.com/api/tokenpk/", {
              username: username,
              password: password,
            })
            .then((response) => {
              setToken(response.data.token);
              setUser(username);
              setUserPk(response.data.user_id);
              setSuccess("Registration Complete!");
              navigate("/");
            });
        })
        .catch((e) => setError("Login Unsuccessful please Try Again!"));
    }
  };
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
              name="username"
              value={username}
              onChange={(event) => handleChange(event)}
            />
            <Form.Label
              style={{
                color: "#eb1b67",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Email
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "black",
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
                color: "#eb1b67",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Password
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "black",
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
                color: "#eb1b67",
                marginBottom: 1,
                marginTop: 10,
              }}
            >
              Confirm Password
            </Form.Label>
            <Form.Control
              style={{
                borderColor: "black",
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
          <PasswordCheckList
            password={password}
            passwordConfirm={confirmPassword}
            icons={{
              success: SuccessIcon,
              error: ErrorIcon,
            }}
            options={{
              match: {
                nomatch: "Oof! Passwords don't match!",
                gotmatch: "Horray! Passwords match!",
              },
            }}
          />

          <div className="text-center">
            <StyledButton
              style={{
                marginTop: 50,
                width: 150,
                backgroundColor: "black",
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
