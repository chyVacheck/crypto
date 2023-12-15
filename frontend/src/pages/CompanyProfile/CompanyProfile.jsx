// ! modules
import { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ? styles
import s from './CompanyProfile.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? components
import DropdownInput from '../../components/DropdownInput/DropdownInput';
import File from '../../components/File/File';
import Input from '../../components/Input/Input';
import Popup from './../../components/Popup/Popup';
import Shareholder from './../../components/Shareholder/Shareholder';

// ? constants
import COUNTRIES from './../../constants/COUNTRIES.json';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? utils
// * constants
import {
  VALIDATION,
  LEGAL_FORM_VALUES,
  MAX_COUNT_OF_SHAREHOLDERS,
  shareholder,
} from '../../utils/constants';
// * utils
import {
  checkValidity,
  checkValueIfNotUndefined,
  checkValueIfNotNull,
  toData,
  copy,
} from '../../utils/utils';

function CompanyProfile({ addNotification }) {
  const { companyId } = useParams();

  const userData = useContext(CurrentUserContext);
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Save data');

  // ? данные компании
  const [companyData, setCompanyData] = useState({});

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    // * company
    // ? business
    name: { valid: true, error: null },
    country: { valid: true, error: null },
    registrationDateOfCompany: { valid: true, error: null },
    registrationNumber: { valid: true, error: null },
    legalForm: { valid: true, error: null },
    VAT: { valid: true, error: null },
    // ? address
    legalAddress: { valid: true, error: null },
    city: { valid: true, error: null },
    zipCode: { valid: true, error: null },
    // ? bank
    bankName: { valid: true, error: null },
    bankCode: { valid: true, error: null },
    iban: { valid: true, error: null },
    accountHolderName: { valid: true, error: null },
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);
  const [textError, setTextError] = useState('');
  const [isButtonAddShareholderValid, setIsButtonAddShareholderValid] =
    useState(true);

  // * открыт ли popup
  const [isPopupOpen, setPopupOpen] = useState(false);

  // * загружены ли документы
  const [isFilesDownloaded, setFilesDownloaded] = useState(false);

  // текущий открытый файл
  const [currenFile, setCurrenFile] = useState({
    src: null,
    alt: null,
    title: null,
    type: null,
  });

  const [arrayShareholders, setArrayShareholders] = useState([]);

  // * Ref for every input
  // * company
  // ? business
  const nameRef = useRef();
  const countryOfRegistrationRef = useRef();
  const registrationDateOfCompanyRef = useRef();
  const legalFormRef = useRef();
  const VATRef = useRef();
  // ? address
  const legalAddressRef = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  // ? bank
  const bankNameRef = useRef();
  const bankCodeRef = useRef();
  const ibanRef = useRef();
  const accountHolderNameRef = useRef();

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

  // ? handle upload file to server
  function uploadFileToServer(data) {
    const file = new FormData();

    file.append('file', data.file);
    mainApi
      .putCompanyFileById(
        {
          file: file,
          typeOfFile: data.typeOfFile,
        },
        companyId,
      )
      .then(async (res) => {
        const imageUrl = URL.createObjectURL(data.file);

        const _companyData = companyData;

        _companyData[data.typeOfFile] = {
          url: imageUrl,
          type: data['Content-Type'],
        };

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

  // ? handle Shareholder Change
  function handleShareholderChange(index, name, value) {
    const updatedShareholders = [...arrayShareholders];
    updatedShareholders[index][name] = value;
    setArrayShareholders(updatedShareholders);
    const _form = document.getElementById('createCompany');
    setIsFormValid(_form.checkValidity());

    if (name === 'percentageOfOwnership') {
      let percent = 0;

      for (const shareholder of updatedShareholders) {
        percent += Number(shareholder.percentageOfOwnership);
      }

      if (percent > 100) {
        setTextError(
          'Summery percentage of ownerships can not be more then 100',
        );
        setIsFormValid(false);
      } else {
        setTextError(null);
      }
    }
  }

  function removeShareholder(index) {
    const updatedShareholders = [...arrayShareholders];
    updatedShareholders.splice(index, 1);
    setArrayShareholders(updatedShareholders);
  }

  // ? handle submit form
  async function handleSubmit(e) {
    setCurrentTextSubmitButton('Save info of company...');
    e.preventDefault();

    const _company = {
      name: checkValueIfNotUndefined(nameRef.current.value),
      countryOfRegistration: checkValueIfNotUndefined(
        countryOfRegistrationRef.current.value,
      ),
      registrationDate: toData(
        checkValueIfNotUndefined(registrationDateOfCompanyRef.current.value),
      ),
      legalForm: checkValueIfNotUndefined(legalFormRef.current.value),
      VAT: checkValueIfNotUndefined(VATRef.current.value),
      legalAddress: checkValueIfNotUndefined(legalAddressRef.current.value),
      city: checkValueIfNotUndefined(cityRef.current.value),
      zipCode: checkValueIfNotUndefined(zipCodeRef.current.value),
      bankAccount: {
        bankName: checkValueIfNotUndefined(bankNameRef.current.value),
        bankCode: checkValueIfNotUndefined(bankCodeRef.current.value),
        IBAN: checkValueIfNotUndefined(ibanRef.current.value),
        accountHolderName: checkValueIfNotUndefined(
          accountHolderNameRef.current.value,
        ),
      },
    };

    if (
      !(
        checkValueIfNotUndefined(bankNameRef.current.value) ||
        checkValueIfNotUndefined(bankCodeRef.current.value) ||
        checkValueIfNotUndefined(ibanRef.current.value) ||
        checkValueIfNotUndefined(accountHolderNameRef.current.value)
      )
    ) {
      delete _company.bankAccount;
    }

    mainApi
      .updateCompanyDataById(_company, companyId)
      .then((res) => {
        addNotification({
          name: 'Save new data of company',
          ok: true,
          text: res.message,
        });
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Save new data of company',
          ok: false,
          text: err.message,
        });
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
      });
  }

  // ? добавление формы нового акционера
  function addShareholder() {
    if (arrayShareholders.length === MAX_COUNT_OF_SHAREHOLDERS - 1) {
      setIsButtonAddShareholderValid(false);
    }
    if (arrayShareholders.length < MAX_COUNT_OF_SHAREHOLDERS) {
      setArrayShareholders([...arrayShareholders, shareholder]);
      setIsFormValid(false);
    }
  }

  function handleChooseValueDropdownInput() {
    const _form = document.getElementById('updateDataCompany');
    setIsFormValid(_form.checkValidity());
  }

  async function _getFileData(contentType, typeOfFile) {
    await mainApi
      .getCompanyFileById(
        {
          'Content-Type': contentType,
          typeOfFile: typeOfFile,
        },
        companyId,
      )
      .then(async (res) => {
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

        const _newCompanyData = companyData;

        _newCompanyData[typeOfFile].url = imageUrl;

        setCompanyData(_newCompanyData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ? use Effect`s

  // загружаем данные компании
  useEffect(() => {
    mainApi
      .getCompanyInfoById(companyId)
      .then((_companyData) => {
        setCompanyData(_companyData.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [companyId]);

  // загружаем файлы компании
  useEffect(() => {
    async function _fetchData() {
      // ? passport
      if (
        companyData.certificateOfIncorporation &&
        !companyData.certificateOfIncorporation.url
      )
        await _getFileData(
          companyData.certificateOfIncorporation.type,
          'certificateOfIncorporation',
        );

      setFilesDownloaded(true);
    }

    _fetchData();
  }, [companyData.certificateOfIncorporation]);

  // установка значений
  useEffect(() => {
    if (!!nameRef.current)
      nameRef.current.value = checkValueIfNotNull(companyData.name);
    if (!!countryOfRegistrationRef.current)
      countryOfRegistrationRef.current.value = checkValueIfNotNull(
        companyData.countryOfRegistration,
      );
    if (!!registrationDateOfCompanyRef.current)
      registrationDateOfCompanyRef.current.value = checkValueIfNotNull(
        companyData.registrationDateOfCompany,
      );
    if (!!legalFormRef.current)
      legalFormRef.current.value = checkValueIfNotNull(companyData.legalForm);
    if (!!VATRef.current)
      VATRef.current.value = checkValueIfNotNull(companyData.VAT);
    // ? address
    if (!!legalAddressRef.current)
      legalAddressRef.current.value = checkValueIfNotNull(
        companyData.legalAddress,
      );
    if (!!cityRef.current)
      cityRef.current.value = checkValueIfNotNull(companyData.city);
    if (!!zipCodeRef.current)
      zipCodeRef.current.value = checkValueIfNotNull(companyData.zipCode);

    // ? bank
    if (!!bankNameRef.current)
      bankNameRef.current.value = checkValueIfNotNull(companyData.bankName);
    if (!!bankCodeRef.current)
      bankCodeRef.current.value = checkValueIfNotNull(companyData.bankCode);
    if (!!ibanRef.current)
      ibanRef.current.value = checkValueIfNotNull(companyData.IBAN);
    if (!!accountHolderNameRef.current)
      accountHolderNameRef.current.value = checkValueIfNotNull(
        companyData.accountHolderName,
      );
  }, [companyData]);

  return (
    <>
      {!!companyData && (
        <>
          <section className={s.main}>
            <article className={s.container}>
              <form
                id='updateDataCompany'
                onSubmit={handleSubmit}
                className={s.form}
              >
                {/* // ? поля для просмотра */}
                <div className={s.infos}>
                  {/* // ? registration number */}
                  <div className={s.info}>
                    <h6 className={`${s.name} caption`}>Registration Number</h6>

                    <p
                      className={`copy ${s.value}`}
                      onClick={() => {
                        copy(companyData.registrationNumber);
                      }}
                    >
                      {companyData.registrationNumber}
                    </p>
                  </div>

                  {/* // ? company Id */}
                  <div className={s.info}>
                    <h6 className={`${s.name} caption`}>Company Id</h6>

                    <p
                      className={`copy ${s.value}`}
                      onClick={() => {
                        copy(companyId);
                      }}
                    >
                      {companyId}
                    </p>
                  </div>
                </div>

                {/* // ! business */}
                <h2 className={`landing-paragraph ${s.text}`}>Business</h2>
                <div className={s.block}>
                  {/* // ? name */}
                  <Input
                    name={'Name of company'}
                    required
                    id='name'
                    placeholder='Coin Experts'
                    minLength={VALIDATION.NAME.MIN}
                    maxLength={VALIDATION.NAME.MAX}
                    customRef={nameRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.name.valid}
                    textError={validatedFields.name.error}
                  ></Input>

                  {/* // ? country of registration */}
                  <DropdownInput
                    name='Country of registration'
                    id='countryOfRegistration'
                    nameForChangeFunction={'countryOfRegistration'}
                    customRef={countryOfRegistrationRef}
                    onChoose={handleChooseValueDropdownInput}
                    options={{
                      isCountry: true,
                    }}
                    listOfAnswers={COUNTRIES}
                  ></DropdownInput>

                  {/* // ? registration date of company */}
                  <Input
                    name={'Registration date of company'}
                    id='registrationDateOfCompany'
                    placeholder='30.12.2000'
                    customRef={registrationDateOfCompanyRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.registrationDateOfCompany.valid}
                    textError={validatedFields.registrationDateOfCompany.error}
                  ></Input>

                  {/* // ? legal Form */}
                  <DropdownInput
                    name='Legal form'
                    id='legalForm'
                    nameForChangeFunction={'legalForm'}
                    customRef={legalFormRef}
                    onChoose={() => {}}
                    listOfAnswers={LEGAL_FORM_VALUES}
                  ></DropdownInput>

                  {/* // ? VAT */}
                  <Input
                    name={'VAT number'}
                    id='VAT'
                    placeholder='HE404228'
                    customRef={VATRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.VAT.valid}
                    textError={validatedFields.VAT.error}
                  ></Input>
                </div>

                {/* // ! address */}
                <h2 className={`landing-paragraph ${s.text}`}>Address</h2>
                <div className={s.block}>
                  {/* // ? legal address */}
                  <Input
                    name={'Legal address'}
                    id='legalAddress'
                    placeholder='Walt street 10, office 404'
                    customRef={legalAddressRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.legalAddress.valid}
                    textError={validatedFields.legalAddress.error}
                  ></Input>

                  {/* // ? city */}
                  <Input
                    name={'City'}
                    id='city'
                    placeholder='Barselona'
                    customRef={cityRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.city.valid}
                    textError={validatedFields.city.error}
                  ></Input>

                  {/* // ? zip code */}
                  <Input
                    name={'Zip code'}
                    id='zipCode'
                    placeholder='228404'
                    customRef={zipCodeRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.zipCode.valid}
                    textError={validatedFields.zipCode.error}
                  ></Input>
                </div>

                {/* // ! bank */}
                <h2 className={`landing-paragraph ${s.text}`}>Bank account</h2>
                <div className={`${s.block} ${s.block_columns_two}`}>
                  {/* // ? bank name */}
                  <Input
                    name={'Bank name'}
                    id='bankName'
                    placeholder='name of your bank'
                    customRef={bankNameRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.bankName.valid}
                    textError={validatedFields.bankName.error}
                  ></Input>

                  {/* // ? bank code */}
                  <Input
                    name={'Bank code'}
                    id='bankCode'
                    placeholder='0123456789'
                    customRef={bankCodeRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.bankCode.valid}
                    textError={validatedFields.bankCode.error}
                  ></Input>

                  {/* // ? IBAN */}
                  <Input
                    name={'IBAN'}
                    id='iban'
                    placeholder='228404'
                    customRef={ibanRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.iban.valid}
                    textError={validatedFields.iban.error}
                  ></Input>

                  {/* // ? accountHolderName */}
                  <Input
                    name={'Account holder name'}
                    id='accountHolderName'
                    placeholder='John Stone'
                    customRef={accountHolderNameRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.accountHolderName.valid}
                    textError={validatedFields.accountHolderName.error}
                  ></Input>
                </div>

                {/* // ! error */}
                <p className={`${s.text} ${s.text_type_error}`}>{textError}</p>

                {/* // ! кнопка submit */}
                <button
                  disabled={!isFormValid}
                  className={`button ${s.button} ${s.button_type_submit}`}
                  type='submit'
                >
                  {currentTextSubmitButton}
                </button>

                {/* // ! files */}
                {isFilesDownloaded && (
                  <div
                    className={`${s.infos} ${s.infos_type_documents} ${s.infos_border_top}`}
                  >
                    {/* // ? certificate of incorporation */}
                    <File
                      openFile={openFile}
                      handleDelete={deleteFileOnServer}
                      handleSubmit={uploadFileToServer}
                      isActive={
                        companyData.certificateOfIncorporation &&
                        !!companyData.certificateOfIncorporation.url
                      }
                      title={'Certificate of incorporation'}
                      icon={{
                        url:
                          companyData.certificateOfIncorporation &&
                          companyData.certificateOfIncorporation.url,
                        alt: 'certificateOfIncorporation',
                      }}
                      typeOfFile={'certificateOfIncorporation'}
                      expansionOfFile={
                        companyData.certificateOfIncorporation &&
                        companyData.certificateOfIncorporation.type
                      }
                    />
                  </div>
                )}
              </form>

              {/* // ! shareholders */}
              <div className={s.shareholders}>
                <h2 className={`landing-paragraph ${s.text}`}>Shareholders</h2>
                <button
                  disabled={!isButtonAddShareholderValid}
                  onClick={addShareholder}
                  type='button'
                  className={`button ${s.button}`}
                >
                  Add shareholder
                </button>
              </div>

              <div className={`${s.block} ${s.block_type_shareholders}`}>
                {arrayShareholders.map((shareholder, index) => {
                  return (
                    <Shareholder
                      key={index}
                      data={shareholder}
                      onChange={handleShareholderChange}
                      removeShareholder={removeShareholder}
                      index={index}
                    />
                  );
                })}
              </div>
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
      )}
    </>
  );
}

export default CompanyProfile;
