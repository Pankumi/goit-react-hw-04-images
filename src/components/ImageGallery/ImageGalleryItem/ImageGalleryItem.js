import React from 'react';
import css from './ImageGalleryItem.modul.css';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => this.props.modalSwitch(this.props.imgItems)}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </li>
  );
};
