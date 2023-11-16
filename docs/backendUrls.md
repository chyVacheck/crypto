# backend urls

## auth

- _POST_ `/api/v1/auth/signup`

  ```json
  {
    "name": "test_name_1",
    "secondName": "test_secondName_1",
    "email": "test@gmail.com",
    "phone": "test_phone_1",
    "password": "test_password_1"
  }
  ```

  Answer:

  ```json
  {
    "message": "Email was successfully send to your mail address"
  }
  ```

---

- _POST_ `/api/v1/auth/verifyAndSignup`

  ```json
  {
    "email": "test@gmail.com",
    "code": "5K4DS4"
  }
  ```

  Answer:

  ```json
  {
    "message": "User has been created",
    "data": {
      "name": "test_name_1",
      "secondName": "test_secondName_1",
      "email": "test@gmail.com",
      "phone": "test_phone_1",
      "_id": "6553c86c03999e62410f2cd9"
    }
  }
  ```

---

- _POST_ `/api/v1/auth/signin`

  ```json
  {
    "email": "test@gmail.com",
    "password": "test_password_1"
  }
  ```

  Answer:

  ```json
  {
    "message": "You have successfully logged in"
  }
  ```

---

- _DELETE_ `/api/v1/auth/signout`

  ```
  no body in this request
  ```

  Answer:

  ```json
  {
    "message": "You have successfully logged out"
  }
  ```

---

- _POST_ `/api/v1/auth/login`

  ```json
  {
    "login": "login",
    "password": "test_password_1"
  }
  ```

  Answer:

  ```json
  {
    "message": "You have successfully logged in"
  }
  ```

## Admin

- _GET_ `/api/v1/admin/me`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  {
    "data": {
      "login": "unique_name_1",
      "email": "email@email.com", // can not be without
      "_id": "6554e6957ed2ba3c7fa7d9fe"
    }
  }
  ```

---

- _GET_ `api/v1/admin/users`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  {
    "data": [
      {
        "_id": "655608239736cf4d57ee5299",
        "name": "test_name",
        "secondName": "test_second_name",
        "email": "test@email.com",
        "phone": "123-456-7890"
      }
    ]
  }
  ```

---

- _GET_ `api/v1/admin/users/:userId`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  {
    "data": {
      "_id": "655608239736cf4d57ee5299",
      "name": "test_name",
      "secondName": "test_second_name",
      "email": "test@email.com",
      "phone": "123-456-7890"
    }
  }
  ```

---

- _POST_ `/api/v1/admin/createOneAdmin`

  ```json
  {
    "login": "login",
    "email": "email@email.com", // not required
    "password": "test_password_1"
  }
  ```

  Answer:

  ```json
  {
    "message": "Admin has been created",
    "data": {
      "login": "unique_name_6",
      "email": "email@email.com",
      "_id": "6554e6957ed2ba3c7fa7d9fe"
    }
  }
  ```

## User

- _GET_ `/api/v1/user/me`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  {
    "data": {
      "_id": "655608239736cf4d57ee5299",
      "name": "Test_name",
      "secondName": "Test_secondName",
      "email": "test@email.com",
      "phone": "123-456-7890"
    }
  }
  ```
