// @ts-nocheck (TODO KE: remove after typescript refactor)
import useLocalStorageState from "use-local-storage-state";
import Register from "./components/Register";
import Login from "./components/Login";
import MealStart from './components/MealStart';
import MenuHeader from './components/MenuHeader';
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MealFriendSelection from "./components/MealFriendSelection";
import RestaurantSelectionProcess from "./components/RestaurantSelectionProcess";
import MatchedPendingMeals from "./components/MatchedPendingMeals";
import { VerticalModal } from "./components/VerticalModal";
import { useState } from "react"
import PendingMatchedMeals from "./components/PendingMatchedMeals";
import OnBoard from "./components/OnBoard";

 
const App = () => {
  const [token, setToken] = useLocalStorageState("token", "");
  const [user, setUser] = useLocalStorageState("user", "");
  const [modalShow, setModalShow] = useState(false);
  const isLoggedIn = user && token;
  console.log(isLoggedIn)
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route
          path="on-board" element={<><MenuHeader
            token={token}
                    setToken={setToken}
                    setUser={setUser}
          /> <OnBoard /></>}/> 
    <Route path="/" element={<Navigate replace to="home" />} />
    <Route
          path="login"
          element={
            <header>
              {isLoggedIn ? (
                <Navigate to="/meal-friend-selection" />
              ) : (
                <div className="mainPage">
                  <MenuHeader
                    token={token}
                    setToken={setToken}
                    setUser={setUser}
                  />
                  <Login setUser={setUser} setToken={setToken}/>
                  <h2 className="feed">Or:</h2>
              <Register setToken={setToken} setUser={setUser}/>
                </div>
              )}
              
              
            </header>
          }
        />
          <Route
          path="home" element={<><MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /> <Welcome /></>}/>
          <Route path="meal-start" element={<><MenuHeader
            token={token}
            setToken={setToken}
                    setUser={setUser}
          /><MealStart /></>}/>
          <Route path="meal-friend-selection" element={<><MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /><MealFriendSelection/></>} />

          <Route path="restaurant-selection" element={<><VerticalModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /><RestaurantSelectionProcess setModalShow={setModalShow} />
        <MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /></>} />
          <Route path="matched-pending" element={<><MatchedPendingMeals /><MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /></>}/>

          <Route path="pending-matched-meals" element={<><MenuHeader
            token={token}
            setToken={setToken}
            setUser={setUser}
          /><PendingMatchedMeals/></>} />

      </Routes>
      </BrowserRouter>
    </>
    
  );
};

export default App;
