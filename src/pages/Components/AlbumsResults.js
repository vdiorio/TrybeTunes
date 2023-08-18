import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumsResult extends React.Component {
  render() {
    const { albums, artist } = this.props;
    return (
      <div>
        {albums.length === 0 ? (
          <p>Nenhum álbum foi encontrado</p>
        ) : (
          <div>
            <p>
              Resultado de álbuns de:
              {` ${artist}`}
            </p>
            <div>
              {albums.map(
                ({
                  artistName,
                  collectionId,
                  collectionName,
                  artworkUrl100,
                }) => (
                  <div key={ collectionId }>
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <p>{collectionName}</p>
                      <p>{artistName}</p>
                    </Link>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

AlbumsResult.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};
export default AlbumsResult;
