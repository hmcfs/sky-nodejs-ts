import dayjs from 'dayjs';

function dateFormat(date: Date | string) {
  return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '';
}
export default dateFormat;
