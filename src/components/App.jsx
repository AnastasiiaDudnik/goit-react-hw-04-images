import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Container } from './App.styles';
import { pixabayApi } from 'services/pixabayAPI';
import { LoadMoreButton } from './Button/LoadMoreButton';
import { Loader } from './Loader/Loader';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REGECTED: 'regected',
// };

export function App() {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  // const [status, setStatus] = useState(Status.IDLE);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchQuerry) {
      return;
    }

    // setStatus(Status.PENDING);
    setIsLoading(true);

    pixabayApi(searchQuerry.trim(), page)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        // setStatus(Status.RESOLVED);
        setIsLoading(false);
      })

      .catch(error => {
        // setStatus(Status.REGECTED);
        setError(error);
      });
  }, [page, searchQuerry]);

  const onQueryChange = query => {
    setSearchQuerry(query);
    setPage(1);
    setImages([]);
    setError('');
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Toaster />
      <SearchBar onSubmit={onQueryChange} />
      <ImageGallery images={images} />

      {isLoading && <Loader />}

      {images.length !== 0 && !isLoading && (
        <LoadMoreButton onClick={onLoadMore} />
      )}

      {error && <h1>{error.message}</h1>}

      {/* {status === Status.PENDING && <Loader />} */}

      {/* {status === Status.RESOLVED &&
        status !== Status.PENDING(<LoadMoreButton onClick={onLoadMore} />)} */}
      {/* {status === Status.REGECTED && <h1>{error.message}</h1>} */}
    </Container>
  );
}

// import axios from 'axios';

// export function App() {
//   const [searchQuerry, setSearchQuerry] = useState('');
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState('');
//   // const [status, setStatus] = useState(Status.IDLE);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (!searchQuerry) {
//       return;
//     }

//     async function fetchCards(searchQuerry, page) {
//       try {
//         const BASE_URL = 'https://pixabay.com/api/';
//         const API_KEY = '33112216-e5b097e9371d0df4b0ecc7612';
//         const searchOptions =
//           'image_type=photo&orientation=horizontal&per_page=12';

//         const response = await axios.get(
//           `${BASE_URL}?key=${API_KEY}&q=${searchQuerry}&${searchOptions}&page=${page}`
//         );

//         setImages(prevImages => [...prevImages, ...response.data.hits]);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//       }
//     }
//     setIsLoading(true);
//     fetchCards(searchQuerry, page);
//   }, [page, searchQuerry]);

//   const onQueryChange = query => {
//     setSearchQuerry(query);
//     setPage(1);
//     setImages([]);
//     setError('');
//   };

//   const onLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return (
//     <Container>
//       <Toaster />
//       <SearchBar onSubmit={onQueryChange} />
//       <ImageGallery images={images} />

//       {isLoading && <Loader />}

//       {images.length !== 0 && !isLoading && (
//         <LoadMoreButton onClick={onLoadMore} />
//       )}

//       {error && <h1>{error.message}</h1>}
//     </Container>
//   );
// }
