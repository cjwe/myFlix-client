import React from 'react';
import { Link } from 'react-router-dom';

// Import React Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

// Import Custom CSS
import './nav-bar.scss';

export function NavbarView() {
  const user = localStorage.getItem('user');

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <Navbar variant="light" expand="md">
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

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="text-center" id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>
        </Nav>
        <Button type="button" onClick={() => this.onLoggedOut()}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
