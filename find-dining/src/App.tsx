import useLocalStorageState from "use-local-storage-state";
import Register from "./components/Register";
import Login from "./components/Login";
import MenuHeader from "./components/MenuHeader";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MealCreation from "./components/MealCreation";
import MatchedMeal from "./components/MatchedMeal";
import RestaurantSelectionProcess from "./components/RestaurantSelectionProcess";
import MatchedPendingMeals from "./components/MatchedPendingMeals";
import { useState } from "react";
import "./App.css";
const App = () => {
  const [token, setToken] = useLocalStorageState("token", {
    defaultValue: "",
  });
  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: "",
  });
  const [userPk, setUserPk] = useLocalStorageState("userPk", {
    defaultValue: "",
  });
  const [friendsPks, setFriendsPks] = useState<string[] | undefined>();
  const [friendsNames, setFriendsNames] = useState<string[] | undefined>();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [mealPk, setMealPk] = useLocalStorageState("mealPk", {
    defaultValue: "",
  });
  const isLoggedIn = user && token;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isLoggedIn ? (
                  <>
                    <MealCreation
                      friendsNames={friendsNames}
                      setFriendsNames={setFriendsNames}
                      friendsPks={friendsPks}
                      setFriendsPks={setFriendsPks}
                      token={token}
                      mealPk={mealPk}
                      setMealPk={setMealPk}
                      userPk={userPk}
                      user={user}
                    />
                    <MenuHeader
                      isLoggedIn={isLoggedIn}
                      token={token}
                      setToken={setToken}
                      setUser={setUser}
                      setUserPk={setUserPk}
                      setFriendsPks={setFriendsPks}
                      setFriendsNames={setFriendsNames}
                      isHidden={isHidden}
                      setIsHidden={setIsHidden}
                    />
                  </>
                ) : (
                  <Navigate to="/login" />
                )}
              </>
            }
          />
          <Route
            path="login"
            element={
              <header>
                {isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <div className="mainPage">
                    <Login
                      setUser={setUser}
                      setToken={setToken}
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
                <Register
                  setToken={setToken}
                  setUser={setUser}
                  setUserPk={setUserPk}
                />
              </div>
            }
          />
          <Route
            path="match"
            element={
              <>
                <MatchedMeal
                  mealPk={mealPk}
                  token={token}
                  isHidden={isHidden}
                  setIsHidden={setIsHidden}
                />
                <MenuHeader
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                  setUserPk={setUserPk}
                  setFriendsPks={setFriendsPks}
                  setFriendsNames={setFriendsNames}
                  isHidden={isHidden}
                  setIsHidden={setIsHidden}
                />{" "}
              </>
            }
          />

          <Route
            path="select"
            element={
              <>
                <RestaurantSelectionProcess mealPk={mealPk} token={token} />
              </>
            }
          />
          <Route
            path="meals"
            element={
              <>
                <MatchedPendingMeals
                  mealPk={mealPk}
                  setMealPk={setMealPk}
                  token={token}
                  userPk={userPk}
                  user={user}
                />
                <div className="menuHeader">
                  <MenuHeader
                    isLoggedIn={isLoggedIn}
                    token={token}
                    setToken={setToken}
                    setUser={setUser}
                    setUserPk={setUserPk}
                    setFriendsPks={setFriendsPks}
                    setFriendsNames={setFriendsNames}
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                  />
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
