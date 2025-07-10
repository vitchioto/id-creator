export const DEFAULT_MALE_NAME = 'Jožko';
export const DEFAULT_MALE_SURNAME = 'Mrkvička';
export const DEFAULT_FEMALE_NAME = 'Jarka';
export const DEFAULT_FEMALE_SURNAME = 'Mrkvičková';

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`
}

export const generateRandomDate = (startDate: Date, endDate: Date) => {
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

const generateBirthNumberAddition = (dateString: string) => {
  const digit1 = Math.floor(Math.random() * 10);
  const digit2 = Math.floor(Math.random() * 10);
  let digit3, digit4;

  const sumEven = +dateString[1] + +dateString[3] + +dateString[5] + digit2;
  const sumOdd = +dateString[0] + +dateString[2] + +dateString[4] + digit1;

  const diff = sumEven - sumOdd;

  const absDif = Math.abs(diff) % 11;

  if (diff < 0) {
    digit3 = 0;
    digit4 = absDif;
  } else {
    digit3 = absDif;
    digit4 = 0;
  }

  return `${digit1}${digit2}${digit3}${digit4}`;
}

export const generateBirthNumber = (date: Date, sex: string) => {
  const day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (sex === 'F') month += 50;

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedYear = year.toString().substring(2);

  let result = `${formattedYear}${formattedMonth}${formattedDay}`
  result += `/${generateBirthNumberAddition(result)}`;

  return result;
};

export const generateBirthDetails = (sex: string, age?: number) => {
  let startDate, endDate;

  if (age) {
    const start = new Date();
    const startDay = start.getDate();
    const startMonth = start.getMonth() + 1;
    const startYear = start.getFullYear();

    const end = new Date();
    end.setDate(end.getDate() - 1);
    const endDay = end.getDate();
    const endMonth = end.getMonth() + 1;
    const endYear = end.getFullYear();

    const startYearCalculated = startYear - age - 1;
    const endYearCalculated = endYear - age;

    startDate = new Date(`${startYearCalculated}-${startMonth}-${startDay}`);
    endDate = new Date(`${endYearCalculated}-${endMonth}-${endDay}`);
  } else {
    startDate = new Date('1970-12-31');
    endDate = new Date('1999-12-31');
  }

  const randomBirthDate = generateRandomDate(startDate, endDate);

  const birthDate = formatDate(randomBirthDate);
  const year = randomBirthDate.getFullYear();

  const birthNumber = generateBirthNumber(randomBirthDate, sex);

  return {
    birthDate,
    birthNumber,
    year,
  };
}

export const generateIDNumber = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const c1 = characters.charAt(Math.floor(Math.random() * characters.length));
  const c2 = characters.charAt(Math.floor(Math.random() * characters.length));
  const c3 = Math.floor(Math.random() * 10);
  const c4 = Math.floor(Math.random() * 10);
  const c5 = Math.floor(Math.random() * 10);
  const c6 = Math.floor(Math.random() * 10);
  const c7 = Math.floor(Math.random() * 10);
  const c8 = Math.floor(Math.random() * 10);

  return `${c1}${c2}${c3}${c4}${c5}${c6}${c7}${c8}`;
};
