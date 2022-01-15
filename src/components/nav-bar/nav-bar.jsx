import React from 'react';
import { Link } from 'react-router-dom';

// React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
// Custom SCSS
import './nav-bar.scss';

export class NavbarView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  render() {
    const { user } = this.props;

    return (
      <Navbar bg="light" variant="light" expand="md">
        <Container>
          <Link to={`/`}>
            <Navbar.Brand>
              <img
                alt="Logo of Totoro"
                src={require('../../img/logotext.svg')}
                width="100"
                height="auto"
              />{' '}
            </Navbar.Brand>
          </Link>
          <Button
            type="button"
            onClick={() => {
              onLoggedOut;
            }}
          >
            Logout
          </Button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link to={`/users/${user}`}>
                <Nav.Link>My Profile</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
