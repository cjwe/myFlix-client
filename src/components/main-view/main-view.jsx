import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

// Import actions
// #0
import { setMovies, setUser } from '../../actions/actions';

// Import React components
import MoviesList from '../movies-list/movies-list';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../nav-bar/nav-bar';

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

//#2 export keyword removed
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // #3 movies state removed
      user: null,
    };
  }

  // Load movies from database
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem('user') });
      this.getMovies(accessToken);
    }
  }
  // Get movies
  getMovies(token) {
    axios
      .get('https://miyazaki-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        // #4
        this.props.setMovies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // To log in
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // To log out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  // Set user
  setUser(user) {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    //#5 movies extracted from this props
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Router>
        {/* For main view */}
        <NavbarView />
        <Row>
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              // #6
              return <MoviesList movies={movies} />;
            }}
          />
          {/* For registration view */}
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/* For movie card */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          {/* For director view */}
          <Route
            path="/directors/:Name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    Director={
                      movies.find((m) => m.Director.Name === match.params.Name)
                        .Director
                    }
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          {/* For genre view */}
          <Route
            path="/genres/:Name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    movies={movies}
                    Genre={
                      movies.find((m) => m.Genre.Name === match.params.Name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          {/* For profile view */}
          <Route
            exact
            path="/users/:Username"
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    setUser={(user) => this.setUser(user)}
                    movies={movies}
                    onLoggedOut={() => this.onLoggedOut()}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
