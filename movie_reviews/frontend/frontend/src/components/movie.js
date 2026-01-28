import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import MovieDataService from "../services/movies";
import moment from "moment"; // For formatting dates

const Movie = ({ user }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({ reviews: [] });

  // Fetch movie details
  useEffect(() => {
    MovieDataService.get(id)
      .then((response) => {
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

  // Delete review
  const deleteReview = (reviewId) => {
    if (!user) return;

    MovieDataService.deleteReview(reviewId, user.id)
      .then(() => {
        setMovie((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r._id !== reviewId),
        }));
      })
      .catch((e) => console.error(e));
  };

  return (
    <Container className="mt-4">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="fs-2">{movie.title}</Card.Title>
          <Card.Text>{movie.plot}</Card.Text>
          <Card.Text>
            <strong>Rating:</strong> {movie.rated || "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Reviews Section */}
      <h2>Reviews</h2>
      <br />
      {movie.reviews.length === 0 && <p>No reviews yet.</p>}

      {movie.reviews.map((review) => (
        <Card key={review._id} className="mb-3 shadow-sm">
          <Card.Body className="d-flex align-items-start">
            <img
              src={review.userImage || "/default-avatar.png"}
              alt={review.name}
              className="rounded-circle me-3"
              style={{ width: "64px", height: "64px", objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <h5>
                {review.name} reviewed on {moment(review.date).format("Do MMMM YYYY")}
              </h5>
              <p>{review.text || review.review}</p>

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


      {/* Add Review Button */}
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
