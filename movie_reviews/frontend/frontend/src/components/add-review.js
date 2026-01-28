import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MovieDataService from "../services/movies";

const AddReview = ({ user }) => {
  const { id: movieId } = useParams(); // get movie ID from URL
  const navigate = useNavigate();

  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  // Fetch existing review if the user has already submitted one
  useEffect(() => {
    if (!user) return;

    MovieDataService.get(movieId)
      .then((response) => {
        const existingReview = response.data.reviews.find(
          (r) => String(r.user_id) === String(user.id)
        );
        if (existingReview) {
          setReview(existingReview.review);
          setEditing(true);
          setCurrentReviewId(existingReview._id);
        }
      })
      .catch((e) => console.log(e));
  }, [movieId, user]);

  const handleChange = (e) => setReview(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to submit a review");

    const data = {
      review,
      name: user.name,
      user_id: user.id,
      movie_id: movieId,
    };

    const action = editing
      ? MovieDataService.updateReview({ ...data, review_id: currentReviewId })
      : MovieDataService.createReview(data);

    action
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((e) => console.log(e));
  };

  const handleBack = () => navigate(`/movies/${movieId}`);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {submitted ? (
            <div className="text-center">
              <h4>Review submitted successfully!</h4>
              <Button variant="secondary" onClick={handleBack} className="mt-3">
                Back to Movie
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  required
                  value={review}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddReview;
