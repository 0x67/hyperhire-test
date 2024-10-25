export const dateToTimestamp = (date: Date | string, isSecond = true) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return isSecond ? Math.floor(date.getTime() / 1000) : date.getTime();
};

export const timestampToDate = (timestamp: number, isSecond = true) => {
  return new Date(isSecond ? timestamp * 1000 : timestamp);
};

// Get previous interval in minutes
export const getPreviousInterval = (date: Date, interval = 5) => {
  date = new Date(date);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    Math.floor(date.getMinutes() / interval) * interval,
    0,
    0,
  );
};
