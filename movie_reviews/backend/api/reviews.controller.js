// ==================== CHAPTER 10–11: REVIEWS CONTROLLER ====================
import MoviesDAO from "../dao/moviesDAO.js"; // DAO handles DB operations for movies and reviews
import { ObjectId } from "mongodb";

export default class ReviewsController {

  // ==================== CHAPTER 10: POST REVIEW ====================
  /**
   * POST /api/v1/movies/review
   * Creates a new review for a movie
   * @param req.body - { movie_id, user_id, name, review }
   */
  static async apiPostReview(req, res, next) {
    try {
      // Build review object to pass to DAO
      const reviewData = {
        movie_id: req.body.movie_id, // movie _id as string
        user_id: req.body.user_id,   // user id as string
        name: req.body.name,         // user's name
        review: req.body.review,     // review text
      };

      // Call DAO to add review to DB
      await MoviesDAO.addReview(reviewData);

      res.json({ status: "success" }); // success response
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      res.status(500).json({ error: e.message }); // error handling
    }
  }

  // ==================== CHAPTER 10–11: UPDATE REVIEW ====================
  /**
   * PUT /api/v1/movies/review
   * Updates an existing review
   * Only original poster can update
   * @param req.body - { review_id, user_id, review }
   */
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewData = {
        review_id: req.body.review_id, // review _id as string
        user_id: req.body.user_id,     // user id (for verification)
        review: req.body.review,       // updated review text
      };

      // Call DAO to update review
      const reviewResponse = await MoviesDAO.updateReview(reviewData);

      // Check if update actually happened
      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review. User may not be the original poster"
        );
      }

      res.json({ status: "success" }); // success response
    } catch (e) {
      console.error(`unable to update review: ${e}`);
      res.status(500).json({ error: e.message }); // error handling
    }
  }

  // ==================== CHAPTER 10–11: DELETE REVIEW ====================
  /**
   * DELETE /api/v1/movies/review
   * Deletes a review
   * Only original poster can delete
   * @param req.body - { review_id, user_id }
   */
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id; // review _id
      const userId = req.body.user_id;     // user id (for verification)

      // Call DAO to delete review
      await MoviesDAO.deleteReview(reviewId, userId);

      res.json({ status: "success" }); // success response
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      res.status(500).json({ error: e.message }); // error handling
    }
  }
}
