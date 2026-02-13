// ==================== CHAPTER 8–12: MOVIES CONTROLLER ====================
import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {

  // ==================== CHAPTER 8: GET MOVIES WITH FILTERS ====================
  /**
   * GET /api/v1/movies
   * Retrieves a paginated list of movies with optional filters (title or rating)
   * @param req.query - { moviesPerPage, page, title, rated }
   */
  static async apiGetMovies(req, res, next) {
    // How many movies to return per page (default 20)
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage)
      : 20;

    // Which page to return (default 0)
    const page = req.query.page ? parseInt(req.query.page) : 0;

    // Build filters object from query params
    let filters = {};
    if (req.query.rated) {
      filters.rated = req.query.rated; // filter by rating
    } else if (req.query.title) {
      filters.title = req.query.title; // filter by title
    }

    // Fetch movies from DAO
    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    // Build response JSON
    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    res.json(response); // send JSON response
  }

  // ==================== CHAPTER 12: GET SINGLE MOVIE BY ID ====================
  /**
   * GET /api/v1/movies/id/:id
   * Retrieves a specific movie by ID along with its reviews
   * @param req.params.id - movie _id
   */
  static async apiGetMovieById(req, res, next) {
    try {
      let id = req.params.id || {}; // extract ID from URL parameter
      let movie = await MoviesDAO.getMovieById(id); // fetch movie from DAO

      if (!movie) {
        res.status(404).json({ error: "not found" }); // return 404 if not found
        return;
      }

      res.json(movie); // return movie + reviews
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // ==================== CHAPTER 12: GET ALL RATINGS ====================
  /**
   * GET /api/v1/movies/ratings
   * Retrieves all distinct movie ratings (G, PG, R, etc.)
   */
  static async apiGetRatings(req, res, next) {
    try {
      let ratings = await MoviesDAO.getRatings(); // fetch distinct ratings from DAO
      res.json(ratings); // return array of ratings
    } catch (e) {
      console.log(`api,${e}`);
      res.status(500).json({ error: e });
    }
  }
}
