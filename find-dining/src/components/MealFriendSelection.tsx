import Select from "react-select";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import talkingPanda from "../images/talkingPanda.gif";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

interface token {
  token: string;
  friendsPks: [],
  setFriendsPks: React.Dispatch<any>,
  friendsNames: [],
  setFriendsNames: React.Dispatch<any>
}

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
const PandaTalk = styled.div`
  text-align: left;
  padding-top: 10px;
  padding: 25px;
  margin: 10px;
`;
const Blurb = styled.div`
  text-align: center;
  margin: 10px;
  padding: 25px;
`;

const MealFriendSelection = ({ token }: token) => {
  const [results, setResults] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]);
  const [friendPk, setFriendPk] = useState<any>("");
  const [friendName, setFriendName] = useState("");
  const [addFriendError, setAddFriendError] = useState("");
  const [addFriendSuccess, setAddFriendSuccess] = useState("");
  const [searchError, setSearchError] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setResults("");
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://find-dining-panda.herokuapp.com/api/search?=Desi",
      params: { q: friendName },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setResults(response.data[0]);
        setFriendPk(response.data[0].id);
        setSearchError("");
      })
      .catch((e) => {
        setSearchError(e.message);
      });
  };

  const addFriend = (user:any) => {
    const options = {
      method: "POST",
      url: `https://find-dining-panda.herokuapp.com/api/follow/${friendPk}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      setFriendsPks(theFriendsPks)),
      setFriendsNames(theFriendsNames))
      console.log(theFriendsNames)
      console.log(theFriendsPks)
      let zipped = theFriendsNames.map((x:any, i:any) => [{value: theFriendsPks[i], label: x}])
      let newZipped = zipped.flat(1)
      console.log(newZipped)
      setSelectFriendsOptions(newZipped)
  
    }).catch(function (error) {
      console.error(error);
    });
    
  }
  console.log('please work')

    };


    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAddFriendSuccess("Friend Added");
        setAddFriendError("");
      })
      .catch((e) => {
        setAddFriendError(e.message);
      });
  };
  const selectFriendOptions = [
    { value: "KE", label: "KE" },
    { value: "Ryan", label: "Ryan" },
    { value: "Tyler", label: "Tyler" },
    { value: "Paul", label: "Paul" },
  ];
  console.log(friends);
  return (
    <Container>
      <h2>Welcome User</h2>
      <PandaTalk>
        <img
          src={talkingPanda}
          alt="panda gif"
          style={{
            width: 200,
          }}
        />
      </PandaTalk>
      <Span>
        <Form>
          <Blurb>
            Put that microwave dinner down and find your friends to eat with
            here:
          </Blurb>
          <InputGroup>
            <div className="searchFriends">
              <Form.Label onSubmit={handleSearch}>
                <Form.Control
                  type="input"
                  placeholder="Search Friends"
                  onChange={(e) => setFriendName(e.target.value)}
                ></Form.Control>
                <StyledButton className="searchButton">Search</StyledButton>
              </Form.Label>
              <div className="searchResults" onClick={addFriend}>
                {results.username}
                <StyledButton>+</StyledButton>
              </div>
              <div className="error">{addFriendError}</div>
              <div className="success">{addFriendSuccess}</div>
            </div>
          </InputGroup>

          <div className="selectFriend">
            <Select
              isMulti
              className="select"
              options={selectFriendOptions}
              onChange={(selection) => setFriends([selection])}
            />
            <StyledButton onClick={() => addFriend()}>
              Add Friends to Meal
            </StyledButton>
            <div className="error">{searchError}</div>
          </div>
          <div className="activeMeals">
            <Blurb>Don't eat alone tonight! Invite a friend to dinner</Blurb>
            <p>Tyler</p>
            <StyledButton className="matchButton">See Match</StyledButton>
            <StyledButton className="matchButton">X</StyledButton>
          </div>
        </Form>
      </Span>
    </Container>
  );
};

export default MealFriendSelection;
