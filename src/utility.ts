export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`
}

export const DEFAULT_MALE_NAME = 'Jožko';
export const DEFAULT_MALE_SURNAME = 'Mrkvička';
export const DEFAULT_FEMALE_NAME = 'Jarka';
export const DEFAULT_FEMALE_SURNAME = 'Mrkvičková';