import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

function Pokemon(props) {
  // name ,mainImage, type, desc, gen

  const textColorValue = color => {
    const isWhite = ["green", "red", "blue", "brown", "purple", "gray"];
    return isWhite.indexOf(color) !== -1 ? "white" : "black";
  };

  const mainCardStyle = {
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "8px"
  };

  const frontCardStyle = {
    border: "2px solid black",
    borderRadius: "8px",
    textTransform: "capitalize",
    fontWeight: "bold",
    textAlign: "center"
  };

  const backCardStyle = {
    border: "2px solid black",
    borderRadius: "8px",
    textTransform: "capitalize",
    fontWeight: "bold",
    textAlign: "center",
    overflow: "none | scroll",
    backgroundColor: props.color,
    color: textColorValue(props.color)
  };

  return (
    <Flippy
      flipOnHover={false}
      flipOnClick={true}
      flipDirection="horizontal"
      style={mainCardStyle}
    >
      <FrontSide style={frontCardStyle}>
        <div>
          <p>{props.name}</p>
          <img src={props.mainImage} alt={props.name} />
        </div>
      </FrontSide>
      <BackSide style={backCardStyle}>
        <div>
          <p>ID - {props.num}</p>
          <p>Type - {props.type}</p>
          <p>Generation - {props.gen}</p>
        </div>
      </BackSide>
    </Flippy>
  );
}

export default Pokemon;
