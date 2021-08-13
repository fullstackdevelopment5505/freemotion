export const applyFilters = async (filters) => {
  let filtersArr = [];
  if (filters) {
    for (const filter of Object.keys(filters)) {
      if (filters[filter]) {
        var querifiedFilter = "";
        filters[filter].forEach((filter) => {
          querifiedFilter += filter;
          querifiedFilter += ",";
        });
      }
      filtersArr.push({
        filterType: filter,
        filters: querifiedFilter.slice(0, querifiedFilter.length - 1),
      });
    }
    return filtersArr;
  } else return [];
};
