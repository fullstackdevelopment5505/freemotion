import React, { useState } from "react";
import styles from "./CustomCheckbox.module.scss";
import { ReactSVG } from "react-svg";
import CheckedIcon from "../../../svgs/checkbox.svg";

const CustomCheckbox = ({
  checked,
  setChecked,
  labelContent,
  parameter,
  inputName,
  handleChange,
}) => {
  const [defaultCheck, setDefaultCheck] = useState(checked);

  return (
    <div className={styles.checkbox__wrapper}>
      <input
        type="checkbox"
        value={checked}
        style={{ display: "none" }}
        defaultChecked={checked}
        name={inputName}
      />
      <div
        className={styles.checkbox__box}
        style={{
          borderColor: defaultCheck ? "#ff5722" : "#898989",
        }}
        onClick={() => {
          setDefaultCheck((prevstate) => !prevstate);
          if (handleChange) {
            handleChange(defaultCheck, parameter);
          } else {
            setChecked((prevstate) => !prevstate);
          }
          console.log(defaultCheck);
        }}>
        {!!defaultCheck && (
          <ReactSVG
            src={CheckedIcon}
            beforeInjection={(svg) => {
              svg.setAttribute(
                "style",
                "width: 0.75rem; height: 0.75rem; margin-bottom: 4px; padding: 0;",
              );
            }}
          />
        )}
      </div>
      {/* <label htmlFor={inputName}>
      By clicking Place Order you agree to the Terms & Conditions.
        </label>*/}
    </div>
  );
};

export default CustomCheckbox;
