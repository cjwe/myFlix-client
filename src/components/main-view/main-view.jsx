import React from 'react';
import axios from 'axios';

//React Components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';

//SCSS Import
import './main-view.scss';

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
  // Affect state of parent element...
  // to movie-card
  setSelectedMovie(movie) {
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

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If user is not logged in, loads log-in view
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

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
