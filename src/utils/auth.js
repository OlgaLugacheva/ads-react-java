import base64 from "react-native-base64";
class Auth {
  constructor(options) {
    this.state = {
      username: "",
      password: "",
    };
    const { username, password } = this.state;
    this._url = options.url;
    this._headers = options.headers;
    this.auth = "Basic " + base64.encode(username + password);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject("We have found an error."`Error: ${res.status}`);
  }

  registration(data) {
    return fetch(`${this._url}/users/`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  authentication(username, password) {
    return fetch(`${this._url}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.auth,
      },
      body: JSON.stringify({ username, password }),
    }).then(this._handleResponse);
  }
}

const auth = new Auth({
  url: "http://localhost:8080",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default auth;
