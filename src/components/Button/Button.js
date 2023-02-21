import React from 'react';
import css from './Button.modal.css';

export class Button extends React.Component {

  render() {
    // console.log('Button props >>', this.props);
    return (
      <button className={css.Button} type="button" onClick={this.props.nextPage}>
        Load more
      </button>
    );
  }
}
