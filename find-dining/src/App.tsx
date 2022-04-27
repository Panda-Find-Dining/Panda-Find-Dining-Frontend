// @ts-nocheck (TODO KE: remove after typescript refactor)
import useLocalStorageState from "use-local-storage-state";
import Register from "./components/Register";
import Login from "./components/Login";
import MealStart from './components/MealStart';
import MenuHeader from './components/MenuHeader';
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MealFriendSelection from "./components/MealFriendSelection";

 
const App = () => {
  const [token, setToken] = useLocalStorageState("token", "");
  const [user, setUser] = useLocalStorageState("user", "");
  const isLoggedIn = user && token;
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate replace to="home" />} />
    <Route
          path="login"
          element={
            <header>
              {isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <div className="mainPage">
                  <MenuHeader
                    token={token}
                  />
                  <Login setUser={setUser} setToken={setToken}/>
                </div>
              )}
              
              <h2 className="feed">Or:</h2>
              <Register  element={ <Welcome />}/>
            </header>
          }
        />
                <Route
          path="home" element={<><MenuHeader
            token={token}
          /> <Welcome /></>}/>
          <Route path="meal-start" element={<><MenuHeader
            token={token}
          /><MealStart /></>}/>
          <Route path="meal-friend-selection" element={<><MenuHeader
            token={token}
          /><MealFriendSelection/></>} />
      </Routes>
      </BrowserRouter>
    </>
    
  );
};

export default App;
