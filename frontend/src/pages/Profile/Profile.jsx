// ! modules
import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ? styles
import s from './Profile.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? assets
// * images
//   icons
import passportImage from './../../assets/images/passport_type_color.png';
import proofOfAddressImage from './../../assets/images/location_type_color.png';
import selfieWithIdImage from './../../assets/images/selfie_type_color.png';

// ? components
import Document from '../../components/Document/Document';
import Logo from '../../components/Logo/Logo';
import Popup from './../../components/Popup/Popup';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? utils
// * constants
import { VALIDATION, paths } from '../../utils/constants';
// * utils
import { checkValidity, copy } from '../../utils/utils';

function Profile({ addNotification, setUser }) {
  const navigate = useNavigate();
  const userData = useContext(CurrentUserContext);
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Save data');

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    name: { valid: true, error: null },
    secondName: { valid: true, error: null },
    phone: { valid: true, error: null },
    typeOfUserRef: { valid: true, error: null },
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);
  // * измененная ли форма
  const [hasFormAnotherData, setFormAnotherData] = useState(false);

  // * открыт ли popup
  const [isPopupOpen, setPopupOpen] = useState(false);

  // текущий открытый файл
  const [currenFile, setCurrenFile] = useState({
    src: null,
    alt: null,
    title: null,
    type: null,
  });

  // Passport Uploaded
  const [isPassportUploaded, setPassportUploaded] = useState(false);
  // Proof Of Address
  const [isProofOfAddressUploaded, setProofOfAddressUploaded] = useState(false);
  // Selfie With ID Or Passport Uploaded
  const [isSelfieWithIDOrPassportUploaded, setSelfieWithIDOrPassUploaded] =
    useState(false);

  // is open or close
  const [isDropdownTypeOfUserOpen, setDropdownTypeOfUserOpen] = useState(false);

  // * Ref for every input
  const nameRef = useRef();
  const secondNameRef = useRef();
  const phoneRef = useRef();
  const typeOfUserRef = useRef();

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
    setIsFormValid(
      event.target.closest('form').checkValidity() &&
        isValid &&
        (userData.name !== nameRef.current.value ||
          userData.secondName !== secondNameRef.current.value ||
          userData.phone !== phoneRef.current.value ||
          userData.typeOfUser !== typeOfUserRef.current.value),
    );
  }

  // ? handle upload file to server
  function uploadFileToServer(data) {
    const file = new FormData();

    file.append('file', data.file);
    mainApi
      .putUserFile({
        file: file,
        typeOfFile: data.typeOfFile,
      })
      .then(async (res) => {
        const imageUrl = URL.createObjectURL(data.file);

        const _newUserData = userData;

        switch (data.typeOfFile) {
          case 'passport':
            _newUserData.passport = {
              url: imageUrl,
              type: data['Content-Type'],
            };
            setPassportUploaded(true);
            break;
          case 'proofOfAddress':
            _newUserData.proofOfAddress = {
              url: imageUrl,
              type: data['Content-Type'],
            };
            setProofOfAddressUploaded(true);
            break;
          case 'selfieWithIDOrPassport':
            _newUserData.selfieWithIDOrPassport = {
              url: imageUrl,
              type: data['Content-Type'],
            };
            setSelfieWithIDOrPassUploaded(true);
            break;

          default:
            break;
        }

        setUser(_newUserData);

        addNotification({
          name: 'Upload file',
          ok: true,
          text: res.message,
        });
      })
      .catch((err) => {
        addNotification({
          name: 'Upload file',
          ok: false,
          text: err.message,
        });
      });
  }

  // ?
  function openFile(file) {
    setCurrenFile(file);
    setPopupOpen(true);
  }

  // ? handle submit form
  async function handleSubmit(e) {
    setCurrentTextSubmitButton('Saving data...');
    e.preventDefault();

    await mainApi
      .updateUserData({
        name: nameRef.current.value,
        secondName: secondNameRef.current.value,
        phone: phoneRef.current.value,
        typeOfUser: typeOfUserRef.current.value,
      })
      .then((res) => {
        addNotification({
          name: 'Update user data',
          ok: true,
          text: res.message,
        });

        const _newUserData = userData;

        _newUserData.name = nameRef.current.value;
        _newUserData.secondName = secondNameRef.current.value;
        _newUserData.phone = phoneRef.current.value;
        _newUserData.typeOfUser = typeOfUserRef.current.value;

        setUser(_newUserData);
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Update user data',
          ok: false,
          text: err.message,
        });
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Saving data');
        setIsFormValid(false);
      });
  }

  async function deleteFileOnServer(e, typeOfFile) {
    e.preventDefault();

    await mainApi
      .deleteUserFile(typeOfFile)
      .then((res) => {
        addNotification({
          name: 'Update user data',
          ok: true,
          text: res.message,
        });

        switch (typeOfFile) {
          case 'passport':
            setPassportUploaded(false);
            break;

          case 'proofOfAddress':
            setProofOfAddressUploaded(false);
            break;

          case 'selfieWithIDOrPassport':
            setSelfieWithIDOrPassUploaded(false);
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Update user data',
          ok: false,
          text: err.message,
        });
      });
  }

  async function handleLogout(e) {
    e.preventDefault();

    await mainApi
      .logOut()
      .then((res) => {
        addNotification({
          name: 'Logout',
          ok: true,
          text: res.message,
        });
        navigate(paths.main);
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Logout',
          ok: false,
          text: err.message,
        });
      });
  }

  const answers = ['Juridical person', 'Authorised person'];

  useEffect(() => {
    nameRef.current.value = userData.name;
    secondNameRef.current.value = userData.secondName;
    phoneRef.current.value = userData.phone;
    typeOfUserRef.current.value = userData.typeOfUser;
  }, [userData]);

  useEffect(() => {
    // ? passport
    if (userData.passport && !userData.passport.url) {
      mainApi
        .getUserFile({
          'Content-Type': userData.passport.type,
          typeOfFile: 'passport',
        })
        .then(async (res) => {
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);

          const _newUserData = userData;

          _newUserData.passport.url = imageUrl;

          setUser(_newUserData);
          setPassportUploaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // ? proof of address
    if (userData.proofOfAddress && !userData.proofOfAddress.url) {
      mainApi
        .getUserFile({
          'Content-Type': userData.proofOfAddress.type,
          typeOfFile: 'proofOfAddress',
        })
        .then(async (res) => {
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);

          const _newUserData = userData;

          _newUserData.proofOfAddress.url = imageUrl;

          setUser(_newUserData);
          setProofOfAddressUploaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // ? selfie with ID or Passport
    if (
      userData.selfieWithIDOrPassport &&
      !userData.selfieWithIDOrPassport.url
    ) {
      mainApi
        .getUserFile({
          'Content-Type': userData.selfieWithIDOrPassport.type,
          typeOfFile: 'selfieWithIDOrPassport',
        })
        .then(async (res) => {
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);

          const _newUserData = userData;

          _newUserData.selfieWithIDOrPassport.url = imageUrl;

          setUser(_newUserData);
          setSelfieWithIDOrPassUploaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setUser, userData]);

  return (
    <>
      <section className={s.main}>
        <article className={s.container}>
          <div className={s.header}>
            <div className={s['logo-and-button']}>
              <Logo />

              <button
                type='button'
                onClick={handleLogout}
                className={`button subhead ${s.logout}`}
              >
                Log out
              </button>
            </div>

            <h1 className={s.title}>Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className={s.form}>
            {/* // ? поля для просмотра */}
            <div className={s.infos}>
              {/* // ? Email */}
              <div className={s.info}>
                <h6 className={`${s.name} caption`}>Email</h6>

                <p
                  className={`copy ${s.text}`}
                  onClick={() => {
                    copy(userData.email);
                  }}
                >
                  {userData.email}
                </p>
              </div>

              {/* // ? Id */}
              <div className={s.info}>
                <h6 className={`${s.name} caption`}>Id</h6>

                <p
                  className={`copy ${s.text}`}
                  onClick={() => {
                    copy(userData._id);
                  }}
                >
                  {userData._id}
                </p>
              </div>
            </div>

            {/* // ? input поля */}
            <div className={`${s.fields} ${s.fields_type_horizontal}`}>
              {/* // ? name */}
              <div className={s.field}>
                <h6 className={`${s.name} caption`}>Name</h6>

                <input
                  required
                  className={`${s.input} ${
                    !validatedFields.name.valid ? s.input_validity_invalid : ''
                  }`}
                  placeholder='John'
                  id='name'
                  type='text'
                  minLength={VALIDATION.NAME.MIN}
                  maxLength={VALIDATION.NAME.MAX}
                  ref={nameRef}
                  onChange={handleFieldChange}
                ></input>

                {/* // ? сообщение о ошибке */}
                <p className={`${s['error-message']} detail`}>
                  {validatedFields.name.error}
                </p>
              </div>

              {/* // ? second name */}
              <div className={s.field}>
                <h6 className={`${s.name} caption`}>Second Name</h6>

                <input
                  required
                  className={`${s.input} ${
                    !validatedFields.secondName.valid
                      ? s.input_validity_invalid
                      : ''
                  }`}
                  placeholder='Stone'
                  id='secondName'
                  type='text'
                  minLength={VALIDATION.NAME.MIN}
                  maxLength={VALIDATION.NAME.MAX}
                  ref={secondNameRef}
                  onChange={handleFieldChange}
                ></input>

                {/* // ? сообщение о ошибке */}
                <p className={`${s['error-message']} detail`}>
                  {validatedFields.secondName.error}
                </p>
              </div>
            </div>

            {/* // ? input поля */}
            <div className={`${s.fields} ${s.fields_type_horizontal}`}>
              {/* // ? phone */}
              <div className={s.field}>
                <h6 className={`${s.name} caption`}>Phone number</h6>

                <input
                  required
                  className={`${s.input} ${
                    !validatedFields.phone.valid ? s.input_validity_invalid : ''
                  }`}
                  placeholder='123-456-7890'
                  type='tel'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  id='phone'
                  ref={phoneRef}
                  onChange={handleFieldChange}
                ></input>

                {/* // ? сообщение о ошибке */}
                <p className={`${s['error-message']} detail`}>
                  {validatedFields.phone.error}
                </p>
              </div>

              {/* // ? type of user */}
              <div className={s.field}>
                <h6 className={`${s.name} caption`}>Type of user</h6>

                <input
                  className={`${s.input} ${s.input_type_dropdown} ${
                    !validatedFields.typeOfUserRef.valid
                      ? s.input_validity_invalid
                      : ''
                  }`}
                  placeholder={
                    isDropdownTypeOfUserOpen
                      ? 'click to close'
                      : 'click to choose'
                  }
                  id='typeOfUserRef'
                  type='text'
                  ref={typeOfUserRef}
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
                      (typeOfUserRef.current
                        ? typeOfUserRef.current.value
                        : userData.typeOfUser);

                    return (
                      <div
                        onClick={(event) => {
                          // перенаправляем пользователя на создание компании
                          if (
                            userData.typeOfUser !== 'Authorised person' &&
                            element === 'Authorised person'
                          ) {
                            window.location.href = paths.company.create;
                            // ! navigate не перезагружает страницу из-за чего вылазит ошибка в виде
                            // ! странного не прохода валидации сервером запроса на регистрацию компании
                            // ! по этому используется
                            // ! window.location.href = paths.company.create;
                            // ! что бы происходило обновление страницы
                            // navigate(paths.company.create);
                          }

                          // смена валидации формы
                          typeOfUserRef.current.value = element;
                          setDropdownTypeOfUserOpen(false);
                          if (!_isCurrent) setFormAnotherData(true);
                          setIsFormValid(
                            event.target.closest('form').checkValidity() &&
                              userData.typeOfUser !==
                                typeOfUserRef.current.value,
                          );
                        }}
                        key={index}
                        className={`${s.answer} ${
                          _isCurrent && s.answer_state_current
                        }`}
                      >
                        <div>
                          <h4 className={`body ${s.answer__text}`}>
                            {element}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className={`${s.infos} ${s.infos_type_documents} ${s.infos_border_top}`}
            >
              {/* // ? passport */}
              <Document
                openFile={openFile}
                handleDelete={deleteFileOnServer}
                handleSubmit={uploadFileToServer}
                isActive={userData.passport && !!userData.passport.url}
                _isFileUpload={isPassportUploaded}
                title={'passport'}
                icon={{
                  url: userData.passport && userData.passport.url,
                  src: passportImage,
                  alt: 'passport',
                }}
                typeOfFile={'passport'}
                expansionOfFile={userData.passport && userData.passport.type}
              />

              {/* // ? proof of Address */}
              <Document
                openFile={openFile}
                handleDelete={deleteFileOnServer}
                handleSubmit={uploadFileToServer}
                isActive={
                  userData.proofOfAddress && !!userData.proofOfAddress.url
                }
                _isFileUpload={isProofOfAddressUploaded}
                title={'Proof of address'}
                icon={{
                  url: userData.proofOfAddress && userData.proofOfAddress.url,
                  src: proofOfAddressImage,
                  alt: 'Proof of address',
                }}
                typeOfFile={'proofOfAddress'}
                expansionOfFile={
                  userData.proofOfAddress && userData.proofOfAddress.type
                }
              />

              {/* // ? Selfie With ID Or Passport */}
              <Document
                openFile={openFile}
                handleDelete={deleteFileOnServer}
                handleSubmit={uploadFileToServer}
                isActive={
                  userData.selfieWithIDOrPassport &&
                  !!userData.selfieWithIDOrPassport.url
                }
                _isFileUpload={isSelfieWithIDOrPassportUploaded}
                title={'Selfie with id'}
                icon={{
                  url:
                    userData.selfieWithIDOrPassport &&
                    userData.selfieWithIDOrPassport.url,
                  src: selfieWithIdImage,
                  alt: 'Selfie with id',
                }}
                typeOfFile={'selfieWithIDOrPassport'}
                expansionOfFile={
                  userData.selfieWithIDOrPassport &&
                  userData.selfieWithIDOrPassport.type
                }
              />
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
        </article>
      </section>
      {currenFile && isPopupOpen && (
        <Popup
          closePopup={() => {
            setPopupOpen(false);
          }}
          title={currenFile.title}
          file={{
            src: currenFile.src,
            alt: currenFile.alt,
            type: currenFile.type,
          }}
        />
      )}
    </>
  );
}

export default Profile;
