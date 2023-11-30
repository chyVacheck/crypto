/* eslint-disable react-hooks/exhaustive-deps */
// ! modules
import { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ? styles
import s from './UserProfileById.module.css';

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

// ? utils
// * constants
import { VALIDATION, STATUS } from '../../utils/constants';
// * utils
import { checkValidity, copy } from '../../utils/utils';

function UserProfileById({ addNotification }) {
  const { userId } = useParams();

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

  const [userData, setUserData] = useState({});

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
      .putUserFileById({
        file: file,
        typeOfFile: data.typeOfFile,
        userId: userId,
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

        setUserData(_newUserData);

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
      .updateUserDataById(
        {
          name: nameRef.current.value,
          secondName: secondNameRef.current.value,
          phone: phoneRef.current.value,
          typeOfUser: typeOfUserRef.current.value,
        },
        userId,
      )
      .then((res) => {
        addNotification({
          name: 'Update user data',
          ok: true,
          text: res.message,
        });
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
      .deleteUserFileById(typeOfFile, userId)
      .then((res) => {
        addNotification({
          name: 'Delete file',
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

  const answers = ['Juridical person', 'Legal entity'];

  useEffect(() => {
    mainApi
      .getUserInfoById(userId)
      .then((userData) => {
        setUserData(userData.data);
        nameRef.current.value = userData.data.name;
        secondNameRef.current.value = userData.data.secondName;
        phoneRef.current.value = userData.data.phone;
        typeOfUserRef.current.value = userData.data.typeOfUser;
      })
      .catch((err) => {
        if (STATUS.DEV)
          console.log(
            `Запрос на сервер с целью проверки токена выдал: [${err.message}]`,
          );
        if (err.message === 'Failed to fetch')
          // показываем пользователю уведомление
          addNotification({
            name: 'Сервер 500',
            type: 'error',
            text: err.message,
          });
      });
  }, [userId]);

  useEffect(() => {
    // ? passport
    if (userData.passport && !userData.passport.url) {
      mainApi
        .getUserFileById(
          {
            'Content-Type': userData.passport.type,
            typeOfFile: 'passport',
          },
          userId,
        )
        .then(async (res) => {
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);

          const _newUserData = userData;

          _newUserData.passport.url = imageUrl;

          setUserData(_newUserData);
          setPassportUploaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // ? proof of address
    if (userData.proofOfAddress && !userData.proofOfAddress.url) {
      mainApi
        .getUserFileById(
          {
            'Content-Type': userData.proofOfAddress.type,
            typeOfFile: 'proofOfAddress',
          },
          userId,
        )

        .then(async (res) => {
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);

          const _newUserData = userData;

          _newUserData.proofOfAddress.url = imageUrl;

          setUserData(_newUserData);
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
        .getUserFileById(
          {
            'Content-Type': userData.selfieWithIDOrPassport.type,
            typeOfFile: 'selfieWithIDOrPassport',
          },
          userId,
        )
        .then(async (res) => {
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);

          const _newUserData = userData;

          _newUserData.selfieWithIDOrPassport.url = imageUrl;

          setUserData(_newUserData);
          setSelfieWithIDOrPassUploaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setUserData, userData, userId]);

  return (
    <>
      <section className={s.main}>
        <article className={s.container}>
          <div className={s.header}>
            <Logo />

            <h1 className={s.title}>User Data</h1>
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
                  {userId}
                </p>
              </div>

              {/* // ? Company Id */}
              {!!userData.companyId && (
                <div className={s.info}>
                  <h6 className={`${s.name} caption`}>Company Id</h6>

                  <p
                    className={`copy ${s.text}`}
                    onClick={() => {
                      copy(userData.companyId);
                    }}
                  >
                    {userData.companyId}
                  </p>
                </div>
              )}
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
                  placeholder='click to choose'
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
                isActive={isPassportUploaded}
                title={'passport'}
                icon={{
                  url: isPassportUploaded && userData.passport.url,
                  src: passportImage,
                  alt: 'passport',
                }}
                typeOfFile={'passport'}
                expansionOfFile={isPassportUploaded && userData.passport.type}
              />

              {/* // ? proof of Address */}
              <Document
                openFile={openFile}
                handleDelete={deleteFileOnServer}
                handleSubmit={uploadFileToServer}
                isActive={isProofOfAddressUploaded}
                title={'Proof of address'}
                icon={{
                  url: isProofOfAddressUploaded && userData.proofOfAddress.url,
                  src: proofOfAddressImage,
                  alt: 'Proof of address',
                }}
                typeOfFile={'proofOfAddress'}
                expansionOfFile={
                  isProofOfAddressUploaded && userData.proofOfAddress.type
                }
              />

              {/* // ? Selfie With ID Or Passport */}
              <Document
                openFile={openFile}
                handleDelete={deleteFileOnServer}
                handleSubmit={uploadFileToServer}
                isActive={isSelfieWithIDOrPassportUploaded}
                title={'Selfie with id'}
                icon={{
                  url:
                    isSelfieWithIDOrPassportUploaded &&
                    userData.selfieWithIDOrPassport.url,
                  src: selfieWithIdImage,
                  alt: 'Selfie with id',
                }}
                typeOfFile={'selfieWithIDOrPassport'}
                expansionOfFile={
                  isSelfieWithIDOrPassportUploaded &&
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

export default UserProfileById;
