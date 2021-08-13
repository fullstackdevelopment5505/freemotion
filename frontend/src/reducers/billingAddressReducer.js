const initialState = {
  address: {
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    region: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
  },
};

const billingAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SHIPPING_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          firstName: action.firstName,
          lastName: action.lastName,
          city: action.city,
          country: action.country,
          region: action.region,
          streetAddressLine1: action.streetAddressLine1,
          streetAddressLine2: action.streetAddressLine2,
          zipCode: action.zipCode,
          phoneNumber: action.phoneNumber,
          email: action.email,
        },
      };

    default:
      return state;
  }
};

export default billingAddressReducer;
