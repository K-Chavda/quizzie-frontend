const FormatDate = (date) => {
  const format = { month: "long", day: "numeric", year: "numeric" };
  const dateObj = new Date(date);
  const formatedData = dateObj.toLocaleDateString("en-US", format);

  return formatedData;
};

export default FormatDate;
