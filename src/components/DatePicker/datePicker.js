import React, { useState } from "react";
import calenderSvg from "./assets/calender.svg";
import chevron from "./assets/chevron.svg";
import chevrons from "./assets/chevrons.svg";
import "./datePicker.css";
import proptype from "prop-types";

function getDaysInMonth(m, y) {
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

function getStartWeekDay(m, y) {
  return new Date(y + "-" + m + "-01").getDay();
}

function DatePicker(props) {
  const weekShortArray = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  const weekFullArray = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  const monthFullArray = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  const monthShortArray = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec"
  ];

  const getToday = () => {
    return new Date();
  };

  const [activeValue, setActiveValue] = useState(props.value || "");
  const [activeType, setActiveType] = useState(props.dateType);
  const [activeYear, setActiveYear] = useState(getToday().getFullYear());
  const [activeMonth, setActiveMonth] = useState(getToday().getMonth() + 1);
  const [activeDay, setActiveDay] = useState(getToday().getDate());
  const [startValue, setStartValue] = useState(props.startDate || "");
  const [endValue, setEndValue] = useState(props.endDate || "");
  const [activeState, setActiveState] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const [id] = useState();

  const getRenderContext = () => {
    let returnValue = [];
    returnValue.push(
      weekShortArray.map((item, key) => (
        <div key={key} className="weekTitle">
          {item}
        </div>
      ))
    );

    const totalDaysInMonth = getDaysInMonth(activeMonth, activeYear);
    const startWeekDay = getStartWeekDay(activeMonth, activeYear);

    let counter = 0;
    let start = true;
    let tempArray = [];

    const checkDisabled = val => {
      let status = true;
      if (props.rangePicker && activeState === 1) {
        let selected = startValue.split("-");
        if (activeYear === parseInt(selected[selected.length - 1])) {
          if (activeMonth === parseInt(selected[1])) {
            if (val <= parseInt(selected[0])) {
              status = false;
            }
          }
        }
      }
      return status;
    };

    for (let i = 1; i <= totalDaysInMonth; i++) {
      if (start && i <= startWeekDay) {
        tempArray.push(<div className="weekDays disabled" />);
      } else {
        if (start) start = false;
        tempArray.push(
          <div
            onClick={() => {
              if (!checkDisabled(i)) return;
              setDate(i);
            }}
            className={`weekDays ${getIsToday(i) ? "active" : ""} ${
              !checkDisabled(i) ? "disabled" : ""
            }`}
          >
            {i}
          </div>
        );
      }
      counter++;
      if (counter >= 7) {
        returnValue.push(tempArray);
        counter = 0;
        tempArray = [];
      }
      if (i === totalDaysInMonth) returnValue.push(tempArray);
    }

    return returnValue;
  };

  const setDate = i => {
    setActiveDay(i);
    if (props.rangePicker) {
      const value = `${dualizer(i)}-${dualizer(activeMonth)}-${activeYear}`;
      if (activeState === 1) {
        setEndValue(value);
        setActiveValue(activeValue + value);
        setVisibility(false);
        if (props.onChange) {
          props.onChange({
            startData: startValue,
            endDate: endValue,
            value: activeValue + value
          });
        }
      } else {
        setStartValue(value);
        setActiveValue(`${value} - `);
        setActiveState(1);
      }
    } else {
      const value = `${dualizer(i)}-${dualizer(activeMonth)}-${activeYear}`;
      setActiveValue(value);
      setVisibility(false);
      if (props.onChange) {
        props.onChange({
          value
        });
      }
    }
  };

  const setMonth = i => {
    if (props.dateType === "month") {
      setActiveValue(monthFullArray[i]);
      setVisibility(false);
      if (props.onChange) {
        props.onChange({
          value: monthFullArray[i]
        });
      }
    } else {
      setActiveMonth(i);
      setActiveType("date");
    }
  };

  const setYear = i => {
    if (props.dateType === "year") {
      setActiveValue(i.toString());
      setVisibility(false);
      if (props.onChange) {
        props.onChange({
          value: i.toString()
        });
      }
    } else {
      setActiveYear(i);
      setActiveType("month");
    }
  };

  const dualizer = val => {
    if (val.toString().length < 2) {
      return `${0}${val}`;
    }
    return val;
  };

  const getIsToday = i => {
    if (
      activeMonth === getToday().getMonth() + 1 &&
      activeYear === getToday().getFullYear()
    ) {
      if (activeDay === i) return true;
    }
    return false;
  };
  const getIsMonth = i => {
    if (activeYear === getToday().getFullYear()) {
      if (getToday().getMonth() === i) return true;
    }
    return false;
  };

  const changeMonth = _type => {
    if (_type === "prev") {
      let newMonth = activeMonth - 1;
      let newYear = activeYear;
      if (newMonth <= 0) {
        newMonth = 12;
        newYear = newYear - 1;
      }
      setActiveMonth(newMonth);
      setActiveYear(newYear);
    } else {
      let newMonth = activeMonth + 1;
      let newYear = activeYear;
      if (newMonth >= 13) {
        newMonth = 1;
        newYear = newYear + 1;
      }
      setActiveMonth(newMonth);
      setActiveYear(newYear);
    }
  };

  const changeYear = _type => {
    if (_type === "prev") {
      setActiveYear(activeYear - (activeType === "year" ? 12 : 1));
    } else {
      setActiveYear(activeYear + (activeType === "year" ? 12 : 1));
    }
  };

  const getRenderContextMonth = () => {
    const returnValue = [];
    monthShortArray.map((item, i) => {
      returnValue.push(
        <div
          onClick={() => setMonth(i)}
          key={i}
          className={`weekDays ${getIsMonth(i) ? "active" : ""}`}
        >
          {item}
        </div>
      );
      return null;
    });
    return returnValue;
  };

  const getRenderContextYear = () => {
    let toCount = activeYear + 12;
    const returnValue = [];
    for (let i = activeYear; i < toCount; i++) {
      returnValue.push(
        <div
          onClick={() => setYear(i)}
          className={`weekDays ${
            i === getToday().getFullYear() ? "active" : ""
          }`}
        >
          {i}
        </div>
      );
    }
    return returnValue;
  };

  return (
    <div className="adx-datePicker">
      <div className="input-field" onClick={() => setVisibility(!visibility)}>
        <input
          type="text"
          placeholder="Select data"
          value={activeValue}
          disabled
        />
        <img src={calenderSvg} alt="" />
      </div>
      {visibility && (
        <div className="date-picker-con" onClick={() => setVisibility(false)} />
      )}
      <div
        className={`date-picker ${visibility ? "show" : ""}`}
        id={"datepicker" + props.id}
      >
        <div className="heading">
          {props.rangePicker && activeState === 1 ? (
            <div
              className="backKey"
              onClick={() => {
                setActiveState(0);
                setActiveValue("");
                setStartValue("");
              }}
            >
              Back
            </div>
          ) : (
            <div className="lcontrol">
              <button onClick={() => changeYear("prev")}>
                <img src={chevrons} alt="" />
              </button>
              {activeType === "date" && (
                <button onClick={() => changeMonth("prev")}>
                  <img src={chevron} alt="" />
                </button>
              )}
            </div>
          )}

          <div className="context-main">
            {activeType === "date" && (
              <span onClick={() => setActiveType("month")}>
                {monthShortArray[activeMonth - 1]}
              </span>
            )}
            {(activeType === "date" || activeType === "month") && (
              <span onClick={() => setActiveType("year")}>{activeYear}</span>
            )}
          </div>

          <div className="rcontrol">
            {activeType === "date" && (
              <button onClick={() => changeMonth()}>
                <img src={chevron} alt="" />
              </button>
            )}

            <button onClick={() => changeYear()}>
              <img src={chevrons} alt="" />
            </button>
          </div>
        </div>
        <div className="body">
          {activeType === "date" && (
            <div className="date-data">
              {getRenderContext().map(item => item)}
            </div>
          )}
          {activeType === "month" && (
            <div className="month-data">
              {getRenderContextMonth().map(item => item)}
            </div>
          )}
          {activeType === "year" && (
            <div className="month-data">
              {getRenderContextYear().map(item => item)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

DatePicker.defaultProps = {
  dateType: "date",
  rangePicker: false
};

DatePicker.propType = {
  dateType: proptype.oneOf(["date", "month", "year"]),
  rangePicker: proptype.bool,
  value: proptype.string,
  startDate: proptype.string,
  endDate: proptype.string,
  onChange: proptype.func
};

export default DatePicker;
