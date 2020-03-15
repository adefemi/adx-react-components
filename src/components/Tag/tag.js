import React from "react";
import "./tag.css";

function Tag(props) {
  const presetList = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "default",
    "cyan",
    "blue",
    "gray",
    "geekblue",
    "purple"
  ];
  const getColorRules = () => {
    const returnVal = {
      backgroundColor: "#f0f0f0",
      color: "#6e6e6e",
      borderColor: "#d4d4d4"
    };

    if (props.color) {
      let newColor = props.color;
      switch (props.color) {
        case "success":
          newColor = "green";
          break;
        case "processing":
          newColor = "blue";
          break;
        case "error":
          newColor = "red";
          break;
        case "warning":
          newColor = "orange";
          break;
      }

      if (presetList.includes(newColor)) {
        if (newColor !== "default") {
          returnVal.backgroundColor = `rgba(${newColor}, 0.5)`;
          returnVal.color = newColor;
          returnVal.borderColor = newColor;
        }
      } else {
        returnVal.backgroundColor = newColor;
        returnVal.color = "#ffffff";
        returnVal.borderColor = newColor;
      }
    }

    return returnVal;
  };

  return (
    <div style={getColorRules()} className="adx-tag">
      {props.children}
    </div>
  );
}

export default Tag;
