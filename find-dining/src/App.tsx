// @ts-nocheck (TODO KE: remove after typescript refactor)
import useLocalStorageState from "use-local-storage-state";
import Register from "./components/Register";
import Login from "./components/Login";
import MealStart from "./components/MealStart";
import MenuHeader from "./components/MenuHeader";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import MealFriendSelection from "./components/MealFriendSelection";
import MatchedMeal from "./components/MatchedMeal";
import OnBoard from "./components/OnBoard";
import RestaurantSelectionProcess from "./components/RestaurantSelectionProcess";
import MatchedPendingMeals from "./components/MatchedPendingMeals";

import { useState } from "react";

const App = () => {
  const [token, setToken] = useLocalStorageState("token", "");
  const [user, setUser] = useLocalStorageState("user", "");
  const [userPk, setUserPk] = useLocalStorageState("userPk", "");
  const [friendsPks, setFriendsPks] = useState<any>([]);
  const [friendsNames, setFriendsNames] = useState<any>([]);
  const [mealPk, setMealPk] = useLocalStorageState("mealPk", "");
  const isLoggedIn = user && token;
  console.log(isLoggedIn);
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);
  console.log(userPk);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="on-board"
            element={
              <>
                <OnBoard />
              </>
            }
          />
          <Route path="/" element={<Navigate replace to="on-board" />} />
          <Route
            path="login"
            element={
              <header>
                {isLoggedIn ? (
                  <Navigate to="/meal-friend-selection" />
                ) : (
                  <div className="mainPage">
                    <Login
                      setUser={setUser}
                      setToken={setToken}
                      setUserPk={setUserPk}
                    />
                    <h2>Don't have an account? </h2>
                    <Link to="/register">Sign up Here</Link>
                    <MenuHeader
                      isLoggedIn={isLoggedIn}
                      token={token}
                      setToken={setToken}
                      setUser={setUser}
                      setUserPk={setUserPk}
                    />
                  </div>
                )}
              </header>
            }
          />
          <Route
            path="register"
            element={
              <div className="mainPage">
                <Register setToken={setToken} setUser={setUser} />
                <MenuHeader
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />
              </div>
            }
          />
          <Route
            path="meal-start"
            element={
              <>
                <MealStart
                  mealPk={mealPk}
                  setMealPk={setMealPk}
                  userPk={userPk}
                  token={token}
                  friendsPks={friendsPks}
                  friendsNames={friendsNames}
                />
                <MenuHeader
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />
              </>
            }
          />
          <Route
            path="meal-friend-selection"
            element={
              <>
                <MealFriendSelection
                  friendsNames={friendsNames}
                  setFriendsNames={setFriendsNames}
                  friendsPks={friendsPks}
                  setFriendsPks={setFriendsPks}
                  token={token}
                />
                <MenuHeader
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />
              </>
            }
          />
          <Route
            path="matched-restaurant"
            element={
              <>
                <MatchedMeal mealPk={mealPk} token={token} />
                <MenuHeader
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />{" "}
              </>
            }
          />

          <Route
            path="restaurant-selection"
            element={
              <>
                <RestaurantSelectionProcess mealPk={mealPk} token={token} />
                <MenuHeader
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />
              </>
            }
          />
          <Route
            path="matched-pending"
            element={
              <>
                <MatchedPendingMeals
                  mealPk={mealPk}
                  setMealPk={setMealPk}
                  token={token}
                  userPk={userPk}
                />
                <MenuHeader
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
