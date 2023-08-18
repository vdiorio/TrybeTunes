import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.loadFavoriteSongs = this.loadFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  handleCheckBox() {
    const { song } = this.props;
    const { checked } = this.state;

    this.setState({
      loading: true,
    });
    if (checked) {
      removeSong(song)
        .then(() => this.setState({
          loading: false,
          checked: false,
        }));
    } else {
      addSong(song)
        .then(() => this.setState({
          loading: false,
          checked: true,
        }));
    }
  }

  loadFavoriteSongs() {
    const { song } = this.props;
    const { trackId } = song;
    getFavoriteSongs().then((response) => {
      response.forEach((array) => {
        if (array.trackId === trackId) {
          this.setState({
            checked: true,
          });
        }
      });
    });
  }

  render() {
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                onChange={ this.handleCheckBox }
                checked={ checked }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    wraperType: PropTypes.string,
    kind: PropTypes.string,
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    artistViewUrl: PropTypes.string,
    artworkUrl30: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionCensoredName: PropTypes.string,
    collectionExplicitness: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    collectionViewUrl: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    discCount: PropTypes.number,
    discNumber: PropTypes.number,
    isStreamable: PropTypes.bool,
    previewUrl: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCensoredName: PropTypes.string,
    trackCount: PropTypes.number,
    trackExplicitness: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    trackNumber: PropTypes.number,
    trackPrice: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    trackViewUrl: PropTypes.string,
  }).isRequired,
};
export default MusicCard;
