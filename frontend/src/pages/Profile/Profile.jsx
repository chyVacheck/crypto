// ! modules
import { useState, useRef, useContext, useEffect } from 'react';

// ? styles
import s from './Profile.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? assets
// * images
// _ icons
import passportImage from './../../assets/images/passport_type_color.png';
import proofOfAddressImage from './../../assets/images/location_type_color.png';
import selfieWithIdImage from './../../assets/images/selfie_type_color.png';

// ? components
import File from '../../components/File/File';
import Input from '../../components/Input/Input';
import Popup from './../../components/Popup/Popup';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? utils
// * constants
import { VALIDATION, paths } from '../../utils/constants';
// * utils
import { checkValidity, copy } from '../../utils/utils';

function Profile({ addNotification, setUser }) {
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
  // * загружены ли документы
  const [isFilesDownloaded, setFilesDownloaded] = useState(false);

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

    if (
      userData.typeOfUser !== typeOfUserRef.current.value &&
      typeOfUserRef.current.value === 'Juridical person'
    ) {
      await mainApi.deleteCompanyById(userData.companyId).then(async (res) => {
        addNotification({
          name: 'Delete company',
          ok: true,
          text: res.message,
        });

        await mainApi
          .updateUserData({
            companyId: undefined,
            typeOfUser: typeOfUserRef.current.value,
          })
          .then((answer) => {
            Object.assign(userData, {
              companyId: answer.data.companyId,
              typeOfUser: answer.data.typeOfUser,
            });

            setUser(userData);
          });
      });
    }

    await mainApi
      .updateUserData({
        name: nameRef.current.value,
        secondName: secondNameRef.current.value,
        phone: phoneRef.current.value,
      })
      .then((res) => {
        addNotification({
          name: 'Update user data',
          ok: true,
          text: res.message,
        });

        const _newUserData = userData;

        _newUserData.name = res.data.name;
        _newUserData.secondName = res.data.secondName;
        _newUserData.phone = res.data.phone;

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
        setCurrentTextSubmitButton('Save data');
        setIsFormValid(false);
      });
  }

  async function deleteFileOnServer(e, typeOfFile) {
    e.preventDefault();

    await mainApi
      .deleteUserFile(typeOfFile)
      .then((res) => {
        addNotification({
          name: `Delete file`,
          ok: true,
          text: res.message,
        });

        const _newUserData = userData;

        delete _newUserData[typeOfFile];

        setUser(_newUserData);
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

  async function _getFileData(contentType, typeOfFile) {
    await mainApi
      .getUserFile({
        'Content-Type': contentType,
        typeOfFile: typeOfFile,
      })
      .then(async (res) => {
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

        const _newUserData = userData;

        _newUserData[typeOfFile].url = imageUrl;

        setUser(_newUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const answers = ['Juridical person', 'Legal entity'];

  useEffect(() => {
    nameRef.current.value = userData.name;
    secondNameRef.current.value = userData.secondName;
    phoneRef.current.value = userData.phone;
    typeOfUserRef.current.value = userData.typeOfUser;
  }, [userData, isFilesDownloaded]);

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
  }, [setUser, userData]);

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
                <h6 className={`${s.name} caption`}>User Id</h6>

                <p
                  className={`copy ${s.text}`}
                  onClick={() => {
                    copy(userData._id);
                  }}
                >
                  {userData._id}
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
                            userData.typeOfUser !== 'Legal entity' &&
                            element === 'Legal entity'
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

            {/* // ? files */}
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
                    src: passportImage,
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
                    src: proofOfAddressImage,
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
            )}

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
