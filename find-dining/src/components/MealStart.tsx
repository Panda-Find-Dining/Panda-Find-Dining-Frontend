// @ts-nocheck (TODO KE: remove after typescript refactor)
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
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

interface token {
  token: string;
}
const MealStart = ({ token }: token) => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleCreateMeal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const options = {
      method: "POST",
      url: "https://find-dining-panda.herokuapp.com/api/meals/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      data: {
        creator: 1,
        location: location,
        radius: radius,
        invitee: [1, 2, 3],
      },
    };
    console.log(error);
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSuccess("Meal Created!");
      })
      .catch((e) => {
        setError(e.message);
      });
    setTimeout(() => {
      navigate("/restaurant-selection");
    }, 2000);
  }
  const goMatchPend = () => {
    navigate("/matched-pending");
  };
  return (
    <Container>
      <Span>
        <Form style={{
                    marginTop: 50 ,
                  }}>
          <div className="mealStartPage">
            <form onSubmit={handleCreateMeal}>
              <h2 className="mealWith">Your Dinner with ______</h2>
              <div className="search">
                <Form.Label
                  style={{
                    color: "black",
                    marginTop: 50 ,
                  }}
                >
                  Search Location
                </Form.Label>
                <Form.Control
                  style={{
                    color: "black",
                    borderColor: "#da0063",
                  }}
                  type="input"
                  onChange={(e) => setLocation(e.target.value)}
                  className="searchInput"
                  placeholder="Enter your City"
                ></Form.Control>
              </div>
              <Form.Label style={{
                    color: "black",
                    marginTop: 30 ,
                  }}>
                Set Radius
                <Form.Control style={{
                    color: "black",
                    borderColor: "#da0063",
                    width: 289,
                  }}
                  type="input"
                  onChange={(e) => setRadius(e.target.value)}
                  className="radiusInput"
                  placeholder="Radius in miles"
                ></Form.Control>
                </Form.Label>
            </form>
              </div>
              <div className="text-center" style={{
                    color: "black",
                    marginTop: 30 ,
                  }}>
                <div className="error">{error}</div>
                <div className="success">{success}</div>
                <StyledButton style={{
                  marginTop: 5,
                  width: 150,
                  backgroundColor: "#da0063",
                }}>Chow Down!</StyledButton>
            <StyledButton style={{
                  marginTop: 5,
                  width: 150,
                }}onClick={() => goMatchPend()}>No Thanks</StyledButton>
          </div>
        </Form>
      </Span>
    </Container>
  );
};

export default MealStart;
