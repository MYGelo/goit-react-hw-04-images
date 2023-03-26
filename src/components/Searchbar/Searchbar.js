import { useState } from 'react';
import css from './Searchbar.module.css';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import PropTypes from 'prop-types';

export const Searchbar = props => {
  const [inputSearch, setInputSearch] = useState('');

  const handleChange = e => {
    setInputSearch(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputSearch.trim() === '') {
      alert('Write correct word');
      return;
    } else {
      props.onSubmit(inputSearch);
      setInputSearch('');
    }
    e.target.reset();
  };

  return (
    <header className={css.search__bar}>
      <form className={css.search__form} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormBtn}>
          <span className={css.searchForm__buttonLabel}>Search</span>
          <HiMagnifyingGlass></HiMagnifyingGlass>
        </button>

        <input
          className={css.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
