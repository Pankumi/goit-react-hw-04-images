import React from 'react';
import { StyledLoader } from './Styled';
import css from './Loader.module.css';

export function Loader() {
  return (
    <div className={css.Box}>
      <StyledLoader><div></div></StyledLoader>
    </div>
  )
}

// class="lds-heart"