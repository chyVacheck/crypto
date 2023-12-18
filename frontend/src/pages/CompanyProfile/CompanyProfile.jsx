/* eslint-disable react-hooks/exhaustive-deps */
// ! modules
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ? styles
import s from './CompanyProfile.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? components
import DateInput from '../../components/DateInput/DateInput';
import DropdownInput from '../../components/DropdownInput/DropdownInput';
import File from '../../components/File/File';
import Input from '../../components/Input/Input';
import Popup from './../../components/Popup/Popup';
import Shareholder from './../../components/Shareholder/Shareholder';

// ? constants
import COUNTRIES from './../../constants/COUNTRIES.json';

// ? utils
// * constants
import {
  VALIDATION,
  LEGAL_FORM_VALUES,
  MAX_COUNT_OF_SHAREHOLDERS,
  TEMPLATE_OF_SHAREHOLDER,
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

  // загрузились ли все данные о акционерах
  const [isDataOfShareholdersDownloaded, setDataOfShareholdersDownloaded] =
    useState(false);

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

  function removeShareholder(index) {
    const updatedShareholders = [...arrayShareholders];
    updatedShareholders.splice(index, 1);
    setArrayShareholders(updatedShareholders);
    return updatedShareholders;
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
        checkValueIfNotNull(registrationDateOfCompanyRef.current.value),
      ),
      legalForm: checkValueIfNotNull(legalFormRef.current.value),
      VAT: checkValueIfNotNull(VATRef.current.value),
      legalAddress: checkValueIfNotNull(legalAddressRef.current.value),
      city: checkValueIfNotNull(cityRef.current.value),
      zipCode: checkValueIfNotNull(zipCodeRef.current.value),
      bankAccount: {
        bankName: checkValueIfNotNull(bankNameRef.current.value),
        bankCode: checkValueIfNotNull(bankCodeRef.current.value),
        IBAN: checkValueIfNotNull(ibanRef.current.value),
        accountHolderName: checkValueIfNotNull(
          accountHolderNameRef.current.value,
        ),
      },
    };

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

  // ? добавление формы нового акционера
  function addShareholder() {
    if (arrayShareholders.length === MAX_COUNT_OF_SHAREHOLDERS - 1) {
      setIsButtonAddShareholderValid(false);
    }
    if (arrayShareholders.length < MAX_COUNT_OF_SHAREHOLDERS) {
      setArrayShareholders([...arrayShareholders, TEMPLATE_OF_SHAREHOLDER]);
      setIsFormValid(false);
    }
  }

  function handleChooseValueDropdownInput() {
    const _form = document.getElementById('updateDataCompany');
    setIsFormValid(_form.checkValidity());
  }

  // удаление акционера компании
  async function handleShareholderDelete(shareholderId, index) {
    mainApi
      .deleteShareholderByIdCompanyById(companyId, shareholderId)
      .then((res) => {
        addNotification({
          name: `Delete shareholder ${index + 1}`,
          ok: true,
          text: res.message,
        });
        removeShareholder(index);
      })
      .catch((err) => {
        addNotification({
          name: `Delete shareholder ${index + 1}`,
          ok: true,
          text: err.message,
        });
      });
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

        setFilesDownloaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function _fetchData() {
    // ? certificateOfIncorporation
    if (
      !!companyData.certificateOfIncorporation &&
      !companyData.certificateOfIncorporation.url
    )
      await _getFileData(
        companyData.certificateOfIncorporation.type,
        'certificateOfIncorporation',
      );
    setFilesDownloaded(true);
  }

  // создание нового акционера
  async function handleShareholderCreate(shareholderData, index) {
    mainApi
      .createShareholderCompanyById(companyId, shareholderData)
      .then((res) => {
        addNotification({
          name: 'Create shareholder',
          ok: true,
          text: res.message,
        });

        setArrayShareholders([...removeShareholder(index), res.data]);
      })
      .catch((err) => {
        addNotification({
          name: 'Create shareholder',
          ok: false,
          text: err.message,
        });
      });
  }

  // редактирование данных акционера
  async function handleShareholderChange(shareholderData, shareholderId) {
    mainApi
      .updateShareholderByIdCompanyById(
        shareholderData,
        companyId,
        shareholderId,
      )
      .then((res) => {
        addNotification({
          name: 'Update shareholder data',
          ok: true,
          text: res.message,
        });
      })
      .catch((err) => {
        addNotification({
          name: 'Update shareholder data',
          ok: false,
          text: err.message,
        });
      });
  }

  async function uploadShareholderFileToServer(data, index, shareholderId) {
    const file = new FormData();

    file.append('file', data.file);
    mainApi
      .putShareholderFileByIdCompanyById(
        {
          file: file,
          typeOfFile: data.typeOfFile,
        },
        companyId,
        shareholderId,
      )
      .then(async (res) => {
        const imageUrl = URL.createObjectURL(data.file);

        arrayShareholders[index][arrayShareholders[index].typeOfShareholder][
          data.typeOfFile
        ] = {
          url: imageUrl,
          type: data['Content-Type'],
          name: data.file.name,
        };

        console.log(369, arrayShareholders);

        setArrayShareholders(arrayShareholders);

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

  // ? use Effect`s

  // загружаем данные компании
  useEffect(() => {
    mainApi
      .getCompanyInfoById(companyId)
      .then(async (_companyData) => {
        const company = _companyData.data;
        setCompanyData(company);

        const _shareholders = [];

        for (const shareholderId of company.shareholders) {
          const shareholderData = await mainApi
            .getShareholderByIdCompanyById(company._id, shareholderId)
            .catch((err) => {
              console.log(err);
            });

          // ? company
          if (
            !!shareholderData.data.company &&
            shareholderData.data.company.certificateOfIncorporation
          ) {
            // certificateOfIncorporationFile
            const certificateOfIncorporationFile =
              await mainApi.getShareholderFileByIdCompanyById(
                {
                  'Content-Type':
                    shareholderData.data.company.certificateOfIncorporation
                      .type,
                  typeOfFile: 'certificateOfIncorporation',
                },
                companyId,
                shareholderId,
              );
            const blob = await certificateOfIncorporationFile.blob();
            const imageUrl = URL.createObjectURL(blob);

            shareholderData.data.company['certificateOfIncorporation'].url =
              imageUrl;
          }

          // ? individual
          if (!!shareholderData.data.individual) {
            // passport
            if (shareholderData.data.individual.passport) {
              const passportFile =
                await mainApi.getShareholderFileByIdCompanyById(
                  {
                    'Content-Type':
                      shareholderData.data.individual.passport.type,
                    typeOfFile: 'passport',
                  },
                  companyId,
                  shareholderId,
                );
              const blob = await passportFile.blob();
              const imageUrl = URL.createObjectURL(blob);

              shareholderData.data.individual['passport'].url = imageUrl;
            }
            // proofOfAddress
            if (shareholderData.data.individual.proofOfAddress) {
              const proofOfAddressFile =
                await mainApi.getShareholderFileByIdCompanyById(
                  {
                    'Content-Type':
                      shareholderData.data.individual.proofOfAddress.type,
                    typeOfFile: 'proofOfAddress',
                  },
                  companyId,
                  shareholderId,
                );
              const blob = await proofOfAddressFile.blob();
              const imageUrl = URL.createObjectURL(blob);

              shareholderData.data.individual['proofOfAddress'].url = imageUrl;
            }
          }

          _shareholders.push(shareholderData.data);
        }
        setDataOfShareholdersDownloaded(true);
        setArrayShareholders(_shareholders);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [companyId]);

  // загрузка файлов компании
  useEffect(() => {
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
      bankNameRef.current.value = !!companyData.bankAccount
        ? checkValueIfNotNull(companyData.bankAccount.bankName)
        : null;
    if (!!bankCodeRef.current)
      bankCodeRef.current.value = !!companyData.bankAccount
        ? checkValueIfNotNull(companyData.bankAccount.bankCode)
        : null;
    if (!!ibanRef.current)
      ibanRef.current.value = !!companyData.bankAccount
        ? checkValueIfNotNull(companyData.bankAccount.IBAN)
        : null;
    if (!!accountHolderNameRef.current)
      accountHolderNameRef.current.value = !!companyData.bankAccount
        ? checkValueIfNotNull(companyData.bankAccount.accountHolderName)
        : null;
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
                  <DateInput
                    name={'Registration date of company'}
                    id='registrationDateOfCompany'
                    placeholder='30.12.2000'
                    customRef={registrationDateOfCompanyRef}
                    onChange={handleFieldChange}
                    isValid={validatedFields.registrationDateOfCompany.valid}
                    textError={validatedFields.registrationDateOfCompany.error}
                    handleChooseValue={handleChooseValueDropdownInput}
                  ></DateInput>

                  {/* // ? legal Form */}
                  <DropdownInput
                    name='Legal form'
                    id='legalForm'
                    nameForChangeFunction={'legalForm'}
                    customRef={legalFormRef}
                    onChoose={handleChooseValueDropdownInput}
                    listOfAnswers={LEGAL_FORM_VALUES}
                  ></DropdownInput>

                  {/* // ? VAT */}
                  <Input
                    name={'VAT number'}
                    id='VAT'
                    placeholder='HE40422800717'
                    pattern='[A-Za-z]{2}\d{0,11}'
                    minLength={2}
                    maxLength={13}
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
                    minLength={3}
                    maxLength={10}
                    pattern={'[a-zA-Z0-9\\s\\-]{3,10}'}
                    placeholder='Ab-423'
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
                      handleDelete={false}
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
              {isDataOfShareholdersDownloaded && (
                <div className={s.shareholders}>
                  <h2 className={`landing-paragraph ${s.text}`}>
                    Shareholders
                  </h2>
                  <div className={`${s.block} ${s.block_type_shareholders}`}>
                    {arrayShareholders.map((shareholder, index) => {
                      return (
                        <Shareholder
                          key={index}
                          uploadFileToServer={uploadShareholderFileToServer}
                          openFile={openFile}
                          data={shareholder}
                          removeShareholder={removeShareholder}
                          index={index}
                          handleShareholderDelete={handleShareholderDelete}
                          companyId={companyId}
                          handleSubmit={
                            !!shareholder._id
                              ? handleShareholderChange
                              : handleShareholderCreate
                          }
                        />
                      );
                    })}
                  </div>
                  {arrayShareholders.length < 10 && (
                    <button
                      disabled={!isButtonAddShareholderValid}
                      onClick={addShareholder}
                      type='button'
                      className={`button ${s.button}`}
                    >
                      Add shareholder
                    </button>
                  )}
                </div>
              )}
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
