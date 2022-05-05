// @ts-nocheck (TODO KE: remove after typescript refactor)
import React from "react";
import Button from "react-bootstrap/Button";
import talkingPanda from "../images/talkingPanda.gif";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import PandaSpeechBubble from "../images/PandaSpeechBubble.png"

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
  color: #da0063;
  font: Lato;
  font-weight: bold;
`;
const PandaGreeting = styled.div`
  // position: relative;
  // text-align: center;
  // color: white;
`;
const Blurb = styled.div`
  text-align: center;
  margin: 10px;
  padding: 25px;
`;
const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
`;
const Exit = styled.div`
  text-align: right;
`;
const PandaTalk = styled.div`
  text-align: right;
  padding-top: 10px;
  padding: 25px;
  margin: 10px;
`;

const OnBoard = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Span
        style={{
          color: "#196052",
        }}
      >
        <Exit onClick={() => navigate("/login")}>X</Exit>
      </Span>
      <PandaGreeting>
        <Span
          style={{
            fontSize: 25,
            // position: absolute,
            // top: 50,
            // left: 50,
            // transform: translate(-50, -50),
          }}
        >
          "
        </Span>
        A bond between friends is impossible to break, except when deciding
        where to eat.
        <Span
          style={{
            fontSize: 25,
          }}
        >
          "
        </Span>
        <Span>
          {/* <p 
          style={{
            fontSize: 20,
          }}
          >- Hungry Panda</p> */}
          {/* <img
          src={PandaSpeechBubble}
          alt="panda speech bubble"
          style={{
            width: "100%",
          }} */}
          {/* /> */}
        </Span>
      </PandaGreeting>

      <div id="container">
        <PandaTalk>
          <img
            src={talkingPanda}
            alt="panda gif"
            style={{
              width: 200,
            }}
          />
        </PandaTalk>
      </div>
      <i
        style={{
          color: "#196052",
        }}
      >
        <Blurb>
          Let Find Dining help with the emotional labor of deciding what's for
          dinner. Register & invite a friend to choose a restaurant.
        </Blurb>
      </i>
      <div className="text-center">
      <StyledButton onClick={() => navigate("/login")}>
        I'm Hungry!
      </StyledButton>
      </div>
    </Container>
  );
};

export default OnBoard;
