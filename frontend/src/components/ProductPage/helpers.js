export const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const objectedProperties = (product) => {
  const properties = [
    "Model",
    "Color",
    "Wheel Size",
    "Battery",
    "Motor Type",
    "Weight",
    "Max Climb Angle",
  ];
  let propertiesArr = [];
  let maxSpeedProperty = `Up to ${product.maxSpeedInMiles} Mph, Up to ${product.maxSpeedInKilometers} Kmh`;
  let maxLoadProperty = `${product.maxLoadInKilograms} Kg, ${product.maxLoadInPounds} Lbs`;
  let maxRangeProperty = `Up to ${product.maxRangeInMiles} Mph, Up to ${product.maxRangeInKilometers} Kmh`;

  propertiesArr.push(
    {
      name: "Max Speed",
      description: maxSpeedProperty,
    },
    {
      name: "Max Load",
      description: maxLoadProperty,
    },
    {
      name: "Max Range",
      description: maxRangeProperty,
    },
  );

  properties.forEach((property) => {
    propertiesArr.push({
      name: property,
      description: product[camelize(property)],
    });
  });
  return propertiesArr;
};

export const capitalizeOptions = (optionsArray) => {
  let arr = [];
  if (optionsArray?.length) {
    optionsArray.forEach((mySentence) => {
      let words = mySentence.replace(/\s\s+/g, " ").split(" ");

      words.map((word, index) => {
        let newWord = "";
        newWord = newWord + word[0].toUpperCase() + word.substring(1);
        words[index] = newWord + " ";
      });

      arr.push(words);
    });
  }
  return arr;
};
