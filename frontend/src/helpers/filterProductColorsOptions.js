// Filtered Contentful Product Colors
module.exports.filterColorOptions = (colors) => {
  let filteredColors = [];

  for (let i = 0; i < colors.length; i++) {
    switch (colors[i].toLowerCase()) {
      case "white":
        filteredColors.push({
          color1: "White",
          color1Code: "ffffff",
        });
        break;

      case "black":
        filteredColors.push({
          color1: "Black",
          color1Code: "212121",
        });
        break;

      case "red":
        filteredColors.push({
          color1: "Red",
          color1Code: "dd2424",
        });
        break;
    }

    if (colors[i].includes("red") && colors[i].includes("black"))
      filteredColors.push({
        color1: "Red",
        color1Code: "dd2424",
        color2: "Black",
        color2Code: "212121",
      });

    if (colors[i].includes("white") && colors[i].includes("black"))
      filteredColors.push({
        color1: "White",
        color1Code: "ffffff",
        color2: "Black",
        color2Code: "212121",
      });
  }

  return filteredColors;
};
