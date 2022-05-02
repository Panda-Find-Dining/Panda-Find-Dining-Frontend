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
import {OnBoard} from "./components/OnBoard";
 
const App = () => {
  const [token, setToken] = useLocalStorageState("token", "");
  const [user, setUser] = useLocalStorageState("user", "");

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
          <Route
          path="matched-restaurant" element={<><MenuHeader
            token={token}
                    setToken={setToken}
                    setUser={setUser}
          /> <MatchedMeal /></>}/> 
      </Routes>
      </BrowserRouter>
    </>
    
  );
};

export default App;
