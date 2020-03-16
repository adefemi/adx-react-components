import React from "react";
import "./divider.css";

function Divider(props) {
  return <div className={`adx-divider ${props.dashed ? "dashed" : ""}`} />;
}

export default Divider;
