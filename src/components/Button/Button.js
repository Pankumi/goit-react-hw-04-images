import React from 'react';
import css from './Button.modal.css';

export const Button = ({ nextPage }) => {
  return (
    <button className={css.Button} type="button" onClick={nextPage}>
      Load more
    </button>
  );
};
