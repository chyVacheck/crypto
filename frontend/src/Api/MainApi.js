// ? constants
import { STATUS, SETTINGS_API } from './../utils/constants';

class MainApi {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._credentials = setting.credentials;
    this._headers = setting.headers;
  }

  // проверка ответа от сервера
  _checkResponse(res, url, message = '', type) {
    // тут проверка ответа
    if (res.ok) {
      // во время dev выводим в консоль
      if (STATUS.DEV)
        console.log(
          `The request to server [${url}]${
            message && ` for [${message}]`
          } was successfully processed`,
        );

      if (type === 'json') return res.json();
      return res;
    }

    // ? ошибки
    // 429 лимит запросов
    if (res.status === 429) {
      const err = {
        message: res.statusText,
        status: 429,
      };
      // возвращаем ошибку
      return Promise.reject(err);
    }
    // остальные ошибки
    const error = res.json();
    return error.then((errorObj) =>
      Promise.reject({
        message: errorObj.message,
        status: res.status,
      }),
    );
  }

  // запрос на сервер
  async _request(url, options, message, type = 'json') {
    const res = await fetch(url, options);
    return this._checkResponse(res, url, message, type);
  }

  // ? GET

  // получение информации о пользователе
  getUserInfo() {
    return this._request(
      `${this._address}/user/me`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get user info',
    );
  }

  /* получение информации о пользователе по его id

  */
  getUserInfoById(userId) {
    return this._request(
      `${this._address}/admin/users/${userId}`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get user info',
    );
  }

  // получение файла пользователя
  getUserFile(data) {
    const _headers = this._headers;

    _headers['Content-Type'] = data['Content-Type'];

    return this._request(
      `${this._address}/user/me/file/${data.typeOfFile}`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: _headers,
      },
      `get user file ${data.typeOfFile}`,
      data.typeOfFile,
    );
  }

  /* получение файла пользователя по его id

  */
  getUserFileById(data, userId) {
    const _headers = this._headers;

    _headers['Content-Type'] = data['Content-Type'];

    return this._request(
      `${this._address}/admin/users/${userId}/file/${data.typeOfFile}`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: _headers,
      },
      `get user file ${data.typeOfFile}`,
      data.typeOfFile,
    );
  }

  // получение информации о администраторе
  getAdminInfo() {
    return this._request(
      `${this._address}/admin/me`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get admin info',
    );
  }

  // ? POST

  /* авторизация пользователя
    user = {
      email: "test@gmail.com",
      password: "test_password_1"
    }
  */
  authorization(user) {
    return this._request(
      `${this._address}/auth/signin`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'authentication',
    );
  }

  // первичная регистрация пользователя с отправкой проверочного кода на почту
  signup(user) {
    return this._request(
      `${this._address}/auth/signup`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'registration',
    );
  }

  /* проверка почты через проверочный код и последующая, окончательная регистрация пользователя
    user = {
      email: "test@gmail.com",
      code: "FD4BY9"
    }
  */
  verifyEmail(user) {
    return this._request(
      `${this._address}/auth/verifyAndSignup`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'registration',
    );
  }

  // login admin
  loginAdmin(admin) {
    return this._request(
      `${this._address}/auth/login`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(admin),
      },
      'authentication admin',
    );
  }

  /* создание нового администратора
    admin = {
      login: "login",
      email: "email@email.com", // not required
      password: "test_password_1"
    }
  */
  createAdmin(admin) {
    return this._request(
      `${this._address}/admin/createOneAdmin`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(admin),
      },
      'create admin',
    );
  }

  // ? PUT

  /* положить файл пользователю

   */
  putUserFile(data) {
    return this._request(
      `${this._address}/user/me/file/${data.typeOfFile}`,
      {
        method: 'PUT',
        credentials: this._credentials,
        body: data.file,
      },
      `put user file ${data.typeOfFile}`,
    );
  }

  /* положить файл пользователю по его Id

   */
  putUserFileById(data) {
    return this._request(
      `${this._address}/admin/users/${data.userId}/file/${data.typeOfFile}`,
      {
        method: 'PUT',
        credentials: this._credentials,
        body: data.file,
      },
      `put user file ${data.typeOfFile}`,
    );
  }

  // ? PATCH

  /* обновление данных пользователя
    user = {
      name: "new name"
    }
  */
  updateUserData(user) {
    return this._request(
      `${this._address}/user/me`,
      {
        method: 'PATCH',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'update user data',
    );
  }

  /* обновление данных пользователя
    user = {
      name: "new name"
    }
  */
  updateUserDataById(user, userId) {
    return this._request(
      `${this._address}/admin/users/:${userId}`,
      {
        method: 'PATCH',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'update user data',
    );
  }

  // ? DELETE

  /* удаление файла пользователя
   */
  deleteUserFile(typeOfFile) {
    return this._request(
      `${this._address}/user/me/file/${typeOfFile}`,
      {
        method: 'DELETE',
        credentials: this._credentials,
        headers: this._headers,
      },
      `delete user file ${typeOfFile}`,
    );
  }

  /* удаление файла пользователя по его id
   */
  deleteUserFileById(typeOfFile, userId) {
    return this._request(
      `${this._address}/admin/users/${userId}/file/${typeOfFile}`,
      {
        method: 'DELETE',
        credentials: this._credentials,
        headers: this._headers,
      },
      `delete user file ${typeOfFile}`,
    );
  }

  // выход из системы
  logOut() {
    return this._request(
      `${this._address}/auth/signout`,
      {
        method: 'DELETE',
        credentials: this._credentials,
        headers: this._headers,
      },
      'Log out',
    );
  }
}

// настройки для api
const setting = {
  baseUrl: SETTINGS_API.baseURL,
  credentials: SETTINGS_API.credentials,
  headers: {
    origin: SETTINGS_API.baseURL,
    'Content-Type': SETTINGS_API.contentType,
  },
};

const mainApi = new MainApi(setting);
export default mainApi;
