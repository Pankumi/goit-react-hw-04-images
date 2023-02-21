import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends React.Component {

  render() {
    const { imgList, modalSwitch } = this.props;
    // console.log('render in ImageGallery >> ', imgList );

    return (
        <ul className={css.ImageGallery} >
          {imgList.map( imgItems=>{
            // console.log('map in ImageGallery >> ', imgItems );
            return (
              <ImageGalleryItem
                key={imgItems.id}
                imgItems={imgItems}
                modalSwitch={modalSwitch}
              />
            );
          })}
        </ul>
    );
  }
}
