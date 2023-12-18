// DateInput
// ! modules
import { useEffect, useRef, useState } from 'react';

// ? styles
import s from './DateInput.module.css';

// ? assets
// * images
// _ icons
import previousIcon from './../../assets/images/icons/arrow_left.svg';
import nextIcon from './../../assets/images/icons/arrow_right.svg';
import deleteIcon from './../../assets/images/icons/close.svg';

// ? constants
import MONTHS from './../../constants/MONTHS.json';

// ? utils
// * constants
import { VALIDATION } from './../../utils/constants';
// * utils
import { checkValidity } from './../../utils/utils';

function DateInput({
  name,
  id,
  required = false,
  nameForChangeFunction,
  placeholder,
  customRef,
  onChoose,
  handleChooseValue = false,
}) {
  // ? useState`s

  // is open or close
  const [isDateInputPopupOpen, setDateInputPopupOpen] = useState(false);
  //
  const [dateInputHTML, setDateInputHTML] = useState();

  const [dayIndex, setDayIndex] = useState(0);
  const [monthsIndex, setMonthsIndex] = useState(0);
  const [checkValue, setCheckValue] = useState(false);

  // * валидация полей
  const [validatedYear, setValidatedYear] = useState({
    valid: true,
    error: null,
  });

  // ? useRef
  const yearRef = useRef();

  // ? function`s

  // снятие слушателей
  function handleRemoveListeners() {
    window.removeEventListener('click', handleCloseAnswersByClick);
    window.removeEventListener('keyup', handleKeyPress);
  }

  // обработка нажатий клавиши
  function handleKeyPress(e) {
    switch (e.key) {
      case 'Escape':
        setDateInputPopupOpen(false);
        handleRemoveListeners();
        break;
      case 'Delete':
        handleClearInput();
        break;

      default:
        break;
    }
  }

  // закрытие через клик мышей
  function handleCloseAnswersByClick(e) {
    if (!dateInputHTML.contains(e.target)) {
      setDateInputPopupOpen(false);
      handleRemoveListeners();
    }
  }

  // удаление содержимого поля
  function handleClearInput() {
    customRef.current.value = null;
  }

  function handleFieldChange(event) {
    const _yearInput = document.getElementById(`${id}_year`);
    const isValid = _yearInput.checkValidity();
    setValidatedYear({ valid: isValid, error: checkValidity(_yearInput) });
    if (!!handleChooseValue) handleChooseValue();
    handleChoose(dayIndex + 1, monthsIndex + 1);
  }

  function handleChoose(days, month) {
    customRef.current.value = `${days >= 10 ? days : `0${days}`}.${
      month >= 10 ? month : `0${month}`
    }.${yearRef.current.value}`;
  }

  // ? useEffect`s

  // поиск HTML элемента
  useEffect(() => {
    const _input = document.getElementById(id);
    setDateInputHTML(_input.closest('#dateInput'));
  }, [id]);

  // навешиваем/снимаем слушатели при открытии/закрытии
  useEffect(() => {
    if (isDateInputPopupOpen) {
      window.addEventListener('click', handleCloseAnswersByClick);
      window.addEventListener('keyup', handleKeyPress);
    } else {
      handleRemoveListeners();
    }

    return () => {
      handleRemoveListeners();
    };
  }, [isDateInputPopupOpen]);

  useEffect(() => {
    yearRef.current.value = VALIDATION.DATE_OF_REGISTRATION.YEAR.MAX;
  }, []);

  // ? все дни Days
  function Days() {
    const days = [];

    for (let i = 0; i < MONTHS[monthsIndex].days; i++) {
      const _isCurrent = i === dayIndex;

      days.push(
        <button
          type='button'
          onClick={(e) => {
            setDateInputPopupOpen(true);
            setDayIndex(i);
            handleChoose(i + 1, monthsIndex + 1);
            if (!!handleChooseValue) handleChooseValue();
          }}
          key={i}
          className={`button ${s.day} ${_isCurrent && s.day_state_current}`}
        >
          {i + 1}
        </button>,
      );
    }

    return <div className={s.days}>{days}</div>;
  }

  return (
    <div id='dateInput' className={s.main}>
      <h6 className={`${s.name} caption`}>{name}</h6>

      <div className={`${s.input} ${s.input_type_dropdown}`}>
        <input
          id={id}
          name={nameForChangeFunction}
          className={`body ${s.dropdown} ${
            !validatedYear.valid && s.dropdown_valid_invalid
          }`}
          type={'text'}
          placeholder={
            placeholder ||
            (isDateInputPopupOpen ? 'click to close' : 'click to choose')
          }
          required={required}
          ref={customRef}
          readOnly
          onClick={() => {
            setDateInputPopupOpen(!isDateInputPopupOpen);
          }}
        ></input>

        <img
          alt='delete value'
          src={deleteIcon}
          className={`button ${s.delete}`}
          onClick={(e) => {
            customRef.current.value = null;
            onChoose(e);
            setDateInputPopupOpen(false);
          }}
        />
      </div>

      <p
        className={`detail ${s.detail} ${
          !validatedYear.valid && s.detail_type_error
        }`}
      >
        {!validatedYear.valid
          ? validatedYear.error
          : required && 'This field is required'}
      </p>

      <div
        className={`${s.dates} ${isDateInputPopupOpen && s.dates_state_open}`}
      >
        {/* month */}
        <div className={`${s.block} ${s.block_border_bottom}`}>
          <button
            type='button'
            className={`caption button ${s.button}`}
            onClick={() => {
              if (monthsIndex !== 0) {
                setMonthsIndex(monthsIndex - 1);
                handleChoose(dayIndex + 1, monthsIndex);
              } else {
                setMonthsIndex(11);
                handleChoose(dayIndex + 1, 12);
              }
              if (!!handleChooseValue) handleChooseValue();
            }}
          >
            <img src={previousIcon} alt='previous' className={s.button__icon} />
          </button>
          <input
            id={`${id}_month`}
            className={`title-second ${s.input}`}
            type={'text'}
            required={required}
            value={MONTHS[monthsIndex].name}
            readOnly
          />
          <button
            type='button'
            className={`caption button ${s.button}`}
            onClick={() => {
              if (monthsIndex < 11) {
                const _newIndex = monthsIndex + 1;
                setMonthsIndex(_newIndex);
                handleChoose(dayIndex + 1, _newIndex + 1);
              } else {
                setMonthsIndex(0);
                handleChoose(dayIndex + 1, 1);
              }
              if (!!handleChooseValue) handleChooseValue();
            }}
          >
            <img src={nextIcon} alt='next' className={s.button__icon} />
          </button>
        </div>

        {/* days */}
        <Days />

        {/* year */}
        <div className={`${s.block} ${s.block_border_top}`}>
          <button
            disabled={
              yearRef.current &&
              yearRef.current.value <= VALIDATION.DATE_OF_REGISTRATION.YEAR.MIN
            }
            type='button'
            className={`caption button ${s.button}`}
            onClick={(e) => {
              if (
                yearRef.current.value > VALIDATION.DATE_OF_REGISTRATION.YEAR.MIN
              ) {
                yearRef.current.value = Number(yearRef.current.value) - 1;
                setCheckValue(!checkValue);
                handleChoose(dayIndex + 1, monthsIndex + 1);
                handleFieldChange(e);
              }
              if (!!handleChooseValue) handleChooseValue();
            }}
          >
            <img src={previousIcon} alt='previous' className={s.button__icon} />
          </button>
          <input
            id={`${id}_year`}
            className={`title-second ${s.input} ${s.input_type_year} ${
              !validatedYear.valid && s.input_valid_invalid
            }`}
            type={'number'}
            min={VALIDATION.DATE_OF_REGISTRATION.YEAR.MIN}
            max={VALIDATION.DATE_OF_REGISTRATION.YEAR.MAX}
            required={required}
            ref={yearRef}
            onChange={handleFieldChange}
          />
          <button
            disabled={
              yearRef.current &&
              yearRef.current.value >= VALIDATION.DATE_OF_REGISTRATION.YEAR.MAX
            }
            type='button'
            className={`caption button ${s.button}`}
            onClick={() => {
              if (
                yearRef.current.value < VALIDATION.DATE_OF_REGISTRATION.YEAR.MAX
              ) {
                yearRef.current.value = Number(yearRef.current.value) + 1;
                setCheckValue(!checkValue);
                handleChoose(dayIndex + 1, monthsIndex + 1);
              }
              if (!!handleChooseValue) handleChooseValue();
            }}
          >
            <img src={nextIcon} alt='next' className={s.button__icon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateInput;
