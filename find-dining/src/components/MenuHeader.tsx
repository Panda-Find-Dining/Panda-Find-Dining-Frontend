import axios from "axios";
import { useState, Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FDMenuLogo from "../images/FDMenuLogo.png";
import Stack from "react-bootstrap/Stack";

interface props {
  token: string;
  setToken: React.Dispatch<string>;
  setUser: React.Dispatch<string>;
  isLoggedIn: unknown;
  setUserPk: React.Dispatch<string>;
  setFriendsNames: React.Dispatch<[]>;
  setFriendsPks: React.Dispatch<[]>;
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
}

const MenuHeader = ({
  token,
  setToken,
  setUser,
  isLoggedIn,
  setUserPk,
  setFriendsNames,
  setFriendsPks,
  isHidden,
  setIsHidden,
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
      .then(function (response) {})
      .catch((e) => setError("Logout Unsuccessful Try again"));
    setUser("");
    setToken("");
    setUserPk("");
    setFriendsNames([]);
    setFriendsPks([]);
  };
  const navigate = useNavigate();

  return (
    <Nav
      style={{
        color: "black",
        display: "inline",
        flexDirection: "row",
        transition: "top .3s",
        top: ` "-30px" : null}`,
      }}
      className="menuHeader"
    >
      <Navbar fixed="bottom" bg="light" variant="dark">
        <div>
          <Navbar.Brand
            style={{
              color: "black",
              display: "inline",
              flexDirection: "row",
              marginRight: 180,
            }}
            href="#home"
          >
            <img
              alt=""
              src={FDMenuLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              onClick={() => navigate("/")}
            />{" "}
            FindDining
          </Navbar.Brand>
        </div>
        <Stack direction="horizontal" gap={3}>
          <Nav.Item as="li" className="navLinks">
            <div onClick={() => setIsHidden(true)}>
              <Link to="/meals">Meals</Link>
            </div>
            {isLoggedIn ? (
              <a
                href="login"
                className="logoutLink"
                onClick={() => setLogout()}
              >
                Logout
              </a>
            ) : (
              <div>
                <Link to="/login">Login</Link>
              </div>
            )}
            <div>
              <Link to="/">Home</Link>
            </div>
          </Nav.Item>
        </Stack>
        <div className="logoutProfile">
          <div className="error">{error}</div>
        </div>
      </Navbar>
    </Nav>
  );
};

export default MenuHeader;
