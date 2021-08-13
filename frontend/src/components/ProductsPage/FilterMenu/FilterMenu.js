import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./FilterMenu.module.scss";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../../actions/filtersActions";

// Price Range Slider
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import { applyFilters } from "../../../helpers/applyFilters";
import Button2 from "../../UI-Components/Button2/Button2";
import CustomCheckbox from "../../UI-Components/CustomCheckbox/CustomCheckbox";

const ColorSetCircle = styled.div`
  background: #${(props) => props.color1};
  z-index: 9;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 50%;
    bottom: 0;
    left: 0;
    background-color: #${(props) => props.color2};
  }

  width: 16px;
  height: 4px;
  object-fit: contain;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.35rem;
`;

const ColorCircle = styled.div`
  width: 15px;
  height: 4px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 0.35rem;
  background: #${(props) => props.color};
  border: ${(props) => props.color === "ffffff" && "1px solid #dedede"};
`;

export default function FilterMenu({
  setBrands,
  filterProducts,
  orderBy,
  maxPrice,
  low,
  high,
  setLow,
  setHigh,
  setUpdate,
}) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);

  const filterBrands = async (brand, action) => {
    setUpdate((prevState) => prevState + 1);
    if (action === "ADD_FILTER") {
      await setBrands((prevBrands) => [...prevBrands, brand]);
      console.log("Added Brand to the collection!");
    } else {
      await setBrands((prevBrands) =>
        prevBrands.filter((item) => item !== brand),
      );
      console.log("Removed Brand from the collection!");
    }
  };

  const checkIfActive = (filterType, filter) => {
    switch (filterType) {
      case "category":
        return filters.categories.includes(filter);
      case "brand":
        return filters.brands.includes(filter);
      case "maxSpeed":
        return filters.maxSpeed.includes(filter);
      case "maxLoad":
        return filters.maxLoad.includes(filter);
    }
  };

  const categories = [
    "All Products",
    "Hoverboards",
    "Electric Unicycles",
    "Electric Scooters",
    "Extras",
  ];

  const brands = [
    "All Brands",
    {
      category: "Minimotors",
      brands: ["Dualtron e-Scooter", "Speedway e-Scooter"],
    },
    "Weped",
    "Currus",
    "Gotway",
  ];

  const speeds = [15, 20, 25, 30, 35, 40, 45, 50];

  const maxLoads = [100, 120, "120 - 150", 147.7, 150];

  const colorsSets = [
    {
      color1: "Black",
      color1Code: "212121",
    },
    {
      color1: "White",
      color1Code: "ffffff",
    },
    {
      color1: "Red",
      color1Code: "DD2424",
      color2: "Black",
      color2Code: "212121",
    },
    {
      color1: "White",
      color1Code: "ffffff",
      color2: "Black",
      color2Code: "212121",
    },
  ];

  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [active6, setActive6] = useState(false);

  useLayoutEffect(() => {
    document.getElementsByClassName("rc-slider-step")[0].style.border = "none";
  }, []);

  const validateLow = (value) => {
    let val = parseFloat(value);

    setLow(val);

    if (val < 0) setLow(0);

    if (val > high) {
      setLow(val);
      setHigh(val);

      if (val > maxPrice) {
        setLow(maxPrice);
        setHigh(maxPrice);
      }
    }
  };

  const validateInput = (evt) => {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
      key = theEvent.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  const validateHigh = (value) => {
    let val = parseFloat(value);
    if (val > maxPrice) setHigh(maxPrice);
    else setHigh(val);
  };

  let hiddenStyles = {
    maxHeight: 0,
    padding: 0,
    margin: 0,
    overflow: "hidden",
    transition: "0.25s ease-in-out",
  };

  const handleCategory = (checked, filter) => {
    setUpdate((prevState) => prevState + 1);
    if (!checked) dispatch(addFilter("category", filter));
    else dispatch(removeFilter("category", filter));
  };

  const handleBrand = (checked, filter) => {
    setUpdate((prevState) => prevState + 1);
    if (!checked) {
      dispatch(addFilter("brand", filter));
      filterBrands(filter, "ADD_FILTER");
    } else {
      dispatch(removeFilter("brand", filter));
      filterBrands(filter, "REMOVE_FILTER");
    }
  };

  const handleMaxSpeed = (checked, filter) => {
    setUpdate((prevState) => prevState + 1);
    if (!checked) dispatch(addFilter("maxSpeed", filter));
    else dispatch(removeFilter("maxSpeed", filter));
  };

  const handleMaxLoad = (checked, filter) => {
    setUpdate((prevState) => prevState + 1);
    if (!checked) dispatch(addFilter("maxLoad", filter));
    else dispatch(removeFilter("maxLoad", filter));
  };

  // Here we'll do the same things as with the previous tags
  const handleColor = (checked, filter) => {};

  return (
    <div className={styles.filterMenu__container}>
      <div className={styles.filter__header}>
        <FontAwesomeIcon icon={faFilter} />
        <p>Filter</p>
      </div>
      <div className={styles.priceFilter}>
        <div
          className={styles.header}
          onClick={() => setActive1((prevState) => !prevState)}>
          <p>Price</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              transform: `rotateZ(${active1 ? 0 : -180}deg)`,
            }}
          />
        </div>
        <div
          className={styles.priceInterval__wrapper}
          style={active1 ? hiddenStyles : {}}>
          <div className={styles.price__limit}>
            <span>$ </span>
            <input
              value={parseFloat(low)}
              onChange={(e) => validateLow(e, e.target.value)}
              onKeyPress={(e) => validateInput(e)}
              onKeyDown={(e) => validateInput(e)}
            />
          </div>
          <span>-</span>
          <div className={styles.price__limit}>
            <span>$ </span>
            <input
              value={high != 0 ? parseFloat(high) : parseFloat(maxPrice)}
              onChange={(e) => validateHigh(e, e.target.value)}
              onKeyPress={(e) => validateInput(e)}
              onKeyDown={(e) => validateInput(e)}
            />
          </div>
        </div>
        <React.Suspense fallback={<p>Loading...</p>}>
          {!!active1 === false && (
            <Range
              value={[low, high ? high : maxPrice]}
              min={0}
              max={maxPrice}
              defaultValue={[0, maxPrice]}
              trackStyle={[
                {
                  padding: "0",
                  border: "none",
                  backgroundColor: "#FF5722",
                },
              ]}
              railStyle={{
                border: "none",
                padding: "0",
                background: "#ECDAD4",
              }}
              dotStyle={{ display: "none" }}
              handleStyle={[
                {
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#FF5722",
                  boxShadow: "none",
                },
                {
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#FF5722",
                  boxShadow: "none",
                },
              ]}
              onChange={(arr) => {
                setLow(arr[0]);
                setHigh(arr[1]);
              }}
            />
          )}
        </React.Suspense>
      </div>
      <div className={styles.categoriesFilter}>
        <div
          className={styles.header}
          onClick={() => setActive2((prevState) => !prevState)}>
          <p>Categories</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              transform: `rotateZ(${active2 ? 0 : -180}deg)`,
            }}
          />
        </div>
        <div
          className={styles.items__wrapper}
          style={active2 ? hiddenStyles : { maxHeight: null }}>
          {categories.map((category, index) => (
            <div key={index} className={styles.item__wrapper}>
              <CustomCheckbox
                checked={checkIfActive("category", category)}
                handleChange={handleCategory}
                parameter={category}
              />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.brandsFilter}>
        <div
          className={styles.header}
          onClick={() => setActive3((prevState) => !prevState)}>
          <p>Brands</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              transform: `rotateZ(${active3 ? 0 : -180}deg)`,
            }}
          />
        </div>
        <div
          id="x"
          className={styles.items__wrapper}
          style={active3 ? hiddenStyles : { maxHeight: null }}>
          {brands.map((brand, index) =>
            brand.category ? (
              <div key={index} className={styles.brand__wrapper}>
                <div key={index} className={styles.brand__name}>
                  <CustomCheckbox
                    checked={checkIfActive("brand", brand.category)}
                    handleChange={handleBrand}
                    parameter={brand.category}
                  />
                  <span>{brand.category}</span>
                </div>
                <div className={styles.brands}>
                  {brand.brands.map((brandx, index) => (
                    <div key={index} className={styles.item__wrapper}>
                      <CustomCheckbox
                        checked={checkIfActive("brand", brandx)}
                        handleChange={handleBrand}
                        parameter={brandx}
                      />
                      <span>{brandx}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div key={index} className={styles.item__wrapper}>
                <CustomCheckbox
                  checked={checkIfActive("brand", brand)}
                  handleChange={handleBrand}
                  parameter={brand}
                />
                <span>{brand}</span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className={styles.maxSpeedFilter}>
        <div
          className={styles.header}
          onClick={() => setActive4((prevState) => !prevState)}>
          <p>Max Speed</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              transform: `rotateZ(${active4 ? 0 : -180}deg)`,
            }}
          />
        </div>
        <div
          className={styles.items__wrapper}
          style={active4 ? hiddenStyles : { maxHeight: null }}>
          {speeds.map((speed, index) => (
            <div key={index} className={styles.item__wrapper}>
              <CustomCheckbox
                checked={checkIfActive("maxSpeed", speed)}
                handleChange={handleMaxSpeed}
                parameter={speed}
              />
              <span>{speed} km/h</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.maxLoadFilter}>
        <div
          className={styles.header}
          onClick={() => setActive5((prevState) => !prevState)}>
          <p>Max Load</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              transform: `rotateZ(${active5 ? 0 : -180}deg)`,
            }}
          />
        </div>
        <div
          className={styles.items__wrapper}
          style={active5 ? hiddenStyles : { maxHeight: null }}>
          {maxLoads.map((load, index) => (
            <div key={index} className={styles.item__wrapper}>
              <CustomCheckbox
                checked={checkIfActive("maxLoad", load)}
                handleChange={handleMaxLoad}
                parameter={load}
              />
              <span>{load} kg</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.colorFilter}>
        <div
          className={styles.header}
          onClick={() => setActive6((prevState) => !prevState)}>
          <p>Color</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              transform: `rotateZ(${active6 ? 0 : -180}deg)`,
            }}
          />
        </div>
        <div
          className={styles.items__wrapper}
          style={active6 ? hiddenStyles : { maxHeight: null }}>
          {colorsSets.map((set, index) => (
            <div key={index} className={styles.item__wrapper}>
              <input
                type="checkbox"
                onChange={(e) => console.log(e.target.checked ? set : "Nope")}
              />
              {set.color2 ? (
                <ColorSetCircle
                  color1={set.color2Code}
                  color2={set.color1Code}
                />
              ) : (
                <ColorCircle color={set.color1Code} />
              )}
              <span>
                {set.color2 ? set.color1 + " and " + set.color2 : set.color1}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button2
        content={"Filter"}
        buttonType={"button"}
        handleClick={filterProducts}
        parameter={orderBy}
      />
    </div>
  );
}
