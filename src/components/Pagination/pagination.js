import React, { useEffect, useState } from "react";
import "./pagination.css";
import chevLeft from "./assets/chevleft.svg";
import chevRight from "./assets/chev-right.svg";

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [counter, setCounter] = useState(10);
  const [maxShown, setMaxShown] = useState(4);

  useEffect(() => {
    if (props.current) {
      setCurrentPage(props.current);
    } else {
      setCurrentPage(props.defaultCurrent || 0);
    }
    setTotalPages(props.total);
    setCounter(props.counter || 10);
  }, [props]);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(currentPage);
    }
  }, [currentPage]);

  const getTotalCount = () => {
    return Math.ceil(totalPages / counter);
  };

  const checkCanClick = val => {
    if (val === 0) {
      return currentPage - 1 >= 1;
    } else {
      return currentPage + 1 <= getTotalCount();
    }
  };

  const clickBox = val => {
    if (checkCanClick(val)) {
      let pageTo = currentPage;
      if (val === 0) {
        pageTo = currentPage - 1;
      } else {
        pageTo = currentPage + 1;
      }
      setCurrentPage(pageTo);
    }
  };

  const getLinks = _ => {
    const linkArray = [];
    const totalCount = getTotalCount();
    let endPoint = getTotalCount();
    let startPoint = 1;
    if (totalCount - currentPage > maxShown) {
      startPoint = currentPage;
    } else {
      startPoint = totalCount - maxShown;
    }
    if (startPoint + maxShown < totalCount) {
      endPoint = startPoint + maxShown;
    }
    for (let i = startPoint; i <= endPoint; i++) {
      linkArray.push(
        <li
          className={parseInt(currentPage.toString()) === i ? "active" : ""}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }

    if (startPoint - maxShown > 1) {
      linkArray.unshift(
        <>
          <li
            className={parseInt(currentPage.toString()) === 1 ? "active" : ""}
            onClick={() => setCurrentPage(1)}
          >
            {1}
          </li>
          <div className="dots">...</div>
        </>
      );
    }

    if (endPoint + maxShown < totalCount) {
      linkArray.push(
        <>
          <div className="dots">...</div>
          <li
            className={
              parseInt(currentPage.toString()) === totalCount ? "active" : ""
            }
            onClick={() => setCurrentPage(totalCount)}
          >
            {totalCount}
          </li>
        </>
      );
    }

    return linkArray;
  };

  return (
    <div className="adx-paginator">
      <li
        className={checkCanClick(0) ? "" : "disabled"}
        onClick={() => clickBox(0)}
      >
        <img src={chevLeft} alt="" />
      </li>
      {getLinks()}
      <li
        className={checkCanClick(1) ? "" : "disabled"}
        onClick={() => clickBox(1)}
      >
        <img src={chevRight} alt="" />
      </li>
    </div>
  );
}

export default Pagination;
