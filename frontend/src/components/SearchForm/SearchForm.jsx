// ! modules
// * react
import React from 'react';

// ? styles
import './SearchForm.css';

// ? images
import icon from './../../assets/images/searchIcon.svg';

function SearchForm({ toggle, onSubmit, input }) {
  return (
    <article className='SearchForm'>
      <div className='SearchForm__container'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className='SearchForm__field-input'
        >
          <img className='SearchForm__icon' src={icon} alt='search' />
          <input
            required
            type='text'
            placeholder={input.placeholder}
            className='SearchForm__input'
            id={input.id}
            ref={input.ref}
          />
          <div className='SearchForm__settings-and-button-search'>
            <button
              aria-label='search'
              type='submit'
              className='button SearchForm__button-search'
            >
              Find
            </button>
          </div>
          {toggle.isActiveButton && (
            <div className='SearchForm__settings SearchForm__settings_place_field'>
              <button
                aria-label='toggle'
                type='button'
                onClick={toggle.onClick}
                className={`button SearchForm__button-toggle ${
                  toggle.isActive
                    ? 'SearchForm__button-toggle_active_active'
                    : ''
                }`}
              />
              <p className='SearchForm__text'>Finished requests</p>
            </div>
          )}
        </form>
        {toggle.isActiveButton && (
          <div className='SearchForm__settings SearchForm__settings_place_container'>
            <button
              aria-label='toggle'
              type='button'
              onClick={toggle.onClick}
              className={`button SearchForm__button-toggle ${
                toggle.isActive ? 'SearchForm__button-toggle_active_active' : ''
              }`}
            />
            <p className='SearchForm__text'>Finished requests</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default SearchForm;
