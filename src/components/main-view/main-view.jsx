import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import React components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';
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

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      Description: null,
      Movies: null,
      user: null,
    };
  }

  // Get movies
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

  // Load movies from database
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem('user') });
      this.getMovies(accessToken);
    }
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

  onRegistration(registration) {
    this.setState({
      registration,
    });
  }

  loadingCheck(user) {
    if (!user)
      return (
        <Col>
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
        </Col>
      );
    if (movies.length === 0) return <div className="main-view" />;
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <NavbarView />
        <Routes>
          {/* // For main view */}
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    <RegistrationView />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          {/* // For movie card */}
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
          {/* // For director view */}
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
          {/* // For genre view */}
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
          {/* // For profile view */}
          <Route
            exact
            path="/users/:Username"
            render={({ match, history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <ProfileView
                  history={history}
                  movies={movies}
                  users={users}
                  user={user}
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />
        </Routes>
      </Router>
    );
  }

  /* //     const { movies, selectedMovie, user } = this.state;

//     // If user is not logged in, loads log-in view
//     if (!user)
//       return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

//     // Empty main view for loading
//     if (movies.length === 0) return <div className="main-view" />;

//     // Render movie cards when logged in and registered
//     return (
//       <Router>
//         <div className="main-view">
//           <Navbar bg="light" variant="light" expand="md">
//             <Container>
//               <Navbar.Brand href="#home">
//                 <img
//                   alt="Logo of Totoro"
//                   src={require('../../img/logotext.svg')}
//                   width="100"
//                   height="auto"
//                 />{' '}
//               </Navbar.Brand>
//               <Navbar.Toggle aria-controls="basic-navbar-nav" />
//               <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="ml-auto">
//                   <Nav.Link href="#myaccount">My Account</Nav.Link>
//                   <Nav.Link href="#movies">Movies</Nav.Link>
//                   <Nav.Link href="#logout">Log Out</Nav.Link>
//                 </Nav>
//               </Navbar.Collapse>
//               <button
//                 onClick={() => {
//                   this.onLoggedOut();
//                 }}
//               >
//                 Logout
//               </button>
//             </Container>
//           </Navbar>
//           <Row className="g-2 m-3 p-3">
//             {selectedMovie ? (
//               <Col className="m-3 d-flex align-items-stretch">
//                 <MovieView
//                   movie={selectedMovie}
//                   onBackClick={(newSelectedMovie) => {
//                     this.setSelectedMovie(newSelectedMovie);
//                   }}
//                 />
//               </Col>
//             ) : (
//               movies.map((movie) => (
//                 <Col className="p-3 m-3 d-flex align-items-stretch">
//                   <MovieCard
//                     key={movie._id}
//                     movie={movie}
//                     onMovieClick={(newSelectedMovie) => {
//                       this.setSelectedMovie(newSelectedMovie);
//                     }}
//                   />
//                 </Col>
//               ))
//             )}
//           </Row>
//         </div>
//       </Router>
//     );
//   }
// } */
}
