import React from 'react';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';

import { Card } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <Card>
          <Card.Header>{/* Add image here */}</Card.Header>
          <Card.Body>{movie.Title}</Card.Body>
          <Card.Body>Genre: {movie.Genre.Name}</Card.Body>
          <Card.Body>
            Director:
            <Link to={`/movies/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
          </Card.Body>
          <Card.Body>Description: {movie.Description}</Card.Body>
          <Card.Footer>
            <button
              className="movie-view-button"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back to list
            </button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
