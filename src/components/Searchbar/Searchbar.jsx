import { useState } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';
import { PropTypes } from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const hanleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={hanleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <FiSearch />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="value"
          autoComplete="off"
          autoFocus
          value={value}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
