import axios from '../libs/axios';
import Swal from 'sweetalert2';

import JsonHelper from '../utils/JsonHelper';
import { sleep } from '../utils/commons';

const ApiService = {
  setToken(token) {
    axios.defaults.headers.common.Authorization = token;
  },
  clearToken() {
    axios.defaults.headers.common.Authorization = '';
  },
  async get({ url, data = null, queryString = null, headers }) {
    try {
      const res = await axios({
        url: queryString ? `${url}?${queryString}` : url,
        method: 'get',
        ...(data ? { data } : {}),
      });

      return res;
    } catch (e) {
      console.log('20: e => ', JsonHelper.JsonReParse(e));
      // 當網路異常時 (例: 後端未啟動)，一直跑重新取值請求
      if (e.message === 'Network Error') {
        Swal.fire({
          title: '連線重試中',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        let exit = false;
        while (!exit) {
          // 每次請求間隔3秒
          await sleep(3000);

          try {
            const result = await axios({
              url: queryString ? `${url}?${queryString}` : url,
              method: 'get',
              ...(data ? { data } : {}),
              ...(headers ? { headers } : {}),
            });

            exit = true;
            await Swal.close();
            return result;
          } catch (err) {
            console.log(err);
          }
        }
      }

      throw e;
    }
  },

  async post({ url, data = null }) {
    try {
      return axios({
        url,
        method: 'post',
        ...(data ? { data } : {}),
      });
    } catch (e) {
      throw e;
    }
  },

  async put({ url, data = null, queryString = null }) {
    try {
      return axios({
        url: queryString ? `${url}?${queryString}` : url,
        method: 'put',
        ...(data ? { data } : {}),
      });
    } catch (e) {
      throw e;
    }
  },

  async patch({ url, data = null, queryString = null }) {
    try {
      return axios({
        url: queryString ? `${url}?${queryString}` : url,
        method: 'patch',
        ...(data ? { data } : {}),
      });
    } catch (e) {
      throw e;
    }
  },

  async delete({ url, data = null, queryString = null }) {
    try {
      return axios({
        url: queryString ? `${url}?${queryString}` : url,
        method: 'delete',
        ...(data ? { data } : {}),
      });
    } catch (e) {
      throw e;
    }
  },

  async download({ url, data = null, queryString = null }) {
    try {
      return axios({
        url: queryString ? `${url}?${queryString}` : url,
        method: 'get',
        ...(data ? { data } : {}),
        responseType: 'blob',
      });
    } catch (e) {
      throw e;
    }
  },

  async upload({ url, formData = null }) {
    try {
      return axios({
        url,
        method: 'post',
        ...(formData ? { data: formData } : {}),
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (e) {
      throw e;
    }
  },
};

export default ApiService;
