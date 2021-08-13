import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectNumItemsDropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faThList,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

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

export default function SelectOrderDropdown({ setNumItemsPerPage }) {
  const options = [12, 24, 36];

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
            <li
              onClick={() => {
                setSelectedOption(options[0]);
                setShowDropdown(false);
                setNumItemsPerPage(12);
              }}>
              <span>{options[0]}</span>
            </li>
            <li
              onClick={() => {
                setSelectedOption(options[1]);
                setShowDropdown(false);
                setNumItemsPerPage(24);
              }}>
              <span>{options[1]}</span>
            </li>
            <li
              onClick={() => {
                setSelectedOption(options[2]);
                setShowDropdown(false);
                setNumItemsPerPage(36);
              }}>
              <span>{options[2]}</span>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
