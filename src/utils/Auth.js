export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    })
    .then(() => {
      return {
        data: {
          _id: '5f5204c577488bcaa8b7bdf2',
          email: email,
        },
      };
    });
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return;
      }
    });
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    })
    .then((data) => {
      return data;
    });
}
