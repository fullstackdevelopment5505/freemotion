const initialState = {
  filters: {
    categories: [],
    brands: [],
    maxSpeed: [],
    maxLoad: [],
    minPrice: 0,
    maxPrice: 0,
  },
};

const getUniqueFilters = (filter, filtersArray) => {
  if (!filtersArray.includes(filter)) filtersArray.push(filter);
  return filtersArray;
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY_FILTER":
      switch (action.payload.filterType) {
        case "brand":
          return {
            ...state,
            filters: {
              ...state.filters,
              brands: getUniqueFilters(
                action.payload.filter,
                state.filters.brands,
              ),
            },
          };

        case "category":
          return {
            ...state,
            filters: {
              ...state.filters,
              categories: getUniqueFilters(
                action.payload.filter,
                state.filters.categories,
              ),
            },
          };

        case "maxSpeed":
          return {
            ...state,
            filters: {
              ...state.filters,
              maxSpeed: getUniqueFilters(
                action.payload.filter,
                state.filters.maxSpeed,
              ),
            },
          };

        case "maxLoad":
          return {
            ...state,
            filters: {
              ...state.filters,
              maxLoad: getUniqueFilters(
                action.payload.filter,
                state.filters.maxLoad,
              ),
            },
          };

        case "minPrice":
          return {
            ...state,
            filters: {
              ...state.filters,
              minPrice: action.payload.filter,
            },
          };

        case "maxPrice":
          return {
            ...state,
            filters: {
              ...state.filters,
              maxPrice: action.payload.filter,
            },
          };
      }

    case "REMOVE_CATEGORY_FILTER":
      switch (action.payload.filterType) {
        case "brand":
          return {
            ...state,
            filters: {
              ...state.filters,
              brands: state.filters.brands.filter(
                (brand) => brand != action.payload.filter,
              ),
            },
          };

        case "category":
          return {
            ...state,
            filters: {
              ...state.filters,
              categories: state.filters.categories.filter(
                (category) => category != action.payload.filter,
              ),
            },
          };

        case "maxSpeed":
          return {
            ...state,
            filters: {
              ...state.filters,
              maxSpeed: state.filters.maxSpeed.filter(
                (mSpeed) => mSpeed != action.payload.filter,
              ),
            },
          };

        case "maxLoad":
          return {
            ...state,
            filters: {
              ...state.filters,
              maxLoad: state.filters.maxLoad.filter(
                (mLoad) => mLoad != action.payload.filter,
              ),
            },
          };
      }

    case "REMOVE_FILTERS":
      return initialState;

    default:
      return state;
  }
};

export default filtersReducer;
