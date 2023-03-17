import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Container } from './App.styles';
import { pixabayApi } from 'services/pixabayAPI';
import { LoadMoreButton } from './Button/LoadMoreButton';
import { Loader } from './Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REGECTED: 'regected',
};

export class App extends Component {
  state = {
    searchQuerry: '',
    images: [],
    error: '',
    status: Status.IDLE,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuerry, page } = this.state;

    if (prevState.searchQuerry !== searchQuerry || prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      pixabayApi(searchQuerry.trim(), page)
        .then(images =>
          this.setState({
            images: [...this.state.images, ...images.hits],
            status: Status.RESOLVED,
          })
        )

        .catch(error => this.setState({ error, status: Status.REGECTED }));
    }

    if (prevState.searchQuerry !== searchQuerry) {
      this.setState({ images: [], page: 1 });
    }
  }

  onFormSubmit = searchQuerry => {
    this.setState({ searchQuerry });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, error, status } = this.state;

    return (
      <Container>
        <Toaster />
        <SearchBar onSubmit={this.onFormSubmit} />

        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && (
          <>
            <ImageGallery images={images} />
            <LoadMoreButton onClick={this.onLoadMore} />
          </>
        )}
        {status === Status.REGECTED && <h1>{error.message}</h1>}
      </Container>
    );
  }
}
