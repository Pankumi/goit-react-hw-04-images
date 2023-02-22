import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({
  selectedImg: { largeImageURL, tags },
  modalSwitch,
}) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEvent);

    return () => {
      window.removeEventListener('reydown', handleEvent);
    };
  }, []);

  const handleEvent = ({ code, target, currentTarget }) => {
    if (code === 'Escape' || target === currentTarget) {
      modalSwitch();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleEvent}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
