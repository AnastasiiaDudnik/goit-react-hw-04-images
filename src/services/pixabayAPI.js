async function pixabayApi(search, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '33112216-e5b097e9371d0df4b0ecc7612';
  const searchOptions = 'image_type=photo&orientation=horizontal&per_page=12';

  const response = await fetch(
    `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&${searchOptions}`
  );
  if (!response.ok) {
    return Promise.reject(`Image ${search} not found`);
  }
  return await response.json();
}

export { pixabayApi };
