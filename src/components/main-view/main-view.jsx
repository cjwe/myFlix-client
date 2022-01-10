import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';

import './main-view.scss';

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null,
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
  // Affect state of parent element
  // To movie-card
  setselectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  // to login-view
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }
  // to registration-view
  onRegister(registered, user) {
    this.setState({
      registered,
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // If user is registered but not logged in, log in view
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          toRegistrationView={(toRegister) =>
            this.toRegistrationView(toRegister)
          }
        />
      );

    // If user is not logged in or registered, registration-view
    if (!user && !registered)
      return (
        <RegistrationView
          onRegister={(registered, username) =>
            this.onRegister(registered, username)
          }
        />
      );

    // Empty main view for loading
    if (movies.length === 0) return <div className="main-view" />;

    // Render movie list when logged in and registered
    return (
      <div className="main-view">
        {selectedMovie ? (
          <div>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </div>
        ) : (
          <div>
            <h1>Movies</h1>
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
