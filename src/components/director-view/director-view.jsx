import React from 'react';
import PropTypes from 'prop-types';

// Import React Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

// Import custom SCSS
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick } = this.props;

    return (
      <Container>
        <Card className="director-card">
          <Card.Img
            variant="top"
            src="https://s3.amazonaws.com/criterion-production/images/9206-2db0b3476e483168ce277b751ebc0b80/miyazaki10262017_medium.jpg"
          />
          <Card.Body>
            <Card.Title className="director-card-title">
              {Director.Name}
            </Card.Title>
            <Card.Text className="director-card-text">
              Born: {Director.Birth}
            </Card.Text>
            <Card.Text className="director-card-text">{Director.Bio}</Card.Text>
            <Card.Footer className="director-card-footer">
              <Button
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </Card.Footer>
          </Card.Body>
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
