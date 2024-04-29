const { 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    getMovie, 
    getRandomMovieOrSeries, 
    getAllMovies
 } = require("../controllers/movies");
const checkPrivileges = require("../middleware/authorization");

const router = require("express").Router();

// routes for general users
router.get("/find/:id", getMovie);
router.get("/random", getRandomMovieOrSeries);


// routes that require admin privileges
router.get("/", getAllMovies);
router.use(checkPrivileges);
router.post("/", addMovie)
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;