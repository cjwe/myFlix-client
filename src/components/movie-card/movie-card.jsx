import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowDownCircle } from 'react-bootstrap-icons';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <a href="" className="cardlink">
        <Card className="m-1">
          <Card.Img variant="top" src={movie.ImagePath} />
          <div className="card__overlay">
            <div class="card__header">
              <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                <path />
              </svg>
              <div class="card__header-text">
                <Card.Title>{movie.Title}</Card.Title>
                <span class="card__genre">{movie.Genre.Name}</span>
              </div>
            </div>
            <Card.Text class="card__description">{movie.Description}</Card.Text>
            <Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button class="card__description" variant="link">
                  Open
                </Button>
              </Link>
            </Card.Text>
          </div>
        </Card>
      </a>
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
};
