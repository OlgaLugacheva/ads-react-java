import base64 from "react-native-base64";
class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._state = {
      username: "",
      password: "",
    };
    const { username, password } = this._state;
    this._auth = "Basic " + base64.encode(username + password);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  //user
  getUserInfo() {
    return fetch(`${this._url}/users/me/`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getUsersAds(page) {
    return fetch(`${this._url}/ads/me/?page=${page}`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  updateUser(data) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: this._auth,
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  updateUserPhoto(image) {
    const formData = new FormData();
    formData.append("image", image);
    return fetch(`${this._url}/users/me/`, formData, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: this._auth,
      },
    }).then(this._handleResponse);
  }

  //comment|comments
  getComments(ad_pk) {
    return fetch(`${this._url}/ads/${ad_pk}/comments/`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getComment(adId, commentId) {
    return fetch(`${this._url}/ads/${adId}/comments/${commentId}/`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //ads
  getAds(page) {
    return fetch(this._url + `page=${page}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getAdsTitle(ad, page) {
    return fetch(this._url + `title=${ad}&page=${page}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getHiddenAds(page) {
    return fetch(this._url + `page=${page}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getHiddenAdsTile(page, ad) {
    return fetch(this._url + `page=${page}&title=${ad}`, {
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

    fetch(`${this._url}/ads/`, formData, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: this._auth,
      },
    }).then(this._handleResponse);
  }

  //edit ad
  editAdd(id, data) {
    return fetch(`${this._url}/ads/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: this._auth,
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
}

const api = new Api({
  url: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
