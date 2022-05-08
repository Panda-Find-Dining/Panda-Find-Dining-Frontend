// @ts-nocheck (TODO KE: remove after typescript refactor)

import { useEffect, useState } from "react";
import axios from "axios";
interface token {
  token: string;
  mealPk: number;
}

const MatchedMeal = ({ token, mealPk }: token) => {
  const [match, setMatch] = useState({});
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
        console.log(response.data);
        setMatch(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token, mealPk]);
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);
  return (
    <div>
      <h2>You've matched on a restaurant!</h2>
      <div className="name">
        <h2>{match.name}</h2>
      </div>
      <div className="photo_reference">
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${match.photo_reference}&key=AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M`}
          alt="pic"
        />
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${match.formatted_address}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:M%7C${match.lat},${match.lon}&key=AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M`}
          alt="pic"
        />
      </div>

      <div className="hours">
        <h2>{match.hours}</h2>
      </div>
      <div className="Details">
        <h2>Details:{match.formatted_address}</h2>
      </div>
      {/* <button>Get Directions</button>
      <button>More Details</button> */}
    </div>
  );
};

export default MatchedMeal;
