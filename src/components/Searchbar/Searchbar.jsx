import { Component } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import toast from 'react-hot-toast';
import {
  Searchbar,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    searchQuerry: '',
  };

  handleChange = evt => {
    this.setState({ searchQuerry: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    const { searchQuerry } = this.state;

    evt.preventDefault();

    if (searchQuerry.trim() === '') {
      return toast.error('Please, enter a word');
    }

    this.props.onSubmit(searchQuerry);
    this.setState({ searchQuerry: '' });
  };

  render() {
    const { searchQuerry } = this.state;
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <BsSearchHeart />
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>

          <SearchInput
            className="input"
            name="searchQuerry"
            value={searchQuerry}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
