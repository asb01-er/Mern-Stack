import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import MovieDataService from "../services/movies";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

/*
  CHAPTER 14–16: Movies List + Pagination
  Displays paginated movies with search and rating filters.
*/

const MoviesList = ({ user }) => {

  // CHAPTER 16 – Pagination & movie state
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState([]);

  // CHAPTER 17 – Search filters
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  /*
    CHAPTER 16 – Fetch movies by page
  */
  const retrieveMovies = useCallback(() => {
    MovieDataService.getAll(page)
      .then((response) => {

        // Defensive formatting for title & plot
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
  }, [page]);

  useEffect(() => {
    retrieveMovies();
  }, [retrieveMovies]);

  /*
    CHAPTER 17 – Fetch ratings for dropdown
  */
  useEffect(() => {
    MovieDataService.getRatings()
      .then((response) =>
        setRatings(["All Ratings"].concat(response.data))
      )
      .catch((e) => console.log(e));
  }, []);

  // CHAPTER 17 – Search handlers
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

        {/* CHAPTER 17 – Search Form */}
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>

            <Col>
              <Form.Control
                as="select"
                onChange={(e) => setSearchRating(e.target.value)}
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </Form.Control>

              <Button
                variant="primary"
                type="button"
                onClick={findByRating}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {/* CHAPTER 14–16 – Movie Cards */}
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

                  {/* CHAPTER 18 – Navigate to Single Movie */}
                  <Link to={`/movies/${movie._id}`}>
                    View Reviews
                  </Link>
                  <br />

                  {/* CHAPTER 21–23 – Add/Edit Review (Logged-in users) */}
                  {user && (
                    <Link to={`/movies/${movie._id}/review`}>
                      {movie.reviews?.some(
                        (r) =>
                          String(r.user_id) === String(user?.id)
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

        {/* CHAPTER 16 – Pagination Controls */}
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
