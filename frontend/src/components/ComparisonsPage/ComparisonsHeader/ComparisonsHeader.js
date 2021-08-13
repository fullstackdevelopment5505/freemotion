import React from "react";
import styles from "./ComparisonsHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearComparison } from "../../../actions/comparisonActions";

export default function ComparisonsHeader() {
  const comparisonProductsLength = useSelector(
    (state) => state.comparison.items,
  ).length;
  const dispatch = useDispatch();

  return (
    <div className={styles.header__container}>
      <h2>Compare Products</h2>
      <span>Added Products: {comparisonProductsLength}</span>
      <span onClick={() => dispatch(clearComparison())}>Clear All</span>
    </div>
  );
}
