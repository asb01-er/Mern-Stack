// ==================== CHAPTER 10–11: REVIEWS DAO ====================
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId; // Convert string to MongoDB ObjectId

// Reference to reviews collection
let reviews;

/**
 * ReviewsDAO handles all CRUD operations for movie reviews
 */
export default class ReviewsDAO {

  // ==================== CHAPTER 10: InjectDB ====================
  /**
   * Injects the database connection into ReviewsDAO.
   * Called once when server starts to set up reference to reviews collection
   * @param conn - MongoDB connection
   */
  static async injectDB(conn) {
    if (reviews) return; // Already initialized

    try {
      reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews'); // connect to reviews
      console.log("ReviewsDAO connected to DB");
    } catch (e) {
      console.error(`Unable to establish connection handle in ReviewsDAO: ${e}`);
    }
  }

  // ==================== CHAPTER 10–11: ADD REVIEW ====================
  /**
   * Add a new review
   * @param movieId - movie _id
   * @param user - { _id, name }
   * @param review - review text
   * @param date - date of review
   */
  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        movie_id: ObjectId(movieId) // convert string to ObjectId
      };
      return await reviews.insertOne(reviewDoc); // insert into collection
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  // ==================== CHAPTER 10–11: UPDATE REVIEW ====================
  /**
   * Update an existing review
   * @param reviewId - review _id
   * @param userId - user who owns review
   * @param review - updated review text
   * @param date - updated date
   */
  static async updateReview(reviewId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) }, // only original poster can update
        { $set: { review: review, date: date } }     // update text and date
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  // ==================== CHAPTER 10–11: DELETE REVIEW ====================
  /**
   * Delete a review
   * @param reviewId - review _id
   * @param userId - user who owns review
   */
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId, // ensure only owner can delete
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
