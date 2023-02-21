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
  const [totalImg, setTotalImg] =useState(null);
  const [pageNum, setPageNum] =useState(null);
  const [selectedImg, setSelectedImg] =useState(null);

  useEffect( () => {
    if( searchQuery === null ) return;
    runRequest();
  }, [searchQuery, pageNum] );



  const newSearch = value => {
    // console.log('newSearch >>', value);
    setImgList([]);
    setSearchQuery(value);
    setPageNum(1);
  };

  const nextPage = () => {
    setPageNum( (prevState) => prevState +1 )
  };

  const modalSwitch = (value = null) => {
    setSelectedImg(value)
    // console.log('URL >>', value);
  };

  const runRequest = async () => {
    setIsLoading(true);
    // console.log('runRequest >> ', this.state);

    try {
      const data = await requestImg(imgOnPage, searchQuery, pageNum);
      // console.log('try >>', data);

      setImgList( (prevState) => [...prevState, ...data.hits]);
      setTotalImg(data.totalHits);
      setError(null);

    } catch (err) {
      console.log('err >> ', err);
      setError(err.message);

    } finally {
      setIsLoading(false);
    }
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

      {imgList && (
        <ImageGallery imgList={imgList} modalSwitch={modalSwitch} />
      )}

      {switchButton && <Button nextPage={nextPage} />}

      {selectedImg && (
        <Modal selectedImg={selectedImg} modalSwitch={modalSwitch} />
      )}
    </Box>
  );
}



// *******************СТАРИЙ КОД
// export class App extends React.Component {
//   state = {
//     imgList: [],
//     isLoading: false,
//     error: null,
//     imgOnPage: 12,
//     searchQuery: null,
//     totalImg: null,
//     pageNum: null,
//     selectedImg: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, pageNum } = this.state;
//     if (
//       prevState.searchQuery !== searchQuery ||
//       prevState.pageNum !== pageNum
//     ) {
//       this.runRequest();
//     }
//   }

//   newSearch = value => {
//     // console.log('newSearch >>', value);
//     this.setState({ imgList: [], searchQuery: value, pageNum: 1 });
//   };

//   nextPage = () => {
//     this.setState(prevState => ({ pageNum: prevState.pageNum + 1 }));
//   };

//   modalSwitch = (selectedImg = null) => {
//     this.setState({ selectedImg: selectedImg });
//     // console.log('URL >>', selectedImg);
//   };

//   runRequest = async () => {
//     this.setState({ isLoading: true });

//     const { imgOnPage, searchQuery, pageNum } = this.state
//     // console.log('runRequest >> ', this.state);
//     try {
//       const data = await requestImg(imgOnPage, searchQuery, pageNum);
//       // console.log('try >>', data);

//       this.setState(prevState => ({
//         imgList: [...prevState.imgList, ...data.hits],
//         totalImg: data.totalHits,
//         // error: null,
//       }));

//       // runAction(serverResponse);
//     } catch (err) {
//       console.log('err >> ', err);
//       Notiflix.Notify.failure('Sorry, ' + err);
//       this.setState({
//         error: err.message,
//       });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   render() {
//     // console.log('render state >> ', this.state);
//     const {
//       imgList,
//       isLoading,
//       error,
//       imgOnPage,
//       totalImg,
//       pageNum,
//       selectedImg,
//     } = this.state;
//     const switchButton = imgOnPage * pageNum < totalImg;

//     return (
//       <Box>
//         <Searchbar newSearch={this.newSearch} />

//         {isLoading && <Loader />}

//         {totalImg === 0 && (
//           <Warning>
//             Sorry, there are no images matching your search query. Please try
//             again.
//           </Warning>
//         )}

//         {error && <p>Oops, some arror occured... Massage: {error}</p>}

//         {imgList && (
//           <ImageGallery imgList={imgList} modalSwitch={this.modalSwitch} />
//         )}

//         {switchButton && <Button nextPage={this.nextPage} />}

//         {selectedImg && (
//           <Modal selectedImg={selectedImg} modalSwitch={this.modalSwitch} />
//         )}
//       </Box>
//     );
//   }
// }


// *********************** GPT
// const App = () => {
//   const [imgList, setImgList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [imgOnPage] = useState(12);
//   const [searchQuery, setSearchQuery] = useState(null);
//   const [totalImg, setTotalImg] = useState(null);
//   const [pageNum, setPageNum] = useState(null);
//   const [selectedImg, setSelectedImg] = useState(null);

//   useEffect(() => {
//     if (searchQuery !== null && pageNum !== null) {
//       runRequest();
//     }
//   }, [searchQuery, pageNum]);

//   const newSearch = (value) => {
//     setImgList([]);
//     setSearchQuery(value);
//     setPageNum(1);
//   };

//   const nextPage = () => {
//     setPageNum((prevPageNum) => prevPageNum + 1);
//   };

//   const modalSwitch = (selectedImg = null) => {
//     setSelectedImg(selectedImg);
//   };

//   const runRequest = async () => {
//     setIsLoading(true);

//     try {
//       const data = await requestImg(imgOnPage, searchQuery, pageNum);

//       setImgList((prevImgList) => [...prevImgList, ...data.hits]);
//       setTotalImg(data.totalHits);
//     } catch (err) {
//       console.log('err >> ', err);
//       Notiflix.Notify.failure('Sorry, ' + err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const switchButton = imgOnPage * pageNum < totalImg;

//   return (
//     <Box>
//       <Searchbar newSearch={newSearch} />

//       {isLoading && <Loader />}

//       {totalImg === 0 && (
//         <Warning>
//           Sorry, there are no images matching your search query. Please try
//           again.
//         </Warning>
//       )}

//       {error && <p>Oops, some arror occured... Massage: {error}</p>}

//       {imgList && (
//         <ImageGallery imgList={imgList} modalSwitch={modalSwitch} />
//       )}

//       {switchButton && <Button nextPage={nextPage} />}

//       {selectedImg && (
//         <Modal selectedImg={selectedImg} modalSwitch={modalSwitch} />
//       )}
//     </Box>
//   );
// };

// export default App;