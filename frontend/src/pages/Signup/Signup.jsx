// ! modules
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ? styles
import styles from './Signup.module.css';

// * components
// SignForm
import SignForm from './../../components/SignForm/SignForm';

// ? utils
// * constants
import { paths, VALIDATION } from './../../utils/constants';
// * utils
import { checkValidity, checkAnswerFromServer } from './../../utils/utils';
// * Api
import mainApi from './../../Api/MainApi';

function Signup({ addNotification, setTemporaryInfo }) {
  // ? текст ошибки
  const [currentError, setCurrentError] = useState('');
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Register');

  const navigate = useNavigate();

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    name: true,
    secondName: true,
    email: true,
    phone: true,
    password: true,
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  // * Ref for every input
  const nameRef = useRef();
  const secondNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
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

  // регистрация
  function handleSubmit(event) {
    event.preventDefault();
    setCurrentTextSubmitButton('Registration...');
    const user = {
      name: nameRef.current.value,
      secondName: secondNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };

    // отправляем запрос на регистрацию
    mainApi
      .signup(user)
      .then((res) => {
        // устанавливаем на какую почту отправили письмо
        setTemporaryInfo({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });

        addNotification({
          name: 'Send code',
          ok: true,
          text: res.message,
        });
        navigate(paths.verifyEmail);
      })
      .catch((err) => {
        // устанавливаем ошибку
        if (err.status)
          if (err.message) {
            setCurrentError(err.message);
          } else {
            setCurrentError(checkAnswerFromServer(err.status, 'register'));
          }
        else setCurrentError(checkAnswerFromServer('all', 'failFetch'));
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Register');
      });
  }

  return (
    <section className={styles.main}>
      <SignForm
        title='Register'
        submitButton={{
          text: currentTextSubmitButton,
        }}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        error={currentError}
        isValid={isFormValid}
        link={paths.signin}
        linkText={'Login'}
        inputs={[
          {
            name: 'Name',
            lang: 'en',
            placeholder: 'Dmytro',
            type: 'text',
            id: 'name',
            required: true,
            ref: nameRef,
            isValid: validatedFields.name,
          },
          {
            name: 'Second name',
            lang: 'en',
            placeholder: 'Shakh',
            type: 'text',
            id: 'secondName',
            required: true,
            ref: secondNameRef,
            isValid: validatedFields.secondName,
          },
          {
            name: 'Email',
            lang: 'en',
            placeholder: 'test@email.com',
            type: 'email',
            id: 'email',
            required: true,
            ref: emailRef,
            isValid: validatedFields.email,
          },
          {
            name: 'Phone number',
            lang: 'en',
            placeholder: '+491234567890',
            type: 'tel',
            pattern: '^+d{1,3}d{5,}$',
            id: 'phone',
            required: true,
            ref: phoneRef,
            isValid: validatedFields.phone,
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

export default Signup;
