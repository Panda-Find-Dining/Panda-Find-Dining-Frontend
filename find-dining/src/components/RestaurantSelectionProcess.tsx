import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  RefObject,
  CSSProperties,
} from "react";
import RestaurantCard from "../Restaurant-selection-card";
import "./RestaurantSelectionProcess.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import angryPanda from "../images/angryPanda.png";
import hungryPanda from "../images/hungryPanda.png";

const StyledButton = styled(Button)`
  background-color: #da0063;
  box-shadow: none;
  border: none;
  min-width: 10px;
  &:hover {
    background-color: none;
    outline: none;
  }
  &:focus {
    box-shadow: none;
    border: none;
  }
`;

interface restaurantDB {
  name: string;
  url: string;
  pk: string;
}

interface restaurantSelectProps {
  token: string;
  mealPk: string;
}
interface restaurant {
  name: string;
  url: string;
  pk: string;
  photo_reference: string;
  id: string;
}

function RestaurantSelectionProcess({ token, mealPk }: restaurantSelectProps) {
  const [restDB, setRestDB] = useState<restaurantDB[]>([]);
  const [currentIndex, setCurrentIndex] = useState(restDB.length - 1);
  const [lastDirection, setLastDirection] = useState("");
  const [count, setCount] = useState(1);
  const [restPk, setRestPk] = useState("");
  const [answer, setAnswer] = useState("");
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const navigate = useNavigate();
  const childRefs: RefObject<any>[] = useMemo(
    () =>
      Array(restDB.length)
        .fill(0)
        .map((i) => React.createRef()),
    [restDB.length]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const canGoBack = currentIndex < restDB.length - 1;

  const canSwipe = currentIndex >= 0;

  useEffect(() => {
    let theDB: restaurantDB[] = [];
    const options = {
      method: "GET",
      url: `https://find-dining-panda.herokuapp.com/api/meals/${mealPk}/restaurants/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        response.data.map((restaurant: restaurant, index: number) => {
          return theDB.push({
            name: restaurant.name,
            url: restaurant.photo_reference,
            pk: restaurant.id,
          });
        }, setRestDB(theDB));
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [token, mealPk]);

  console.log("push");
  // set last direction and decrease current index
  const swiped = (
    direction: string,
    nameToDelete: string,
    index: number,
    restaurantPK: string
  ) => {
    console.log(restPk);
    const yesOptions = {
      method: "POST",
      url: `https://find-dining-panda.herokuapp.com/api/restaurants/${restaurantPK}/yes/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const noOptions = {
      method: "POST",
      url: `https://find-dining-panda.herokuapp.com/api/restaurants/${restaurantPK}/no/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right")
      return (
        console.log(restPk),
        axios
          .request(yesOptions)
          .then(function (response) {
            setAnswer("Previous Answer: Yes!");
            setTimeout(() => {
              setAnswer("");
            }, 1500);
          })
          .catch(function (error) {
            console.error(error);
          })
      );
    return (
      console.log(restPk),
      axios
        .request(noOptions)
        .then(function (response) {
          setAnswer("Previous Answer: No!");
          setTimeout(() => {
            setAnswer("");
          }, 1500);
        })
        .catch(function (error) {
          console.error(error);
        })
    );
  };
  let testCount = 1;
  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    testCount += 1;
    setCount(testCount);

    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();

    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
    return testCount;
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < restDB.length) {
      await childRefs[currentIndex].current.swipe(dir);
      // Swipe the card!
      setCount(count + 1);
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
    setCount(count - 1);
  };

  const goEat = () => {
    const options = {
      method: "GET",
      url: `https://find-dining-panda.herokuapp.com/api/selected-and-match/${mealPk}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    if (count < 10)
      return alert(
        "Sorry you must select at least 10 Restaurants before submitting!"
      );
    else
      return axios
        .request(options)
        .then(function (response) {
          navigate("/meals");
        })
        .catch(function (error) {
          console.error(error);
        });
  };

  const undo = (restaurantPK: string) => {
    const undoNoOptions = {
      method: "DELETE",
      url: `https://find-dining-panda.herokuapp.com/api/undo_no/${restaurantPK}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const undoYesOptions = {
      method: "DELETE",
      url: `https://find-dining-panda.herokuapp.com/api/undo_yes/${restaurantPK}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    if (lastDirection === "right")
      return (
        console.log(restPk),
        axios
          .request(undoYesOptions)
          .then(function (response) {})
          .catch(function (error) {
            console.error(error);
          })
      );
    return (
      console.log(restPk),
      axios
        .request(undoNoOptions)
        .then(function (response) {})
        .catch(function (error) {
          console.error(error);
        })
    );
  };

  const google1 =
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=";
  const google2 = "&key=AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M";
  return (
    <div>
      <div
        style={{
          marginBottom: -60,
        }}
        className="cardDeck"
      >
        <h2 className="emptyState">Out of Restaurants, you hungry panda!</h2>
        <button
          className="homeButton"
          style={{
            backgroundColor: (!canGoBack as CSSProperties) && "#da0063",
          }}
          onClick={() => navigate("/meals")}
        >
          Go Home!
        </button>
        {restDB.map((restaurant, index) => (
          <RestaurantCard
            ref={childRefs[index]}
            className="swipe"
            key={restaurant.name}
            onSwipe={(direction: string) => {
              swiped(direction, restaurant.name, index, restaurant.pk);
              setRestPk(restaurant.pk);
            }}
            onCardLeftScreen={() => {
              outOfFrame(restaurant.name, index);
              setRestPk(restaurant.pk);
            }}
          >
            {currentIndex === -1 ? (
              <div></div>
            ) : (
              <h2 className="cardCount">
                Restaurant Count: {count}/{restDB.length}
              </h2>
            )}
            <div
              style={{
                backgroundImage:
                  "url(" + google1 + restaurant.url + google2 + ")",
              }}
              className="card"
            >
              <h3>{restaurant.name}</h3>
              <h2 className="answer">{answer}</h2>
            </div>
          </RestaurantCard>
        ))}
      </div>

      <div
        style={{
          marginBottom: 70,
          paddingLeft: 40,
        }}
        className="buttons"
      >
        <div
          style={{
            backgroundColor: (!canSwipe as CSSProperties) && "white",
            color: "black",
          }}
          onClick={() => swipe("left")}
        >
          <img
            style={{
              width: 100,
            }}
            src={angryPanda}
            alt="panda button"
          />
          {/* Heck No! */}
        </div>
        <div
          style={{
            backgroundColor: (!canSwipe as CSSProperties) && "white",
            color: "black",
          }}
          onClick={() => swipe("right")}
        >
          <img
            style={{
              width: 100,
            }}
            src={hungryPanda}
            alt="panda button"
          />
          {/* Heck Yeah! */}
        </div>
      </div>
      <div>
        <StyledButton
          className="undoButton"
          style={{
            backgroundColor: (!canGoBack as CSSProperties) && "#da0063",
          }}
          onClick={() => {
            goBack();
            undo(restPk);
          }}
        >
          Undo swipe!
        </StyledButton>
        <StyledButton
          style={{
            backgroundColor: "black",
          }}
          className="undoButton"
          onClick={() => goEat()}
        >
          Let's Eat!
        </StyledButton>
      </div>
    </div>
  );
}

export default RestaurantSelectionProcess;
