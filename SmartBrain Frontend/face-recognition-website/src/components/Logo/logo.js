import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import logopic from "./emma.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 240, width: 200 }}
      >
        <div className="Tilt-inner p3">
          <img src={logopic} alt="logo" style={{ paddingTop: "5px" }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
