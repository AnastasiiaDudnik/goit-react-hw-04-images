// import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Loader } from 'components/Loader/Loader';
// import { pixabayApi } from 'services/pixabayAPI';
// import { LoadMoreButton } from 'components/Button/LoadMoreButton';
import { Gallery } from './ImageGallery.styled';

export function ImageGallery({ images }) {
  return (
    <Gallery>
      <ImageGalleryItem images={images} />
    </Gallery>
  );
}
