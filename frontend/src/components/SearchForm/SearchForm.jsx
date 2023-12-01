// ! modules
import { useState } from 'react';

// ? styles
import './SearchForm.css';

// ? images
import icon from './../../assets/images/searchIcon.svg';

function SearchForm({ onSubmit, input }) {
  const [isFilled, setFilled] = useState(false);

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
            onChange={() => setFilled(!!input.ref.current.value)}
            type='text'
            placeholder={input.placeholder}
            className='caption SearchForm__input'
            id={input.id}
            ref={input.ref}
          />
          <button
            aria-label='search'
            type='submit'
            className={`button caption SearchForm__button-search ${
              isFilled ? '' : 'SearchForm__button-search_enabled_disabled'
            }`}
          >
            Find
          </button>
        </form>
      </div>
    </article>
  );
}

export default SearchForm;
