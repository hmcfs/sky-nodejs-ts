import dayjs from 'dayjs';

function dateFormat(date: Date | string | number) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function isValidDate(date: Date | string | number, format = 'YYYY--MM--DD') {
  return dayjs(date, format, true).isValid;
}

export default dateFormat;
