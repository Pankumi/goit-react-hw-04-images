import React, { useEffect } from 'react';
import css from './Modal.module.css'


export const Modal = ({ selectedImg, modalSwitch }) => {

  useEffect( () => {
    window.addEventListener('keydown', handleEvent);

    return () => {
      window.removeEventListener('reydown', handleEvent);
    }
  },[] );

  const handleEvent = ({ code, target, currentTarget }) => {
      if( code === 'Escape' || target === currentTarget) {
        modalSwitch();
      }
  };

  return (
      <div className={css.Overlay} onClick={handleEvent}>
        <div className={css.Modal}>
          <img src={selectedImg.largeImageURL} alt={selectedImg.tags} />
        </div>
      </div>
    );
}


// export class Modal extends Component {

//   componentDidMount(){
//     window.addEventListener('keydown', this.handleEvent);
//   };

//   componentWillUnmount(){
//     window.removeEventListener('reydown', this.handleEvent);
//   };

//   handleEvent = evt => {
//       // console.log('keydown >>', evt.code );
//       if( evt.code === 'Escape') {
//         this.props.modalSwitch()
//       }
//       if( evt.target === evt.currentTarget ){
//         this.props.modalSwitch()
//       }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props.selectedImg
//     return (
//       <div className={css.Overlay} onClick={this.handleEvent}>
//         <div className={css.Modal}>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//     );
//   }
// }