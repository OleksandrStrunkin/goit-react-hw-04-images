import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Audio } from 'react-loader-spinner';
import css from './App.module.css';
import Modal from './Modal/Modal';

const KEY = '32133259-eb605dfa2d96a82515a2bf160';

export default function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const onSubmit = searchText => {
    if (searchText !== '') {
      if (searchText !== value) {
        setValue(searchText);
        setPage(1);
        setItems([]);
      } else {
        setValue(searchText);
      }
    }
  };

  useEffect(() => {
    if (value === '') {
      return;
    }
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(({ hits }) => setItems(prevState => [...prevState, ...hits]))
      .catch(({ error }) => setError(error.message))
      .finally(() => setLoading(false));
  }, [page, value]);

  const openModal = largeImageURL => {
    setShowModal(true);
    setImgUrl(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {error && <p>{error}</p>}
      {loading && <Audio />}
      <ImageGallery items={items} openModal={openModal} />
      {Boolean(items.length) && <Button onLoadMore={loadMore} />}
      {showModal && <Modal src={imgUrl} closeModal={closeModal} />}
    </div>
  );
}
