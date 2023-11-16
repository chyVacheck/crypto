// ! modules
import { useState, useRef } from 'react';

// ? styles
import styles from './CreateAdmin.module.css';

// * components
// SignForm
import SignForm from './../../components/SignForm/SignForm';

// ? utils
// * constants
import { VALIDATION } from './../../utils/constants';
// * utils
import { checkValidity, checkAnswerFromServer } from './../../utils/utils';
// * Api
import mainApi from './../../Api/MainApi';

function CreateAdmin({ addNotification }) {
  // ? текст ошибки
  const [currentError, setCurrentError] = useState('');
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Create Admin');

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    login: true,
    email: true,
    password: true,
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  // * Ref for every input
  const loginRef = useRef();
  const emailRef = useRef();
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
    setCurrentTextSubmitButton('Creating Admin...');
    const admin = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };

    if (emailRef.current.value) {
      admin.email = emailRef.current.value;
    }

    // отправляем запрос на регистрацию
    mainApi
      .createAdmin(admin)
      .then((res) => {
        addNotification({
          name: 'Create admin',
          ok: true,
          text: res.message,
        });
      })
      .catch((err) => {
        // устанавливаем ошибку
        if (err.status)
          if (err.message) {
            setCurrentError(err.message);
          } else {
            setCurrentError(checkAnswerFromServer(err.status, 'createAdmin'));
          }
        else setCurrentError(checkAnswerFromServer('all', 'failFetch'));
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Create Admin');
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
        inputs={[
          {
            name: 'Login',
            lang: 'en',
            placeholder: 'Admin007',
            type: 'text',
            id: 'login',
            minLength: VALIDATION.NAME.MIN,
            maxLength: VALIDATION.NAME.MAX,
            required: true,
            ref: loginRef,
            isValid: validatedFields.login,
          },
          {
            name: 'Email',
            lang: 'en',
            placeholder: 'test@email.com',
            type: 'email',
            id: 'email',
            required: false,
            ref: emailRef,
            isValid: validatedFields.email,
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

export default CreateAdmin;
