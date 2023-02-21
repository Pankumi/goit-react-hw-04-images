// // Для HTTP-запитів використана бібліотека axios.
// // npm install axios
// import axios from 'axios';

// // Підключаю notiflix сповіщєння https://github.com/notiflix/Notiflix#readme
// // npm i notiflix
import Notiflix from 'notiflix';
// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

import React from 'react';
// COMPONENTS:
import { requestImg } from '../services/pixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

// // npm i styled-components
import { Box, Warning } from './Styled';

export class App extends React.Component {
  state = {
    imgList: [],
    isLoading: false,
    error: null,
    imgOnPage: 12,
    searchQuery: null,
    totalImg: null,
    pageNum: null,
    selectedImg: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, pageNum } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNum !== pageNum
    ) {
      this.runRequest();
    }
  }

  newSearch = value => {
    // console.log('newSearch >>', value);
    this.setState({ imgList: [], searchQuery: value, pageNum: 1 });
  };

  nextPage = () => {
    this.setState(prevState => ({ pageNum: prevState.pageNum + 1 }));
  };

  modalSwitch = (selectedImg = null) => {
    this.setState({ selectedImg: selectedImg });
    // console.log('URL >>', selectedImg);
  };

  runRequest = async () => {
    this.setState({ isLoading: true });

    const { imgOnPage, searchQuery, pageNum } = this.state
    // console.log('runRequest >> ', this.state);
    try {
      const data = await requestImg(imgOnPage, searchQuery, pageNum);
      // console.log('try >>', data);

      this.setState(prevState => ({
        imgList: [...prevState.imgList, ...data.hits],
        totalImg: data.totalHits,
        // error: null,
      }));

      // runAction(serverResponse);
    } catch (err) {
      console.log('err >> ', err);
      Notiflix.Notify.failure('Sorry, ' + err);
      this.setState({
        error: err.message,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    // console.log('render state >> ', this.state);
    const {
      imgList,
      isLoading,
      error,
      imgOnPage,
      totalImg,
      pageNum,
      selectedImg,
    } = this.state;
    const switchButton = imgOnPage * pageNum < totalImg;
    return (
      <Box>
        <Searchbar newSearch={this.newSearch} />

        {isLoading && <Loader />}

        {totalImg === 0 && (
          <Warning>
            Sorry, there are no images matching your search query. Please try
            again.
          </Warning>
        )}

        {error && <p>Oops, some arror occured... Massage: {error}</p>}

        {imgList && (
          <ImageGallery imgList={imgList} modalSwitch={this.modalSwitch} />
        )}

        {switchButton && <Button nextPage={this.nextPage} />}

        {selectedImg && (
          <Modal selectedImg={selectedImg} modalSwitch={this.modalSwitch} />
        )}
      </Box>
    );
  }
}
