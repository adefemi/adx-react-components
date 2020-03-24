import React, { useState, useEffect } from "react";
import "./popConfirm.css";
import InfoIcon from "./assets/info.png";
import proptype from "prop-types";

function PopConfirm(props) {
  const [id] = useState(props.id);
  const [showPop, setShowPop] = useState(false);

  useEffect(() => {
    const PopElement = document.getElementById(id);
    const childContent = PopElement.getElementsByClassName("content-main")[0]
      .firstElementChild;
    const popConfirm = PopElement.getElementsByClassName("popConfirm")[0];

    childContent.addEventListener("click", () => setShowPop(true));

    switch (props.placement) {
      case "B":
        getBottomPosition(popConfirm);
        break;
      case "R":
        getRightPosition(popConfirm, childContent);
        break;
      case "L":
        getLeftPosition(popConfirm, childContent);
        break;
      default:
        getTopPosition(popConfirm, childContent);
    }
  }, []);

  const getTopPosition = (popConfirm, childContent) => {
    popConfirm.style.top = `${childContent.getBoundingClientRect().top -
      popConfirm.getBoundingClientRect().height -
      5}px`;
    popConfirm.style.transformOrigin = "bottom left";
  };

  const getBottomPosition = popConfirm => {
    popConfirm.style.top = `${5 + popConfirm.getBoundingClientRect().top}px`;
    popConfirm.style.transformOrigin = "top left";
  };

  const getRightPosition = (popConfirm, childContent) => {
    popConfirm.style.top = `${childContent.getBoundingClientRect().top}px`;
    popConfirm.style.left = `${popConfirm.getBoundingClientRect().left +
      childContent.getBoundingClientRect().width +
      5}px`;
    popConfirm.style.transformOrigin = "top left";
  };

  const getLeftPosition = (popConfirm, childContent) => {
    popConfirm.style.top = `${childContent.getBoundingClientRect().top}px`;
    popConfirm.style.left = `${0 - popConfirm.getBoundingClientRect().width}px`;
    popConfirm.style.transformOrigin = "top right";
  };

  return (
    <div className="adx-popConfirm" id={id}>
      <div className="content-main">{props.children}</div>
      {showPop && <div className="overlay" onClick={() => setShowPop(false)} />}
      <div className={`popConfirm ${showPop ? "show" : ""}`}>
        <div className="context">
          <img src={InfoIcon} alt="" />
          <div className="message">{props.title}</div>
        </div>
        <div className="controls">
          <button
            onClick={() => {
              if (props.onCancel) {
                props.onCancel();
              }
              setShowPop(false);
            }}
          >
            No
          </button>
          <button
            className="yes"
            onClick={() => {
              if (props.onConfirm) {
                props.onConfirm();
              }
              setShowPop(false);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

PopConfirm.propType = {
  title: proptype.string,
  onConfirm: proptype.func,
  onCancel: proptype.func,
  placement: proptype.oneOf(["T", "L", "R", "B"]),
  id: proptype.any.isRequired
};

export default PopConfirm;
