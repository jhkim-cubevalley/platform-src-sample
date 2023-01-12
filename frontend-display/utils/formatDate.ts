const getTwoDigit = (a: number) => {
  if (a >= 10) return `${a}`;
  return `0${a}`;
};
const dayArr = ["일", "월", "화", "수", "목", "금", "토"];

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}.${getTwoDigit(month)}.${getTwoDigit(day)}`;
};

export const dateToString = (dateObj: Date) => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}-${getTwoDigit(month)}-${getTwoDigit(day)}`;
};

export const compareDate = (a: string, b: string) =>
  new Date(a).getTime() - new Date(b).getTime();

export const getDay = (dayString: string) => {
  const dateObj = new Date(dayString);
  const day = dayArr[dateObj.getDay()];
  return day;
};
