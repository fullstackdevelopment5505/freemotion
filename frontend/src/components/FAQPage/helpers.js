export const parseFaqContent = (dataArray) => {
  let sectionsArray = [];
  var sectionData = {
    header: "",
    faqContent: [],
  };
  if (dataArray && dataArray.length) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].nodeType === "heading-4") {
        sectionData.header = dataArray[i].content[0].value;
      } else if (dataArray[i].nodeType === "unordered-list") {
        sectionData.faqContent.push({
          question: dataArray[i].content[0].content[0].content[0].value,
          answer: dataArray[i].content[1].content[0].content[0].value,
          setId: i,
        });
      } else if (dataArray[i].nodeType === "hr") {
        sectionsArray.push(sectionData);
        sectionData = {
          header: "",
          faqContent: [],
        };
      }
    }
    return sectionsArray;
  } else return [];
};
