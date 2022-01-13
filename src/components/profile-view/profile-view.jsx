import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { response } from 'express';

// Import React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

// Import custom SCSS
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios
      .get(`https://miyazaki-movie-api.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(
        `https://miyazaki-movie-api.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert('Profile is updated!');
        window.open(`/users/${Username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Deregister
  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://miyazaki-movie-api.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted!');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open(`/`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Set user values
  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.state;

    return (
      <Container className="profile-view" align="center">
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Header>User Profile</Card.Header>
              <Card.Body>
                <Card.Text>
                  <span className="label">Username:</span>
                  <span className="value">{Username}</span>
                </Card.Text>
                <Card.Text>
                  <span className="label">Email:</span>
                  <span className="value">{Email}</span>
                </Card.Text>
                <Card.Text>
                  <span className="label">Birthday:</span>
                  <span className="value">{Birthday}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form
                    className="update-form"
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="Username"
                        placeholder="New Username"
                        onChange={(e) => this.setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="Password"
                        placeholder="New Password"
                        onChange={(e) => this.setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="Email"
                        placeholder="New Email"
                        onChange={(e) => this.setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        name="Birthday"
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={this.editUser}
                      >
                        Update User
                      </Button>
                      <Button
                        className="delete-button"
                        variant="danger"
                        onClick={() => this.onDeleteUser()}
                      >
                        Delete User
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="user-favorites">
              <Card>
                <Card.Body>
                  {FavoriteMovies.length === 0 && (
                    <div className="text-center">No Favorite Movies</div>
                  )}
                  <Row className="favorite-container">
                    {FavoriteMovies.length > 0 &&
                      movies.map((movie) => {
                        if (
                          movie._id ===
                          FavoriteMovies.find((fav) => fav === movie._id)
                        ) {
                          return (
                            <Card
                              className="favorite-movie card-content"
                              key={movie._id}
                            >
                              <Card.Img
                                className="fav-poster"
                                variant="top"
                                src={movie.ImagePath}
                              />
                              <Card.Body>
                                <Card.Title className="movie_title">
                                  {movie.Title}
                                </Card.Title>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  value={movie._id}
                                  onClick={(e) =>
                                    this.onRemoveFavorite(e, movie)
                                  }
                                >
                                  Remove
                                </Button>
                              </Card.Body>
                            </Card>
                          );
                        }
                      })}
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
