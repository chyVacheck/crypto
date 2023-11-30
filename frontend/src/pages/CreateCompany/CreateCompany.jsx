// ! modules
import { useState, useRef, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// ? styles
import s from './CreateCompany.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? components
import Logo from '../../components/Logo/Logo';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? utils
// * constants
import { VALIDATION, paths } from '../../utils/constants';
// * utils
import { checkValidity } from '../../utils/utils';

function CreateCompany({ addNotification, setUser }) {
  const userData = useContext(CurrentUserContext);
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Register company');

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    registrationNumber: { valid: true, error: null },
    shareholder: { valid: true, error: null },
    shareholderRegistrationNumber: { valid: true, error: null },
    shareholderFullName: { valid: true, error: null },
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);
  // * измененная ли форма
  const [hasFormAnotherData, setFormAnotherData] = useState(false);

  // is open or close
  const [isDropdownTypeOfUserOpen, setDropdownTypeOfUserOpen] = useState(false);

  // * Ref for every input
  const registrationNumberRef = useRef();
  const shareholderRef = useRef();

  // company
  const shareholderRegistrationNumberRef = useRef();

  // individual
  const shareholderFullNameRef = useRef();

  // ? handle Change
  function handleFieldChange(event) {
    setFormAnotherData(true);
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
    setCurrentTextSubmitButton('Registering company...');
    e.preventDefault();

    let _data = {};

    switch (shareholderRef.current.value) {
      case 'individual':
        _data = {
          fullName: shareholderFullNameRef.current.value,
        };
        break;
      case 'company':
        _data = {
          registrationNumber: shareholderRegistrationNumberRef.current.value,
        };
        break;

      default:
        break;
    }

    const _company = {
      registrationNumber: registrationNumberRef.current.value,
      shareholder: {
        typeOfShareholder: shareholderRef.current.value,
        data: _data,
      },
    };

    mainApi
      .createCompany(_company)
      .then((res) => {
        addNotification({
          name: 'Register company',
          ok: true,
          text: res.message,
        });

        const _newUserData = userData;

        _newUserData.companyId = res.data._id;

        setUser(_newUserData);
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Register company',
          ok: false,
          text: err.message,
        });
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Register company');
        setIsFormValid(false);
      });
  }

  const answers = ['individual', 'company'];

  useEffect(() => {
    shareholderRef.current.value = 'company';
  }, []);

  return (
    <section className={s.main}>
      <article className={s.container}>
        <div className={s.header}>
          <Logo />

          <h1 className={s.title}>Register company</h1>
        </div>

        <form onSubmit={handleSubmit} className={s.form}>
          {/* // ? input поля */}
          <div className={`${s.fields} ${s.fields_type_horizontal}`}>
            {/* // ? registrationNumber */}
            <div className={s.field}>
              <h6 className={`${s.name} caption`}>Registration number</h6>

              <input
                required
                className={`${s.input} ${
                  !validatedFields.registrationNumber.valid
                    ? s.input_validity_invalid
                    : ''
                }`}
                placeholder='202005123456'
                id='registrationNumber'
                type='text'
                minLength={VALIDATION.REGISTRATION_NUMBER.MIN}
                maxLength={VALIDATION.REGISTRATION_NUMBER.MAX}
                ref={registrationNumberRef}
                onChange={handleFieldChange}
              ></input>

              {/* // ? сообщение о ошибке */}
              <p className={`${s['error-message']} detail`}>
                {validatedFields.registrationNumber.error}
              </p>
            </div>

            {/* // ? shareholder */}
            <div className={s.field}>
              <h6 className={`${s.name} caption`}>Type of shareholder</h6>

              <input
                className={`${s.input} ${s.input_type_dropdown} ${
                  !validatedFields.shareholder.valid
                    ? s.input_validity_invalid
                    : ''
                }`}
                placeholder={
                  isDropdownTypeOfUserOpen
                    ? 'click to close'
                    : 'click to choose'
                }
                id='shareholder'
                type='text'
                ref={shareholderRef}
                readOnly
                onClick={() => {
                  setDropdownTypeOfUserOpen(!isDropdownTypeOfUserOpen);
                }}
              ></input>

              <div
                className={`${s.answers} ${
                  isDropdownTypeOfUserOpen && s.answer_state_open
                }`}
              >
                {answers.map((element, index) => {
                  const _isCurrent =
                    element ===
                    (shareholderRef.current
                      ? shareholderRef.current.value
                      : '');

                  return (
                    <div
                      onClick={(event) => {
                        // смена валидации формы
                        shareholderRef.current.value = element;
                        setDropdownTypeOfUserOpen(false);
                        if (!_isCurrent) setFormAnotherData(true);
                        setIsFormValid(
                          event.target.closest('form').checkValidity() &&
                            userData.typeOfUser !==
                              shareholderRef.current.value,
                        );
                      }}
                      key={index}
                      className={`${s.answer} ${
                        _isCurrent && s.answer_state_current
                      }`}
                    >
                      <div>
                        <h4 className={`body ${s.answer__text}`}>{element}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* // ? input поля */}
          <div className={`${s.fields} ${s.fields_type_horizontal}`}>
            {shareholderRef.current &&
            shareholderRef.current.value === 'company' ? (
              // ? registrationNumber
              <div className={s.field}>
                <h6 className={`${s.name} caption`}>Registration number</h6>

                <input
                  required
                  className={`${s.input} ${
                    !validatedFields.shareholderRegistrationNumber.valid
                      ? s.input_validity_invalid
                      : ''
                  }`}
                  placeholder='202005123456'
                  id='shareholderRegistrationNumber'
                  type='text'
                  ref={shareholderRegistrationNumberRef}
                  onChange={handleFieldChange}
                ></input>

                {/* // ? сообщение о ошибке */}
                <p className={`${s['error-message']} detail`}>
                  {validatedFields.shareholderRegistrationNumber.error}
                </p>
              </div>
            ) : (
              // ? fullName
              <div className={s.field}>
                <h6 className={`${s.name} caption`}>Full Name</h6>

                <input
                  required
                  className={`${s.input} ${
                    !validatedFields.shareholderFullName.valid
                      ? s.input_validity_invalid
                      : ''
                  }`}
                  placeholder='John Smit'
                  id='shareholderName'
                  type='text'
                  ref={shareholderFullNameRef}
                  onChange={handleFieldChange}
                ></input>

                {/* // ? сообщение о ошибке */}
                <p className={`${s['error-message']} detail`}>
                  {validatedFields.shareholderFullName.error}
                </p>
              </div>
            )}
          </div>

          {/* // ? кнопка submit */}
          {hasFormAnotherData && (
            <button
              disabled={!isFormValid}
              className={
                s.submit +
                ` ${!isFormValid ? s.submit_validity_invalid : 'button'}`
              }
              type='submit'
            >
              {currentTextSubmitButton}
            </button>
          )}
        </form>

        <NavLink className={`link ${s.link}`} to={paths.user.profile}>
          Back to profile
        </NavLink>
      </article>
    </section>
  );
}

export default CreateCompany;
