// ! modules
import { useState, useEffect, useRef } from 'react';

// ? styles
import s from './Shareholder.module.css';

// ? assets
// * images
// _ icons
import deleteIcon from './../../assets/images/icons/cross.svg';

// ? components
import DateInput from '../DateInput/DateInput';
import DropdownInput from '../DropdownInput/DropdownInput';
import File from '../File/File';
import Input from './../Input/Input';

// ? constants
import COUNTRIES from './../../constants/COUNTRIES.json';

// ? utils
// * constants
import {
  VALIDATION,
  LEGAL_FORM_VALUES,
  TYPE_OF_SHAREHOLDERS,
} from '../../utils/constants';
// * utils
import {
  checkValidity,
  checkValueIfNotNull,
  checkValueIfNotUndefined,
  copy,
} from '../../utils/utils';

function Shareholder({
  openFile,
  data,
  uploadFileToServer,
  onChange,
  removeShareholder,
  index,
  handleShareholderDelete,
  handleSubmit,
}) {
  const isShareholderCreated = !!data._id;
  // ? useState`s

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    typeOfShareholder: { valid: true, error: null },
    percentageOfOwnership: { valid: true, error: null },
    // ? individual
    fullName: { valid: true, error: null },
    equityShare: { valid: true, error: null },
    contactEmail: { valid: true, error: null },
    jobTitle: { valid: true, error: null },
    phoneNumber: { valid: true, error: null },
    // ? company
    name: { valid: true, error: null },
    registrationNumber: { valid: true, error: null },
    legalForm: { valid: true, error: null },
    legalAddress: { valid: true, error: null },
    city: { valid: true, error: null },
    zipCode: { valid: true, error: null },
    countryOfRegistration: { valid: true, error: null },
    VAT: { valid: true, error: null },
    registrationDate: { valid: true, error: null },
  });

  // * компания или индивидуальный акционер
  const [isCompanyShareholder, setCompanyShareholder] = useState(
    data.typeOfShareholder === 'company',
  );

  // все ли input`s валидны
  const [isAllInputsValid, setAllInputsValid] = useState(false);

  // ? useRef`s

  // * Ref for every input
  const typeOfShareholderRef = useRef();
  const percentageOfOwnershipRef = useRef();
  // ? individual
  const fullNameRef = useRef();
  const contactEmailRef = useRef();
  const jobTitleRef = useRef();
  const phoneNumberRef = useRef();
  // ? company
  const nameRef = useRef();
  const registrationNumberRef = useRef();
  const legalFormRef = useRef();
  const legalAddressRef = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const countryOfRegistrationRef = useRef();
  const VATRef = useRef();
  const registrationDateRef = useRef();

  // ? use Effect`s

  // установка значений
  useEffect(() => {
    if (!!typeOfShareholderRef.current)
      typeOfShareholderRef.current.value = checkValueIfNotNull(
        data.typeOfShareholder,
      );
    if (!!percentageOfOwnershipRef.current) {
      percentageOfOwnershipRef.current.value = checkValueIfNotNull(
        data.percentageOfOwnership,
      );
    }
    // ? individual
    if (!!fullNameRef.current)
      fullNameRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.individual && data.individual.fullName)
          : data.fullName,
      );
    if (!!contactEmailRef.current)
      contactEmailRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(
              !!data.individual && data.individual.contactEmail,
            )
          : data.contactEmail,
      );
    if (!!jobTitleRef.current)
      jobTitleRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.individual && data.individual.jobTitle)
          : data.jobTitle,
      );
    if (!!phoneNumberRef.current)
      phoneNumberRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(
              !!data.individual && data.individual.phoneNumber,
            )
          : data.phoneNumber,
      );
    // ? company
    if (!!nameRef.current)
      nameRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.company && data.company.name)
          : data.name,
      );
    if (!!registrationNumberRef.current)
      registrationNumberRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(
              !!data.company && data.company.registrationNumber,
            )
          : data.registrationNumber,
      );
    if (!!legalFormRef.current)
      legalFormRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.company && data.company.legalForm)
          : data.legalForm,
      );
    if (!!legalAddressRef.current)
      legalAddressRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.company && data.company.legalAddress)
          : data.legalAddress,
      );
    if (!!cityRef.current)
      cityRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.company && data.company.city)
          : data.city,
      );
    if (!!zipCodeRef.current)
      zipCodeRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.company && data.company.zipCode)
          : data.zipCode,
      );
    if (!!countryOfRegistrationRef.current)
      countryOfRegistrationRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(
              !!data.company && data.company.countryOfRegistration,
            )
          : data.countryOfRegistration,
      );
    if (!!VATRef.current)
      VATRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.company && data.company.VAT)
          : data.VAT,
      );
    if (!!registrationDateRef.current)
      registrationDateRef.current.value = checkValueIfNotNull(
        isShareholderCreated
          ? checkValueIfNotNull(!!data.company && data.company.registrationDate)
          : data.registrationDate,
      );
  }, []);

  // ? function`s

  function handleChooseValueDropdownInput() {
    let _isAllInputsValid = true;
    for (const name in validatedFields) {
      _isAllInputsValid = _isAllInputsValid && validatedFields[name].valid;
    }
    setAllInputsValid(_isAllInputsValid);
  }

  // изменение поля
  function handleFieldChange(event) {
    const { target } = event;
    const isTargetValid = target.checkValidity();
    let _isAllInputsValid = isTargetValid;
    // смена значение валидации
    const validatedKeyPare = {
      [target.name]: {
        valid: isTargetValid,
        error: checkValidity(target),
      },
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });

    if (_isAllInputsValid) {
      for (const name in validatedFields) {
        if (target.name !== name) {
          _isAllInputsValid = _isAllInputsValid && validatedFields[name].valid;
        }
      }
    }

    setAllInputsValid(_isAllInputsValid);

    if (!!onChange) {
      onChange(index, target.name, target.value);
    }
  }

  // очистка формы
  function handleFormClear(typeOfShareholder) {
    if (typeOfShareholder === 'company') {
      fullNameRef.current.value = null;
      contactEmailRef.current.value = null;
      jobTitleRef.current.value = null;
      phoneNumberRef.current.value = null;
    } else if (typeOfShareholder === 'individual') {
      nameRef.current.value = null;
      registrationNumberRef.current.value = null;
      legalFormRef.current.value = null;
      legalAddressRef.current.value = null;
      cityRef.current.value = null;
      zipCodeRef.current.value = null;
      countryOfRegistrationRef.current.value = null;
      VATRef.current.value = null;
      registrationDateRef.current.value = null;
    }
  }

  // сохранение данных о shareholder
  function handleShareholderChange(e) {
    const _shareholder = {
      percentageOfOwnership: checkValueIfNotUndefined(
        percentageOfOwnershipRef.current.value,
      ),
    };

    if (data.typeOfShareholder === 'company') {
      _shareholder.name = checkValueIfNotNull(
        nameRef.current && nameRef.current.value,
      );

      _shareholder.legalForm = checkValueIfNotNull(
        legalFormRef.current && legalFormRef.current.value,
      );

      _shareholder.legalAddress = checkValueIfNotNull(
        legalAddressRef.current && legalAddressRef.current.value,
      );
      _shareholder.city = checkValueIfNotNull(
        cityRef.current && cityRef.current.value,
      );

      _shareholder.zipCode = checkValueIfNotNull(
        zipCodeRef.current && zipCodeRef.current.value,
      );

      _shareholder.countryOfRegistration = checkValueIfNotNull(
        countryOfRegistrationRef.current &&
          countryOfRegistrationRef.current.value,
      );
      _shareholder.VAT = checkValueIfNotNull(
        VATRef.current && VATRef.current.value,
      );
      _shareholder.registrationDate = checkValueIfNotNull(
        registrationDateRef.current && registrationDateRef.current.value,
      );
    } else if (data.typeOfShareholder === 'individual') {
      _shareholder.fullName = checkValueIfNotUndefined(
        fullNameRef.current && fullNameRef.current.value,
      );
      _shareholder.contactEmail = checkValueIfNotUndefined(
        contactEmailRef.current && contactEmailRef.current.value,
      );
      _shareholder.jobTitle = checkValueIfNotUndefined(
        jobTitleRef.current && jobTitleRef.current.value,
      );
      _shareholder.phoneNumber = checkValueIfNotUndefined(
        phoneNumberRef.current && phoneNumberRef.current.value,
      );
    }

    handleSubmit(_shareholder, data._id);
    setAllInputsValid(false);
  }

  // создание shareholder
  function handleShareholderCreate(e) {
    const allData = {
      company: {
        name: checkValueIfNotUndefined(
          nameRef.current && nameRef.current.value,
        ),
        registrationNumber: checkValueIfNotUndefined(
          registrationNumberRef.current && registrationNumberRef.current.value,
        ),
        legalForm: checkValueIfNotUndefined(
          legalFormRef.current && legalFormRef.current.value,
        ),
        legalAddress: checkValueIfNotUndefined(
          legalAddressRef.current && legalAddressRef.current.value,
        ),
        city: checkValueIfNotUndefined(
          cityRef.current && cityRef.current.value,
        ),
        zipCode: checkValueIfNotUndefined(
          zipCodeRef.current && zipCodeRef.current.value,
        ),
        countryOfRegistration: checkValueIfNotUndefined(
          countryOfRegistrationRef.current &&
            countryOfRegistrationRef.current.value,
        ),
        VAT: checkValueIfNotUndefined(VATRef.current && VATRef.current.value),
        registrationDate: checkValueIfNotUndefined(
          registrationDateRef.current && registrationDateRef.current.value,
        ),
      },
      individual: {
        fullName: checkValueIfNotUndefined(
          fullNameRef.current && fullNameRef.current.value,
        ),
        contactEmail: checkValueIfNotUndefined(
          contactEmailRef.current && contactEmailRef.current.value,
        ),
        jobTitle: checkValueIfNotUndefined(
          jobTitleRef.current && jobTitleRef.current.value,
        ),
        phoneNumber: checkValueIfNotUndefined(
          phoneNumberRef.current && phoneNumberRef.current.value,
        ),
      },
    };

    const _shareholder = {
      typeOfShareholder: typeOfShareholderRef.current.value,
      percentageOfOwnership: checkValueIfNotUndefined(
        percentageOfOwnershipRef.current.value,
      ),
      data: allData[typeOfShareholderRef.current.value],
    };

    handleSubmit(_shareholder, index);
    setAllInputsValid(false);
  }

  function handleUploadFileToServer(dataFile) {
    uploadFileToServer(dataFile, index, data._id);
  }

  return (
    <article className={s.main}>
      {/* // ? header */}
      <div className={s.header}>
        <div className={s.header__info}>
          <h3 className={`body ${s.text} ${s.value}`}>{index + 1}.</h3>
          {/* // ? Id */}
          {isShareholderCreated && (
            <>
              <h3 className={`body ${s.text}`}>
                Id:{' '}
                <span
                  onClick={() => {
                    copy(data._id);
                  }}
                  className={`copy caption ${s.value}`}
                >
                  {data._id}
                </span>
              </h3>
              <h3 className={`body ${s.text}`}>
                Type of shareholder:{' '}
                <span
                  onClick={() => {
                    copy(data.typeOfShareholder);
                  }}
                  className={`copy caption ${s.value}`}
                >
                  {data.typeOfShareholder}
                </span>
              </h3>
              {isCompanyShareholder && (
                <h3 className={`body ${s.text}`}>
                  Registration number:{' '}
                  <span
                    onClick={() => {
                      copy(data.company.registrationNumber);
                    }}
                    className={`copy caption ${s.value}`}
                  >
                    {data.company.registrationNumber}
                  </span>
                </h3>
              )}
            </>
          )}
        </div>

        <button
          onClick={async (e) => {
            if (isShareholderCreated) {
              await handleShareholderDelete(data._id, index);
            } else {
              removeShareholder(index);
            }
          }}
          type='button'
          className={`button ${s.button} ${s.button_type_delete}`}
        >
          <img
            className={s.button__icon}
            alt='delete shareholder'
            src={deleteIcon}
          />
        </button>
      </div>

      {/* // ? type of user and percentage of ownership */}
      <div
        className={`${s.block} ${isShareholderCreated && s.block_type_created}`}
      >
        {/* // * type of shareholder */}
        {!isShareholderCreated && (
          <DropdownInput
            required
            name={'Type of shareholder'}
            nameForChangeFunction={'typeOfShareholder'}
            id={`typeOfShareholder_${index}`}
            customRef={typeOfShareholderRef}
            onChoose={(e) => {
              if (!!onChange) {
                onChange(
                  index,
                  'typeOfShareholder',
                  typeOfShareholderRef.current.value,
                );
                handleFormClear(typeOfShareholderRef.current.value);
              }
              setCompanyShareholder(
                typeOfShareholderRef.current.value === 'company',
              );
              handleChooseValueDropdownInput();
            }}
            listOfAnswers={TYPE_OF_SHAREHOLDERS}
          ></DropdownInput>
        )}

        {/* // * percentage of ownership */}
        <Input
          name='Percentage of ownership'
          nameForChangeFunction='percentageOfOwnership'
          id={`percentageOfOwnership_${index}`}
          placeholder='0 - 100%'
          type='number'
          min={0}
          max={100}
          customRef={percentageOfOwnershipRef}
          onChange={handleFieldChange}
          isValid={validatedFields.percentageOfOwnership.valid}
          textError={validatedFields.percentageOfOwnership.error}
        ></Input>
      </div>

      {isCompanyShareholder ? (
        <>
          {/* // ? company */}
          <div className={`${s.block} ${s.block_cells_more}`}>
            {/* // * name */}
            <Input
              name='Name of company'
              nameForChangeFunction={'name'}
              required
              id={`name_${index}`}
              placeholder='Coin Experts '
              minLength={VALIDATION.NAME.MIN}
              maxLength={VALIDATION.NAME.MAX}
              customRef={nameRef}
              onChange={handleFieldChange}
              isValid={validatedFields.name.valid}
              textError={validatedFields.name.error}
            ></Input>
            {/* // * registration number */}
            {!isShareholderCreated && (
              <Input
                name='Registration number'
                nameForChangeFunction={'registrationNumber'}
                required
                id={`registrationNumber_${index}`}
                placeholder='202005123467'
                customRef={registrationNumberRef}
                onChange={handleFieldChange}
                isValid={validatedFields.registrationNumber.valid}
                textError={validatedFields.registrationNumber.error}
              ></Input>
            )}
            {/* // * legal form */}
            <DropdownInput
              name={'Legal form'}
              nameForChangeFunction={'legalForm'}
              id={`legalForm_${index}`}
              customRef={legalFormRef}
              onChoose={(e) => {
                if (!!onChange)
                  onChange(index, 'legalForm', legalFormRef.current.value);
                handleChooseValueDropdownInput();
              }}
              listOfAnswers={LEGAL_FORM_VALUES}
            ></DropdownInput>
            {/* // * legal address */}
            <Input
              name='Legal Address'
              nameForChangeFunction={'legalAddress'}
              id={`legalAddress_${index}`}
              placeholder='Walt street 10, office 404'
              customRef={legalAddressRef}
              onChange={handleFieldChange}
              isValid={validatedFields.legalAddress.valid}
              textError={validatedFields.legalAddress.error}
            ></Input>
            {/* // * city */}
            <Input
              name={'City'}
              nameForChangeFunction={'city'}
              id={`city_${index}`}
              placeholder='Barselona'
              customRef={cityRef}
              onChange={handleFieldChange}
              isValid={validatedFields.city.valid}
              textError={validatedFields.city.error}
            ></Input>
            {/* // * zip code */}
            <Input
              name={'Zip code'}
              nameForChangeFunction={'zipCode'}
              id={`zipCode_${index}`}
              placeholder='228404'
              customRef={zipCodeRef}
              onChange={handleFieldChange}
              isValid={validatedFields.zipCode.valid}
              textError={validatedFields.zipCode.error}
            ></Input>
            {/* // * country of registration */}
            <DropdownInput
              name={'Country of registration'}
              nameForChangeFunction={'countryOfRegistration'}
              id={`countryOfRegistration_${index}`}
              options={{ isCountry: true }}
              customRef={countryOfRegistrationRef}
              onChoose={(e) => {
                if (!!onChange)
                  onChange(
                    index,
                    `countryOfRegistration`,
                    countryOfRegistrationRef.current.value,
                  );
                handleChooseValueDropdownInput();
              }}
              listOfAnswers={COUNTRIES}
            ></DropdownInput>
            {/* // * VAT */}
            <Input
              name={'VAT'}
              nameForChangeFunction={'VAT'}
              id={`VAT_${index}`}
              placeholder='HE404228'
              customRef={VATRef}
              onChange={handleFieldChange}
              isValid={validatedFields.VAT.valid}
              textError={validatedFields.VAT.error}
            ></Input>
            {/* // * registration date */}
            <DateInput
              name={'Registration date of company'}
              id={`registrationDate_${index}`}
              nameForChangeFunction={'registrationDate'}
              placeholder='30.12.2000'
              customRef={registrationDateRef}
              onChoose={handleFieldChange}
              isValid={validatedFields.registrationDate.valid}
              textError={validatedFields.registrationDate.error}
              handleChooseValue={handleChooseValueDropdownInput}
            ></DateInput>
          </div>
        </>
      ) : (
        <>
          {/* // ? individual */}
          <div className={s.block}>
            {/* // * full name */}
            <Input
              name='Full name'
              required
              nameForChangeFunction='fullName'
              id={`fullNameRef_${index}`}
              placeholder='John Stone'
              minLength={VALIDATION.NAME.MIN}
              maxLength={VALIDATION.NAME.MAX}
              customRef={fullNameRef}
              onChange={handleFieldChange}
              isValid={validatedFields.fullName.valid}
              textError={validatedFields.fullName.error}
            ></Input>
            {/* // * Contact email */}
            <Input
              name='Contact email'
              nameForChangeFunction='contactEmail'
              id={`contactEmail_${index}`}
              type='email'
              placeholder='example@gmail.com'
              customRef={contactEmailRef}
              onChange={handleFieldChange}
              isValid={validatedFields.contactEmail.valid}
              textError={validatedFields.contactEmail.error}
            ></Input>
            {/* // * Job title */}
            <Input
              name='Job title'
              nameForChangeFunction='jobTitle'
              id={`jobTitle_${index}`}
              placeholder='Job title'
              customRef={jobTitleRef}
              onChange={handleFieldChange}
              isValid={validatedFields.jobTitle.valid}
              textError={validatedFields.jobTitle.error}
            ></Input>
            {/* // * Phone number */}
            <Input
              name='Phone Number'
              nameForChangeFunction='phoneNumber'
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              id={`phoneNumber_${index}`}
              placeholder={'123-456-7890'}
              customRef={phoneNumberRef}
              onChange={handleFieldChange}
              isValid={validatedFields.phoneNumber.valid}
              textError={validatedFields.phoneNumber.error}
            ></Input>
          </div>
        </>
      )}

      {
        <div className={s.buttons}>
          <button
            disabled={!isAllInputsValid}
            onClick={
              isShareholderCreated
                ? handleShareholderChange
                : handleShareholderCreate
            }
            className={`button ${s.button} ${s.button_type_submit}`}
          >
            {isShareholderCreated ? 'Save changes' : 'Save shareholder data'}
          </button>
        </div>
      }

      {/* // ! files */}
      {isShareholderCreated && (
        <div className={`${s.files}`}>
          {isCompanyShareholder ? (
            <>
              {/* // ? certificate of incorporation */}
              <File
                openFile={openFile}
                handleDelete={false}
                handleSubmit={handleUploadFileToServer}
                isActive={
                  data.company.certificateOfIncorporation &&
                  !!data.company.certificateOfIncorporation.url
                }
                title={'Certificate of incorporation'}
                icon={{
                  url:
                    data.company.certificateOfIncorporation &&
                    data.company.certificateOfIncorporation.url,
                  alt: 'certificateOfIncorporation',
                }}
                typeOfFile={'certificateOfIncorporation'}
                expansionOfFile={
                  data.company.certificateOfIncorporation &&
                  data.company.certificateOfIncorporation.type
                }
              />
            </>
          ) : (
            <>
              {/* // ? passport */}
              <File
                openFile={openFile}
                handleDelete={false}
                handleSubmit={handleUploadFileToServer}
                isActive={
                  data.individual.passport && !!data.individual.passport.url
                }
                title={'Passport'}
                icon={{
                  url: data.individual.passport && data.individual.passport.url,
                  alt: 'passport',
                }}
                typeOfFile={'passport'}
                expansionOfFile={
                  data.individual.passport && data.individual.passport.type
                }
              />
              {/* // ? proofOfAddress */}
              <File
                openFile={openFile}
                handleDelete={false}
                handleSubmit={handleUploadFileToServer}
                isActive={
                  data.individual.proofOfAddress &&
                  !!data.individual.proofOfAddress.url
                }
                title={'Proof of address'}
                icon={{
                  url:
                    data.individual.proofOfAddress &&
                    data.individual.proofOfAddress.url,
                  alt: 'proofOfAddress',
                }}
                typeOfFile={'proofOfAddress'}
                expansionOfFile={
                  data.individual.proofOfAddress &&
                  data.individual.proofOfAddress.type
                }
              />
            </>
          )}
        </div>
      )}
    </article>
  );
}

export default Shareholder;
