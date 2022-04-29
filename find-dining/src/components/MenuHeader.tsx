import "./MenuHeader.css";
import axios from "axios";
import { useState } from "react";

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
        setUser("");
        setToken("");
      })
      .catch((e) => setError("Logout Unsuccessful Try again"));
  };

  return (
    <div className="menuHeader">
      <img
        className="siteLogo"
        src={require("../images/panda.jpeg")}
        alt="This a placeholder"
      ></img>
      <div className="logoutProfile">
        <img
          className="profilePic"
          src={require("../images/panda.jpeg")}
          alt="This a placeholder"
        ></img>
        <div className="error">{error}</div>
        <a href="home" className="logoutLink" onClick={setLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default MenuHeader;
