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

- _GET_ `api/v1/admin/users/:userId/file/:typeOfFile`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  file
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

---

- _PUT_ `/api/v1/admin/users/:userId/file/:typeOfFile`

  ```json
  file
  ```

  Answer:

  ```json
  {
    "data": {
      "passport": {
        "name": "test_passport.pdf",
        "type": "application/pdf"
      },
      "proofOfAddress": {
        "name": "proof_of_address.jpg",
        "type": "image/jpeg"
      },
      "selfieWithIDOrPassport": {
        "name": "selfieWithIDOrPassport.jpg",
        "type": "image/jpeg"
      },
      "_id": "655608239736cf4d57ee5299",
      "name": "Test_name",
      "secondName": "Test_secondName",
      "email": "test@email.com",
      "phone": "123-456-7890",
      "typeOfUser": "company representative" // or can be 'juridical person'
    }
  }
  ```

---

- _PATCH_ `/api/v1/admin/users/:userId`

  ```json
  {
    "name": "Test_name",
    "secondName": "Test_secondName",
    "phone": "123-456-7890",
    "typeOfUser": "company representative" // or can be 'juridical person'
  }
  ```

  Answer

  ```json
  {
    "data": {
      "passport": {
        "name": "test_passport.pdf",
        "type": "application/pdf"
      },
      "proofOfAddress": {
        "name": "proof_of_address.jpg",
        "type": "image/jpeg"
      },
      "selfieWithIDOrPassport": {
        "name": "selfieWithIDOrPassport.jpg",
        "type": "image/jpeg"
      },
      "_id": "655608239736cf4d57ee5299",
      "name": "Test_name",
      "secondName": "Test_secondName",
      "email": "test@email.com",
      "phone": "123-456-7890",
      "typeOfUser": "company representative" // or can be 'juridical person'
    }
  }
  ```

---

- _DELETE_ `/api/v1/admin/users/:userId/file/:typeOfFile`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  {
    "message": "File was successful deleted"
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
      "passport": {
        "name": "test_passport.pdf",
        "type": "application/pdf"
      },
      "proofOfAddress": {
        "name": "proof_of_address.jpg",
        "type": "image/jpeg"
      },
      "selfieWithIDOrPassport": {
        "name": "selfieWithIDOrPassport.jpg",
        "type": "image/jpeg"
      },
      "_id": "655608239736cf4d57ee5299",
      "name": "Test_name",
      "secondName": "Test_secondName",
      "email": "test@email.com",
      "phone": "123-456-7890",
      "typeOfUser": "company representative" // or can be 'juridical person'
    }
  }
  ```

---

- _GET_ `/api/v1/user/me/file/:typeOfFile`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  file
  ```

---

- _PUT_ `/api/v1/user/me/file/:typeOfFile`

  ```json
  file
  ```

  Answer:

  ```json
  {
    "data": {
      "passport": {
        "name": "test_passport.pdf",
        "type": "application/pdf"
      },
      "proofOfAddress": {
        "name": "proof_of_address.jpg",
        "type": "image/jpeg"
      },
      "selfieWithIDOrPassport": {
        "name": "selfieWithIDOrPassport.jpg",
        "type": "image/jpeg"
      },
      "_id": "655608239736cf4d57ee5299",
      "name": "Test_name",
      "secondName": "Test_secondName",
      "email": "test@email.com",
      "phone": "123-456-7890",
      "typeOfUser": "company representative" // or can be 'juridical person'
    }
  }
  ```

---

- _PATCH_ `/api/v1/user/me`

  ```json
  {
    "name": "Test_name",
    "secondName": "Test_secondName",
    "phone": "123-456-7890",
    "typeOfUser": "company representative" // or can be 'juridical person'
  }
  ```

  Answer:

  ```json
  {
    "data": {
      "passport": {
        "name": "test_passport.pdf",
        "type": "application/pdf"
      },
      "proofOfAddress": {
        "name": "proof_of_address.jpg",
        "type": "image/jpeg"
      },
      "selfieWithIDOrPassport": {
        "name": "selfieWithIDOrPassport.jpg",
        "type": "image/jpeg"
      },
      "_id": "655608239736cf4d57ee5299",
      "name": "Test_name",
      "secondName": "Test_secondName",
      "email": "test@email.com",
      "phone": "123-456-7890",
      "typeOfUser": "company representative" // or can be 'juridical person'
    }
  }
  ```

---

- _DELETE_ `/api/v1/user/me/file/:typeOfFile`

  ```json
  no body in this request
  ```

  Answer:

  ```json
  {
    "message": "File was successful deleted"
  }
  ```

## Company

- _GET_ `/api/v1/company/:companyId`

  ```json
  no body in this request
  ```

  Answer

  ```json
  {
    "data": {
      "certificateOfIncorporation": {
        "name": "certificate.png",
        "type": "image/png"
      },
      "_id": "655e966f17595eeb42e37b40",
      "owners": ["655608239736cf4d57ee5299"],
      "registrationNumber": "test_registration_number_1",
      "shareholder": ["655ea146434cbdfdae9a5dd7"] // всегда будет хотя бы один
    }
  }
  ```

---

- _GET_ `/api/v1/company/:companyId/file/:typeOfFile`

  ```json
  no body in this request
  ```

  Answer

  ```json
  file
  ```

---

- _GET_ `/api/v1/company/:companyId/shareholder/:shareholderId`

  ```json
  no body in this request
  ```

  Answer

  ```json
  {
    "data": {
      "individual": {
        "fullName": "test"
      },
      "_id": "655ea146434cbdfdae9a5dd7",
      "typeOfShareholder": "individual"
    }
  }
  ```

  or

  ```json
  {
    "data": {
      "company": {
        "registrationNumber": "test_registration_number_1"
      },
      "_id": "655f4048fbd2e7a2f4a9e6fb",
      "typeOfShareholder": "company"
    }
  }
  ```

---

- _GET_ `/api/v1/company/:companyId/shareholder/:shareholderId/file/:typeOfFile`

  ```json
  no body in this request
  ```

  Answer

  ```json
  file
  ```

---

- _POST_ `/api/v1/company`

  ```json
  {
    "registrationNumber": "test_registration_number_2",
    "shareholder": {
      "typeOfShareholder": "company",
      "data": {
        "registrationNumber": "test_registration_number"
      }
    }
  }
  ```

  Answer

  ```json
  {
    "message": "Company has been created",
    "data": {
      "owners": ["655608239736cf4d57ee5299"], // id пользователя создавшего компанию
      "registrationNumber": "test_registration_number_1",
      "shareholder": ["655f40ddfbd2e7a2f4a9e705"], // id только что созданного акционера
      "_id": "655f40ddfbd2e7a2f4a9e708"
    }
  }
  ```

---

- _POST_ `/api/v1/company/shareholder`

  ```json
  {
    "typeOfShareholder": "company",
    "data": {
      "registrationNumber": "test_registrationNumber"
    }
  }
  ```

  or

  ```json
  {
    "typeOfShareholder": "individual",
    "data": {
      "fullName": "test_fullName"
    }
  }
  ```

  Answer

  ```json
  {
    "message": "Shareholder has been created"
  }
  ```

---

- _PUT_ `/api/v1/company/:companyId/file/:typeOfFile`

  ```json
  file
  ```

  Answer

  ```json
  {
    "message": "File was successful upload"
  }
  ```

---

- _PUT_ `/api/v1/company/:companyId/shareholder/:shareholderId/file/:typeOfFile`

  ```json
  file
  ```

  Answer

  ```json
  {
    "message": "File was successful upload"
  }
  ```

---

- _PATCH_ `/api/v1/company/:companyId`

  ```json
  {
    "name": "test" // и другие данные о компании
  }
  ```

  Answer

  ```json
  {
    "message": "Info of company was successful updated"
  }
  ```

---

- _PATCH_ `/api/v1/company/:companyId/shareholder/:shareholderId`

  ```json
  {
    // передавать можно любые значение, как для индивидуального акционера, так и для компании акционера
    // но приниматься и сохраняться будут только данные, подходящие под тип акционера
    "fullName": "test", // если это индивидуальный акционер, то это значение обновиться
    "name": "test" // если это компания, то это значение обновиться
  }
  ```

  Answer

  ```json
  {
    "message": "Info patched"
  }
  ```

---

- _DELETE_ `/api/v1/company/:companyId/shareholder/:shareholderId`

  ```json
  no body in this request
  ```

  Answer

  ```json
  {
    "message": "Deleted"
  }
  ```

---

## Support

- _POST_ `/api/v1/support/mail`

  ```json
  {
    "title": "test_title",
    "message": "test_message"
  }
  ```

  Answer

  ```json
  {
    "message": "Mail was successfully send"
  }
  ```

---

- _POST_ `api/v1/support/mailToCommunicate`

  ```json
  {
    "name": "test_title",
    "email": "test_email",
    "message": "test_message"
  }
  ```

  Answer

  ```json
  {
    "message": "Mail was successfully send"
  }
  ```

  ***

## Price

- _GET_ `/api/v1/price/:ids/:vs_currencies`

  ```json
  no body in this request
  ```

  Answer

  ```json
  {
    "ethereum": {
      "usd": 2213.5,
      "eur": 2051.69,
      "bnb": 8.832229
    },
    "avalanche-2": {
      "usd": 39.16,
      "eur": 36.3,
      "bnb": 0.1562593
    },
    "bitcoin": {
      "usd": 41749,
      "eur": 38697,
      "bnb": 166.586
    }
  }
  ```

---
