import { useEffect, useState } from "react";
import axios from "axios";
import MyMap from "./MyMap";
import styled from "styled-components";


const Container = styled.div`
  padding: 50px;
  marginLeft: 30px;
`;

interface matchProps {
  token: string;
  mealPk: string;
}
interface matched {
  name: string;
  photo_reference: string;
  hours: string;
  formatted_address: string;
  lat: string | undefined;
  lon: string | undefined;
}

const MatchedMeal = ({ token, mealPk }: matchProps) => {
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
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token, mealPk]);
  return (
    <Container >
      <div className="name text-center">
        <h3>{match?.name}</h3>
      </div>
      <div className="photo_reference">
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${match?.photo_reference}&key=${process.env.REACT_APP_API_KEY}`}
          alt="pic"
        />
        <MyMap lat={numLat} lon={numLon}></MyMap>
      </div>

      <div className="hours">
        <h2>{match?.hours}</h2>
      </div>
      <div className="Details">
        <h2>Details:{match?.formatted_address}</h2>
      </div>
    </Container>
  );
};

export default MatchedMeal;
