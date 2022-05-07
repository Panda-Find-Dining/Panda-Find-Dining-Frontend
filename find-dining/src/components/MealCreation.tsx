// @ts-nocheck (TODO KE: remove after typescript refactor)

import Select from "react-select";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import hungryPanda from "../images/hungryPanda.png";
import speechBubble2 from "../images/speechBubble2.png";
import Form from "react-bootstrap/Form";

const StyledButton = styled(Button)`
  background-color: #da0063;
  box-shadow: none;

  border: none;
  min-width: 10px;
  &:hover {
    background-color: #da0063;
    outline: none;
  }
  &:focus {
    box-shadow: none;
    border: none;
  }
`;
const Span = styled.span`
  color: #da0063;
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
  mealPk: number;
  setMealPk: React.Dispatch<React.SetStateAction<number | undefined>>;
  userPk: number;
}

const MealCreation = ({
  token,
  friendsPks,
  setFriendsPks,
  friendsNames,
  setFriendsNames,
  mealPk,
  setMealPk,
  userPk,
}: token) => {
  const [results, setResults] = useState<any>([]);
  const [selectFriendsOptions, setSelectFriendsOptions] = useState<any>([]);
  const [mealFriends, setMealFriends] = useState<any>([]);
  const [friendPk, setFriendPk] = useState<any>("");
  const [friendName, setFriendName] = useState("");
  const [addFriendError, setAddFriendError] = useState("");
  const [addFriendSuccess, setAddFriendSuccess] = useState("");
  const [searchError, setSearchError] = useState("");
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showLocationRadius, setShowLocationRadius] = useState(false);
  const [searched, setSearched] = useState(false);
  const [currentMealFriendsNames, setCurrentMealFriendsNames] = useState<any>(
    []
  );
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
  //   const goMatchPend = () => {
  //     navigate("/meals");
  //   };
  const selectRadiusOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 40, label: "40" },
    { value: 60, label: "60" },
    { value: 80, label: "80" },
  ];
  console.log(mealPk);
  console.log(friendsPks);
  console.log(friendsNames);
  console.log(radius);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setResults([]);
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
        setSearched(true);
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
  console.log(searched);
  console.log(results);
  console.log(friendName);
  return (
    <Container>
      <Span>

        <div className="mealFriendSelect">
          <h2>Welcome User</h2>
          <Blurb
            style={{
              color: "black",
            }}
          >
            Put that microwave dinner down & find some friends to eat with here:
          </Blurb>
          <div
            style={{
              width: 200,
            }}
          >
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
            <input
              type="input"
              placeholder="Search Friends"
              onChange={(e) => setFriendName(e.target.value)}
              required
            ></input>
            <StyledButton
              className="searchButton"
              onClick={() => handleSearch()}
            >
              Search
            </StyledButton>

            <div className="searchResults">
              {results.length === 0 && searched === false ? (
                <></>
              ) : results.length === 0 && searched === true ? (
                <div>Sorry they haven't Joined Yet!</div>
              ) : (
                results.map((user: any, index: any) => (
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
                ))
              )}
            </div>
            <div className="error">{addFriendError}</div>
            <div className="success">{addFriendSuccess}</div>
          </div>

          <div className="selectFriend">
            <div>
              <Select
                isMulti
                className="select"
                options={selectFriendsOptions}
                onChange={(selection) => {
                  setMealFriends([selection]);
                }}
              />
            </div>
            <StyledButton
              onClick={() => {
                setFriendsPks(
                  mealFriends.flat(1).map((friend: any) => friend.value)
                );
                setFriendsNames(
                  mealFriends.flat(1).map((friend: any) => friend.label)
                );
                setCurrentMealFriendsNames(
                  mealFriends.flat(1).map((friend: any) => friend.label)
                );
                setShowLocationRadius(true);
              }}
            >
              Add Friends to Meal
            </StyledButton>
            <div className="error">{searchError}</div>
          </div>
        </div>
      </Span>
      {showLocationRadius === true ? (
        <div className="mealStartPage">
          <form onSubmit={handleCreateMeal}>
            <h2 className="mealWith">
              Your Dinner with {currentMealFriendsNames.map((i) => i + ", ")}
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
              <Select
                className="select"
                options={selectRadiusOptions}
                onChange={(selection) => setRadius(selection.value)}
                placeholder={"Select a Radius"}
              />
            </div>
            <div className="mealButtons">
              <div className="error">{error}</div>
              <div className="success">{success}</div>
              <button
                className="chowDown"
                onClick={() => setShowLocationRadius(false)}
              >
                Chow Down!
              </button>
            </div>
          </form>
          <button
            className="noThanks"
            onClick={() => {
              setRadius("");
              setLocation("");
              setFriendsNames([]);
              setFriendsPks([]);
              window.location.reload(false);
              setShowLocationRadius(false);
            }}
          >
            No Thanks
          </button>
        </div>
      ) : (
        <></>
      )}
        <Form>
          <form id="create-meal-form">
            <div className="mealFriendSelect">
              {/* <h2>Welcome User</h2> */}
              <div
                className="container"
                style={{
                  position: "relative",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Blurb
                  style={{
                    color: "black",
                  }}
                >
                  <div
                    className="centered"
                    style={{
                      position: "absolute",
                      top: "57%",
                      left: "38%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    Put that microwave dinner down & find some friends to eat
                    with here...
                  </div>
                </Blurb>
                <div
                  className="text-center"
                  style={{
                    width: 200,
                  }}
                >
                  <img
                    src={speechBubble2}
                    alt="speech bubble"
                    style={{
                      width: 200,
                    }}
                  />
                </div>
                <div className="right">
                  <img
                    align="right"
                    src={hungryPanda}
                    alt="panda pic"
                    style={{
                      width: 150,
                      textAlign: "right",
                    }}
                  />
                </div>
              </div>

              <div className="searchFriends">
                <div className="mb-3">
                  <Form.Label
                    style={{
                      color: "#da0063",
                      marginBottom: 2,
                      marginTop: 30,
                    }}
                  >
                    Search for friend to invite to a meal:
                  </Form.Label>
                  <Form.Control 
                    type="input"
                    placeholder="search by username"
                    onChange={(e) => setFriendName(e.target.value)}
                  />
                  <StyledButton
                    style={{
                      width: "30",
                      marginTop: 10,
                    }}
                    bg="outline-secondary"
                    className="searchButton"
                    onClick={() => handleSearch()}
                  >
                    Search
                  </StyledButton>
                </div>
                <div className="searchResults">
                  {results ? (
                    results.map((user: any, index: any) => (
                      <div className="searchList">
                        <div
                          style={{
                            color: "black",
                          }}
                        >
                          {user.username}
                        </div>
                        <StyledButton
                          style={{
                            backgroundColor: "black",
                          }}
                          onClick={async () => {
                            setFriendPk(user.id);
                            addFriend(user.id);
                          }}
                        >
                          +
                        </StyledButton>
                      </div>
                    ))
                  ) : (
                    <div>Sorry they haven't Joined Yet!</div>
                  )}
                </div>
                <div className="error">{addFriendError}</div>
                <div className="success">{addFriendSuccess}</div>
              </div>
              <Form.Label
                style={{
                  color: "#da0063",
                  marginBottom: 2,
                  marginTop: 10,
                }}
              >
                Select friend(s) from dropdown:
              </Form.Label>
              <div className="selectFriend">
                <div>
                  <Select 
                    isMulti
                    className="select"
                    options={selectFriendsOptions}
                    onChange={(selection) => {
                      setMealFriends([selection]);
                    }}
                  />
                </div>
                <StyledButton
                  onClick={() => {
                    setFriendsPks(
                      mealFriends.flat(1).map((friend: any) => friend.value)
                    );
                    setFriendsNames(
                      mealFriends.flat(1).map((friend: any) => friend.label)
                    );
                    setCurrentMealFriendsNames(
                      mealFriends.flat(1).map((friend: any) => friend.label)
                    );
                  }}
                >
                  Add to Meal
                </StyledButton>
                <div className="error">{searchError}</div>
              </div>
            </div>

            <div
              style={{
                marginTop: 40,
              }}
              className="mealStartPage"
            >
              <form onSubmit={handleCreateMeal}>
                <hr
                  style={{
                    borderTop: "4px solid #bbb",
                    borderRadius: "5px",
                    color: "#da0063",
                  }}
                ></hr>
                <h2
                  style={{
                    paddingTop: 10,
                  }}
                  className="mealWith"
                >
                  <i>
                    Your meal with{" "}
                    {currentMealFriendsNames.map((i) => i + ", ")}
                  </i>
                </h2>

                <div className="search">
                  <Form.Label
                    style={{
                      color: "#da0063",
                      marginBottom: 2,
                      marginTop: 10,
                    }}
                  >
                    Search Location
                  </Form.Label>
                  <input style={{
                    borderColor: "none"
                  }}  
                    type="input"
                    onChange={(e) => setLocation(e.target.value)}
                    className="searchInput"
                    placeholder="enter your city"
                  ></input>
                </div>
                <div className="radius">
                  <Form.Label
                    style={{
                      color: "#da0063",
                      marginBottom: 2,
                      marginTop: 10,
                    }}
                  >
                    Set Radius{" "}
                  </Form.Label>
                  <Select
                    className="select"
                    options={selectRadiusOptions}
                    onChange={(selection) => setRadius(selection.value)}
                    placeholder={"select radius"}
                  />
                </div>
                <div className="mealButtons text-center">
                  <div className="error">{error}</div>
                  <div className="success">{success}</div>
                  <StyledButton
                    style={{
                      marginTop: 50,
                      width: 150,
                    }}
                    className="chowDown"
                  >
                    Chow Down!
                  </StyledButton>
                </div>
              </form>
              <div className="text-center">
                <StyledButton
                  style={{
                    marginTop: 5,
                    width: 150,
                    backgroundColor: "black",
                  }}
                  className="changedMind"
                  onClick={() => {
                    setRadius("");
                    setLocation("");
                    setFriendsNames([]);
                    setFriendsPks([]);
                    window.location.reload(false);
                  }}
                >
                  Reset{" "}
                </StyledButton>
              </div>
            </div>
          </form>
        </Form>
      </Span>
    </Container>
  );
};

export default MealCreation;
