import base64 from "react-native-base64";
class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this.state = {
      username: "",
      password: "",
    };
    const { username, password } = this.state;
    this.auth = "Basic " + base64.encode(username + password);
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
        Authorization: this.auth,
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
        Authorization: this.auth,
      },
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
