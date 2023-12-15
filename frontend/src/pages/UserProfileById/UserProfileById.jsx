/* eslint-disable react-hooks/exhaustive-deps */
// ! modules
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ? styles
import s from './UserProfileById.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? components
import File from '../../components/File/File';
import Input from '../../components/Input/Input';
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

  // is open or close
  const [isDropdownTypeOfUserOpen, setDropdownTypeOfUserOpen] = useState(false);

  // * загружены ли документы
  const [isFilesDownloaded, setFilesDownloaded] = useState(false);

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
            break;
          case 'proofOfAddress':
            _newUserData.proofOfAddress = {
              url: imageUrl,
              type: data['Content-Type'],
            };
            break;
          case 'selfieWithIDOrPassport':
            _newUserData.selfieWithIDOrPassport = {
              url: imageUrl,
              type: data['Content-Type'],
            };
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

        const _newUserData = userData;

        delete _newUserData[typeOfFile];

        setUserData(_newUserData);
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

  async function _getFileData(contentType, typeOfFile) {
    await mainApi
      .getUserFileById(
        {
          'Content-Type': contentType,
          typeOfFile: typeOfFile,
        },
        userId,
      )
      .then(async (res) => {
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

        const _newUserData = userData;

        _newUserData[typeOfFile].url = imageUrl;

        setUserData(_newUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function _fetchData() {
      // ? passport
      if (userData.passport && !userData.passport.url)
        await _getFileData(userData.passport.type, 'passport');

      // ? proof of address
      if (userData.proofOfAddress && !userData.proofOfAddress.url)
        await _getFileData(userData.proofOfAddress.type, 'proofOfAddress');

      // ? selfie with ID or Passport
      if (
        userData.selfieWithIDOrPassport &&
        !userData.selfieWithIDOrPassport.url
      )
        await _getFileData(
          userData.selfieWithIDOrPassport.type,
          'selfieWithIDOrPassport',
        );

      setFilesDownloaded(true);
    }

    _fetchData();
  }, [userData]);

  return (
    <>
      <section className={s.main}>
        <article className={s.container}>
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
              <Input
                name={'Name'}
                id='name'
                placeholder={'John'}
                minLength={VALIDATION.NAME.MIN}
                maxLength={VALIDATION.NAME.MAX}
                customRef={nameRef}
                onChange={handleFieldChange}
                isValid={validatedFields.name.valid}
                textError={validatedFields.name.error}
              ></Input>

              {/* // ? second name */}
              <Input
                name={'Second Name'}
                id='secondName'
                placeholder={'Stone'}
                minLength={VALIDATION.NAME.MIN}
                maxLength={VALIDATION.NAME.MAX}
                customRef={secondNameRef}
                onChange={handleFieldChange}
                isValid={validatedFields.secondName.valid}
                textError={validatedFields.secondName.error}
              ></Input>
            </div>

            {/* // ? input поля */}
            <div className={`${s.fields} ${s.fields_type_horizontal}`}>
              {/* // ? phone */}
              <Input
                name={'Phone number'}
                id='phone'
                type='tel'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                placeholder={'123-456-7890'}
                customRef={phoneRef}
                onChange={handleFieldChange}
                isValid={validatedFields.phone.valid}
                textError={validatedFields.phone.error}
              ></Input>

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

            {isFilesDownloaded && (
              <div
                className={`${s.infos} ${s.infos_type_documents} ${s.infos_border_top}`}
              >
                {/* // ? Passport */}
                <File
                  handleDelete={deleteFileOnServer}
                  handleSubmit={uploadFileToServer}
                  openFile={openFile}
                  isActive={userData.passport && !!userData.passport.url}
                  title={'passport'}
                  icon={{
                    url: userData.passport && userData.passport.url,

                    alt: 'passport',
                  }}
                  typeOfFile={'passport'}
                  expansionOfFile={userData.passport && userData.passport.type}
                />

                {/* // ? proof of Address */}
                <File
                  handleDelete={deleteFileOnServer}
                  handleSubmit={uploadFileToServer}
                  openFile={openFile}
                  isActive={
                    userData.proofOfAddress && !!userData.proofOfAddress.url
                  }
                  title={'Proof of address'}
                  icon={{
                    url: userData.proofOfAddress && userData.proofOfAddress.url,

                    alt: 'Proof of address',
                  }}
                  typeOfFile={'proofOfAddress'}
                  expansionOfFile={
                    userData.proofOfAddress && userData.proofOfAddress.type
                  }
                />

                {/* // ? Selfie With ID Or Passport */}
                <File
                  handleDelete={deleteFileOnServer}
                  handleSubmit={uploadFileToServer}
                  openFile={openFile}
                  isActive={
                    userData.selfieWithIDOrPassport &&
                    !!userData.selfieWithIDOrPassport.url
                  }
                  title={'Selfie with id'}
                  icon={{
                    url:
                      userData.selfieWithIDOrPassport &&
                      userData.selfieWithIDOrPassport.url,
                    alt: 'Selfie with id',
                  }}
                  typeOfFile={'selfieWithIDOrPassport'}
                  expansionOfFile={
                    userData.selfieWithIDOrPassport &&
                    userData.selfieWithIDOrPassport.type
                  }
                />
              </div>
            )}

            {/* // ? кнопка submit */}
            {hasFormAnotherData && (
              <button
                disabled={!isFormValid}
                className={`button ${s.submit}`}
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
