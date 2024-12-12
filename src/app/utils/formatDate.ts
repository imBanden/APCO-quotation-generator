import moment from "moment";

const formatDate = (day: number, month: number, year: number) => {
  // Create a Moment.js date object
  const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");

  // Format the date with 'Do' for ordinal suffix
  return date.format("Do MMMM YYYY");
};

export default formatDate;
