import React, { useState, useEffect, useRef } from "react";
import styles from "./InputDropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

export default function InputDropdown({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowDropdown);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div
        style={{
          borderBottomLeftRadius: showDropdown === true && 0,
          borderBottomRightRadius: showDropdown === true && 0,
        }}
        className={styles.selection}
        onClick={() => setShowDropdown((prevState) => !prevState)}>
        <span>{selectedOption}</span>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {showDropdown ? (
        <div className={styles.dropdown__wrapper}>
          <ul>
            {options.map(
              (option, index) =>
                option !== selectedOption && (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedOption(option);
                      setShowDropdown(false);
                    }}>
                    <span>{option}</span>
                  </li>
                ),
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
