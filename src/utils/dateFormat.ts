import dayjs from 'dayjs';

function dateFormat(date: Date | string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}
export default dateFormat;
