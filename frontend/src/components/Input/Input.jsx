// ? styles
import s from './Input.module.css';

function Input({
  name,
  nameForChangeFunction,
  required = false,
  id,
  step,
  readOnly = false,
  placeholder,
  type = 'text',
  pattern,
  minLength = null,
  maxLength = null,
  min,
  max,
  customRef,
  onChange,
  isValid,
  textError,
}) {
  return (
    <div className={s.main}>
      <h6 className={`caption ${s.name}`}>{name}</h6>

      <input
        name={nameForChangeFunction}
        required={required}
        className={`${s.input} ${isValid ? '' : s.input_validity_invalid}`}
        placeholder={placeholder}
        id={id}
        readOnly={readOnly}
        type={type}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step ? step : 0.000000000000000000000000000000000000001}
        ref={customRef}
        onChange={onChange}
      ></input>

      {/* // ? информационное сообщение */}
      <p
        className={`detail ${s.detail} ${
          !!required && s.detail_type_required
        } ${!!textError && s.detail_type_error}`}
      >
        {!!textError ? textError : required && 'This field is required'}
      </p>
    </div>
  );
}

export default Input;
