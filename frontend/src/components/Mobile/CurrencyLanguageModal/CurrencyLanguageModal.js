import React, { useState, useEffect, useRef } from "react";
import styles from "./CurrencyLanguageModal.module.scss";
import CheckIcon from "../../../svgs/checked.svg";
import French from "../../../svgs/languages_flags/french.svg";
import English from "../../../svgs/languages_flags/english.svg";
import { ReactSVG } from "react-svg";
import { setLanguage as setStateLanguage } from "../../../actions/languageActions";
import { setCurrency as setStateCurrency } from "../../../actions/currencyActions";
import Button from "../../UI-Components/Button/Button";
import Button2 from "../../UI-Components/Button2/Button2";
import { useDispatch, useSelector } from "react-redux";

function useOutsideAlerter(ref, setShowCLMenu) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowCLMenu(false);
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

export default function CurrencyLanguageModal({ setShowCLMenu }) {
  const dispatch = useDispatch();

  const stateLanguage = useSelector((state) => state.language.language);
  const stateCurrency = useSelector((state) => state.currency.currency);

  const [language, setLanguage] = useState(stateLanguage);
  const [currency, setCurrency] = useState(stateCurrency);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowCLMenu);

  const handleClick = () => setShowCLMenu((prevState) => !prevState);

  const savePreferences = () => {
    dispatch(setStateLanguage(language));
    dispatch(setStateCurrency(currency));
    setShowCLMenu((prevState) => !prevState);
  };

  return (
    <div className={styles.overshadow}>
      <div ref={wrapperRef} className={styles.container}>
        <div className={styles.options__container}>
          <div className={styles.language__wrapper}>
            <span className={styles.label}>Language</span>
            <div className={styles.languages__container}>
              <div
                className={styles.language}
                onClick={() => setLanguage("en")}>
                <div>
                  <ReactSVG src={English} />
                  <span>English</span>
                </div>
                {language == "en" && <ReactSVG src={CheckIcon} />}
              </div>
              <div
                className={styles.language}
                onClick={() => setLanguage("fr")}>
                <div>
                  <ReactSVG src={French} />
                  <span>French</span>
                </div>
                {language == "fr" && <ReactSVG src={CheckIcon} />}
              </div>
            </div>
          </div>
          <div className={styles.currency__wrapper}>
            <span className={styles.label}>Currency</span>
            <div className={styles.currencies__container}>
              <div
                className={styles.currency}
                onClick={() => setCurrency("usd")}>
                <span>(USD) US Dollar</span>
                {currency == "usd" && <ReactSVG src={CheckIcon} />}
              </div>
              <div
                className={styles.currency}
                onClick={() => setCurrency("cad")}>
                <span>(CAD) Canadian Dollar</span>
                {currency == "cad" && <ReactSVG src={CheckIcon} />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons__wrapper}>
          <Button
            buttonType={"submit"}
            content={"Cancel"}
            handleClick={handleClick}
          />
          <Button2
            buttonType={"submit"}
            content={"Save"}
            handleClick={savePreferences}
          />
        </div>
      </div>
    </div>
  );
}
