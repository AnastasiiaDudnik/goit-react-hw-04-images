import { useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import toast from 'react-hot-toast';
import {
  Searchbar,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [searchQuerry, setSearchQuerry] = useState('');

  const handleChange = evt => {
    setSearchQuerry(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchQuerry.trim() === '') {
      return toast.error('Please, enter a word');
    }

    onSubmit(searchQuerry);
    setSearchQuerry('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BsSearchHeart />
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>

        <SearchInput
          className="input"
          name="searchQuerry"
          value={searchQuerry}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
}
