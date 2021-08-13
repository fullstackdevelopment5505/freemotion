module.exports.updateShippingAddress = (data) => {
  console.log(data);

  return {
    type: "UPDATE_SHIPPING_ADDRESS",
    firstName: data.shippingFirstName,
    lastName: data.shippingLastName,
    city: data.shippingCity,
    streetAddressLine1: data.shippingStreetAddressLine1,
    streetAddressLine2: data.shippingStreetAddressLine2,
    country: data.shippingCountry,
    region: data.shippingRegion,
    zipCode: data.shippingZip,
    phoneNumber: data.shippingPhoneNumber,
    email: data.shippingEmail,
  };
};
