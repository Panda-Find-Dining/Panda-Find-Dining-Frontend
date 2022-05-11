import { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import MyMap from "./MyMap";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px;
  marginleft: 30px;
`;

const Span = styled.span`
  color: #eb1b67;
  font: Lato;
  font-weight: bold;
`;
interface matchProps {
  token: string;
  mealPk: string;
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
}
interface matched {
  name: string;
  photo_reference: string;
  hours: string;
  formatted_address: string;
  lat: string | undefined;
  lon: string | undefined;
}

const MatchedMeal = ({ token, mealPk, setIsHidden, isHidden }: matchProps) => {
  const [match, setMatch] = useState<matched>();
  const [numLat, setNumLat] = useState(0);
  const [numLon, setNumLon] = useState(0);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://find-dining-panda.herokuapp.com/api/meals/${mealPk}/match/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMatch(response.data[0]);
        setNumLat(parseInt(response.data[0].lat));
        setNumLon(parseInt(response.data[0].lon));
        setIsHidden(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token, mealPk, setIsHidden]);
  return (
    <Container>
      <Span>
        <div className="name text-center">
          <h3>{match?.name}</h3>
        </div>
        <div
          style={{
            marginBottom: "20px",
          }}
          className="photo_reference"
        >
          <div
            style={{
              marginBottom: "20px",
              marginRight: "100px",
            }}
          >
            <img
              height="300"
              width="158%"
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${match?.photo_reference}&key=${process.env.REACT_APP_API_KEY}`}
              alt="pic"
            />
          </div>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <MyMap lat={numLat} lon={numLon}></MyMap>
          </div>
        </div>

        <div className="hours">
          <h2>{match?.hours}</h2>
        </div>
        <div className="Details">
          <p>
            Address:{" "}
            <span
              style={{
                color: "black",
                fontWeight: "normal",
              }}
            >
              {match?.formatted_address}
            </span>
          </p>
        </div>
      </Span>
    </Container>
  );
};

export default MatchedMeal;
