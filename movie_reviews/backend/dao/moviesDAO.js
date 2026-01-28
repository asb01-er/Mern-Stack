import mongodb from "mongodb";
const { ObjectId } = mongodb; // ObjectId for MongoDB document _id

// References to collections
let movies;   // reference to movies collection
let reviews;  // reference to reviews collection

/**
 * MoviesDAO handles all movie-related database operations
 */
export default class MoviesDAO {
  /**
   * Injects the database connection into MoviesDAO.
   * Called once when server starts to set up references to collections
   * @param conn - MongoDB connection
   */
  static async injectDB(conn) {
    if (movies && reviews) return; // Already initialized

    try {
      const db = conn.db(process.env.MOVIEREVIEWS_NS);
      movies = db.collection("movies");   // Movies collection
      reviews = db.collection("reviews"); // Reviews collection
      console.log("MoviesDAO connected to DB");
    } catch (e) {
      console.error(`Unable to connect in MoviesDAO: ${e}`);
    }
  }

  /**
   * Get a paginated list of movies with optional filters
   * @param filters - optional { title: "", rated: "" }
   * @param page - page number (0-based)
   * @param moviesPerPage - number of movies per page
   */
  static async getMovies({ filters = null, page = 0, moviesPerPage = 20 } = {}) {
    let query;

    // Build query if filters provided
    if (filters) {
      if ("title" in filters) query = { $text: { $search: filters.title } };
      else if ("rated" in filters) query = { rated: { $eq: filters.rated } };
    }

    try {
      const cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Unable to issue find command: ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  /**
   * Get a single movie by ID, including its reviews
   * @param id - movie _id as string
   */
  static async getMovieById(id) {
    try {
      if (!ObjectId.isValid(id)) return null;

      return await movies
        .aggregate([
          { $match: { _id: new ObjectId(id) } },
          {
            $lookup: {
              from: "reviews",       // join reviews collection
              localField: "_id",     // movie _id
              foreignField: "movie_id", // review.movie_id
              as: "reviews",
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`Something went wrong in getMovieById: ${e}`);
      throw e;
    }
  }

  /**
   * Get all unique movie ratings
   */
  static async getRatings() {
    try {
      return await movies.distinct("rated");
    } catch (e) {
      console.error(`Unable to get ratings: ${e}`);
      return [];
    }
  }

  /**
   * Add a new review
   * @param reviewData - { movie_id, user_id, name, review }
   */
  static async addReview(reviewData) {
    try {
      const reviewDoc = {
        movie_id: new ObjectId(reviewData.movie_id), // ensure ObjectId
        user_id: reviewData.user_id,                 // keep as string
        name: reviewData.name,
        review: reviewData.review,
        date: new Date(),
      };

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      throw e;
    }
  }

  /**
   * Update an existing review
   * @param reviewData - { review_id, user_id, review }
   */
  static async updateReview(reviewData) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          _id: new ObjectId(reviewData.review_id),
          user_id: reviewData.user_id, // only allow original poster
        },
        { $set: { review: reviewData.review, date: new Date() } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      throw e;
    }
  }

  /**
   * Delete a review
   * @param reviewId - review _id
   * @param userId - user who owns the review
   */
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      throw e;
    }
  }
}
