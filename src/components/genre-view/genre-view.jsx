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
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick, movies } = this.props;

    return (
      <Container>
        <Card>
          <Card.Header>Genre</Card.Header>
          <Card.Title>{Genre.Name}</Card.Title>
          <Card.Text>{Genre.Description}</Card.Text>
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

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
