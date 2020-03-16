import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const defaultPropList = {
  value: PropTypes.any,
  type: PropTypes.oneOf(["text", "number", "password", "tel", "phone", "date"]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["default", "small", "large"]),
  disabled: PropTypes.bool,
  disableCurrencySwap: PropTypes.bool,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  addonBefore: PropTypes.any,
  addonAfter: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  setPhoneNumber: PropTypes.func,
  dispatch: PropTypes.func,
  setCurrencyState: PropTypes.func,
  defaultCurrencyValue: PropTypes.object,
  isError: PropTypes.bool,
  noCurrencySelect: PropTypes.bool
};

export const Input = props => {
  let inputType = props.type;

  return (
    <div
      className={
        props.error
          ? props.className + " input-control error " + props.size
          : props.className + " input-control " + props.size
      }
      style={props.style}
    >
      <div className="input-container-cover">
        <div
          className={`input-field ${props.className} ${
            props.disabled ? "disabled" : ""
          }`}
          style={props.isError ? { border: "1px solid red" } : {}}
        >
          {props.addonBefore && (
            <div className="addon before">{props.addonBefore}</div>
          )}
          {props.iconLeft && <span className="iconLeft">{props.iconLeft}</span>}
          <input
            {...props}
            placeholder={props.placeholder}
            type={inputType === "phone" ? "number" : inputType}
            disabled={props.disabled}
            onChange={e => {
              props.onChange(e);
            }}
            value={props.value || (props.defaultValue || "")}
            className={`${props.className} ${
              props.iconRight ? "iconRight" : ""
            } ${props.iconLeft ? "iconLeft" : ""} ${
              props.addonAfter ? "addonAfter" : ""
            } ${props.addonBefore ? "addonBefore" : ""}`}
          />
          {props.iconRight && (
            <span className="iconRight">{props.iconRight}</span>
          )}
          {props.addonAfter && (
            <div className="addon after">{props.addonAfter}</div>
          )}
        </div>
      </div>
      {props.isError && (
        <div className={"input-error-text"}>{props.errorText}</div>
      )}
    </div>
  );
};

Input.propTypes = defaultPropList;

Input.defaultProps = {
  value: "",
  type: "text",
  onChange: () => null,
  error: false,
  errorText: "Invalid input",
  className: "",
  size: "default",
  disabled: false,
  placeholder: ""
};

export default Input;
