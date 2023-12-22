// ! modules
import { useEffect, useState } from 'react';

// ? styles
import s from './DropdownInput.module.css';

// ? assets
// * images
// _ icons
import deleteIcon from './../../assets/images/icons/close.svg';

function DropdownInput({
  name,
  id,
  required = false,
  type = 'text',
  nameForChangeFunction,
  placeholder,
  customRef,
  onChoose,
  options = {
    isCountry: false,
  },
  listOfAnswers,
}) {
  // ? useState`s
  // is open or close
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // полное имя страны
  const [countryFullName, setCountryFullName] = useState('');
  //
  const [dropdownInputHTML, setDropdownInputHTML] = useState();

  // пустой ли input
  const [isInputCleared, setInputCleared] = useState(true);

  // ? function`s

  // снятие слушателей
  function handleRemoveListeners() {
    window.removeEventListener('click', handleCloseAnswersByClick);
    window.removeEventListener('keyup', handleKeyPress);
  }

  // закрытие через клик мышей
  function handleCloseAnswersByClick(e) {
    if (!dropdownInputHTML.contains(e.target)) {
      setDropdownOpen(false);
      handleRemoveListeners();
    }
  }

  // удаление содержимого поля
  function handleClearInput(e) {
    customRef.current.value = null;
    onChoose(customRef.current.value);
    setInputCleared(true);
    options.isCountry && setCountryFullName(null);
  }

  function handleKeyPress(e) {
    switch (e.key) {
      case 'Escape':
        setDropdownOpen(false);
        handleRemoveListeners();
        break;
      case 'Delete':
        handleClearInput();
        break;

      default:
        break;
    }
  }

  // ? useEffect`s

  useEffect(() => {
    setInputCleared(!!customRef.current.value);
  }, []);

  // поиск HTML элемента
  useEffect(() => {
    const _input = document.getElementById(id);
    setDropdownInputHTML(_input.closest('#dropdownInput'));
  }, [id]);

  // навешиваем/снимаем слушатели при открытии/закрытии
  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener('click', handleCloseAnswersByClick);
      window.addEventListener('keyup', handleKeyPress);
    } else {
      handleRemoveListeners();
    }

    return () => {
      handleRemoveListeners();
    };
  }, [isDropdownOpen, id, customRef]);

  return (
    <div id='dropdownInput' className={s.main}>
      <h6 className={`${s.name} caption`}>{name}</h6>

      <div className={s.input}>
        <input
          id={id}
          name={nameForChangeFunction}
          className={`body ${s.dropdown}`}
          type={type}
          placeholder={
            placeholder ||
            (isDropdownOpen ? 'click to close' : 'click to choose')
          }
          required={required}
          ref={customRef}
          readOnly
          onClick={() => {
            setDropdownOpen(!isDropdownOpen);
          }}
        ></input>

        <img
          alt='delete value'
          src={deleteIcon}
          className={`button ${s.delete}`}
          onClick={() => {
            handleClearInput();
            setDropdownOpen(false);
          }}
        />
      </div>

      <p
        className={`detail ${s['answer__add-info']} ${required && s.required}`}
      >
        {options.isCountry && countryFullName}
        {required && 'This field is required'}
      </p>

      <div className={`${s.answers} ${isDropdownOpen && s.answers_state_open}`}>
        {listOfAnswers.map((element, index) => {
          const _isCurrent = options.isCountry
            ? `${element.flag} ${element.name.common}` ===
              (customRef.current ? customRef.current.value : '')
            : element === (customRef.current ? customRef.current.value : '');

          return (
            <div
              onClick={(e) => {
                setDropdownOpen(false);

                if (!_isCurrent) {
                  if (options.isCountry) {
                    customRef.current.value = `${element.flag} ${element.name.common}`;
                    setCountryFullName(element.name.official);
                  } else {
                    customRef.current.value = element;
                  }
                  setInputCleared(false);
                  onChoose(customRef.current.value);
                }
              }}
              key={index}
              className={`${s.answer} ${
                _isCurrent && !isInputCleared && s.answer_state_current
              }`}
            >
              <h4 className={`body ${s.answer__text}`}>
                {options.isCountry ? (
                  <>
                    <span>{element.flag}</span> {element.name.common}
                  </>
                ) : (
                  element
                )}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DropdownInput;
