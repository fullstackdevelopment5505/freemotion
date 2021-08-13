///////////////////////////////////////////////////////////
////////////////////// Documentation //////////////////////
/* ////////////////////////////////////////////////////////


maxLoad -> maxLoadInKilograms_in
maxRange -> maxRangeInKilometeres_in
brands -> brands_in
categories -> categories_in


*/ ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

const modifyFilters = (stateFilters) => {
  console.log(stateFilters);

  let filters = {
    category_in: [],
    maxSpeedInKilometers_in: [],
    brand_in: [],
    maxLoadInKilograms_in: [],
    currentPrice_gte: stateFilters.minPrice, // Min Price
    currentPrice_lte: stateFilters.maxPrice, // Max Price
  };

  for (const filter in stateFilters) {
    switch (filter) {
      case "categories":
        if (stateFilters.categories.length > 0)
          filters.category_in = stateFilters[filter];
      case "brands":
        if (stateFilters.brands.length > 0)
          filters.brand_in = stateFilters[filter];
      case "maxSpeed":
        if (stateFilters.maxSpeed.length > 0)
          filters.maxSpeedInKilometers_in = stateFilters[filter];
      case "maxLoad":
        if (stateFilters.maxLoad.length > 0)
          filters.maxLoadInKilograms_in = stateFilters[filter];
      case "minPrice":
        if (stateFilters.minPrice != 0)
          filters.currentPrice_gte = stateFilters[filter];
      case "maxPrice":
        if (stateFilters.minPrice != 0)
          filters.currentPrice_lte = stateFilters[filter];
    }
  }

  return filters;
};

const isEmpty = (filters) => {
  let empty = true;

  console.log(filters);
  for (const filter of Object.keys(filters)) {
    if (typeof filters[filter] == "object") {
      if (filters[filter].length > 0) {
        empty = false;
        break;
      }
    } else {
      if (filters[filter] != 0) {
        empty = false;
        break;
      }
    }
  }
  return empty;
};

module.exports.generateQuery = (stateFilters, orderBy) => {
  let filters = modifyFilters(stateFilters);
  let queryHeader = ``;

  console.log(filters);

  if (!isEmpty(filters)) {
    queryHeader += `(order: ${orderBy}`;
    queryHeader += ", where: {";
    for (const filter in filters) {
      if (typeof filters[filter] == "object") {
        if (filters[filter].length == 0) continue;
      } else {
        if (filters[filter] == 0) continue;
      }
      if (filter === "currentPrice_gte" || filter === "currentPrice_lte")
        queryHeader += `${filter}: ${filters[filter]}, `;
      else {
        queryHeader += `${filter}: [`;
        const array = filters[filter];
        for (let i = 0; i < array.length; i++) {
          if (i !== array.length - 1) {
            if (typeof array[i] == "string") queryHeader += `"${array[i]}", `;
            else queryHeader += `${array[i]}, `;
          } else {
            if (typeof array[i] == "string") queryHeader += `"${array[i]}"], `;
            else queryHeader += `${array[i]}], `;
          }
        }
      }
    }
    queryHeader = queryHeader.slice(0, -2);
    queryHeader += `})`;
  } else queryHeader = `(order: ${orderBy})`;

  let query = `
    query {
      productCollection${queryHeader} {
        items {
          productName
          productImage {
            url
          }
          sku
          oldPrice
          brand
          currentPrice
          sys {
            id
          }

        }
      }
    }
  `;

  console.log(query);

  return query;
};
