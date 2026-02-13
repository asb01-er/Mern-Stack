import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import MovieDataService from "../services/movies";
import moment from "moment";

/*
  CHAPTER 18 – Single Movie Page
  Displays one movie and its reviews.
  Route: /movies/:id
*/

const Movie = ({ user }) => {

  // CHAPTER 18 – Get movie ID from URL
  const { id } = useParams();

  // CHAPTER 18/19 – Store movie + attached reviews
  const [movie, setMovie] = useState({ reviews: [] });

  // CHAPTER 18 – Fetch movie by ID
  // Backend uses aggregation ($lookup) to attach reviews
  useEffect(() => {
    MovieDataService.get(id)
      .then((response) => {

        // Defensive handling for title & plot (custom improvement)
        const safeMovie = {
          ...response.data,
          title:
            typeof response.data.title === "string"
              ? response.data.title
              : response.data.title?.en || JSON.stringify(response.data.title),
          plot:
            typeof response.data.plot === "string"
              ? response.data.plot
              : response.data.plot?.summary || JSON.stringify(response.data.plot),
        };

        setMovie(safeMovie);
      })
      .catch((e) => console.error(e));
  }, [id]);

  /*
    CHAPTER 22 – Delete Review
    Sends DELETE request.
    Backend verifies review ownership.
  */
  const deleteReview = (reviewId) => {

    // CHAPTER 23 – Only logged-in users can delete
    if (!user) return;

    MovieDataService.deleteReview(reviewId, user.id)
      .then(() => {

        // Optimistic UI update (no page refresh)
        setMovie((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r._id !== reviewId),
        }));
      })
      .catch((e) => console.error(e));
  };

  return (
    <Container className="mt-4">

      {/* CHAPTER 18 – Movie Details */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="fs-2">{movie.title}</Card.Title>
          <Card.Text>{movie.plot}</Card.Text>
          <Card.Text>
            <strong>Rating:</strong> {movie.rated || "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* CHAPTER 19 – Reviews Section */}
      <h2>Reviews</h2>
      <br />

      {movie.reviews.length === 0 && <p>No reviews yet.</p>}

      {/* CHAPTER 19 – Render Reviews */}
      {movie.reviews.map((review) => (
        <Card key={review._id} className="mb-3 shadow-sm">
          <Card.Body className="d-flex align-items-start">

            {/* UI Enhancement – User avatar */}
            <img
              src={review.userImage || "/default-avatar.png"}
              alt={review.name}
              className="rounded-circle me-3"
              style={{ width: "64px", height: "64px", objectFit: "cover" }}
            />

            <div className="flex-grow-1">

              {/* Date formatting (moment.js enhancement) */}
              <h5>
                {review.name} reviewed on{" "}
                {moment(review.date).format("Do MMMM YYYY")}
              </h5>

              <p>{review.text || review.review}</p>

              {/* CHAPTER 21/22 – Edit & Delete (Owner Only) */}
              {user && String(user.id) === String(review.user_id) && (
                <div className="d-flex gap-2">
                  <Link
                    to={`/movies/${id}/review`}
                    state={{ currentReview: review }}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteReview(review._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* CHAPTER 21 – Add Review (Logged-in users only) */}
      {user && (
        <Link
          to={`/movies/${movie._id}/review`}
          className="btn btn-success mt-3"
        >
          Add Review
        </Link>
      )}
    </Container>
  );
};

export default Movie;
