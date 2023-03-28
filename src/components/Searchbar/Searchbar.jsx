import React, {useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar =({onSubmitForm})=> {

const [searchQuery,setSearchQuery] = useState('')


 const handleSearchChange = e => {
  setSearchQuery(e.currentTarget.value.toLowerCase());

 };

 const handleSearchSubmit = e => {
  e.preventDefault();
  if(searchQuery.trim() === '' ) {
  return toast.info("You need to enter some text first")
  }
  onSubmitForm(searchQuery);
  setSearchQuery('');
 };

  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSearchSubmit}>
          <button type="submit" className={css.SearchFormbutton}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>
          <input
            className={css.SearchForm_input}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};