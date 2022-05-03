// @ts-nocheck (TODO KE: remove after typescript refactor)
import useLocalStorageState from "use-local-storage-state";
import Register from "./components/Register";
import Login from "./components/Login";
import MealStart from './components/MealStart';
import MenuHeader from './components/MenuHeader';
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MealFriendSelection from "./components/MealFriendSelection";
import MatchedMeal from "./components/MatchedMeal";
import OnBoard from "./components/OnBoard";
import RestaurantSelectionProcess from "./components/RestaurantSelectionProcess";
import MatchedPendingMeals from "./components/MatchedPendingMeals";
import { VerticalModal } from "./components/VerticalModal";
import { useState } from "react"

 
const App = () => {
  const [token, setToken] = useLocalStorageState("token", "");
  const [user, setUser] = useLocalStorageState("user", "");

  const [modalShow, setModalShow] = useState(false);
  const isLoggedIn = user && token;
  console.log(isLoggedIn)
  console.log(isLoggedIn)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route
          path="on-board" element={<><OnBoard />
          </>}/> 
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
                  <MenuHeader
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
                    token={token}
                    setToken={setToken}
                    setUser={setUser}
                  />
                </div>}
                />
          <Route
          path="home" element={<>
          <MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /> <Welcome /></>}/>
          <Route path="meal-start" element={<>
          <MealStart token={token} />
          <MenuHeader
            token={token}
            setToken={setToken}
                    setUser={setUser}
          /></>}/>
          <Route path="meal-friend-selection" element={<>
          <MealFriendSelection token={token} />
          <MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /></>} />
          <Route
          path="matched-restaurant" element={<>
          <MatchedMeal token={token} />
          <MenuHeader
            token={token}
                    setToken={setToken}
                    setUser={setUser}
          /> </>}/> 


          <Route path="restaurant-selection" element={<><VerticalModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /><RestaurantSelectionProcess token={token} setModalShow={setModalShow} />
        <MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /></>} />
          <Route path="matched-pending" element={<>
          <MatchedPendingMeals token={token} />
          <MenuHeader
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
