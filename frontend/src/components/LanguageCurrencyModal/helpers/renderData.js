import React from "react";
import { ReactSVG } from "react-svg";
import French from "../../../svgs/languages_flags/french.svg";
import English from "../../../svgs/languages_flags/english.svg";

export const renderCurrencyData = (currencyState) => {
  switch (currencyState) {
    case "usd":
      return "(USD) US Dollar";
    case "cad":
      return "(CAD) Canadian Dollar";
  }
};

export const renderLanguageData = (languageState) => {
  switch (languageState) {
    case "en":
      return (
        <React.Fragment>
          <ReactSVG src={English} />
          <span>English</span>
        </React.Fragment>
      );
    case "fr":
      return (
        <React.Fragment>
          <ReactSVG src={French} />
          <span>French</span>
        </React.Fragment>
      );
  }
};

////////// Render Header Data //////////

// Render Language Data
export const renderDataHeaderLanguage = (languageState) => {
  switch (languageState) {
    case "en":
      return <ReactSVG src={English} />;

    case "fr":
      return <ReactSVG src={French} />;
  }
};

// Render Currency Data
export const renderDataHeaderCurrency = (currencyState) => {
  switch (currencyState) {
    case "usd":
      return "USD $";
    case "cad":
      return "CAD C$";
  }
};
