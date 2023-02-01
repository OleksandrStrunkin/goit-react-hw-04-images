import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, showModal }) {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={e => showModal(item.largeImageURL)}
    >
      <img
        src={item.webformatURL}
        alt={item.tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};
