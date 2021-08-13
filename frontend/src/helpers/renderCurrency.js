import getUserCountry from "js-user-country";

export default function renderCurrency(currency) {
  if (currency == "cad") return "C$";
  if (currency == "usd") return "€";
}

export const renderCurrencyLocale = (amount) => {
  let country = getUserCountry().id;

  let currency = JSON.parse(
    JSON.parse(window.localStorage.getItem("persist:root")).currency,
  ).currency;

  let language = JSON.parse(
    JSON.parse(window.localStorage.getItem("persist:root")).language,
  ).language;

  return new Intl.NumberFormat(`${language}-${country}`, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};
