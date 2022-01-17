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

export function NavbarView() {
  const user = localStorage.getItem('user');

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

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
        <Button type="button" onClick={() => this.onLoggedOut()}>
          Logout
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
