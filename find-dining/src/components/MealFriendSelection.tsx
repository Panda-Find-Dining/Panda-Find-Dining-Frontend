// @ts-nocheck (TODO KE: remove after typescript refactor)

import "./MealFriendSelection.css";
import Select from "react-select";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import hungryPanda from "../images/hungryPanda.png";
import speechBubble from "../images/speechBubble.png";


const StyledButton = styled(Button)`
  background-color: #DA0063;
  box-shadow: none;

  border: none;
  min-width: 10px;
  &:hover {
    background-color: #DA0063;
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

const Blurb = styled.div`
  text-align: center;
  margin: 10px;
  padding: 25px;
`;

interface token {
  token: string;
  friendsPks: [];
  setFriendsPks: React.Dispatch<any>;
  friendsNames: [];
  setFriendsNames: React.Dispatch<any>;
}

const MealFriendSelection = ({
  token,
  friendsPks,
  setFriendsPks,
  friendsNames,
  setFriendsNames,
}: token) => {
  const [results, setResults] = useState<any>([]);
  const [selectFriendsOptions, setSelectFriendsOptions] = useState<any>([]);
  const [mealFriends, setMealFriends] = useState<any>([]);
  const [friendPk, setFriendPk] = useState<any>("");
  const [friendName, setFriendName] = useState("");
  const [addFriendError, setAddFriendError] = useState("");
  const [addFriendSuccess, setAddFriendSuccess] = useState("");
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setResults([]);
    e.preventDefault();
    const options = {
      method: "GET",
      url: `https://find-dining-panda.herokuapp.com/api/search?q=${friendName}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setResults(response.data);
        setSearchError("");
        console.log(results);
      })
      .catch((e) => {
        setSearchError(e.message);
      });
  };

  const addFriend = (user: any) => {
    const options = {
      method: "POST",
      url: `https://find-dining-panda.herokuapp.com/api/follow/${user}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAddFriendSuccess("Friend Added");
        setFriendNamesList();
        setAddFriendError("");
      })
      .catch((e) => {
        setAddFriendError(e.message);
      });
  };
  useEffect(() => {
    let theFriendsNames: any = [];
    let theFriendsPks: any = [];
    const options = {
      method: "GET",
      url: "https://find-dining-panda.herokuapp.com/api/users/friends/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        response.data[0].friends.map(
          (friend: any, index: any) => {
            return theFriendsNames.push(friend);
          },
          response.data[0].friends_pk.map((friend: any, index: any) => {
            return theFriendsPks.push(friend);
          }, setFriendsPks(theFriendsPks)),
          setFriendsNames(theFriendsNames)
        );
        console.log(theFriendsNames);
        console.log(theFriendsPks);
        let zipped = theFriendsNames.map((x: any, i: any) => [
          { value: theFriendsPks[i], label: x },
        ]);
        let newZipped = zipped.flat(1);
        console.log(newZipped);
        setSelectFriendsOptions(newZipped);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token, setFriendsPks, setFriendsNames]);

  const setFriendNamesList = () => {
    let theFriendsNames: any = [];
    let theFriendsPks: any = [];
    const options = {
      method: "GET",
      url: "https://find-dining-panda.herokuapp.com/api/users/friends/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        response.data[0].friends.map(
          (friend: any, index: any) => {
            return theFriendsNames.push(friend);
          },
          response.data[0].friends_pk.map((friend: any, index: any) => {
            return theFriendsPks.push(friend);
          }, setFriendsPks(theFriendsPks)),
          setFriendsNames(theFriendsNames)
        );
        console.log(theFriendsNames);
        console.log(theFriendsPks);
        let zipped = theFriendsNames.map((x: any, i: any) => [
          { value: theFriendsPks[i], label: x },
        ]);
        let newZipped = zipped.flat(1);
        console.log(newZipped);
        setSelectFriendsOptions(newZipped);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  console.log(friendPk);
  console.log(mealFriends.flat(1).map((friend: any) => friend.value));
  console.log(friendsPks);

  return (
    <Container>
      <Span>
    <div className="mealFriendSelect">
      <h2>Welcome User</h2>
      <Blurb style={{
        color: "black"
      }}>
        Put that microwave dinner down & find some friends to eat with here:
      </Blurb>
      <div style={{
            width: 200,
            
          }}>
        <img
          src={speechBubble}
          alt="speech bubble"
          style={{
            width: 200,
            
          }}
        />
        <img
          src={hungryPanda}
          alt="panda pic"
          style={{
            width: 150,
          }}
        />
      </div>
      <div className="searchFriends">
        <form onSubmit={handleSearch}>
          <input
            type="input"
            placeholder="Search Friends"
            onChange={(e) => setFriendName(e.target.value)}
          ></input>
          <StyledButton className="searchButton">Search</StyledButton>
        </form>

        <div className="searchResults">
          {results.map((user: any, index: any) => (
            <div className="searchList">
              <div>{user.username}</div>
              <button
                onClick={async () => {
                  setFriendPk(user.id);
                  addFriend(user.id);
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>
        <div className="error">{addFriendError}</div>
        <div className="success">{addFriendSuccess}</div>
      </div>
      <div className="selectFriend">
        <Select
          isMulti
          className="select"
          options={selectFriendsOptions}
          onChange={(selection) => setMealFriends([selection])}
        />
        <StyledButton
          onClick={() => {
            setFriendsPks(
              mealFriends.flat(1).map((friend: any) => friend.value)
            );
            setFriendsNames(
              mealFriends.flat(1).map((friend: any) => friend.label)
            );
            navigate("/meal-start");
          }}
        >
          Add Friends to Meal
        </StyledButton>
        <div className="error">{searchError}</div>
      </div>
    </div>
    </Span>
    </Container>
  );
};

export default MealFriendSelection;
