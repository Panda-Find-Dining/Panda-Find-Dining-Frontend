import { useEffect, useState } from "react";
import axios from "axios";

interface matchProps {
  token: string;
  mealPk: string;
}
interface matched {
  name: string;
  photo_reference: string;
  hours: string;
  formatted_address: string;
  lat: string;
  lon: string;
}

const MatchedMeal = ({ token, mealPk }: matchProps) => {
  const [match, setMatch] = useState<matched>();

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
  // let map: google.maps.Map;

  // function initMap(): void {
  //   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }

  // declare global {
  //   interface Window {
  //     initMap: () => void;
  //   }
  // }
  // window.initMap = initMap;
  return (
    <div>
      <h2>You've matched on a restaurant!</h2>
      <div className="name">
        <h2>{match?.name}</h2>
      </div>
      <div className="photo_reference">
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${match?.photo_reference}&key=AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M`}
          alt="pic"
        />
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${match?.formatted_address}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:M%7C${match?.lat},${match?.lon}&key=AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M`}
          alt="pic"
        />
      </div>

      <div className="hours">
        <h2>{match?.hours}</h2>
      </div>
      <div className="Details">
        <h2>Details:{match?.formatted_address}</h2>
      </div>
    </div>
  );
};

export default MatchedMeal;
