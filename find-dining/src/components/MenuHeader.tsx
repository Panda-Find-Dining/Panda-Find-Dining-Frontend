// @ts-nocheck (TODO KE: remove after typescript refactor)
import "./MenuHeader.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface props {
  token: string;
  setToken: React.Dispatch<unknown>;
  setUser: React.Dispatch<unknown>;
  isLoggedIn: unknown;
  setUserPk: React.Dispatch<unknown>;
  setFriendsNames: React.Dispatch<any>;
  setFriendsPks: React.Dispatch<any>;
}

const MenuHeader = ({
  token,
  setToken,
  setUser,
  isLoggedIn,
  setUserPk,
  setFriendsNames,
  setFriendsPks,
}: props) => {
  const [error, setError] = useState("");
  const setLogout = () => {
    const options = {
      method: "POST",
      url: "https://find-dining-panda.herokuapp.com/api/auth/token/logout/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      data: {
        token: `${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch((e) => setError("Logout Unsuccessful Try again"));
    setUser("");
    setToken("");
    setUserPk("");
    setFriendsNames([]);
    setFriendsPks([]);
  };
  const navigate = useNavigate();
  return (
    <div className="menuHeader">
      <img
        style={{
          width: "15%",
        }}
        className="siteLogo"
        src={require("../images/FDMenuLogo.png")}
        alt="This a placeholder"
        onClick={() => navigate("/")}
      ></img>
      <div className="navLinks">
        <Link to="/meals">Meals</Link>
        {isLoggedIn ? (
          <a href="login" className="logoutLink" onClick={() => setLogout()}>
            Logout
          </a>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/">Home</Link>
      </div>
      <div className="logoutProfile">
        <div className="error">{error}</div>
      </div>
    </div>
  );
};

export default MenuHeader;
