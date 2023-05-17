import checkResponse from './checkResponse';

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export default request;
