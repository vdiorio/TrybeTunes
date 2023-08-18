import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbumsResults from './AlbumsResults';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      disableSearchBtn: true,
      loading: false,
      result: [],
      hasBeenSearched: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickBtn = this.onClickBtn.bind(this);
  }

  handleInputChange({ target }) {
    const { value } = target;
    const minCharacters = 2;
    if (value.length >= minCharacters) {
      this.setState({
        artistName: value,
        disableSearchBtn: false,

      });
    } else {
      this.setState({
        artistName: value,
        disableSearchBtn: true,
      });
    }
  }

  onClickBtn() {
    const { artistName } = this.state;
    this.setState({
      loading: true,
    });
    searchAlbumsAPI(artistName)
      .then((album) => this.setState({
        result: album,
        loading: false,
        hasBeenSearched: true,
      }));
  }

  render() {
    const { disableSearchBtn, loading, hasBeenSearched, result, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <form>
              <input
                type="text"
                placeholder="Nome do Artista"
                data-testid="search-artist-input"
                onChange={ this.handleInputChange }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ disableSearchBtn }
                onClick={ this.onClickBtn }
              >
                Pesquisar

              </button>
            </form>
            {hasBeenSearched ? (
              <AlbumsResults
                albums={ result }
                artist={ artistName }
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
