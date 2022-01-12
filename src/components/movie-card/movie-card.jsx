import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        {/* <Card.Img variant="top" src={require('../../img/' + movie.ImagePath)} /> */}
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}

// Prop-types
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
