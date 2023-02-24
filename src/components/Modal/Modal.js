import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ selectedImg: { largeImageURL, tags }, modalSwitch }) => {
  
  useEffect(() => {
    const handleEventEscape = ({ code, target, currentTarget }) => {
      if (code === 'Escape' ) {
        modalSwitch();
      }
    };

    window.addEventListener('keydown', handleEventEscape);

    return () => {
      window.removeEventListener('keydown', handleEventEscape);
    };
  }, [modalSwitch]);

  const handleEventClick = ({ code, target, currentTarget }) => {
    if ( target === currentTarget ) {
      modalSwitch();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleEventClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
