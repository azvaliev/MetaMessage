const CreateDate = () => {
  return new Date();
};

const CompareDates = (past: Date) => {
  // Gets current time & makes sure recieved date is in UTC for proper comparison
  const current = Date.now();
  const pastFormat = FormatDate(new Date(past));
  const pastDate = new Date(past).toUTCString();
  // console.log(current);
  // console.log(pastDate);
  // console.log(Date.parse(pastDate));
  let dif = current - Date.parse(pastDate);
  // convert difference from ms to minutes
  dif = dif / 60000;
  let displayMessage: string;

  if (dif <= 1.9) {
    displayMessage = "Just now";
  } else if (dif < 50) {
    displayMessage = `${Math.round(dif)} minutes ago`;
  } else if (dif <= 70) {
    displayMessage = `1 hour ago`;
  } else if (dif <= 100) {
    displayMessage = `1.5 hours ago`;
  } else if (dif < 1380) {
    displayMessage = `${Math.round(dif / 60)} hours ago`;
  } else if (dif < 2800) {
    displayMessage = `Yesterday`;
  } else if (dif < 8640) {
    displayMessage = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(past);
  } else if (dif < 80320) {
    displayMessage = `${Math.round(dif / 10080)} weeks ago`;
  } else if (dif < 524160) {
    displayMessage = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      past
    );
  } else {
    displayMessage =
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(past) +
      ", " +
      past.getFullYear();
  }
  return [pastFormat, displayMessage];
};

const FormatDate = (date: Date) => {
  let tempDate = date.toDateString();
  return {
    year: date.getFullYear(),
    month: tempDate.substring(4, 7),
    dayOfWeek: tempDate.substring(0, 3),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};

export { CreateDate, CompareDates };
