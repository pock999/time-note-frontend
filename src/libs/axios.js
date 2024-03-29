// axios
import axios from 'axios';
import JsonHelper from '../utils/JsonHelper';

import 'regenerator-runtime/runtime';
import _ from 'lodash';

const axiosIns = axios;

axiosIns.defaults.baseURL = process.env.REACT_API_URL;
const getAccessToken = () => window.localStorage.getItem('token');

axiosIns.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;

// Or you can use an interceptor if adding tokens etc.
// ======================================
axiosIns.interceptors.request.use(async (request) => {
  // const token = await updateToken();
  // config.headers.common.Authorization = `Bearer ${token}`;
  request.headers.Authorization = localStorage.getItem('token');
  return request;
});

axiosIns.interceptors.response.use(
  async (response) => response,
  (error) => {
    console.log('=== response ===');

    console.log('axios error => ', error);

    // 強制登出
    if (_.get(JsonHelper.JsonReParse(error), 'status') === 401) {
      localStorage.clear();
      axiosIns.defaults.headers.common.Authorization = '';
    }

    throw error.response.data;
  }
);

export default axiosIns;
