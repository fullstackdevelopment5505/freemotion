import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectViewDropdown.module.scss";
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

export default function SelectViewDropdown({ setListOrder, setUpdate }) {
  const options = [
    <FontAwesomeIcon icon={faThLarge} data-listvalue="block_view" />,
    <FontAwesomeIcon icon={faThList} data-listvalue="list_view" />,
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
                setListOrder(false);
                setUpdate((prevState) => prevState + 1);
              }}>
              {options[0]}
            </li>
            <li
              onClick={() => {
                setSelectedOption(options[1]);
                setShowDropdown(false);
                setListOrder(true);
                setUpdate((prevState) => prevState + 1);
              }}>
              {options[1]}
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
