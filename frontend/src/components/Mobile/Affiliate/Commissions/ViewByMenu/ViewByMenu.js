import React, { useState, useEffect, useRef } from "react";
import styles from "./ViewByMenu.module.scss";
import ChevronDown from "../../../../../svgs/chevron_down.svg";
import { ReactSVG } from "react-svg";

function useOutsideAlerter(ref, setShowDropdown) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
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

export default function ViewByMenu({
  timePeriods,
  selectedPeriod,
  setSelectedPeriod,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowDropdown);

  return (
    <div ref={wrapperRef} className={styles.container}>
      <span className={styles.label}>View By</span>
      <div
        className={styles.placeholder}
        onClick={() => setShowDropdown((prevState) => !prevState)}>
        <span>{selectedPeriod}</span>
        <ReactSVG src={ChevronDown} />
      </div>
      {showDropdown ? (
        <div className={styles.dropdown}>
          <ul>
            {timePeriods &&
              timePeriods.map((period, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setShowDropdown(false);
                    setSelectedPeriod(period);
                  }}>
                  <span>{period}</span>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
