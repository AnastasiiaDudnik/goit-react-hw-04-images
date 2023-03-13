import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  GalleryItem,
  GalleryImage,
  CloseModal,
  CloseSvg,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    modalOpen: false,
    selectedImage: null,
  };

  handleModalClick = link => {
    this.setState(({ modalOpen }) => ({
      selectedImage: link,
      modalOpen: !modalOpen,
    }));
  };

  render() {
    const { modalOpen, selectedImage } = this.state;

    return (
      <>
        {this.props.images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <GalleryItem key={id}>
              <GalleryImage
                src={webformatURL}
                alt=""
                onClick={() => {
                  this.handleModalClick(largeImageURL);
                }}
              />
            </GalleryItem>
          );
        })}
        {modalOpen && (
          <Modal onClose={this.handleModalClick}>
            <img src={selectedImage} alt="" width={640} height={450} />
            <CloseModal type="button" onClick={this.handleModalClick}>
              <CloseSvg />
            </CloseModal>
          </Modal>
        )}
      </>
    );
  }
}
