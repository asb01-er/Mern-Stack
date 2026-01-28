import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import MovieDataService from "../services/movies";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";



const MoviesList = (props) => {
  const { user } = props;
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);




  const retrieveMovies = useCallback(() => {
  MovieDataService.getAll(page)
    .then((response) => {
      const safeMovies = response.data.movies.map((movie) => ({
        ...movie,
        title:
          typeof movie.title === "string"
            ? movie.title
            : movie.title?.en || JSON.stringify(movie.title),
        plot:
          typeof movie.plot === "string"
            ? movie.plot
            : movie.plot?.summary || JSON.stringify(movie.plot),
      }));
      setMovies(safeMovies);
    })
    .catch((e) => console.log(e));
}, [page]); // only changes when page changes

useEffect(() => {
  retrieveMovies();
}, [retrieveMovies]);

  useEffect(() => {
    retrieveRatings();
  }, []);
  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => setRatings(["All Ratings"].concat(response.data)))
      .catch((e) => console.log(e));
  };

  const onChangeSearchTitle = (e) => setSearchTitle(e.target.value);
  const onChangeSearchRating = (e) => setSearchRating(e.target.value);

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((response) => {
        const safeMovies = response.data.movies.map((movie) => ({
          ...movie,
          title:
            typeof movie.title === "string"
              ? movie.title
              : movie.title?.en || JSON.stringify(movie.title),
          plot:
            typeof movie.plot === "string"
              ? movie.plot
              : movie.plot?.summary || JSON.stringify(movie.plot),
        }));
        setMovies(safeMovies);
      })
      .catch((e) => console.log(e));
  };

  const findByTitle = () => find(searchTitle, "title");
  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div className="App">
      <Container>
        {/* Search Form */}
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByRating}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Movies List */}
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} className="mb-4">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={movie.poster + "/100px180"}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>Rating: {movie.rated}</Card.Text>
                  <Card.Text>{movie.plot}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>View Reviews</Link>
                  <br />
                  {user && (
                    <Link to={`/movies/${movie._id}/review`}>
                      {movie.reviews?.some(
                        (r) => String(r.user_id) === String(user?.id)
                      )
                        ? "Edit Your Review"
                        : "Add Review"}

                    </Link>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              variant="secondary"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
          </Col>

          <Col className="text-end">
            <Button
              variant="secondary"
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default MoviesList;
