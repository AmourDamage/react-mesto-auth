class Api {
  constructor(options) {
    this.options = options;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-62/users/me', {
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  saveUserInfo(user) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
      method: 'POST',
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  putLikeOnCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  removeLikeOnCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeAvatar(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '30dc7b6b-b6a4-4a32-a5a2-11d734cb8b17',
    'Content-Type': 'application/json',
  },
});

export default api;
