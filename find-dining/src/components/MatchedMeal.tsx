// @ts-nocheck (TODO KE: remove after typescript refactor)

import React, { useEffect, useState } from "react";
import pokeMap from "../images/pokeworksMap.png";
import pokeLogo from "../images/pokeworksLogo.png";
import axios from "axios";

const MatchedMeal = () => {
  const [match, setMatch] = useState({});
  useEffect(() => {
    axios
      .get("https://find-dining-panda.herokuapp.com/api/restaurants/21/")
      .then((response) => setMatch(response.data));
  }, []);
console.log("commit")
  return (
    <div>
          <h2>You've matched on a restaurant!</h2>
          <div className="name">
              <h2>{match.name}</h2>
          </div>
          <div className="photo_reference">
              <img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${match.photo_reference}&key=AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M} alt="pic"/>
      </div>
      <div className="card">
                  <h3>Map</h3>
                  <img src={pokeMap}
                      alt="restaurant map" />
                      </div>
          <div className="hours">
              <h2>{match.hours}</h2>
          </div>
          <div className="Details">
              <h2>Details:{match.formatted_address}</h2>
          </div>
          <button>Get Directions</button>
          <button>More Details</button>
    </div>
    
  );
};

export default MatchedMeal;
