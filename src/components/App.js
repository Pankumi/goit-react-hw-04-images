// // Для HTTP-запитів використана бібліотека axios.
// // npm install axios
// import axios from 'axios';

import React, { useState, useEffect } from 'react';
// COMPONENTS:
import { requestImg } from '../services/pixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

// // npm i styled-components
import { Box, Warning } from './Styled';

export const App = () => {
  const [imgList, setImgList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const imgOnPage = 12;
  const [searchQuery, setSearchQuery] = useState(null);
  const [totalImg, setTotalImg] = useState(null);
  const [pageNum, setPageNum] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (searchQuery === null) return;

    const runRequest = async () => {
      setIsLoading(true);
      try {
        const data = await requestImg(imgOnPage, searchQuery, pageNum);
        setImgList(prevState => [...prevState, ...data.hits]);
        setTotalImg(data.totalHits);
        setError(null);
      } catch (err) {
        console.log('err >> ', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    runRequest();
  }, [ searchQuery, pageNum ]);

  const newSearch = value => {
    setImgList([]);
    setSearchQuery(value);
    setPageNum(1);
  };

  const nextPage = () => {
    setPageNum(prevState => prevState + 1);
  };

  const modalSwitch = (value = null) => {
    setSelectedImg(value);
  };

  const switchButton = imgOnPage * pageNum < totalImg;

  return (
    <Box>
      <Searchbar newSearch={newSearch} />

      {isLoading && <Loader />}

      {totalImg === 0 && (
        <Warning>
          Sorry, there are no images matching your search query. Please try
          again.
        </Warning>
      )}

      {error && <p>Oops, some arror occured... Massage: {error}</p>}

      {imgList && <ImageGallery imgList={imgList} modalSwitch={modalSwitch} />}

      {switchButton && <Button nextPage={nextPage} />}

      {selectedImg && (
        <Modal selectedImg={selectedImg} modalSwitch={modalSwitch} />
      )}
    </Box>
  );
};
