import React, { useState } from 'react';
import PropTypes from 'prop-types';

//Import React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

//Import custom SCSS
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send auth request to server
    props.onLoggedIn(username);
  };

  // Register button click needed

  return (
    <div className="login-view">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img
            alt="Logo of Totoro"
            src={require('../../img/logotext.svg')}
            width="100"
            height="auto"
          />{' '}
        </Navbar.Brand>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col></Col>
          <Col xs={9}>
            <Card className="text-center">
              <Card.Header>Log in to your myGhibli account</Card.Header>
              <Card.Body>
                <Form>
                  <Card.Text>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Card.Text>
                  <Card.Text>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Card.Text>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Log in
                  </Button>
                </Form>
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
