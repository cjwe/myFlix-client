import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

//Import React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

//Import custom SCSS
import './login-view.scss';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Request for authentication
    axios
      .post('https://miyazaki-movie-api.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('User not found.');
      });
  };

  // Register button click needed

  return (
    <div className="login-view">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={9}>
            <Card className="text-center">
              <Card.Header>Log in to your myGhibli account</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Container>
                  <Link to={`/`}>
                    <Button
                      variant="success link"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Log in
                    </Button>
                  </Link>
                  <Container>Need an account?</Container>
                  <Button
                    onClick={() => {
                      window.location.href = '/register';
                    }}
                    variant="secondary"
                    type="button"
                  >
                    Register
                  </Button>
                </Container>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
