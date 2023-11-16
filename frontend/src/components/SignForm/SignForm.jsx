// ? style
import s from './SignForm.module.css';

// ? components
import Logo from './../Logo/Logo';
import { NavLink } from 'react-router-dom';

function SignForm({
  title,
  submitButton,
  onSubmit,
  onChange,
  error,
  isValid,
  link,
  linkText,
  inputs = [],
}) {
  return (
    <article className={s.main}>
      <Logo />

      <h1 className={s.title}>{title}</h1>

      <form onSubmit={onSubmit} className={s.form}>
        {/* // ? input поля */}
        <div className={s.fields}>
          {inputs.map((item, index) => {
            return (
              <div key={index} className={s.field}>
                <h6 lang={item.lang} className={`${s.name} caption`}>
                  {item.name}
                </h6>

                <input
                  required={item.required}
                  className={
                    s.input +
                    ` ${!item.isValid ? s.input_validity_invalid : ''}`
                  }
                  placeholder={item.placeholder}
                  id={item.id}
                  type={item.type}
                  minLength={item.minLength}
                  maxLength={item.maxLength}
                  pattern={item.pattern}
                  ref={item.ref}
                  onChange={onChange}
                ></input>
              </div>
            );
          })}
        </div>

        {/* // ? сообщение о ошибке */}
        <p className={`${s['error-message']} detail`}>{error}</p>

        {/* // ? кнопка submit */}
        <button
          disabled={!isValid}
          className={
            s.submit + ` ${!isValid ? s.submit_validity_invalid : 'button'}`
          }
          type='submit'
        >
          {submitButton.text}
        </button>

        {linkText && (
          <NavLink className={`${s.link} link subhead`} to={link}>
            {linkText}
          </NavLink>
        )}
      </form>
    </article>
  );
}

export default SignForm;
