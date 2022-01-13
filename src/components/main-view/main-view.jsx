import React from 'react';
import axios from 'axios';

// Import React components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

// Import React Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

// Custom SCSS Import
import './main-view.scss';
import { Nav } from 'react-bootstrap';

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  //Load movies from database
  componentDidMount() {
    axios
      .get('https://miyazaki-movie-api.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Get movies
  getMovies(token) {
    axios
      .get('https://miyazaki-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Affect state of parent element...
  // to movie-card
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  // to login-view
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If user is not logged in, loads log-in view
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Empty main view for loading
    if (movies.length === 0) return <div className="main-view" />;

    // Render movie cards when logged in and registered
    return (
      <div className="main-view">
        <Navbar bg="light" variant="light" expand="md">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt="Logo of Totoro"
                src={require('../../img/logotext.svg')}
                width="100"
                height="auto"
              />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#myaccount">My Account</Nav.Link>
                <Nav.Link href="#movies">Movies</Nav.Link>
                <Nav.Link href="#logout">Log Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Row className="g-2 m-3 p-3">
          {selectedMovie ? (
            <Col className="m-3 d-flex align-items-stretch">
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col className="p-3 m-3 d-flex align-items-stretch">
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}
