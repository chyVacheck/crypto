// ! modules
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ? styles
import styles from './Login.module.css';

// * components
import SignForm from './../../components/SignForm/SignForm';

// ? utils
// * constants
import { STATUS, paths, VALIDATION } from './../../utils/constants';
// * utils
import { checkValidity, checkAnswerFromServer } from './../../utils/utils';
// * Api
import mainApi from './../../Api/MainApi';

function Login({
  setCurrentUser,
  addNotification,
  setLogin,
  isLoginUser = true,
}) {
  // ? текст ошибки
  const [currentError, setCurrentError] = useState('');
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Login');

  const navigate = useNavigate();

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    email: true,
    login: true,
    password: true,
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  // * Ref for every input
  const emailRef = useRef();
  const loginRef = useRef();
  const passwordRef = useRef();

  // смена значение в input
  function handleFieldChange(event) {
    const isValid = event.target.checkValidity();

    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: isValid,
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    // смена валидации формы
    setIsFormValid(event.target.closest('form').checkValidity() && isValid);
    // смена текста ошибки
    setCurrentError(checkValidity(event.target));
  }

  // авторизация
  function handleSubmit(event) {
    event.preventDefault();
    setCurrentTextSubmitButton('Login...');

    // отправляем запрос на авторизацию
    if (isLoginUser) {
      const user = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      mainApi
        .authorization(user)
        .then(async (res) => {
          // устанавливаем "вход" в систему
          setLogin(true);

          addNotification({
            name: 'Authentication',
            ok: true,
            text: res.message,
          });

          await mainApi
            .getUserInfo()
            .then(async (res) => {
              setCurrentUser(res.data);
            })
            .catch((err) => {
              if (STATUS.DEV)
                console.log(
                  `Запрос на сервер с целью получения данных пользователя выдал: [${err.message}]`,
                );
              if (err.message === 'Failed to fetch')
                // показываем пользователю уведомление
                addNotification({
                  name: 'Сервер 500',
                  ok: false,
                  text: err.message,
                });
            });

          window.location.href = paths.user.profile;
          // navigate(paths.user.profile);
        })
        .catch((err) => {
          // устанавливаем ошибку
          if (err.status)
            if (err.message) {
              setCurrentError(err.message);
            } else {
              setCurrentError(checkAnswerFromServer(err.status, 'login'));
            }
          else setCurrentError(checkAnswerFromServer('all', 'failFetch'));
          setIsFormValid(false);
        })
        .finally(() => {
          setCurrentTextSubmitButton('Login');
        });
    } else {
      const admin = {
        login: loginRef.current.value,
        password: passwordRef.current.value,
      };
      mainApi
        .loginAdmin(admin)
        .then((res) => {
          // устанавливаем "вход" в систему
          setLogin(true);

          addNotification({
            name: 'Authentication Admin',
            ok: true,
            text: res.message,
          });
          navigate(paths.admin.users);
        })
        .catch((err) => {
          // устанавливаем ошибку
          if (err.status)
            if (err.message) {
              setCurrentError(err.message);
            } else {
              setCurrentError(checkAnswerFromServer(err.status, 'login'));
            }
          else setCurrentError(checkAnswerFromServer('all', 'failFetch'));
          setIsFormValid(false);
        })
        .finally(() => {
          setCurrentTextSubmitButton('Login');
        });
    }
  }

  return (
    <section className={styles.main}>
      <SignForm
        title={isLoginUser ? 'Welcome' : 'Welcome Admin'}
        submitButton={{
          text: currentTextSubmitButton,
        }}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        error={currentError}
        isValid={isFormValid}
        link={isLoginUser && paths.signup}
        linkText={isLoginUser && 'Register'}
        inputs={[
          {
            name: isLoginUser ? 'Email' : 'Login',
            lang: 'en',
            placeholder: isLoginUser ? 'test@email.com' : 'admin007',
            type: isLoginUser ? 'email' : 'text',
            id: isLoginUser ? 'email' : 'login',
            required: true,
            ref: isLoginUser ? emailRef : loginRef,
            isValid: isLoginUser
              ? validatedFields.email
              : validatedFields.login,
          },
          {
            name: 'Password',
            placeholder: 'qwerty123',
            type: 'password',
            id: 'password',
            minLength: VALIDATION.PASSWORD.MIN,
            maxLength: VALIDATION.PASSWORD.MAX,
            required: true,
            ref: passwordRef,
            isValid: validatedFields.password,
          },
        ]}
      />
    </section>
  );
}

export default Login;
