import { useState, useEffect } from 'react';
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

export function App() {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchQuerry) {
      return;
    }

    setStatus(Status.PENDING);

    pixabayApi(searchQuerry.trim(), page)
      .then(images => {
        setImages(images.hits);
        setStatus(Status.RESOLVED);
      })

      .catch(error => {
        setStatus(Status.REGECTED);
        setError(error);
      });
  }, [page, searchQuerry]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { searchQuerry, page } = this.state;

  //   if (prevState.searchQuerry !== searchQuerry || prevState.page !== page) {
  //     this.setState({ status: Status.PENDING });

  //     pixabayApi(searchQuerry.trim(), page)
  //       .then(images =>
  //         this.setState({
  //           images: [...this.state.images, ...images.hits],
  //           status: Status.RESOLVED,
  //         })
  //       )

  //       .catch(error => this.setState({ error, status: Status.REGECTED }));
  //   }

  //   if (prevState.searchQuerry !== searchQuerry) {
  //     this.setState({ images: [], page: 1 });
  //   }
  // }

  // const onFormSubmit = searchQuerry => {
  //   this.setState({ searchQuerry });
  // };

  const onLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  return (
    <Container>
      <Toaster />
      <SearchBar onSubmit={setSearchQuerry} />

      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && (
        <>
          <ImageGallery images={images} />
          <LoadMoreButton onClick={onLoadMore} />
        </>
      )}
      {status === Status.REGECTED && <h1>{error.message}</h1>}
    </Container>
  );
}
