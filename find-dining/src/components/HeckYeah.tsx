import { CSSProperties } from "styled-components";
import hungryPanda from "../images/hungryPanda.png";

// interface swipe {
//   swipe: (dir: string) => Promise<void>;
// }

const HeckYeah = (swipe: any, canSwipe: any) => {
  return (
    <div
      style={{
        backgroundColor: (!canSwipe as CSSProperties) && "white",
        color: "black",
      }}
    >
      {" "}
      <img
        style={{
          width: 100,
        }}
        src={hungryPanda}
        alt="panda button"
      />
    </div>
  );
};

export default HeckYeah;
