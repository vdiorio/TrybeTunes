import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: {},
      songs: [],
    };

    this.findMusics = this.findMusics.bind(this);
  }

  componentDidMount() {
    this.findMusics();
  }

  findMusics() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    getMusics(id).then((response) => this.setState({
      album: response[0],
      songs: response.slice(1),
    }));
  }

  render() {
    const { album, songs } = this.state;
    const { artistName, collectionName } = album;
    return (
      <div data-testid="page-album">
        <Header />

        <h3
          data-testid="artist-name"
        >
          {artistName}

        </h3>
        <p
          data-testid="album-name"
        >
          {`${collectionName} by ${artistName}`}

        </p>
        {songs.map((track) => (
          <MusicCard
            key={ track.trackId }
            song={ track }

          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};
export default Album;
