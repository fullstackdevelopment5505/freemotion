module.exports.addFilter = (filterType, filter) => {
  return {
    type: "ADD_CATEGORY_FILTER",
    payload: {
      filterType,
      filter,
    },
  };
};

module.exports.removeFilter = (filterType, filter) => {
  return {
    type: "REMOVE_CATEGORY_FILTER",
    payload: {
      filterType,
      filter,
    },
  };
};

module.exports.clearFilters = () => {
  return {
    type: "REMOVE_FILTERS",
  };
};
