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
    "code": "28a56e30-831b-11ee-9bec-2bbc99ecda14"
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
