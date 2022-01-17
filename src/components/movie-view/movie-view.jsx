import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios
      .post(
        `https://miyazaki-movie-api.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'POST',
        }
      )
      .then((response) => {
        alert(`Added ${this.props.movie.Title} to favorites List`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <Card>
          <Card.Header>
            <img src={movie.ImagePath} />
          </Card.Header>
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
            <Button
              className="movie-view-button"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back to list
            </Button>
            <Button
              variant="outline-primary"
              className="btn-outline-primary"
              value={movie._id}
              onClick={(e) => this.addFavoriteMovie(e, movie)}
            >
              Add to Favorites
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
