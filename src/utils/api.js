class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(this._response)
      .catch((err) => {
        console.error(err)
      })
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(this._response)
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then(this._response)
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then(this._response)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._response)
      .catch((err) => {
        console.log(err);
      });
  }

  changeLikeCardStatus(id, status) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: `${(status) ? `PUT` : `DELETE`}`,
      headers: this.headers,
    })
      .then(this._response)
      .catch((err) => {
        console.log(err);
      });
  }

  editUserAvatar(user) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: user.avatar
      })
    })
      .then(this._response)
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'b39e5495-8618-4848-8d04-1de0d78a2b88',
    'Content-Type': 'application/json'
  }
});

export default api;
