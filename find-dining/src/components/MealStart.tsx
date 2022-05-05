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
console.log(StyledButton, Span, Container);

interface token {
  token: string;
  friendsPks: [];
  friendsNames: [];
  mealPk: number;
  setMealPk: React.Dispatch<React.SetStateAction<number | undefined>>;
  userPk: number;
}
const MealStart = ({
  token,
  friendsPks,
  friendsNames,
  mealPk,
  setMealPk,
  userPk,
}: token) => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleCreateMeal(e: React.FormEvent<HTMLFormElement>) {
    let theMealPk = 0;
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
        creator: userPk,
        location: location,
        radius: radius,
        invitee: friendsPks,
      },
    };
    console.log(error);
    let multiplePromises = async () => {
      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setSuccess("Meal Created!");
          theMealPk = response.data.id;
          setMealPk(theMealPk);
        })
        .catch((e) => {
          setError(e.message);
        });
      const googleOptions = {
        method: "GET",
        url: `https://find-dining-panda.herokuapp.com/api/googleapicall/${theMealPk}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      await axios
        .request(googleOptions)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      setTimeout(() => {
        navigate("/restaurant-selection");
      }, 2000);
    };
    multiplePromises();
  }
  const goMatchPend = () => {
    navigate("/matched-pending");
  };
  console.log(mealPk);

  return (
    <Container>
    <Span>
      <Form>
    <div className="mealStartPage">
      <Form.Group onSubmit={handleCreateMeal}>
        <Form.Label className="mealWith" style={{
                    color: "black",
                  }}>
          Your Dinner with {friendsNames.map((i) => i + ", ")}
        </Form.Label>
        <Form.Label className="search">
          <h3>Search Location</h3>
          <Form.Control
            type="input"
            onChange={(e) => setLocation(e.target.value)}
            className="searchInput"
            placeholder="Enter your City"
          ></Form.Control>
        </Form.Label>
        <Form.Label className="radius">
          <h3>Set Radius </h3>
          <input
            type="input"
            onChange={(e) => setRadius(e.target.value)}
            className="radiusInput"
            placeholder="Radius in miles"
          ></input>
        </Form.Label>
        <div className="mealButtons">
          <div className="error">{error}</div>
          <div className="success">{success}</div>
          <StyledButton className="chowDown">Chow Down!</StyledButton>
        </div>
      </Form.Group>
      <StyledButton className="noThanks" onClick={() => goMatchPend()}>
        No Thanks
      </StyledButton>
    </div>
    </Form>
    </Span>
    </Container>
  );
};

export default MealStart;
