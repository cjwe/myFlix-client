import { shape } from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import './movie-view.scss';

let imgPath = '../../img/';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <Card>
          <Card.Header>
            {/* <img src={require('../../img/' + movie.ImagePath)} /> */}
          </Card.Header>
          <Card.Body>{movie.Title}</Card.Body>
          <Card.Body>Genre: {movie.Genre.Name}</Card.Body>
          <Card.Body>Director: {movie.Director.Name}</Card.Body>
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
