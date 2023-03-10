import React from 'react';
import css from './ImageGalleryItem.modul.css';

export const ImageGalleryItem = ({ modalSwitch, imgItems }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => modalSwitch(imgItems)}>
      <img
        className={css.ImageGalleryItemImage}
        src={imgItems.webformatURL}
        alt={imgItems.tags}
        loading="lazy"
      />
    </li>
  );
};
