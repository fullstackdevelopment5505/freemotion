const snakeTosentenceCaseConverter = (text) => {
  var result = text.replace(/([A-Z])/g, " $1");
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

const generateMultipleTagsByFilters = (filterType, filtersArray) => {
  const sentenceCaseFilterType = snakeTosentenceCaseConverter(filterType);
  let taggedFilters = [];

  if (filtersArray && filtersArray.length > 1) {
    for (let i = 0; i < filtersArray.length; i++) {
      if (sentenceCaseFilterType == "Categories") {
        taggedFilters.push({
          tag: filtersArray[i],
          filter: filtersArray[i],
          filterType: "category",
        });
      } else if (sentenceCaseFilterType === "Brands") {
        taggedFilters.push({
          tag: `Brand: ${filtersArray[i]}`,
          filter: filtersArray[i],
          filterType: "brand",
        });
      } else {
        taggedFilters.push({
          tag: `${sentenceCaseFilterType}: ${filtersArray[i]}`,
          filter: filtersArray[i],
          filterType: filterType,
        });
      }
    }
  } else if (filtersArray.length == 1) {
    if (sentenceCaseFilterType == "Categories") {
      taggedFilters.push({
        tag: filtersArray[0],
        filter: filtersArray[0],
        filterType: "category",
      });
    } else if (sentenceCaseFilterType === "Brands") {
      taggedFilters.push({
        tag: `Brand: ${filtersArray[0]}`,
        filter: filtersArray[0],
        filterType: "brand",
      });
    } else {
      taggedFilters.push({
        tag: `${sentenceCaseFilterType}: ${filtersArray[0]}`,
        filter: filtersArray[0],
        filterType: filterType,
      });
    }
  }

  return taggedFilters;
};

export const filterTagsGenerator = (filters) => {
  let filtersArray = [];

  if (filters) {
    for (const filter of Object.keys(filters)) {
      if (filters[filter]) {
        filtersArray = filtersArray.concat(
          generateMultipleTagsByFilters(filter, filters[filter]),
        );
      }
    }
    return filtersArray;
  } else {
    return [];
  }
};
