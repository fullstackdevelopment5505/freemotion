import React, { useState, useEffect, useRef } from "react";
import styles from "./ProductMenu.module.scss";
import ChevronDown from "../../../../../svgs/chevron_down.svg";
import { ReactSVG } from "react-svg";
import ProductsDropdown from "../../../../UI-Components/CategoriesDropdowns/ProductsDropdown/ProductsDropdown";

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

export default function ProductMenu({
  products,
  selectedProduct,
  setSelectedProduct,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowDropdown);

  return (
    <div ref={wrapperRef} className={styles.container}>
      <span className={styles.label}>Product</span>
      <div
        className={styles.placeholder}
        onClick={() => setShowDropdown((prevState) => !prevState)}>
        {selectedProduct ? (
          <span className={styles.selected__product}>{selectedProduct}</span>
        ) : (
          <span className={styles.placeholder}>Select Product</span>
        )}
        <ReactSVG src={ChevronDown} />
      </div>
      {showDropdown ? (
        <div className={styles.dropdown}>
          <ul>
            {products &&
              products.map((product, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setShowDropdown(false);
                    setSelectedProduct(product);
                  }}>
                  <span>{product}</span>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
