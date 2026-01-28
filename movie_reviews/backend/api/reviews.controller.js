import MoviesDAO from "../dao/moviesDAO.js"; // this is your DAO class
import { ObjectId } from "mongodb";

export default class ReviewsController {
  /**
   * POST /api/v1/movies/review
   */
  static async apiPostReview(req, res, next) {
    try {
      // Build review object for DAO
      const reviewData = {
        movie_id: req.body.movie_id,    // string
        user_id: req.body.user_id,      // string
        name: req.body.name,
        review: req.body.review,
      };

      // Call MoviesDAO.addReview
      await MoviesDAO.addReview(reviewData);

      res.json({ status: "success" });
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  /**
   * PUT /api/v1/movies/review
   */
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewData = {
        review_id: req.body.review_id,
        user_id: req.body.user_id,
        review: req.body.review,
      };

      const reviewResponse = await MoviesDAO.updateReview(reviewData);

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review. User may not be the original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      console.error(`unable to update review: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  /**
   * DELETE /api/v1/movies/review
   */
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      await MoviesDAO.deleteReview(reviewId, userId);

      res.json({ status: "success" });
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}
