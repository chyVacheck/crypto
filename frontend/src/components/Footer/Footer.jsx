// * react
import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

// ? styles
import s from './Footer.module.css';

// ? api
import mainApi from '../../Api/MainApi';

// ? utils
// * constants
import {
  YEAR,
  activeFooterRoutes,
  activeFormFooterRoutes,
  PATTERN_PAGE_USER_ID,
  paths,
  VALIDATION,
} from '../../utils/constants';
// * utils
import { checkValidity } from './../../utils/utils';

function Footer({ page, addNotification }) {
  const [year, setYear] = useState(`${YEAR}`);
  const currentYear = new Date().getFullYear();

  // ? отрисовка элемента
  const [isActive, setIsActive] = useState(false);
  const [isFormActive, setFormActive] = useState(false);

  // отображение года
  useEffect(() => {
    if (currentYear === YEAR) {
      setYear(currentYear);
    } else {
      setYear(`${YEAR}-${currentYear}`);
    }
  }, [currentYear]);

  // Проверка на показ элемента
  useEffect(() => {
    // показываем ли footer
    if (
      activeFooterRoutes.includes(page) ||
      PATTERN_PAGE_USER_ID.test(page.toLowerCase())
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    // показываем ли form
    if (
      activeFormFooterRoutes.includes(page) ||
      PATTERN_PAGE_USER_ID.test(page.toLowerCase())
    ) {
      setFormActive(true);
    } else {
      setFormActive(false);
    }
  }, [page]);

  function _formatString(inputString) {
    // Ищем последовательность символов, начинающуюся с заглавной буквы, за которой следуют одни или более символы в нижнем регистре
    const regex = /([a-z])([A-Z])/g;

    const result = inputString.replace(
      regex,
      (match, p1, p2) => `${p1} ${p2.toLowerCase()}`,
    );

    return result;
  }

  function Links() {
    const _links = [];

    for (const link in paths.policies) {
      _links.push(
        <li>
          <NavLink
            key={link}
            to={paths.policies[link]}
            className={`link caption ${s.text}`}
          >
            {_formatString(link)}
          </NavLink>
        </li>,
      );
    }

    return _links;
  }

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Submit');
  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);
  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    name: { valid: true, error: null },
    email: { valid: true, error: null },
    message: { valid: true, error: null },
  });

  // ? handle Change
  function handleFieldChange(event) {
    const isValid = event.target.checkValidity();

    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: { valid: isValid, error: checkValidity(event.target) },
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    // смена валидации формы
    setIsFormValid(event.target.closest('form').checkValidity() && isValid);
  }

  // ? handle submit form
  async function handleSubmit(e) {
    setCurrentTextSubmitButton('Submitting...');
    e.preventDefault();
    mainApi
      .sendMailToCommunicate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value,
      })
      .then((res) => {
        addNotification({
          name: 'Send mail',
          ok: true,
          text: res.message,
        });
        nameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';
        setIsFormValid(false);
      })
      .catch((err) => {
        addNotification({
          name: 'Send mail',
          ok: false,
          text: err.message,
        });
      })
      .finally(() => {
        setCurrentTextSubmitButton('Submit');
      });
  }

  return (
    isActive && (
      <footer className={`${s.main}`}>
        {isFormActive && (
          <div className={s['block-from']}>
            <div className={s.address}>
              <h4 className={`landing-subtitle ${s['address-name']} ${s.text}`}>
                Coin Experts EOOD
              </h4>
              <p
                className={`landing-paragraph ${s.text} ${s.text_place_address}`}
              >
                Republic of Bulgaria, Sofia 1797, Studentski District, zh.k.
                Musagenitsa, bl. 91B, entr.A, ap.14
              </p>
              <p
                className={`landing-paragraph ${s.text} ${s.text_place_address}`}
              >
                Reg. number 207144090
              </p>
            </div>

            <div className={s['send-message']}>
              <h4 className={`landing-subtitle ${s['form-name']}`}>
                Send Us a message
              </h4>
              <form onSubmit={handleSubmit} className={s.form}>
                <div className={s.inputs}>
                  <input
                    className={`landing-input ${s.input} ${
                      !validatedFields.name.valid
                        ? s.input_validity_invalid
                        : ''
                    }`}
                    placeholder='Name'
                    id='name'
                    onChange={handleFieldChange}
                    minLength={VALIDATION.NAME.MIN}
                    maxLength={VALIDATION.NAME.MAX}
                    ref={nameRef}
                    required
                  />
                  <input
                    className={`landing-input ${s.input} ${
                      !validatedFields.email.valid
                        ? s.input_validity_invalid
                        : ''
                    }`}
                    placeholder='Email'
                    id='email'
                    onChange={handleFieldChange}
                    ref={emailRef}
                    required
                  />
                </div>
                <textarea
                  className={`landing-input ${s.textarea} ${
                    !validatedFields.message.valid
                      ? s.input_validity_invalid
                      : ''
                  }`}
                  placeholder='Type your message here...'
                  id='message'
                  onChange={handleFieldChange}
                  minLength={VALIDATION.MESSAGE.MIN}
                  maxLength={VALIDATION.MESSAGE.MAX}
                  ref={messageRef}
                  required
                />
                <button
                  disabled={!isFormValid}
                  type='submit'
                  className={`landing-paragraph ${s.submit} ${
                    !isFormValid ? s.submit_validity_invalid : 'button'
                  }`}
                >
                  {currentTextSubmitButton}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={s.info}>
          <p className={`caption ${s.text}`}>© {year} Coin Experts EOOD</p>

          <ul className={s.links}>
            <h4 className={`subhead ${s.subtitle}`}>Policies</h4>
            <Links />
          </ul>
        </div>
      </footer>
    )
  );
}

export default Footer;
