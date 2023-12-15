// ! modules
import { useState, useEffect, useRef } from 'react';

// ? styles
import s from './Shareholder.module.css';

// ? assets
// * images
// _ icons
import deleteIcon from './../../assets/images/icons/cross.svg';

// ? components
import DropdownInput from '../DropdownInput/DropdownInput';
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
import { checkValidity } from '../../utils/utils';

function Shareholder({ data, onChange, removeShareholder, index }) {
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
      typeOfShareholderRef.current.value = data.typeOfShareholder;
    if (!!percentageOfOwnershipRef.current)
      percentageOfOwnershipRef.current.value = data.percentageOfOwnership;
    if (!!fullNameRef.current) fullNameRef.current.value = data.fullName;
    if (!!contactEmailRef.current)
      contactEmailRef.current.value = data.contactEmail;
    if (!!jobTitleRef.current) jobTitleRef.current.value = data.jobTitle;
    if (!!phoneNumberRef.current)
      phoneNumberRef.current.value = data.phoneNumber;
    if (!!nameRef.current) nameRef.current.value = data.name;
    if (!!registrationNumberRef.current)
      registrationNumberRef.current.value = data.registrationNumber;
    if (!!legalFormRef.current) legalFormRef.current.value = data.legalForm;
    if (!!legalAddressRef.current)
      legalAddressRef.current.value = data.legalAddress;
    if (!!cityRef.current) cityRef.current.value = data.city;
    if (!!zipCodeRef.current) zipCodeRef.current.value = data.zipCode;
    if (!!countryOfRegistrationRef.current)
      countryOfRegistrationRef.current.value = data.countryOfRegistration;
    if (!!VATRef.current) VATRef.current.value = data.VAT;
    if (!!registrationDateRef.current)
      registrationDateRef.current.value = data.registrationDate;
  });

  // ? function
  function handleFieldChange(event) {
    const { target } = event;
    const isValid = target.checkValidity();

    // смена значение валидации
    const validatedKeyPare = {
      [target.name]: {
        valid: isValid,
        error: checkValidity(target),
      },
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    onChange(index, target.name, target.value);
  }

  return (
    <article className={s.main}>
      {/* // ? header */}
      <div className={s.header}>
        <h2 className={`body ${s.index}`}>{index + 1}.</h2>
        <button
          onClick={(e) => {
            removeShareholder(index);
          }}
          type='button'
          className={`button ${s.button}`}
        >
          <img
            className={s.button__icon}
            alt='delete shareholder'
            src={deleteIcon}
          />
        </button>
      </div>

      {/* // ? type of user */}
      <div className={s.block}>
        {/* // * type of shareholder */}
        <DropdownInput
          required
          name={'Type of shareholder'}
          nameForChangeFunction={'typeOfShareholder'}
          id={`typeOfShareholder_${index}`}
          customRef={typeOfShareholderRef}
          onChoose={(e) =>
            onChange(
              index,
              'typeOfShareholder',
              typeOfShareholderRef.current.value,
            )
          }
          listOfAnswers={TYPE_OF_SHAREHOLDERS}
        ></DropdownInput>

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

      {!!typeOfShareholderRef.current &&
      typeOfShareholderRef.current.value === 'individual' ? (
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
      ) : (
        <>
          {/* // ? company */}
          <div className={`${s.block} ${s.block_cells_more}`}>
            {/* // * name */}
            <Input
              name='Name of company'
              nameForChangeFunction='name'
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
            <Input
              name='Registration number'
              nameForChangeFunction='registrationNumber'
              required
              id={`registrationNumber_${index}`}
              placeholder='202005123467'
              customRef={registrationNumberRef}
              onChange={handleFieldChange}
              isValid={validatedFields.registrationNumber.valid}
              textError={validatedFields.registrationNumber.error}
            ></Input>
            {/* // * legal form */}
            <DropdownInput
              name={'Legal form'}
              nameForChangeFunction={'legalForm'}
              id={`legalForm_${index}`}
              customRef={legalFormRef}
              onChoose={(e) =>
                onChange(index, 'legalForm', legalFormRef.current.value)
              }
              listOfAnswers={LEGAL_FORM_VALUES}
            ></DropdownInput>
            {/* // * legal address */}
            <Input
              name='Legal Address'
              nameForChangeFunction='legalAddress'
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
              nameForChangeFunction='city'
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
              nameForChangeFunction='zipCode'
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
              id={`legalForm_${index}`}
              options={{ isCountry: true }}
              customRef={countryOfRegistrationRef}
              onChoose={(e) =>
                onChange(
                  index,
                  'countryOfRegistration',
                  countryOfRegistrationRef.current.value,
                )
              }
              listOfAnswers={COUNTRIES}
            ></DropdownInput>
            {/* // * VAT */}
            <Input
              name={'VAT'}
              nameForChangeFunction='VAT'
              id={`VAT_${index}`}
              placeholder='HE404228'
              customRef={VATRef}
              onChange={handleFieldChange}
              isValid={validatedFields.VAT.valid}
              textError={validatedFields.VAT.error}
            ></Input>
            {/* // * registration date */}
            <Input
              name={'Registration date'}
              nameForChangeFunction='registrationDate'
              id={`registrationDate_${index}`}
              placeholder='30.12.2000'
              customRef={registrationDateRef}
              onChange={handleFieldChange}
              isValid={validatedFields.registrationDate.valid}
              textError={validatedFields.registrationDate.error}
            ></Input>
          </div>
        </>
      )}
    </article>
  );
}

export default Shareholder;
