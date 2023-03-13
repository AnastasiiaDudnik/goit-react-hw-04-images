import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { pixabayApi } from 'services/pixabayAPI';
import { LoadMoreButton } from 'components/Button/LoadMoreButton';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuerry } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuerry !== searchQuerry || prevState.page !== page) {
      this.setState({ status: 'pending' });

      pixabayApi(searchQuerry.trim(), page)
        .then(images =>
          this.setState({
            images: [...this.state.images, ...images.hits],
            status: 'resolved',
          })
        )

        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevProps.searchQuerry !== searchQuerry) {
      this.setState({ images: [] });
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending') return <Loader />;

    if (status === 'pending' && images.length > 0) {
      return (
        <Gallery>
          <ImageGalleryItem images={images} />
          <Loader />
        </Gallery>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved')
      return (
        <Gallery>
          <ImageGalleryItem images={images} />
          <LoadMoreButton onClick={this.onLoadMore} />
        </Gallery>
      );
  }
}
