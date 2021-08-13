import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectOrderDropdown.module.scss";
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

export default function SelectOrderDropdown({ setOrderBy, setUpdate }) {
  const options = [
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "By Release Date, Asc",
    "By Release Date, Desc",
  ];

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
                setOrderBy("productName_ASC");
                setUpdate((prevState) => prevState + 1);
              }}>
              <span>{options[0]}</span>
            </li>
            <li
              onClick={() => {
                setSelectedOption(options[1]);
                setShowDropdown(false);
                setOrderBy("productName_DESC");
                setUpdate((prevState) => prevState + 1);
              }}>
              <span>{options[1]}</span>
            </li>
            <li
              onClick={() => {
                setSelectedOption(options[2]);
                setShowDropdown(false);
                setOrderBy("sys_publishedAt_ASC");
                setUpdate((prevState) => prevState + 1);
              }}>
              <span>{options[2]}</span>
            </li>
            <li
              onClick={() => {
                setSelectedOption(options[3]);
                setShowDropdown(false);
                setOrderBy("sys_publishedAt_DESC");
                setUpdate((prevState) => prevState + 1);
              }}>
              <span>{options[3]}</span>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
