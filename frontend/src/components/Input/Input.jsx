// ? styles
import s from './Input.module.css';

function Input({
  name,
  required = false,
  id,
  placeholder,
  type = 'text',
  pattern,
  minLength,
  maxLength,
  customRef,
  onChange,
  isValid,
  textError,
}) {
  return (
    <div className={s.main}>
      <h6 className={`caption ${s.name}`}>{name}</h6>

      <input
        required={required}
        className={`${s.input} ${isValid ? '' : s.input_validity_invalid}`}
        placeholder={placeholder}
        id={id}
        type={type}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        ref={customRef}
        onChange={onChange}
      ></input>

      {/* // ? сообщение о ошибке */}
      <p className={`detail ${s.error}`}>{textError}</p>
    </div>
  );
}

export default Input;
