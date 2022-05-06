// @ts-nocheck (TODO KE: remove after typescript refactor)
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
// import { Form } from "react-bootstrap";

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
  setFriendsPks: React.Dispatch<any>;
  setFriendsNames: React.Dispatch<any>;
}
const MealStart = ({
  token,
  setFriendsPks,
  friendsPks,
  setFriendsNames,
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
          setFriendsNames([]);
          setFriendsPks([]);
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
        navigate("/select");
      }, 100);
    };
    multiplePromises();
  }
  const goMatchPend = () => {
    navigate("/meals");
  };
  console.log(mealPk);
  console.log(friendsPks);
  console.log(friendsNames);
  return (
    <div className="mealStartPage">
      <form onSubmit={handleCreateMeal}>
        <h2 className="mealWith">
          Your Dinner with {friendsNames.map((i) => i + ", ")}
        </h2>
        <div className="search">
          <h3>Search Location</h3>
          <input
            type="input"
            onChange={(e) => setLocation(e.target.value)}
            className="searchInput"
            placeholder="Enter your City"
          ></input>
        </div>
        <div className="radius">
          <h3>Set Radius </h3>
          <input
            type="input"
            onChange={(e) => setRadius(e.target.value)}
            className="radiusInput"
            placeholder="Radius in miles"
          ></input>
        </div>
        <div className="mealButtons">
          <div className="error">{error}</div>
          <div className="success">{success}</div>
          <button className="chowDown">Chow Down!</button>
        </div>
      </form>
      <button className="noThanks" onClick={() => goMatchPend()}>
        No Thanks
      </button>
    </div>
  );
};

export default MealStart;
