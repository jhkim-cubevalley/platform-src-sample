const getTwoDigit = (a: number) => {
  if (a >= 10) return `${a}`;
  return `0${a}`;
};

export const formatDate = (date: string) => {
  if (!date || date.length === 0) return "미설정";
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}.${getTwoDigit(month)}.${getTwoDigit(day)}`;
};

export const formatDateObjToString = (dateObj: Date) => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}-${getTwoDigit(month)}-${getTwoDigit(day)}`;
};

export const compareDate = (a: string, b: string) =>
  new Date(a).getTime() - new Date(b).getTime();
