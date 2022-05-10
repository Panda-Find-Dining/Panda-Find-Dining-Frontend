import Select from "react-select";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import hungryPanda from "../images/hungryPanda.png";
import speechBubble2 from "../images/speechBubble2.png";
// import bearBlurb from "../images/bearBlurb.png";

import Form from "react-bootstrap/Form";
declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: "right";
  }
}

interface mealCreationProps {
  token: string;
  friendsPks: string[] | undefined;
  setFriendsPks: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  friendsNames: string[] | undefined;
  setFriendsNames: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  mealPk: string | undefined;
  setMealPk: React.Dispatch<React.SetStateAction<string>>;
  userPk: string;
  user: string;
}
interface user {
  id: string;
  username: string;
}
interface selectOpt {
  value: string;
  label: string;
}

const StyledButton = styled(Button)`
  background-color: #eb1b67;
  box-shadow: none;
  margin-top: 10px;

  border: none;
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
  color: #eb1b67;
  font: Lato;
  font-weight: bold;
`;

// const Container = styled.div`
//   padding: 20px 20px 10px 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;


const MealCreation = ({
  token,
  friendsPks,
  setFriendsPks,
  friendsNames,
  setFriendsNames,
  mealPk,
  setMealPk,
  userPk,
  user,
}: mealCreationProps) => {
  const [results, setResults] = useState([]);
  const [selectFriendsOptions, setSelectFriendsOptions] = useState<any>([]);
  const [mealFriends, setMealFriends] = useState<any>([]);
  const [friendPk, setFriendPk] = useState("");
  const [friendName, setFriendName] = useState("");
  const [addFriendError, setAddFriendError] = useState("");
  const [addFriendSuccess, setAddFriendSuccess] = useState("");
  const [searchError, setSearchError] = useState("");
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState<React.SetStateAction<string> | void>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showLocationRadius, setShowLocationRadius] = useState(false);
  const [searched, setSearched] = useState(false);
  const [currentMealFriendsNames, setCurrentMealFriendsNames] = useState<any>(
    []
  );
  const navigate = useNavigate();
  function handleCreateMeal() {
    let theMealPk = 0;
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
          setSuccess("Meal Created!");
          theMealPk = response.data.id;
          setMealPk(theMealPk.toString());
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
          navigate("/select");
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    multiplePromises();
  }

  const selectRadiusOptions = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "40", label: "40" },
    { value: "60", label: "60" },
    { value: "80", label: "80" },
  ];
  const handleSearch = () => {
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
        setResults(response.data);
        setSearchError("");
        setSearched(true);
      })
      .catch((e) => {
        setSearchError(e.message);
      });
  };

  const addFriend = (user: string) => {
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
        response.data[0].friends.map(
          (friend: string, index: number) => {
            return theFriendsNames.push(friend);
          },
          response.data[0].friends_pk.map((friend: string, index: number) => {
            return theFriendsPks.push(friend);
          }, setFriendsPks(theFriendsPks)),
          setFriendsNames(theFriendsNames)
        );
        let zipped = theFriendsNames.map((x: string, i: number) => [
          { value: theFriendsPks[i], label: x },
        ]);
        let newZipped = zipped.flat(1);
        setSelectFriendsOptions(newZipped);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token, setFriendsPks, setFriendsNames]);

  const setFriendNamesList = () => {
    let theFriendsNames: string[] = [];
    let theFriendsPks: string[] = [];
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
        response.data[0].friends.map(
          (friend: string, index: number) => {
            return theFriendsNames.push(friend);
          },
          response.data[0].friends_pk.map((friend: string, index: number) => {
            return theFriendsPks.push(friend);
          }, setFriendsPks(theFriendsPks)),
          setFriendsNames(theFriendsNames)
        );
        console.log(theFriendsNames);
        console.log(theFriendsPks);
        let zipped = theFriendsNames.map((x: string, i: number) => [
          { value: theFriendsPks[i], label: x },
        ]);
        let newZipped = zipped.flat(1);
        setSelectFriendsOptions(newZipped);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div style={{
      padding: "25px 28px 10px 28px",
      height: "100vh",
    }}
    >
      <Span>
        <Form>
          <div className="mealFriendSelect">
            <div
              className="container"
              style={{
                position: "relative",
                textAlign: "center",
                color: "white",
              }}
            >
                <div
                  // className="centered"
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "35%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "14px",
                    textAlign: "start",
                    padding: "14px",
                    color: "black"
                  }}
                >
                  Hey <Span>{user}</Span>, put that microwave dinner down & find some friends
                  to eat with here...
                </div>
              <div
                className="text-center"
                style={{
                  width: 100,
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
              
                <img
                  align="right"
                  src={hungryPanda}
                  alt="panda pic"
                  style={{
                    justifyContent: "right",
                    width: 135,
                    textAlign: "right",
                  }}
                />
              
            </div>

            <div className="searchFriends">
              <div className="mb-3">
                <Form.Label
                  style={{
                    color: "#eb1b67",
                    marginBottom: 2,
                    marginTop: 100,
                  }}
                >
                  Search for friend 
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
                {results.length === 0 && searched === false ? (
                  <></>
                ) : results.length === 0 && searched === true ? (
                  <div style={{
                    color: "black",
                  }}>Sorry they haven't Joined Yet!</div>
                ) : (
                  results.map((user: user, index: number) => (
                    <div style={{
                      display: "flex",
                    }}className="searchList">
                      <p style={{
                        marginRight: "3px"
                      }}>{user.username}</p>
                      <p
                        style={{
                          backgroundColor: "black",
                          width: "20px",
                          textAlign: "center",
                        }}
                        onClick={async () => {
                          setFriendPk(user.id);
                          addFriend(user.id);
                        }}
                      >
                        +
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="error">{addFriendError}</div>
              <div style={{
                    color: "black",
                  }}className="success">{addFriendSuccess}</div>
            </div>
            <Form.Label
              style={{
                color: "#eb1b67",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Select friend(s) from dropdown
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
                    mealFriends.flat(1).map((friend: selectOpt) => friend.value)
                  );
                  setFriendsNames(
                    mealFriends.flat(1).map((friend: selectOpt) => friend.label)
                  );
                  setCurrentMealFriendsNames(
                    mealFriends.flat(1).map((friend: selectOpt) => friend.label)
                  );
                  setShowLocationRadius(true);
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
            {showLocationRadius === true ? (
              <div
                style={{
                  marginTop: 40,
                }}
                className="mealStartPage"
              >
                <StyledButton
                  onClick={() => {
                    setFriendsPks(
                      mealFriends
                        .flat(1)
                        .map((friend: selectOpt) => friend.value)
                    );
                    setFriendsNames(
                      mealFriends
                        .flat(1)
                        .map((friend: selectOpt) => friend.label)
                    );
                    setCurrentMealFriendsNames(
                      mealFriends
                        .flat(1)
                        .map((friend: selectOpt) => friend.label)
                    );
                    setShowLocationRadius(true);
                  }}
                >
                  Update Meal Friends
                </StyledButton>
                <hr
                  style={{
                    borderTop: "4px solid #bbb",
                    borderRadius: "5px",
                    color: "#eb1b67",
                  }}
                ></hr>
                <h2
                  style={{
                    paddingTop: 10,
                  }}
                  className="mealWith"
                >
                  <h4>
                    Your meal with{" "}
                    {currentMealFriendsNames.length === 1
                      ? currentMealFriendsNames.map((i: string) => i)
                      : currentMealFriendsNames.map(
                          (item: string, i: number, arr: []) =>
                            i !== arr.length - 1 ? item + ", " : "and " + item
                        )}
                  </h4>
                </h2>
                <div className="search">
                  <Form.Label
                    style={{
                      color: "#eb1b67",
                      marginBottom: 2,
                      marginTop: 10,
                      marginRight: 15,
                    }}
                  >
                    Search Location
                  </Form.Label>
                  <input
                    style={{
                      borderColor: "none",
                    }}
                    type="input"
                    onChange={(e) => setLocation(e.target.value)}
                    className="searchInput"
                    placeholder="enter your city"
                  ></input>
                </div>
                <div style={{
                  display: "flex",
                  marginTop: "15px",
                }}>
                <Form.Label
                  style={{
                    color: "#eb1b67",
                    marginBottom: 2,
                    marginTop: 10,
                    marginRight: 15,
                  }}
                >
                  Set Radius{" "}
                </Form.Label>
                <div style={{
                  width: "175px",
                  marginBottom: "20px"
                }}>
                <Select 
                  className="select"
                  options={selectRadiusOptions}
                  onChange={(selection) => setRadius(selection?.value)}
                  placeholder={"select radius"}
                />
                </div>
                </div>
                <div className="mealButtons text-center">
                  <div className="error">{error}</div>
                  <div className="success">{success}</div>
                  <StyledButton
                    style={{
                      marginTop: 10,
                      width: 150,
                    }}
                    onClick={() => {
                      setShowLocationRadius(false);
                      handleCreateMeal();
                    }}
                    className="chowDown"
                  >
                    Chow Down!
                  </StyledButton>
                </div>
                <div className="mealButtons">
                  <div className="error">{error}</div>
                  <div className="success">{success}</div>
                </div>
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
                      window.location.reload();
                      setShowLocationRadius(false);
                    }}
                  >
                    Reset{" "}
                  </StyledButton>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Form>
      </Span>
    </div>
  );
};

export default MealCreation;
