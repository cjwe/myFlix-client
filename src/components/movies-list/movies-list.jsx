import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col sm={10} style={{ margin: '2em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      <Row xs={1} md={2} className="">
        {filteredMovies.map((m) => (
          <Col
            md={4}
            lg={3}
            sm={6}
            className="d-flex align-items-stretch"
            key={m._id}
          >
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </>
  );
}
export default connect(mapStateToProps)(MoviesList);
