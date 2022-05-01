import "./MenuHeader.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface props {
  token:string,
  setToken:React.Dispatch<unknown>
  setUser:React.Dispatch<unknown>
}

const MenuHeader = ({ token, setToken, setUser }:props) => {
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
  };

  return (
    <div className="menuHeader">
      <img
        className="siteLogo"
        src={require("../images/panda.jpeg")}
        alt="This a placeholder"
      ></img>
      <div className="navLinks">
      <Link to="/matched-pending">Matched/Pending Meals</Link>
      <a href="home" className="logoutLink" onClick={() =>setLogout()}>
          Logout
        </a>
        </div>
      <div className="logoutProfile">
        <img
          className="profilePic"
          src={require("../images/panda.jpeg")}
          alt="This a placeholder"
        ></img>
        <div className="error">{error}</div>
        
      </div>
    </div>
  );
};

export default MenuHeader;
