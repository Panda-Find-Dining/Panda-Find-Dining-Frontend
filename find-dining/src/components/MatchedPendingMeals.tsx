import { useEffect, useState } from "react";
import axios from "axios";
import "./MatchedPending.css";
import { useNavigate } from "react-router-dom";

interface token {
  token: string;
  mealPk: number;
  setMealPk: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const MatchedPendingMeals = ({ token, mealPk, setMealPk }: token) => {
  const [db, setDB] = useState<any>([]);
  const [pendingDb, setPendingDB] = useState<any>([]);
  const navigate = useNavigate();
  const seeMatch = () => {
    navigate("/matched-restaurant");
  };
  useEffect(() => {
    let theDB: any = [];
    const options = {
      method: "GET",
      url: "https://find-dining-panda.herokuapp.com/api/match/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        response.data.map((restaurant: any, index: any) => {
          return theDB.push({
            id: restaurant.id,
            location: restaurant.location,
            invitees: restaurant.invitee,
            num_of_diners: restaurant.num_of_diners,
            archive: restaurant.archive,
          });
        }, setDB(theDB));
        console.log(theDB);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token]);
  useEffect(() => {
    let thePendingDB: any = [];
    const options = {
      method: "GET",
      url: "https://find-dining-panda.herokuapp.com/api/pending/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        response.data.map((restaurant: any, index: any) => {
          return thePendingDB.push({
            id: restaurant.id,
            location: restaurant.location,
            invitees: restaurant.invitee,
            num_of_diners: restaurant.num_of_diners,
            archive: restaurant.archive,
          });
        }, setPendingDB(thePendingDB));
        console.log(thePendingDB);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token]);
  const mealStart = () => {
    navigate("/meal-start");
  };

  const decline = (restaurantPk: number) => {
    const options = {
      method: "DELETE",
      url: `https://find-dining-panda.herokuapp.com/api/decline/${restaurantPk}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const selectRestaurants = (restaurant: any) => {
    setMealPk(restaurant);
    navigate("/restaurant-selection");
  };
  return (
    <div className="matchedPendingDiv">
      <h1 className="mealTitle">Your Current Meals</h1>
      <h2 className="pendingMealsH2">Pending Meals</h2>
      <div className="pendingMealsBig">
        {pendingDb.map((restaurant: any, index: any) =>
          restaurant.archive === false ? (
            <div key={restaurant.id} className="pendingMeals">
              <p className="restaurantLocation">{restaurant.location}</p>
              <p>{restaurant.archive}</p>
              <button
                className="pendingButton"
                onClick={() => selectRestaurants(restaurant.id)}
              >
                Select Restaurants
              </button>
              <button
                className="xButton"
                onClick={() => decline(restaurant.id)}
              >
                X
              </button>
            </div>
          ) : (
            <></>
          )
        )}
      </div>
      <h2 className="pendingMealsH2">Matched Meals</h2>
      <div className="pendingMealsMed">
        <div className="matchedMeals">
          {db.map((restaurant: any, index: any) =>
            restaurant.archive === false ? (
              <div key={restaurant.id} className="pendingMeals">
                <p className="restaurantLocation">{restaurant.location}</p>
                <button className="pendingButton" onClick={() => seeMatch()}>
                  See Match
                </button>
                <button
                  className="xButton"
                  onClick={() => decline(restaurant.id)}
                >
                  X
                </button>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
      <button className="pendingButton" onClick={() => mealStart()}>
        Create Meal
      </button>
    </div>
  );
};

export default MatchedPendingMeals;
