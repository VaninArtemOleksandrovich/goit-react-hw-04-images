import { useState } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('ukraine');
  const [currentImage, setCurrentImage] = useState(null);

  const toggleModal = e => {
    setIsOpenModal(!isOpenModal);
  };

  const openModal = largeImage => {
    setCurrentImage(largeImage);
    setIsOpenModal(true);
  };

  const handleSubmit = searchValue => {
    setSearchValue(searchValue);
  };

  return (
    <main>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery value={searchValue} onClick={openModal} />
      {isOpenModal && (
        <Modal onClose={toggleModal} currentImage={currentImage} />
      )}
    </main>
  );
};
