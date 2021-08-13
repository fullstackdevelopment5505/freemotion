import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { default as MobileHeader } from "./Mobile/Header/Header";
import { default as MobileFooter } from "./Mobile/Footer/Footer";
import Head from "./Head";
import AddedToCartModal from "./AddedToCartModal/AddedToCartModal";
import OrderDetailsModal from "./AccountPages/OrdersPage/OrderDetailsModal/OrderDetailsModal";
import { default as MobileSideMenu } from "./Mobile/Menu/Menu";
import SortModal from "./Mobile/ProductsPage/SortModal/SortModal";
import FilterModal from "./Mobile/ProductsPage/FilterModal/FilterModal";
import DealsDropdown from "./UI-Components/CategoriesDropdowns/DealsDropdown/DealsDropdown";
import BrandsDropdown from "./UI-Components/CategoriesDropdowns/BrandsDropdown/BrandsDropdown";
import ProductsDropdown from "./UI-Components/CategoriesDropdowns/ProductsDropdown/ProductsDropdown";
import MainDropdown from "./LanguageCurrencyModal/MainDropdown";
import LanguageDropdown from "./LanguageCurrencyModal/LanguageDropdown/LanguageDropdown";
import CurrencyDropdown from "./LanguageCurrencyModal/CurrencyDropdown/CurrencyDropdown";
import ReviewModal from "./ProductPage/ReviewModal/ReviewModal";
import ChangeProductModal from "./ProductPage/ChangeProductModal/ChangeProductModal";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage as setStateLanguage } from "../actions/languageActions";
import { setCurrency as setStateCurrency } from "../actions/currencyActions";

export default function Layout(props) {
  // xC -> Currency
  // xL -> Language
  let xC, xL;

  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showBrandsDropdown, setShowBrandsDropdown] = useState(false);
  const [showDealsDropdown, setShowDealsDropdown] = useState(false);

  const [showSideMenu, setShowSideMenu] = useState(false);

  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const stateLanguage = useSelector((state) => state.language.language);
  const stateCurrency = useSelector((state) => state.currency.currency);

  if (stateCurrency) xC = stateCurrency;

  if (stateLanguage) xL = stateLanguage;

  const [currency, setCurrency] = useState(xC);
  const [language, setLanguage] = useState(xL);

  const dispatch = useDispatch();

  useEffect(() => {
    if (stateCurrency != currency) dispatch(setStateCurrency(currency));
  }, [currency]);

  useEffect(() => {
    if (stateLanguage != language) dispatch(setStateLanguage(language));
  }, [language]);

  useEffect(() => {
    showSideMenu && document.body.setAttribute("style", "overflow: hidden");
    !showSideMenu && document.body.setAttribute("style", "overflow: unset");
  }, [showSideMenu]);

  useEffect(() => {
    showOptionsModal && document.body.setAttribute("style", "overflow: hidden");
    !showOptionsModal && document.body.setAttribute("style", "overflow: unset");
  }, [showOptionsModal]);

  useEffect(() => {
    showSideMenu && document.body.setAttribute("style", "overflow: hidden");
    !showSideMenu && document.body.setAttribute("style", "overflow: unset");
  }, [showSideMenu]);

  useEffect(() => {
    showProductsDropdown &&
      document.body.setAttribute("style", "overflow: hidden");
    !showProductsDropdown &&
      document.body.setAttribute("style", "overflow: unset");
  }, [showProductsDropdown]);

  useEffect(() => {
    showBrandsDropdown &&
      document.body.setAttribute("style", "overflow: hidden");
    !showBrandsDropdown &&
      document.body.setAttribute("style", "overflow: unset");
  }, [showBrandsDropdown]);

  useEffect(() => {
    showDealsDropdown &&
      document.body.setAttribute("style", "overflow: hidden");
    !showDealsDropdown &&
      document.body.setAttribute("style", "overflow: unset");
  }, [showDealsDropdown]);

  return (
    <React.Fragment>
      <Head />
      <Header
        language={language}
        currency={currency}
        showOptionsModal={showOptionsModal}
        setShowOptionsModal={setShowOptionsModal}
        setShowBrandsDropdown={setShowBrandsDropdown}
        setShowProductsDropdown={setShowProductsDropdown}
        setShowDealsDropdown={setShowDealsDropdown}
      />
      <MobileHeader
        showOptionsModal={showOptionsModal}
        setShowSideMenu={setShowSideMenu}
        setShowOptionsModal={setShowOptionsModal}
      />
      {showSideMenu && <MobileSideMenu setShowSideMenu={setShowSideMenu} />}
      {props.children}
      <Footer />
      <MobileFooter />
      {/* <AddedToCartModal /> */}
      {/* <OrderDetailsModal /> */}
      {!!showDealsDropdown && (
        <DealsDropdown
          setShowBrandsDropdown={setShowBrandsDropdown}
          setShowProductsDropdown={setShowProductsDropdown}
          setShowDealsDropdown={setShowDealsDropdown}
        />
      )}
      {!!showBrandsDropdown && (
        <BrandsDropdown
          setShowBrandsDropdown={setShowBrandsDropdown}
          setShowProductsDropdown={setShowProductsDropdown}
          setShowDealsDropdown={setShowDealsDropdown}
        />
      )}
      {!!showProductsDropdown && (
        <ProductsDropdown
          setShowBrandsDropdown={setShowBrandsDropdown}
          setShowProductsDropdown={setShowProductsDropdown}
          setShowDealsDropdown={setShowDealsDropdown}
        />
      )}
      {!!showOptionsModal && (
        <MainDropdown
          language={language}
          currency={currency}
          setShowLanguageModal={setShowLanguageModal}
          setShowCurrencyModal={setShowCurrencyModal}
          setShowOptionsModal={setShowOptionsModal}
        />
      )}
      {!!showOptionsModal && !!showLanguageModal && (
        <LanguageDropdown
          language={language}
          setLanguage={setLanguage}
          setShowLanguageModal={setShowLanguageModal}
        />
      )}
      {!!showOptionsModal && !!showCurrencyModal && (
        <CurrencyDropdown
          currency={currency}
          setCurrency={setCurrency}
          setShowCurrencyModal={setShowCurrencyModal}
        />
      )}
    </React.Fragment>
  );
}
