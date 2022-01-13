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

export function NavbarView({ onLoggedOut }) {
  return (
    <Navbar bg="light" variant="light" expand="md">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="Logo of Totoro"
            src={require('../../img/logotext.svg')}
            width="100"
            height="auto"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/profile">My Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Link to={'/'}>
          <Button onClick={onLoggedOut}>Logout</Button>
        </Link>
      </Container>
    </Navbar>
  );
}
