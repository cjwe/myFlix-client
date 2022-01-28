import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import React Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Import Custom CSS
import './registration-view.scss';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  // Modify state of MainView to be registered and logged in with new user
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://miyazaki-movie-api.herokuapp.com/users`, {
        Username: Username,
        Password: Password,
        Email: Email,
        Birthday: Birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert('Registration Successful!');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="register-title">
                Sign up for a free myGhibli account:
              </Card.Title>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter a username"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    placeholder="Your password must be 8 or more characters"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter an email address"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="button-group mt-4">
                  <Button type="submit" onClick={handleSubmit}>
                    Register
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// prop-types
// Give informational warnings in browser if data does not match required shape
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
