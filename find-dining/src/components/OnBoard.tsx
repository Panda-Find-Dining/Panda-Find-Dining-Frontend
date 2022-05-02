import React from "react";
import happyPanda from "../images/happyPandaButton.png";

//i need to add a route from OnBoard to Welcome page
//i want the onBoard page to be timed
//i want the onBoard page to be the first thing the user sees

const OnBoard = () => {
  return (
    <>
      <div className="card"></div>
      <div>
        <p>
          <i>
            "A bond between friends is impossible to break, except when deciding
            where to eat."
          </i>{" "}
          - Hungry Panda
        </p>
      </div>

      <div id="greeting-container">
        <img src={happyPanda} alt="restaurant map" />

        <p>
          Let Find Dining help with the emotional labor of deciding what's for
          dinner. Register & invite a friend to choose a restaurant. Once you
          both match on a restaurant choice you can be on you merry way and have
          time for making more pressing decisions, like what to watch!
        </p>
      </div>
      <button>Let's Eat!</button>
    </>
  );
};

export default OnBoard;
