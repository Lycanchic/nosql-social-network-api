const addDateSuffix = (date) => {
  let dateStr = date.toString();

  //get last char of date string
  const months = {
    short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    long: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  module.exports = (
    timestamp,
    { monthLength = "short", dateSuffix = true } = {}
  ) => {
    const dateObj = new Date(timestamp);
    const formattedMonth = months[monthLength][dateObj.getMonth()];
    const formattedDate = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
    const formattedYear = dateObj.getFullYear();
    let formattedHour = dateObj.getHours() % 12;
    formattedHour = formattedHour === 0 ? 12 : formattedHour;
    const formattedMinutes =
      (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();
    const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";
    const formattedTimeStamp = `${formattedMonth} ${formattedDate}, ${formattedYear} at ${formattedHour}:${formattedMinutes} ${periodOfDay}`;

    return formattedTimeStamp;
  };
};
