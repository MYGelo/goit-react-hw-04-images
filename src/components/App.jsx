import React, { useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'components/Api/Api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Btn } from './Button/Button';

import { FcCancel } from 'react-icons/fc';
import { useState } from 'react';

export const App = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [showBtnLoadMore, setShowBtnLoadMore] = useState('');

  useEffect(() => {
    if (inputSearch) {
      setIsLoading(true);

      fetchImages(inputSearch, page)
        .then(({ images, totalHits }) => {
          setImages(prevImages => [...prevImages, ...images]);
          setIsLoading(false);
          setShowBtnLoadMore(page < Math.ceil(totalHits / 12));
        })
        .catch(error => this.setState({ error }));
    }
  }, [inputSearch, page]);

  const onClickMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = currentSearch => {
    console.log(currentSearch);
    setInputSearch(currentSearch);
    setImages([]);
    setPage(1);
  };

  const onOpenModal = e => {
    setShowModal(true);
    setImgSrc(e.target.name);
    setImgAlt(e.target.alt);
  };
  const onCloseModal = e => {
    setShowModal(false);
  };

  return (
    <>
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={handleSearchSubmit} />

        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <ImageGallery
              images={images}
              showModal={showModal}
              onClick={onOpenModal}
            />
            {showBtnLoadMore ? <Btn onClick={onClickMore} /> : null}
          </React.Fragment>
        )}
        {showModal ? (
          <Modal onCloseModal={onCloseModal} showModal={showModal}>
            <button
              showModal={showModal}
              style={{
                position: 'relative',
                left: '100%',

                background: 'transparent',
                border: 'transparent',
              }}
              type="button"
              onClick={onCloseModal}
            >
              <FcCancel />
            </button>
            <img
              style={{
                display: 'flex',
                position: 'relative',
                width: '100%',
                top: '-10px',
              }}
              src={imgSrc}
              alt={imgAlt}
            ></img>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

// {showModal ? (
//   <Modal onCloseModal={onCloseModal} showModal={showModal}>
//     <button
//       showModal={showModal}
//       style={{
//         position: 'relative',
//         left: '100%',

//         background: 'transparent',
//         border: 'transparent',
//       }}
//       type="button"
//       onClick={onCloseModal}
//     >
//       <FcCancel />
//     </button>
//     <img
//       style={{
//         display: 'flex',
//         position: 'relative',
//         width: '100%',
//         top: '-10px',
//       }}
//       src={imgSrc}
//       alt={imgAlt}
//     ></img>
//   </Modal>
// ) : null}
