import base64 from "react-native-base64";

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  //user
  getUserInfo = async () => {
    return await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  };

  getUsersAds = async () => {
    return await fetch(`${this._url}/ads/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  };

  updateUser(data, username, password) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64.encode}(${username} ${password})`,
      },
    }).then(this._handleResponse);
  }

  updateUserPhoto(image) {
    const formData = new FormData();
    formData.append("image", image);
    return fetch(`${this._url}/users/me`, formData, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
    }).then(this._handleResponse);
  }

  //comment|comments
  getComments(ad_pk) {
    return fetch(`${this._url}/ads/${ad_pk}/comments`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getComment(adId, commentId) {
    return fetch(`${this._url}/ads/${adId}/comments/${commentId}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addComment(id, text) {
    return fetch(`${this._url}/ads/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
      body: JSON.stringify(text),
    }).then(this._handleResponse);
  }

  editComment(adId, commentId, data) {
    return fetch(`${this._url}/ads/${adId}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteComment(adId, commentId) {
    return fetch(`${this._url}/ads/${adId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
    });
  }

  //ads
  getAds() {
    return fetch(`${this._url}/ads`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getHiddenAds() {
    return fetch(`${this._url}/ads`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addAd({ image, title, price, description }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", `${title}`);
    formData.append("price", `${price}`);
    formData.append("description", `${description}`);

    fetch(`${this._url}/ads`, formData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
    }).then(this._handleResponse);
  }

  //get Ad
  getAd(id) {
    return fetch(`${this._url}/ads/${id}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //edit ad
  editAdd(id, data) {
    return fetch(`${this._url}/ads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  editAddPhoto(id, image) {
    const formData = new FormData();
    formData.append("image", image);
    return fetch(`${this._url}/ads/${id}`, formData, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
    }).then(this._handleResponse);
  }

  //delite add
  deleteAdd(id) {
    return fetch(`${this._url}/ads/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic user password",
      },
    });
  }
}

const api = new Api({
  url: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
