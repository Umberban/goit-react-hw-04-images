import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({image,closeModal})=> {
  const closeWithEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  

  useEffect(() => {
    window.addEventListener('keydown', closeWithEsc);

    return () => {
      window.removeEventListener('keydown', closeWithEsc);
    };
  }, []);


 
    return (
      <div className={css.Overlay} onClick={handleBackdrop}>
        <div className={css.Modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );

}


Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};