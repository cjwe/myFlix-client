import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: '61aadf36bd437165f6b49008',
          Title: 'Princess Mononoke',
          Description:
            "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
          Director: {
            Name: 'Hayao Miyazaki',
            Bio: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.',
            Birth: '1941',
          },
          ImagePath: './img/princessmononoke.png',
          Featured: true,
          Genre: {
            Name: 'Action',
            Description:
              'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.',
          },
        },
        {
          _id: '61aaddcdbd437165f6b49006',
          Title: "Kiki's Delivery Service",
          Description:
            'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.',
          Director: {
            Name: 'Hayao Miyazaki',
            Bio: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.',
            Birth: '1941',
          },
          ImagePath: './img/kikisdeliveryservice.png',
          featured: true,
          Genre: {
            Name: 'Fantasy',
            Description:
              'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.',
          },
        },
        {
          _id: '61aae060bd437165f6b49009',
          Title: 'Spirited Away',
          Description:
            "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
          Director: {
            Name: 'Hayao Miyazaki',
            Bio: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.',
            Birth: '1941',
          },
          ImagePath: './img/spiritedaway.png',
          featured: false,
          Genre: {
            Name: 'Adventure',
            Description:
              'Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown.',
          },
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
