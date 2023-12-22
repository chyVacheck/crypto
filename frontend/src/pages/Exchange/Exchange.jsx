// ! modules
import { useState, useEffect, useRef } from 'react';

// ? styles
import s from './Exchange.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? components
import Card from '../../components/Card/Card';
import DropdownInput from '../../components/DropdownInput/DropdownInput';
import Input from './../../components/Input/Input';

// ? utils
// * constants
import { PAYMENTS } from './../../utils/constants';
// * utils
import { checkValidity } from '../../utils/utils';

function Exchange({ addNotification }) {
  // ? useState`s
  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    givenValue: { valid: true, error: null },
    received: { valid: true, error: null },
    cardNumber: { valid: true, error: null },
  });
  // * валидация формы
  const [isFormValid, setIsFormValid] = useState(false);

  // загружены ли курсы валют
  const [isPricesLoad, setPricesLoad] = useState(false);
  // курсы валют
  const [allPrices, setAllPrices] = useState();
  // таймер обновления
  const [timeToUpdate, setTimeToUpdate] = useState(0);
  // метод оплаты
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(null);

  // ? useRef`s
  const receivedValueRef = useRef();
  const receivedCurrencyRef = useRef();
  const givenValueRef = useRef();
  const givenCurrencyRef = useRef();
  const typePaymentRef = useRef();

  // ? function`s

  // * подсчет получаемой суммы
  function countingReceivedValue() {
    if (
      isFormValid &&
      !!receivedValueRef &&
      isPricesLoad &&
      receivedCurrencyRef.current &&
      receivedValueRef.current &&
      givenCurrencyRef.current
    ) {
      const receivedValueInEur =
        receivedValueRef.current.value *
        allPrices[receivedCurrencyRef.current.value].eur;

      const givenValueInEur =
        receivedValueInEur / allPrices[givenCurrencyRef.current.value].eur;

      givenValueRef.current.value = givenValueInEur;
    }
  }

  // * изменение данных в input
  function handleInputChange(event) {
    let isValid = event.target.checkValidity();
    if (event.target.id === 'givenValue') {
      isValid = isValid && /^[0-9.]*$/.test(event.target.value);
    }

    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: { valid: isValid, error: checkValidity(event.target) },
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    // смена валидации формы
    setIsFormValid(
      isValid &&
        givenCurrencyRef.current.value !== '' &&
        event.target.closest('form').checkValidity(),
    );
    if (isFormValid) countingReceivedValue();
  }

  // исключительно для выбора способа оплаты
  function handleChangeDropdownInputTypePayment(value) {
    handleChangeDropdownInput(value);
    setCurrentPaymentMethod(value);
  }

  // исключительно для выбора платежной валюты
  function handleChangeDropdownInputReceivedCurrency(value) {
    handleChangeDropdownInput(value);
    if (PAYMENTS.CURRENCY.CRYPTO.includes(value)) {
      setCurrentPaymentMethod('crypto wallet');
      typePaymentRef.current.value = 'crypto wallet';
    } else {
      setCurrentPaymentMethod('card');
      typePaymentRef.current.value = 'card';
    }
  }

  function handleChangeDropdownInput(value) {
    const _form = document.getElementById('exchange');
    setIsFormValid(_form.checkValidity() && value !== '');
    if (isFormValid) countingReceivedValue();
  }

  // получение курса валют
  function _getPrice() {
    mainApi
      .getPrice()
      .then((prices) => {
        prices.eur = { eur: 1 };

        setAllPrices(prices);
        setPricesLoad(true);
        setTimeToUpdate(60);
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Get price',
          ok: false,
          text: err.message,
        });
      });
  }

  // ? useEffect`s
  useEffect(() => {
    _getPrice();
    // const _interval = setInterval(_getPrice, 60_000);

    return () => {
      // clearInterval(_interval); // Очистка интервала при размонтировании компонента
    };
  }, []);

  // ? useEffect`s

  useEffect(() => {}, []);

  return (
    <section className={s.main}>
      {/* // ? форма покупки */}
      <article className={s.container}>
        <h3 className={`title-second ${s.title}`}>Exchange</h3>

        <form id='exchange' className={s.form}>
          <div className={s.fields}>
            {/* // ? Received value */}
            <Input
              name={'Received value'}
              id='receivedValue'
              placeholder='0.05734'
              type='number'
              min={0}
              required
              customRef={receivedValueRef}
              onChange={handleInputChange}
              isValid={validatedFields.received.valid}
              textError={validatedFields.received.error}
            ></Input>

            {/* // ? Received currency */}
            <DropdownInput
              name='Received currency'
              required
              id='receivedCurrency'
              customRef={receivedCurrencyRef}
              onChoose={handleChangeDropdownInputReceivedCurrency}
              listOfAnswers={[
                ...PAYMENTS.CURRENCY.CRYPTO,
                ...PAYMENTS.CURRENCY.FIAT,
              ]}
            ></DropdownInput>
          </div>
          <div className={`${s.fields} ${s.fields_cell_more}`}>
            {/* // ? Given value */}
            <Input
              name={'Given value'}
              id='givenValue'
              placeholder='0.05734'
              type='number'
              min={0}
              readOnly
              customRef={givenValueRef}
              onChange={handleInputChange}
              isValid={validatedFields.givenValue.valid}
              textError={validatedFields.givenValue.error}
            ></Input>
            {/* // ? Given currency */}
            <DropdownInput
              name='Given currency'
              required
              id='givenCurrency'
              customRef={givenCurrencyRef}
              onChoose={handleChangeDropdownInput}
              listOfAnswers={[
                ...PAYMENTS.CURRENCY.CRYPTO,
                ...PAYMENTS.CURRENCY.FIAT,
              ]}
            ></DropdownInput>
            {/* // ? Type payment */}
            <DropdownInput
              name='Type payment'
              required
              id='typePayment'
              customRef={typePaymentRef}
              onChoose={handleChangeDropdownInputTypePayment}
              listOfAnswers={PAYMENTS.WALLETS}
            ></DropdownInput>
          </div>
        </form>
      </article>
      <article className={`${s.container} ${s.container_type_card}`} id='card'>
        <Card isActive={currentPaymentMethod === 'card'} />
        <button disabled={!isFormValid} className={`button ${s.submit}`}>
          Exchange
        </button>
      </article>
    </section>
  );
}

export default Exchange;
