// ! modules
import { useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';

// ? styles
import s from './CreateCompany.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? components
import DateInput from '../../components/DateInput/DateInput';
import DropdownInput from '../../components/DropdownInput/DropdownInput';
import Input from '../../components/Input/Input';
import Shareholder from '../../components/Shareholder/Shareholder';

// ? constants
import COUNTRIES from './../../constants/COUNTRIES.json';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? utils
// * constants
import {
  VALIDATION,
  LEGAL_FORM_VALUES,
  paths,
  MAX_COUNT_OF_SHAREHOLDERS,
  TEMPLATE_OF_SHAREHOLDER,
} from '../../utils/constants';
// * utils
import {
  checkValidity,
  checkValueIfNotNull,
  checkValueIfNotUndefined,
  toData,
} from '../../utils/utils';

function CreateCompany({ addNotification, setUser }) {
  const userData = useContext(CurrentUserContext);
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] = useState(
    'Add info of company',
  );

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

  // массив shareholder`ов
  const [arrayShareholders, setArrayShareholders] = useState([]);

  // * Ref for every input
  // * company
  // ? business
  const nameRef = useRef();
  const countryOfRegistrationRef = useRef();
  const registrationDateOfCompanyRef = useRef();
  const registrationNumberRef = useRef();
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

  // ? handle submit form
  async function handleSubmit(e) {
    setCurrentTextSubmitButton('Add info of company...');
    e.preventDefault();

    let _shareholders = [];

    if (arrayShareholders.length > 0) {
      for (const shareholder of arrayShareholders) {
        let _data = {};
        let _shareholder = {
          typeOfShareholder: shareholder.typeOfShareholder,
          percentageOfOwnership: Number(shareholder.percentageOfOwnership),
        };

        switch (shareholder.typeOfShareholder) {
          case 'individual':
            _data = {
              fullName: checkValueIfNotUndefined(shareholder.fullName),
              contactEmail: checkValueIfNotUndefined(shareholder.contactEmail),
              jobTitle: checkValueIfNotUndefined(shareholder.jobTitle),
              phoneNumber: checkValueIfNotUndefined(shareholder.phoneNumber),
            };
            break;
          case 'company':
            _data = {
              name: checkValueIfNotUndefined(shareholder.name),
              registrationNumber: checkValueIfNotUndefined(
                shareholder.registrationNumber,
              ),
              legalForm: checkValueIfNotUndefined(shareholder.legalForm),
              legalAddress: checkValueIfNotUndefined(shareholder.legalAddress),
              city: checkValueIfNotUndefined(shareholder.city),
              zipCode: checkValueIfNotUndefined(shareholder.zipCode),
              countryOfRegistration: checkValueIfNotUndefined(
                shareholder.countryOfRegistration,
              ),
              VAT: checkValueIfNotUndefined(shareholder.VAT),
              registrationDate: checkValueIfNotUndefined(
                shareholder.registrationDate,
              ),
            };
            break;

          default:
            break;
        }

        _shareholder.data = _data;

        _shareholders.push(_shareholder);
      }
    } else {
      _shareholders = undefined;
    }

    const _company = {
      name: checkValueIfNotUndefined(nameRef.current.value),
      countryOfRegistration: checkValueIfNotUndefined(
        countryOfRegistrationRef.current.value,
      ),
      registrationDate: toData(
        checkValueIfNotUndefined(registrationDateOfCompanyRef.current.value),
      ),
      registrationNumber: checkValueIfNotUndefined(
        registrationNumberRef.current.value,
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
      shareholders: _shareholders,
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
      .createCompany(_company)
      .then((res) => {
        addNotification({
          name: 'Add info of company',
          ok: true,
          text: res.message,
        });

        const _newUserData = userData;

        _newUserData.companyId = res.data._id;
        _newUserData.typeOfUser = 'Legal entity';

        setUser(_newUserData);
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Add info of company',
          ok: false,
          text: err.message,
        });
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Add info of company');
        setIsFormValid(false);
      });
  }

  function handleChangeInput() {
    const _form = document.getElementById('createCompany');
    setIsFormValid(_form.checkValidity());
  }

  // ? handle Shareholder Change
  function handleShareholderChange(index, name, value) {
    const updatedShareholders = [...arrayShareholders];
    updatedShareholders[index][name] = checkValueIfNotNull(value);

    setArrayShareholders(updatedShareholders);

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
    handleChangeInput();
  }

  function removeShareholder(index) {
    const updatedShareholders = [...arrayShareholders];
    updatedShareholders.splice(index, 1);
    setArrayShareholders(updatedShareholders);
  }

  // ? добавление формы нового акционера
  function addShareholder() {
    const _copy = Object.assign({}, TEMPLATE_OF_SHAREHOLDER);

    if (arrayShareholders.length === MAX_COUNT_OF_SHAREHOLDERS - 1) {
      setIsButtonAddShareholderValid(false);
    }
    if (arrayShareholders.length < MAX_COUNT_OF_SHAREHOLDERS) {
      setArrayShareholders([...arrayShareholders, _copy]);
      setIsFormValid(false);
    }
  }

  useEffect(() => {
    countryOfRegistrationRef.current.value = null;
  }, []);

  return (
    <section className={s.main}>
      <article className={s.container}>
        <form id='createCompany' onSubmit={handleSubmit} className={s.form}>
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

            {/* // ? registrationNumber */}
            <Input
              name={'Registration number of company'}
              required
              id='registrationNumber'
              placeholder='202005123456'
              minLength={VALIDATION.REGISTRATION_NUMBER.MIN}
              maxLength={VALIDATION.REGISTRATION_NUMBER.MAX}
              customRef={registrationNumberRef}
              onChange={handleFieldChange}
              isValid={validatedFields.registrationNumber.valid}
              textError={validatedFields.registrationNumber.error}
            ></Input>

            {/* // ? country of registration */}
            <DropdownInput
              name='Country of registration'
              id='countryOfRegistration'
              nameForChangeFunction={'countryOfRegistration'}
              customRef={countryOfRegistrationRef}
              onChoose={handleChangeInput}
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
              onChoose={handleChangeInput}
              isValid={validatedFields.registrationDateOfCompany.valid}
              textError={validatedFields.registrationDateOfCompany.error}
            ></DateInput>

            {/* // ? legal Form */}
            <DropdownInput
              name='Legal Form'
              id='legalForm'
              nameForChangeFunction={'legalForm'}
              customRef={legalFormRef}
              onChoose={handleChangeInput}
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
        </form>

        <NavLink className={`link ${s.link}`} to={paths.user.profile}>
          Back to profile
        </NavLink>
      </article>
    </section>
  );
}

export default CreateCompany;
