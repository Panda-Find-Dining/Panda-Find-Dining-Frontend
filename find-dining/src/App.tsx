// @ts-nocheck (TODO KE: remove after typescript refactor)
import useLocalStorageState from "use-local-storage-state";
import Register from "./components/Register";
import Login from "./components/Login";
import MealStart from './components/MealStart';
import MenuHeader from './components/MenuHeader';
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import MealFriendSelection from "./components/MealFriendSelection";
import MatchedMeal from "./components/MatchedMeal";
import OnBoard from "./components/OnBoard";
import RestaurantSelectionProcess from "./components/RestaurantSelectionProcess";
import MatchedPendingMeals from "./components/MatchedPendingMeals";

import { useState } from "react"

 
const App = () => {
  const [token, setToken] = useLocalStorageState("token", "");
  const [user, setUser] = useLocalStorageState("user", "");
  const [friendsPks, setFriendsPks] = useState<any>([])
  const [friendsNames, setFriendsNames] = useState<any>([])
  const [mealPk, setMealPk] = useLocalStorageState("mealPk", "")
  const isLoggedIn = user && token;
  console.log(isLoggedIn)
  console.log(isLoggedIn)
  console.log(process.env.REACT_APP_GOOGLE_API_KEY)
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route
          path="on-board" element={<><OnBoard />
          <MenuHeader
          token={token}
                  setToken={setToken}
                  setUser={setUser}
        /></>}/> 
    <Route path="/" element={<Navigate replace to="home" />} />
    <Route
          path="login"
          element={
            <header>
              {isLoggedIn ? (
                <Navigate to="/meal-friend-selection" />
              ) : (
                <div className="mainPage">
                  <Login setUser={setUser} setToken={setToken}/>
                  <h2>Don't have an account? </h2>
                  <Link to="/register">Sign up Here</Link>
                  <MenuHeader
                  isLoggedIn={isLoggedIn}
                    token={token}
                    setToken={setToken}
                    setUser={setUser}
                  />
                 
                </div>
              )}
              
              
            </header>
          }
        />
        <Route path="register" element={ <div className="mainPage">
              <Register setToken={setToken} setUser={setUser}/>
              <MenuHeader
              isLoggedIn={isLoggedIn}
                    token={token}
                    setToken={setToken}
                    setUser={setUser}
                  />
                </div>}
                />
          <Route
          path="home" element={<>
          <MenuHeader
          isLoggedIn={isLoggedIn}
            token={token}
            setToken={setToken}
            setUser={setUser}
          /> <Welcome /></>}/>
          <Route path="meal-start" element={<>
          <MealStart mealPk={mealPk} setMealPk={setMealPk} token={token} friendsPks={friendsPks} friendsNames={friendsNames} />
          <MenuHeader
          isLoggedIn={isLoggedIn}
            token={token}
            setToken={setToken}
                    setUser={setUser}
          /></>}/>
          <Route path="meal-friend-selection" element={<>
          <MealFriendSelection friendsNames={friendsNames} setFriendsNames={setFriendsNames} friendsPks={friendsPks} setFriendsPks={setFriendsPks} token={token} />
          <MenuHeader
          isLoggedIn={isLoggedIn}
            token={token}
            setToken={setToken}
            setUser={setUser}
          /></>} />
          <Route
          path="matched-restaurant" element={<>
          <MatchedMeal mealPk={mealPk} token={token} />
          <MenuHeader
          isLoggedIn={isLoggedIn}
            token={token}
                    setToken={setToken}
                    setUser={setUser}
          /> </>}/> 


          <Route path="restaurant-selection" element={<><RestaurantSelectionProcess mealPk={mealPk} token={token}  />
        <MenuHeader
        isLoggedIn={isLoggedIn}
            token={token}
            setToken={setToken}
            setUser={setUser}
          /></>} />
          <Route path="matched-pending" element={<>
          <MatchedPendingMeals mealPk={mealPk} setMealPk={setMealPk} token={token} />
          <MenuHeader
          isLoggedIn={isLoggedIn}
            token={token}
            setToken={setToken}
            setUser={setUser}
          /></>}/>

      </Routes>
      </BrowserRouter>
    </>
    
  );
};

export default App;
