import _ from 'lodash';
import dayjs from 'dayjs';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dateFormat = (dayTime) =>
  dayjs(dayTime).format('YYYY-MM-DD HH:mm:ss');

export const getCurrent = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
