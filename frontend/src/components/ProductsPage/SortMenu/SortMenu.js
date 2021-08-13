import React, { useState, useEffect } from "react";
import styles from "./SortMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";
import InputDropdown from "../../UI-Components/InputDropdown/InputDropdown";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, removeFilter } from "../../../actions/filtersActions";
import { filterTagsGenerator } from "../../../helpers/generateFilterTags";
import { ReactSVG } from "react-svg";
import TimesIcon from "../../../svgs/times.svg";
import SelectViewDropdown from "../SelectViewDropdown/SelectViewDropdown";
import SelectOrderDropdown from "../SelectOrderDropdown/SelectOrderDropdown";
import SelectNumItemsDropdown from "../SelectNumItemsDropdown/SelectNumItemsDropdown";
import { connect } from "react-redux";

function SortMenu({
  listOrder,
  setListOrder,
  orderBy,
  setOrderBy,
  currentPage,
  numItems,
  numItemsPerPage,
  setNumItemsPerPage,
  update,
  setUpdate,
}) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(
    useSelector((state) => state.filters.filters),
  );

  const [filterTags, setFilterTags] = useState(null);
  const [updateFilter, setUpdateFilter] = useState(false);

  useEffect(() => {
    const tags = filterTagsGenerator(filters);
    setFilterTags(tags);
    console.log(tags);
  }, [listOrder, setListOrder]);

  useEffect(() => {
    let stateFilters = JSON.parse(
      JSON.parse(window.localStorage.getItem("persist:root")).filters,
    ).filters;
    setFilters(stateFilters);

    let xtags = filterTagsGenerator(stateFilters);
    setFilterTags(xtags);
  }, [update]);

  const renderMenuPagination = (currentPage, numItems, numItemsPerPage) => {
    const prevPage = currentPage - 1;
    let startingIndex = prevPage * numItemsPerPage + 1;
    let endIndex =
      currentPage * numItemsPerPage > numItems
        ? numItems
        : currentPage * numItemsPerPage;
    return `${startingIndex} - ${endIndex}`;
  };

  return (
    <div className={styles.sortMenu}>
      <h3>Products</h3>
      <div className={styles.sortingFilters__container}>
        <div className={styles.leftGroup}>
          <div className={styles.numResults}>
            <span>
              {renderMenuPagination(currentPage, numItems, numItemsPerPage)}
            </span>
            <span>of</span>
            <span>{numItems} Results</span>
          </div>
          <div className={styles.numResults__page}>
            <span>Show:</span>
            <SelectNumItemsDropdown setNumItemsPerPage={setNumItemsPerPage} />
          </div>
        </div>
        <div className={styles.rightGroup}>
          <div className={styles.sortBy}>
            <span>Sort by:</span>
            <SelectOrderDropdown
              setOrderBy={setOrderBy}
              setUpdate={setUpdate}
            />
          </div>
          <div className={styles.viewAs}>
            <span>View as:</span>
            <SelectViewDropdown
              setListOrder={setListOrder}
              setUpdate={setUpdate}
            />
          </div>
        </div>
      </div>
      <div className={styles.filters__container}>
        <div className={styles.filters__wrapper}>
          {filterTags?.map((tag, index) => (
            <div key={index} className={styles.filter}>
              {/* Fix Tag Removal !!! */}

              <span>{tag.tag}</span>
              <ReactSVG
                src={TimesIcon}
                onClick={() => {
                  dispatch(removeFilter(tag.filterType, tag.filter));
                  setUpdateFilter((prevState) => prevState + 1);
                }}
              />
            </div>
          ))}
        </div>
        <span
          className={styles.resetAll}
          onClick={() => {
            setUpdateFilter((prevState) => prevState + 1);
            dispatch(clearFilters());
          }}>
          Reset All
        </span>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    filters: state.filters.filters,
  };
}

export default connect(mapStateToProps)(SortMenu);
