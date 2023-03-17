import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  GalleryItem,
  GalleryImage,
  CloseModal,
  CloseSvg,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ images }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleModalClick = link => {
    setSelectedImage(link);
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <GalleryItem key={id}>
            <GalleryImage
              src={webformatURL}
              alt=""
              onClick={() => {
                handleModalClick(largeImageURL);
              }}
            />
          </GalleryItem>
        );
      })}
      {modalOpen && (
        <Modal onClose={handleModalClick}>
          <img src={selectedImage} alt="" width={640} height={450} />
          <CloseModal type="button" onClick={handleModalClick}>
            <CloseSvg />
          </CloseModal>
        </Modal>
      )}
    </>
  );
}
