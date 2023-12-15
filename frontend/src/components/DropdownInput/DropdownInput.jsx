// ! modules
import { useState } from 'react';

// ? styles
import s from './DropdownInput.module.css';

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
  // is open or close
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // полное имя страны
  const [countryFullName, setCountryFullName] = useState('');

  return (
    <div className={s.main}>
      <h6 className={`${s.name} caption`}>{name}</h6>

      <input
        id={id}
        name={nameForChangeFunction}
        className={`body ${s.dropdown}`}
        type={type}
        placeholder={
          placeholder || (isDropdownOpen ? 'click to close' : 'click to choose')
        }
        required={required}
        ref={customRef}
        readOnly
        onClick={() => {
          setDropdownOpen(!isDropdownOpen);
        }}
      ></input>

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

                if (options.isCountry) {
                  customRef.current.value = `${element.flag} ${element.name.common}`;
                  setCountryFullName(element.name.official);
                } else {
                  customRef.current.value = element;
                }
                onChoose(e, _isCurrent, element);
              }}
              key={index}
              className={`${s.answer} ${_isCurrent && s.answer_state_current}`}
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
