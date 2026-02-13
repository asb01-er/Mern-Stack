// ==================== CHAPTER 21: ADD / EDIT REVIEW ====================
// Handles creating a new review OR updating an existing one.

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MovieDataService from "../services/movies";

const AddReview = ({ user }) => {

  // CHAPTER 18: Read movie ID from route (/movies/:id/review)
  const { id: movieId } = useParams();

  // CHAPTER 18: Programmatic navigation
  const navigate = useNavigate();

  // CHAPTER 21: Component state
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  // CHAPTER 21: Check if logged-in user already has a review
  // If yes → switch to edit mode
  useEffect(() => {
    if (!user) return;

    MovieDataService.get(movieId)
      .then((response) => {
        const existingReview = response.data.reviews.find(
          (r) => String(r.user_id) === String(user.id)
        );

        if (existingReview) {
          setReview(existingReview.review || existingReview.text);
          setEditing(true);
          setCurrentReviewId(existingReview._id);
        }
      })
      .catch((e) => console.log(e));
  }, [movieId, user]);

  // CHAPTER 21: Update review text state
  const handleChange = (e) => setReview(e.target.value);

  // CHAPTER 21: Submit review (POST or PUT)
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
      ? MovieDataService.updateReview({
          ...data,
          review_id: currentReviewId,
        }) // PUT
      : MovieDataService.createReview(data); // POST

    action
      .then(() => setSubmitted(true))
      .catch((e) => console.log(e));
  };

  // CHAPTER 18: Navigate back to movie page
  const handleBack = () => navigate(`/movies/${movieId}`);

  // CHAPTER 21: Render form or success message
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {submitted ? (
            <div className="text-center">
              <h4>
                {editing
                  ? "Review updated successfully!"
                  : "Review submitted successfully!"}
              </h4>
              <Button variant="secondary" onClick={handleBack} className="mt-3">
                Back to Movie
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {editing ? "Edit Review" : "Create Review"}
                </Form.Label>
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
                  {editing ? "Update Review" : "Submit Review"}
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
