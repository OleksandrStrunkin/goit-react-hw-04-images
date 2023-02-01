import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ src, closeModal }) {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  const offModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={offModal}>
      <div className={css.Modal}>
        <img src={src} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
