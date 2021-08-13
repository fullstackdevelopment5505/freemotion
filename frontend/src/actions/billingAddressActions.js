module.exports.updateBillingAddress = (data) => {
  console.log(data);

  return {
    type: "UPDATE_BILLING_ADDRESS",
    firstName: data.billingFirstName,
    lastName: data.billingLastName,
    city: data.billingCity,
    streetAddressLine1: data.billingStreetAddressLine1,
    streetAddressLine2: data.billingStreetAddressLine2,
    country: data.billingCountry,
    region: data.billingRegion,
    zipCode: data.billingZip,
    phoneNumber: data.billingPhoneNumber,
    email: data.billingEmail,
  };
};
