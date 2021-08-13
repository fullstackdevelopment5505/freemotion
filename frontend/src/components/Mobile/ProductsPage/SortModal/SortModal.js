import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import styles from "./SortModal.module.scss";
import Button2 from "../../../UI-Components/Button2/Button2";

import CheckedIcon from "../../../../svgs/checked.svg";

function useOutsideAlerter(ref, setShowSortMenu) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function SortModal({ setShowSortMenu }) {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowSortMenu);

  const filterOptions = [
    "Featured",
    "Popular",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
  ];

  return (
    <div className={styles.overshadow}>
      <div ref={wrapperRef} className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content__wrapper}>
            <p>Sort By:</p>
            <div className={styles.sortOptions__wrapper}>
              <ul>
                {filterOptions.map((option, index) => (
                  <li key={index} onClick={() => setSelectedFilter(index)}>
                    <span>{option}</span>
                    {index === selectedFilter && (
                      <div className={styles.checked__wrapper}>
                        <ReactSVG src={CheckedIcon} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Button2
            handleClick={setShowSortMenu}
            parameter={false}
            content={"Cancel"}
          />
        </div>
      </div>
    </div>
  );
}
