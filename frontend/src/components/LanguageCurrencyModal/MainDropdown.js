import React, { useState, useEffect, useRef } from "react";
import styles from "./MainDropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { renderCurrencyData, renderLanguageData } from "./helpers/renderData";
import Button from "../UI-Components/Button/Button";
import Button2 from "../UI-Components/Button2/Button2";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../actions/languageActions";
import { setCurrency } from "../../actions/currencyActions";

export default function MainDropdown({
  language,
  currency,
  setShowLanguageModal,
  setShowCurrencyModal,
  setShowOptionsModal,
}) {
  const dispatch = useDispatch();

  const savePreferences = () => {
    dispatch(setLanguage(language));
    dispatch(setCurrency(currency));
    setShowOptionsModal((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.language__dropdown}
          onClick={() => setShowLanguageModal(true)}>
          <span className={styles.label}>Language</span>
          <div
            className={styles.selection}
            onClick={() => setShowLanguageModal((prevState) => !prevState)}>
            <div>{renderLanguageData(language)}</div>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        <div
          className={styles.currency__dropdown}
          onClick={() => setShowCurrencyModal(true)}>
          <span className={styles.label}>Currency</span>
          <div
            className={styles.selection}
            onClick={() => setShowCurrencyModal((prevState) => !prevState)}>
            <div>{renderCurrencyData(currency)}</div>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        <Button2
          content={"Save"}
          handleClick={savePreferences}
          parameter={false}
        />
      </div>
    </div>
  );
}
