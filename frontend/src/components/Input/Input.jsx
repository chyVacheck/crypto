// ? styles
import s from './Input.module.css';

function Input({
  name,
  nameForChangeFunction,
  required = false,
  id,
  placeholder,
  type = 'text',
  pattern,
  minLength,
  maxLength,
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
        type={type}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
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
