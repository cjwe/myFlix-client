import React from 'react';
import PropTypes from 'prop-types';

// Import React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

// Import custom SCSS
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick, movies, movie } = this.props;

    return (
      <Container>
        <Card>
          <Card.Header>Director</Card.Header>
          <Card.Title>{Director.Name}</Card.Title>
          <Card.Text>Born: {Director.Birth}</Card.Text>
          <Card.Text>{Director.Bio}</Card.Text>
          <Card.Footer>
            <Button
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
  }).isRequired,
};
