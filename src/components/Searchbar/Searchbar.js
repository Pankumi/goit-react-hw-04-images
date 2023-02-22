import React, { useState } from 'react';
// npm i react-icons
import { FiSearch } from 'react-icons/fi';
import css from './Searchbar.module.css';

export const Searchbar = ({newSearch}) => {
  const [search, setSearch] = useState('');

  const handleChange = evt => {
    setSearch(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (search.length < 1) return
    
    newSearch(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <section className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchForm_button} type="submit">
          <FiSearch size="20px" />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={search}
          onChange={handleChange}
        />
      </form>
    </section>
  );
};
