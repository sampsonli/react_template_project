/**
 * 默认发生任何异常都返回一个空对象
 * Created by lichun on 2021/5/10.
 */
import axios from 'axios';

const options = {
  baseURL: '/api',
  timeout: 20000,
};
const _axios = axios.create(options);

const jumpLogin = () => {
  sessionStorage.setItem('_back_url', window.location.href);
  window.location.replace(`${window.location.href.split('?')[0] }/login`);
};

_axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('_token');
  if (token) {
    config.headers.token = token;
  }
  // config.headers.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IjAxMzg4MDA3IiwiZXhwIjoxNjIyMjY4NDYyLCJ1c2VySWQiOiI3OTcifQ.IFYQ2_N2of62ifQmnQDNuLzkqDEx8hxo_1XvRKPOoUM';
  return config;
});
_axios.interceptors.response.use((response) => {
  if (response.data.code === 10002) {
    jumpLogin();
  }
  return response;
});
export const get = function (url, config) {
  return _axios.get(url, config).then((response) => {
    if (response && response.status === 200) {
      return response.data;
    }
    throw new Error(response.message);
  });
};
export const post = function (url, param, config) {
  return _axios.post(url, param, config).then((response) => {
    if (response && response.status === 200) {
      return response.data;
    }
    throw new Error(response.message);
  });
};

export const generator = (Apis) => {
  const result = {};
  Object.keys(Apis).forEach(key => {
    const {
      url, method, config, mockUrl, isMock = false,
    } = Apis[key];
    const furl = isMock ? (mockUrl || url) : url;
    if (method === 'get' || method === 'GET') {
      result[key] = (params = {}) => {
        const p = Object.keys(params);
        let reqUrl = `${furl}?_t=${ Date.now()}`;
        if (p.length) {
          reqUrl = `${reqUrl }&${ Object.keys(params).map((k) => [k, params[k]].join('=')).join('&')}`;
        }
        return get(reqUrl, config);
      };
    } else if (method === 'post' || method === 'POST') {
      result[key] = (params = {}) => post(furl, params, config);
    }
  });
  return result;
};
